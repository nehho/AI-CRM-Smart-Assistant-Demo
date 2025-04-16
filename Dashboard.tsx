import React from 'react';
import Card from '../layout/Card';
import Button from '../layout/Button';
import { MicrophoneIcon, DocumentTextIcon, UserCircleIcon, ClipboardDocumentListIcon, UsersIcon } from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">智能客户管理助手</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="语音上传与录制" className="hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-col items-center text-center">
            <MicrophoneIcon className="h-16 w-16 text-primary mb-4" />
            <p className="mb-4">上传客户对话录音或开始实时录制，自动转录并分析对话内容。</p>
            <Button 
              variant="primary" 
              onClick={() => window.location.href = '/voice'}
            >
              开始录制
            </Button>
          </div>
        </Card>
        
        <Card title="转录内容审阅" className="hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-col items-center text-center">
            <DocumentTextIcon className="h-16 w-16 text-primary mb-4" />
            <p className="mb-4">查看对话转录内容，区分客户与客户经理发言，编辑和修正内容。</p>
            <Button 
              variant="primary" 
              onClick={() => window.location.href = '/transcription'}
            >
              查看转录
            </Button>
          </div>
        </Card>
        
        <Card title="用户画像生成" className="hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-col items-center text-center">
            <UserCircleIcon className="h-16 w-16 text-primary mb-4" />
            <p className="mb-4">基于对话内容自动生成客户画像，提取关键信息和偏好。</p>
            <Button 
              variant="primary" 
              onClick={() => window.location.href = '/profile'}
            >
              生成画像
            </Button>
          </div>
        </Card>
        
        <Card title="动态问卷生成器" className="hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-col items-center text-center">
            <ClipboardDocumentListIcon className="h-16 w-16 text-primary mb-4" />
            <p className="mb-4">根据现有客户资料生成智能问卷，自动跳过已知信息，突出需要更新的字段。</p>
            <Button 
              variant="primary" 
              onClick={() => window.location.href = '/questionnaire'}
            >
              创建问卷
            </Button>
          </div>
        </Card>
        
        <Card title="客户管理" className="hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-col items-center text-center">
            <UsersIcon className="h-16 w-16 text-primary mb-4" />
            <p className="mb-4">查看和管理所有客户信息，搜索和筛选客户，导出数据。</p>
            <Button 
              variant="primary" 
              onClick={() => window.location.href = '/clients'}
            >
              管理客户
            </Button>
          </div>
        </Card>
        
        <Card title="使用指南" className="hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center mb-4">
              <span className="text-white text-2xl font-bold">?</span>
            </div>
            <p className="mb-4">了解如何使用AI CRM智能助手，快速上手各项功能。</p>
            <Button 
              variant="outline"
            >
              查看指南
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
