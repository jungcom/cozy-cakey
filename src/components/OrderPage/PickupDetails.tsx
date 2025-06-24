'use client';

import { Calendar, User, Mail, Phone } from 'lucide-react';

interface PickupDetailsProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  name: string;
  onNameChange: (name: string) => void;
  email: string;
  onEmailChange: (email: string) => void;
  phone: string;
  onPhoneChange: (phone: string) => void;
}

export function PickupDetails({
  selectedDate,
  onDateChange,
  name,
  onNameChange,
  email,
  onEmailChange,
  phone,
  onPhoneChange,
}: PickupDetailsProps) {
  const today = new Date().toISOString().split('T')[0];
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 3); // 3 days from now
  const minDateString = minDate.toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-tertiary flex items-center mb-6">
        <Calendar className="mr-2" />
        Pickup Details
      </h2>

      <div className="space-y-6">
        <div>
          <label htmlFor="pickup-date" className="block text-gray-700 mb-2 font-medium">
            Pickup Date
          </label>
          <div className="relative">
            <input
              type="date"
              id="pickup-date"
              value={selectedDate}
              min={minDateString}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-tertiary focus:border-transparent"
              required
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Please allow at least 3 days notice for cake orders.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Your Information</h3>
          
          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="name" className="sr-only">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => onNameChange(e.target.value)}
                  placeholder="Full Name"
                  className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-tertiary focus:border-transparent"
                  required
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => onEmailChange(e.target.value)}
                  placeholder="Email Address"
                  className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-tertiary focus:border-transparent"
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="phone" className="sr-only">Phone Number</label>
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => onPhoneChange(e.target.value)}
                  placeholder="Phone Number"
                  className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-tertiary focus:border-transparent"
                  required
                />
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
