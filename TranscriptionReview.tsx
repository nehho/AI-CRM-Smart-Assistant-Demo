import React, { useState, useEffect } from 'react';
import Card from '../layout/Card';
import Button from '../layout/Button';
import { mockTranscript, TranscriptSegment } from '../../data/mockData';
import { PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const TranscriptionReview: React.FC = () => {
  const [transcript, setTranscript] = useState(mockTranscript);
  const [editingSegment, setEditingSegment] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  // 格式化时间
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 开始编辑片段
  const startEditing = (segment: TranscriptSegment) => {
    setEditingSegment(segment.id);
    setEditText(segment.text);
  };

  // 保存编辑
  const saveEdit = (segmentId: string) => {
    setTranscript(prev => ({
      ...prev,
      segments: prev.segments.map(seg => 
        seg.id === segmentId ? { ...seg, text: editText } : seg
      )
    }));
    setEditingSegment(null);
  };

  // 取消编辑
  const cancelEdit = () => {
    setEditingSegment(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">转录内容审阅</h1>
      
      <div className="mb-6">
        <Card title={transcript.title}>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                日期: {transcript.date}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                时长: {formatTime(transcript.duration)}
              </p>
            </div>
            <div>
              <Button variant="outline" size="sm">
                导出转录
              </Button>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="space-y-4">
        {transcript.segments.map(segment => (
          <div 
            key={segment.id}
            className={`flex ${segment.speaker.id === 'client' ? 'justify-start' : 'justify-end'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-4 ${
                segment.speaker.id === 'client' 
                  ? 'bg-gray-100 dark:bg-gray-800 rounded-tr-lg rounded-br-lg rounded-bl-lg' 
                  : 'bg-primary bg-opacity-10 dark:bg-primary dark:bg-opacity-20 rounded-tl-lg rounded-tr-lg rounded-bl-lg'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-xs font-medium ${
                  segment.speaker.id === 'client' 
                    ? 'text-gray-600 dark:text-gray-400' 
                    : 'text-primary dark:text-primary-light'
                }`}>
                  {segment.speaker.name}
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  {formatTime(segment.startTime)}
                </span>
              </div>
              
              {editingSegment === segment.id ? (
                <div>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white mb-2"
                    rows={3}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={cancelEdit}
                      icon={<XMarkIcon className="h-4 w-4" />}
                    >
                      取消
                    </Button>
                    <Button 
                      size="sm" 
                      variant="primary" 
                      onClick={() => saveEdit(segment.id)}
                      icon={<CheckIcon className="h-4 w-4" />}
                    >
                      保存
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className={`${
                    segment.speaker.id === 'client' 
                      ? 'text-gray-800 dark:text-gray-200' 
                      : 'text-gray-800 dark:text-gray-200'
                  }`}>
                    {segment.text}
                  </p>
                  <div className="flex justify-end mt-1">
                    <button 
                      onClick={() => startEditing(segment)}
                      className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TranscriptionReview;
