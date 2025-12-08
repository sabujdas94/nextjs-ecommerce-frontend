import React from 'react';

interface PageContentLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable content layout component that provides consistent
 * white background container styling across pages
 */
export default function PageContentLayout({ children, className = '' }: PageContentLayoutProps) {
  return (
    <div className="bg-white">
      <div className={`container mx-auto px-4 ${className}`}>
        <div className="p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
