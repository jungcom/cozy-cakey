import { ReactNode } from 'react';

interface FormSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
  required?: boolean;
  description?: string;
  variant?: 'default' | 'bordered' | 'highlighted';
}

export default function FormSection({
  title,
  children,
  className = '',
  required = false,
  description,
  variant = 'default'
}: FormSectionProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'bordered':
        return 'border border-gray-200 rounded-lg p-6';
      case 'highlighted':
        return 'bg-amber-50 border border-amber-200 rounded-lg p-6';
      default:
        return 'space-y-4';
    }
  };

  const getSectionClasses = () => {
    const baseClasses = 'space-y-4';
    const variantClasses = getVariantClasses();
    
    if (variant !== 'default') {
      return `${baseClasses} ${variantClasses}`;
    }
    
    return `${baseClasses} border-t pt-6`;
  };

  return (
    <div className={`${getSectionClasses()} ${className}`}>
      {title && (
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-800">
            {title} {required && <span className="text-red-500">*</span>}
          </h3>
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

// Specialized section components for common use cases
export function CakeCustomizationSection({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <FormSection
      title="Cake Customization"
      variant="bordered"
      className={className}
      required
    >
      {children}
    </FormSection>
  );
}

export function CustomerSection({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <FormSection
      title="Customer Information"
      className={className}
      required
    >
      {children}
    </FormSection>
  );
}

export function DeliverySection({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <FormSection
      title="Delivery Information"
      className={className}
      required
    >
      {children}
    </FormSection>
  );
}

export function PaymentSection({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <FormSection
      title="Payment Method"
      className={className}
      required
    >
      {children}
    </FormSection>
  );
}

export function LegalSection({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <FormSection
      title="Legal Agreement"
      variant="highlighted"
      className={className}
      required
    >
      {children}
    </FormSection>
  );
}