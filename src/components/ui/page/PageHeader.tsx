interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

export function PageHeader({ 
  title, 
  subtitle, 
  description, 
  className = '' 
}: PageHeaderProps) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-amber-800 max-w-2xl mx-auto mb-4">
          {subtitle}
        </p>
      )}
      {description && (
        <p className="text-amber-700 max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}