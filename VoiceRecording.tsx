import React, { useState } from 'react';
import Card from '../layout/Card';
import Button from '../layout/Button';
import Input from '../layout/Input';
import { MicrophoneIcon, ArrowUpTrayIcon, PauseIcon, StopIcon } from '@heroicons/react/24/outline';

const VoiceRecording: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [transcribing, setTranscribing] = useState(false);
  const [transcriptionComplete, setTranscriptionComplete] = useState(false);

  // 模拟开始录音
  const startRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
    // 模拟计时器
    const timer = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    
    // 存储计时器ID到组件实例
    // @ts-ignore
    window.recordingTimer = timer;
  };

  // 模拟暂停录音
  const pauseRecording = () => {
    setIsPaused(true);
    // 清除计时器
    // @ts-ignore
    clearInterval(window.recordingTimer);
  };

  // 模拟继续录音
  const resumeRecording = () => {
    setIsPaused(false);
    // 重新开始计时器
    const timer = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    
    // 存储计时器ID到组件实例
    // @ts-ignore
    window.recordingTimer = timer;
  };

  // 模拟停止录音
  const stopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    // 清除计时器
    // @ts-ignore
    clearInterval(window.recordingTimer);
    
    // 模拟转录过程
    simulateTranscription();
  };

  // 处理文件上传
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // 处理文件上传提交
  const handleFileUpload = () => {
    if (file) {
      // 模拟转录过程
      simulateTranscription();
    }
  };

  // 模拟转录过程
  const simulateTranscription = () => {
    setTranscribing(true);
    
    // 模拟3秒后完成转录
    setTimeout(() => {
      setTranscribing(false);
      setTranscriptionComplete(true);
      
      // 模拟导航到转录页面
      setTimeout(() => {
        window.location.href = '/transcription';
      }, 1500);
    }, 3000);
  };

  // 格式化时间显示
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 生成模拟波形
  const generateWaveform = () => {
    return (
      <div className="w-full h-24 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center p-2">
        <div className="flex items-center justify-center w-full h-full space-x-1">
          {Array.from({ length: 50 }).map((_, i) => {
            // 生成随机高度，但在录音时有动态效果
            const height = isRecording 
              ? Math.max(10, Math.floor(Math.random() * 60)) 
              : Math.max(5, Math.floor(Math.random() * 30));
              
            return (
              <div 
                key={i} 
                className={`w-1 bg-primary ${isPaused ? 'opacity-50' : ''}`} 
                style={{ 
                  height: `${height}px`,
                  transition: 'height 0.1s ease-in-out'
                }}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">语音上传与录制</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="上传语音文件">
          <div className="flex flex-col items-center">
            <div className="w-full mb-4">
              <label 
                htmlFor="file-upload" 
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ArrowUpTrayIcon className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">点击上传</span> 或拖放文件
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    支持 MP3, WAV 格式
                  </p>
                </div>
                <input 
                  id="file-upload" 
                  type="file" 
                  className="hidden" 
                  accept=".mp3,.wav" 
                  onChange={handleFileChange}
                  disabled={isRecording || transcribing}
                />
              </label>
            </div>
            
            {file && (
              <div className="w-full mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-sm truncate">已选择: {file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )}
            
            <Button 
              variant="primary" 
              onClick={handleFileUpload}
              disabled={!file || transcribing}
              className="w-full"
            >
              {transcribing ? '正在转录...' : '开始转录'}
            </Button>
          </div>
        </Card>
        
        <Card title="实时录音">
          <div className="flex flex-col items-center">
            {generateWaveform()}
            
            <div className="mt-4 w-full text-center">
              {isRecording && (
                <div className="mb-2 text-primary font-mono">
                  {formatTime(recordingTime)}
                </div>
              )}
              
              <div className="flex justify-center space-x-4">
                {!isRecording ? (
                  <Button 
                    variant="primary" 
                    onClick={startRecording}
                    disabled={transcribing}
                    icon={<MicrophoneIcon className="h-5 w-5" />}
                  >
                    开始录音
                  </Button>
                ) : (
                  <>
                    {isPaused ? (
                      <Button 
                        variant="primary" 
                        onClick={resumeRecording}
                        icon={<MicrophoneIcon className="h-5 w-5" />}
                      >
                        继续录音
                      </Button>
                    ) : (
                      <Button 
                        variant="secondary" 
                        onClick={pauseRecording}
                        icon={<PauseIcon className="h-5 w-5" />}
                      >
                        暂停录音
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline" 
                      onClick={stopRecording}
                      icon={<StopIcon className="h-5 w-5" />}
                    >
                      停止录音
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      {transcribing && (
        <div className="mt-6">
          <Card title="转录进度">
            <div className="flex flex-col items-center">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                <div className="bg-primary h-2.5 rounded-full animate-pulse w-3/4"></div>
              </div>
              <p>正在处理音频并转录内容，请稍候...</p>
            </div>
          </Card>
        </div>
      )}
      
      {transcriptionComplete && (
        <div className="mt-6">
          <Card title="转录完成">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="mb-4">转录已完成！正在跳转到转录内容审阅页面...</p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default VoiceRecording;
