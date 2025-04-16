import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { Bars3Icon } from '@heroicons/react/24/outline';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-3 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 lg:hidden"
            aria-label="打开侧边栏"
          >
            <Bars3Icon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
          <Link to="/" className="flex items-center">
            <span className="text-primary text-xl font-bold">AI CRM</span>
            <span className="ml-1 text-sm bg-primary text-white px-2 py-0.5 rounded-md">Smart Assistant</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
