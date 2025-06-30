import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'full' | 'compact';
}

export function PageContainer({ 
  children, 
  className = '', 
  variant = 'default' 
}: PageContainerProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'full':
        return 'min-h-screen';
      case 'compact':
        return 'py-8';
      default:
        return 'min-h-screen py-16';
    }
  };

  return (
    <div className={`${getVariantStyles()} px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}