import React, { useState, useEffect } from 'react';
import Card from '../layout/Card';
import Button from '../layout/Button';
import { mockUserProfile, mockTranscript } from '../../data/mockData';
import { ArrowDownTrayIcon, DocumentTextIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';

// 模拟LLM分析服务
const analyzeTranscript = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUserProfile);
    }, 2000);
  });
};

const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState(mockUserProfile);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  // 模拟分析过程
  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const result = await analyzeTranscript();
      // @ts-ignore
      setProfile(result);
    } finally {
      setAnalyzing(false);
    }
  };

  // 导出为JSON
  const exportJSON = () => {
    setLoading(true);
    setTimeout(() => {
      const dataStr = JSON.stringify(profile, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `${profile.name}_profile.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      setLoading(false);
    }, 500);
  };

  // 导出为CSV
  const exportCSV = () => {
    setLoading(true);
    setTimeout(() => {
      // 将对象转换为CSV格式
      const headers = ['字段', '值'];
      const rows = [
        ['ID', profile.id],
        ['姓名', profile.name],
        ['职业', profile.occupation],
        ['兴趣', profile.interests.join(', ')],
        ['投资偏好', profile.investmentPreferences.join(', ')],
        ['风险承受能力', profile.riskTolerance],
        ['关注点', profile.concerns.join(', ')],
        ['备注', profile.notes]
      ];
      
      let csvContent = headers.join(',') + '\n';
      rows.forEach(row => {
        // 处理CSV中的特殊字符
        const processedRow = row.map(cell => {
          if (typeof cell === 'string' && (cell.includes(',') || cell.includes('"') || cell.includes('\n'))) {
            return `"${cell.replace(/"/g, '""')}"`;
          }
          return cell;
        });
        csvContent += processedRow.join(',') + '\n';
      });
      
      const dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
      const exportFileDefaultName = `${profile.name}_profile.csv`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      setLoading(false);
    }, 500);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">用户画像生成</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="客户画像">
            {analyzing ? (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
                <p>正在分析对话内容，生成客户画像...</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary bg-opacity-10 dark:bg-primary dark:bg-opacity-20 rounded-full p-3 mr-4">
                    <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{profile.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{profile.occupation}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">兴趣</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.interests.map((interest, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">投资偏好</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.investmentPreferences.map((pref, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-primary bg-opacity-10 dark:bg-primary dark:bg-opacity-20 rounded-full text-sm text-primary"
                        >
                          {pref}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">风险承受能力</h4>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          profile.riskTolerance === 'low' 
                            ? 'w-1/3 bg-green-500' 
                            : profile.riskTolerance === 'medium' 
                              ? 'w-2/3 bg-yellow-500' 
                              : 'w-full bg-red-500'
                        }`}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm">
                      {profile.riskTolerance === 'low' 
                        ? '低' 
                        : profile.riskTolerance === 'medium' 
                          ? '中' 
                          : '高'}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">关注点 / 问题</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                    {profile.concerns.map((concern, index) => (
                      <li key={index}>{concern}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">备注</h4>
                  <p className="text-gray-600 dark:text-gray-400">{profile.notes}</p>
                </div>
              </div>
            )}
          </Card>
        </div>
        
        <div>
          <Card title="操作">
            <div className="space-y-4">
              <Button 
                variant="primary" 
                className="w-full"
                onClick={handleAnalyze}
                disabled={analyzing}
                icon={<DocumentTextIcon className="h-5 w-5" />}
              >
                {analyzing ? '分析中...' : '分析对话内容'}
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={exportJSON}
                disabled={analyzing || loading}
                icon={<ArrowDownTrayIcon className="h-5 w-5" />}
              >
                导出为JSON
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={exportCSV}
                disabled={analyzing || loading}
                icon={<DocumentArrowDownIcon className="h-5 w-5" />}
              >
                导出为CSV
              </Button>
            </div>
          </Card>
          
          <Card title="分析来源" className="mt-6">
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                此画像基于以下对话生成：
              </p>
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="font-medium">{mockTranscript.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  日期: {mockTranscript.date}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  时长: {Math.floor(mockTranscript.duration / 60)}:{(mockTranscript.duration % 60).toString().padStart(2, '0')}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="w-full"
                onClick={() => window.location.href = '/transcription'}
              >
                查看完整对话
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
