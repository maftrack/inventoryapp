import React, { useEffect } from 'react';
import Link from 'next/link';

interface MobileSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, toggleSidebar }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <aside
      className={`md:hidden fixed top-0 left-0 bg-white text-gray-800 w-64 h-full transform transition-transform duration-200 ease-in-out z-50 shadow-lg overflow-y-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-4 flex flex-col items-center">
        <h2 className="text-lg font-bold mb-4 flex justify-between items-center w-full">
          Menu
          <button onClick={toggleSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </h2>
        
        {/* Master Section */}
        <div className="mb-4 w-full">
          <h3 className="text-md font-semibold text-gray-600">Master</h3>
          <ul className="space-y-2 mt-2">
            <li><Link href="/category-creditsettings-form" className="block hover:bg-gray-100 p-2 rounded">Category</Link></li>
            <li><Link href="/credit-rule-manager" className="block hover:bg-gray-100 p-2 rounded">Credit Rule</Link></li>
            <li><Link href="/servicename-management-form" className="block hover:bg-gray-100 p-2 rounded">Service List Name</Link></li>
          </ul>
        </div>

        {/* Catalogue Section */}
        <div className="mb-4 w-full">
          <h3 className="text-md font-semibold text-gray-600">Catalogue</h3>
          <ul className="space-y-2 mt-2">
            <li><Link href="/pricing-catalogue-form" className="block hover:bg-gray-100 p-2 rounded">Service List Catalogue</Link></li>
          </ul>
        </div>

        {/* Management Section */}
        <div className="mb-4 w-full">
          <h3 className="text-md font-semibold text-gray-600">Management</h3>
          <ul className="space-y-2 mt-2">
            <li><Link href="/manage-service-form" className="block hover:bg-gray-100 p-2 rounded">Manage Service</Link></li>
            <li><Link href="/manage-purchase-form" className="block hover:bg-gray-100 p-2 rounded">Manage Purchase</Link></li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default MobileSidebar;
