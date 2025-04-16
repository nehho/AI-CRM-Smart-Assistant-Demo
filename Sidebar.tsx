import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  MicrophoneIcon, 
  DocumentTextIcon, 
  UserCircleIcon, 
  ClipboardDocumentListIcon, 
  UsersIcon 
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const location = useLocation();
  
  const navItems = [
    { name: '仪表盘', path: '/', icon: HomeIcon },
    { name: '语音录制', path: '/voice', icon: MicrophoneIcon },
    { name: '转录审阅', path: '/transcription', icon: DocumentTextIcon },
    { name: '用户画像', path: '/profile', icon: UserCircleIcon },
    { name: '智能问卷', path: '/questionnaire', icon: ClipboardDocumentListIcon },
    { name: '客户管理', path: '/clients', icon: UsersIcon },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* 移动端遮罩层 */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={closeSidebar}
        />
      )}
      
      {/* 侧边栏 */}
      <aside 
        className={`fixed top-0 left-0 z-30 h-full w-64 pt-16 bg-gray-100 dark:bg-gray-900 shadow-md transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'bg-primary text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      closeSidebar();
                    }
                  }}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
