# Fix Admin Order Page Timezone Issues

## Problem
The admin order page is displaying pickup/delivery dates in the user's local timezone instead of the business timezone (America/New_York), causing confusion for admin users.

## Plan

### 1. Create timezone utility functions
- [ ] Create `/src/utils/timezone.ts` with functions to:
  - Convert dates to business timezone for display
  - Format dates consistently across admin pages
  - Handle edge cases for invalid dates

### 2. Fix orders list page (`/src/app/admin/orders/page.tsx`)
- [ ] Update line 157: Replace `toLocaleDateString()` with business timezone formatting
- [ ] Update status calculation logic (lines 56-64) to use business timezone
- [ ] Ensure consistent date formatting throughout the component

### 3. Fix order detail page (`/src/app/admin/orders/[id]/page.tsx`)
- [ ] Update line 203: Replace `toLocaleDateString()` with business timezone formatting
- [ ] Ensure all date displays use business timezone

### 4. Test the changes
- [ ] Verify dates display correctly in America/New_York timezone
- [ ] Test with orders from different timezones
- [ ] Confirm status calculations work correctly

## Implementation Notes
- Use existing `date-fns` library with timezone utilities
- Reference business timezone from `/src/config/business.ts`
- Keep changes minimal and focused on timezone display only
- Maintain existing functionality while fixing timezone issues