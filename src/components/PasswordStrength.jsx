// src/components/PasswordStrength.jsx
import React from 'react';

export const PasswordStrength = ({ strength }) => {
  const getStrengthText = (strength) => {
    switch (strength) {
      case 0:
        return { text: 'Very Weak', color: 'bg-red-500' };
      case 1:
        return { text: 'Weak', color: 'bg-orange-500' };
      case 2:
        return { text: 'Fair', color: 'bg-yellow-500' };
      case 3:
        return { text: 'Good', color: 'bg-blue-500' };
      case 4:
        return { text: 'Strong', color: 'bg-green-500' };
      case 5:
        return { text: 'Very Strong', color: 'bg-green-700' };
      default:
        return { text: 'Very Weak', color: 'bg-red-500' };
    }
  };

  const strengthInfo = getStrengthText(strength);

  return (
    <div className="w-full mt-1">
      <div className="flex h-1 overflow-hidden bg-gray-200 rounded">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`flex-1 ${
              index < strength ? strengthInfo.color : 'bg-gray-200'
            } ${index > 0 ? 'ml-0.5' : ''}`}
          />
        ))}
      </div>
      <p className={`text-xs mt-1 text-right ${
        strength >= 3 ? 'text-green-600' : 'text-red-600'
      }`}>
        {strengthInfo.text}
      </p>
    </div>
  );
};

export const calculatePasswordStrength = (password) => {
  if (!password) return 0;

  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  return strength;
};
