import React from 'react';
import Button from '../ui/Button';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-xl font-bold text-[#111827]">{title}</h2>
        <p className="text-[#1F2937] mt-2">{message}</p>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose} className="bg-gray-300 text-black mr-2">Cancel</Button>
          <Button onClick={onConfirm} className="bg-[#EF4444] text-white">Confirm</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;