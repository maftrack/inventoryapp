import React from 'react';
import Link from 'next/link';
import { FaList, FaCogs, FaShoppingCart, FaClipboardList, FaFolderOpen } from 'react-icons/fa';
// @ts-ignore
const Sidebar = ({ isOpen }) => {
    return (
      <aside className={`bg-white text-gray-800 shadow-md transition-all duration-200 ${isOpen ? 'w-64' : 'w-0'}`}>
        <div className={`h-screen overflow-y-auto p-4 ${isOpen ? 'block' : 'hidden'}`}>
          <h2 className="text-lg font-semibold mb-4">Menu</h2>
        {/* Master Group */}
        <div className="mb-4">
          <h3 className="text-sm font-bold text-gray-600 mb-2">Master</h3>
          <ul className="space-y-2">
            <li><Link href="/services-category-form" className="flex items-center p-2 hover:bg-gray-100 rounded"><FaFolderOpen className="mr-2" /> Category</Link></li>
            <li><Link href="/credit-rule-manager" className="flex items-center p-2 hover:bg-gray-100 rounded"><FaCogs className="mr-2" /> Credit Rule</Link></li>
            <li><Link href="/servicename-management-form" className="flex items-center p-2 hover:bg-gray-100 rounded"><FaList className="mr-2" /> Service List Name</Link></li>
            <li><Link href="/customers" className="flex items-center p-2 hover:bg-gray-100 rounded"><FaList className="mr-2" /> Customers Manager</Link></li>

          </ul>
        </div>
        
        {/* Catalogue Group */}
        <div className="mb-4">
          <h3 className="text-sm font-bold text-gray-600 mb-2">Catalogue</h3>
          <ul className="space-y-2">
            <li><Link href="/pricing-catalogue-form" className="flex items-center p-2 hover:bg-gray-100 rounded"><FaClipboardList className="mr-2" /> Service Catalogue</Link></li>
          </ul>
        </div>

        {/* Management Group */}
        <div>
          <h3 className="text-sm font-bold text-gray-600 mb-2">Management</h3>
          <ul className="space-y-2">
            <li><Link href="/manage-service-form" className="flex items-center p-2 hover:bg-gray-100 rounded"><FaCogs className="mr-2" /> Manage Service</Link></li>
            <li><Link href="/manage-purchase-form" className="flex items-center p-2 hover:bg-gray-100 rounded"><FaShoppingCart className="mr-2" /> Manage Purchase</Link></li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
