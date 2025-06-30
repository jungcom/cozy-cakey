interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({ 
  message = 'Loading...', 
  size = 'md',
  className = '' 
}: LoadingSpinnerProps) {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-32';
      case 'lg':
        return 'h-96';
      default:
        return 'h-64';
    }
  };

  return (
    <div className={`max-w-4xl mx-auto py-12 px-4 ${className}`}>
      <div className={`flex items-center justify-center ${getSizeClasses()}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-900 mx-auto mb-4"></div>
          <div className="text-lg text-amber-800">{message}</div>
        </div>
      </div>
    </div>
  );
}