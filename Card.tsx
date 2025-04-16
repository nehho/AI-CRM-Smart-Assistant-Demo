import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default Card;
