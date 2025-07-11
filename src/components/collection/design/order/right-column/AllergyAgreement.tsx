import { Label } from '@/components/ui/label';

interface AllergyAgreementProps {
  allergyAgreement: boolean;
  onAllergyAgreementChange: (checked: boolean) => void;
}

export default function AllergyAgreement({
  allergyAgreement,
  onAllergyAgreementChange
}: AllergyAgreementProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">Allergy Disclaimer <span className="text-red-500">*</span></h3>
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <p className="text-sm text-yellow-800 mb-3">
          <strong>Important:</strong> Cozy Cakey is not responsible for any allergic reactions. 
          Our kitchen processes common allergens including wheat, eggs, dairy, nuts, and soy. 
          Please inform us of any allergies, but consume at your own risk.
        </p>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="allergyAgreement"
            checked={allergyAgreement}
            onChange={(e) => onAllergyAgreementChange(e.target.checked)}
            className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
            required
          />
          <Label htmlFor="allergyAgreement" className="cursor-pointer text-sm">
            I understand and agree to this disclaimer
          </Label>
        </div>
      </div>
    </div>
  );
}