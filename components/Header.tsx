// import { useState } from "react";

// interface HeaderProps {
//   toggleSidebar: () => void;
// }

// const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <header className="bg-[#004f9b] text-white p-2 flex justify-between items-center h-16 w-full">
//       {/* Left Section */}
//       <div className="flex items-center space-x-3 min-w-[220px]">
//         {/* Triple Dash Icon - Visible only on mobile */}
//         <button
//   className="block flex-shrink-0" 
//   onClick={() => {
//     toggleSidebar();
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   }}
// >
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="h-6 w-6 text-white"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//     strokeWidth={2}
//   >
//     <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//   </svg>
// </button>

//         {/* Logo */}
//         <img src="/logo.png" alt="Logo" width="30" height="30" className="rounded-full" />

//         {/* Title */}
//         <h1 className="text-lg font-bold whitespace-nowrap">Inventory</h1>
//       </div>

//       {/* Right Section (User Info) */}
//       <div className="flex items-center space-x-3 w-[200px] md:w-auto">
//         <div className="h-8 w-px bg-white"></div>
//         <img src="/avatar.png" alt="Avatar" width="30" height="30" className="rounded-full" />
//         <div className="hidden md:flex flex-col">
//           <span className="text-sm font-bold">User </span>
//           <span className="text-xs">someone@domain.com</span>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;



// components/Header.tsx
import React from 'react';
import Image from 'next/image';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-[#004f9b] text-white p-2 flex justify-between items-center h-16 w-full">
      <div className="flex items-center space-x-3">
        <button className="block" onClick={toggleSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Image src="/logo.png" alt="Logo" width={30} height={30} className="rounded-full" />
        <h1 className="text-lg font-bold whitespace-nowrap">Inventory Management</h1>
      </div>
      <div className="flex items-center space-x-3 overflow-hidden truncate w-[200px] md:w-auto">
        <div className="h-8 w-px bg-white"></div>
        <Image src="/avatar.png" alt="Avatar" width={30} height={30} className="rounded-full" />
        <div className="hidden md:flex flex-col truncate">
          <span className="text-sm font-bold truncate">Admin </span>
          <span className="text-xs truncate">someone@domain.com</span>
        </div>
      </div>
    </header>
  );
};

export default Header;