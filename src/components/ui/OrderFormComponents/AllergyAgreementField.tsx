import { Label } from '@/components/ui/label';
import { BUSINESS_CONFIG } from '@/config/business';

interface AllergyAgreementFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  className?: string;
}

export default function AllergyAgreementField({
  checked,
  onChange,
  error,
  className = ''
}: AllergyAgreementFieldProps) {
  const { allergyDisclaimer } = BUSINESS_CONFIG.legal;

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {allergyDisclaimer.title} <span className="text-red-500">*</span>
        </h3>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <p className="text-sm text-yellow-800 mb-3">
            <strong>Important:</strong> {allergyDisclaimer.message}
          </p>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="allergyAgreement"
              checked={checked}
              onChange={(e) => onChange(e.target.checked)}
              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
              required
            />
            <Label htmlFor="allergyAgreement" className="cursor-pointer text-sm">
              {allergyDisclaimer.agreementText}
            </Label>
          </div>
          
          {error && (
            <p className="text-sm text-red-600 mt-2">{error}</p>
          )}
        </div>
        
        {/* Additional Safety Information */}
        <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-md">
          <h4 className="font-medium text-gray-900 mb-2">Common Allergens We Work With:</h4>
          <div className="text-sm text-gray-700 grid grid-cols-2 gap-1">
            <span>• Wheat/Gluten</span>
            <span>• Eggs</span>
            <span>• Dairy/Milk</span>
            <span>• Tree Nuts</span>
            <span>• Peanuts</span>
            <span>• Soy</span>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Please inform us of any specific allergies when placing your order.
          </p>
        </div>
      </div>
    </div>
  );
}