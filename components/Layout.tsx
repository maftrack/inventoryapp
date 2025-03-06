// import React, { useState } from 'react';
// import Image from 'next/image';
// import MobileSidebar from './MobileSidebar';

// const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="flex flex-col min-h-screen w-full">
//       {/* Header */}
//       <header className="bg-[#004f9b] text-white p-2 flex justify-between items-center h-16 w-full">
//         <div className="flex items-center space-x-3">
//           {/* Always Visible Button */}
         
//          <button className="block" onClick={toggleSidebar}>
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

//           <Image src="/logo.png" alt="Logo" width={30} height={30} className="rounded-full" />
//           <h1 className="text-lg font-bold whitespace-nowrap">Inventory Management</h1>
//         </div>
//         <div className="flex items-center space-x-3 overflow-hidden truncate w-[200px] md:w-auto">
//           <div className="h-8 w-px bg-white"></div>
//           <Image src="/avatar.png" alt="Avatar" width={30} height={30} className="rounded-full" />
//           <div className="hidden md:flex flex-col truncate">
//             <span className="text-sm font-bold truncate">User </span>
//             <span className="text-xs truncate">someone@domain.com</span>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="flex flex-1 w-full">
//         {/* Desktop Sidebar */}
//         <aside
//           className={`hidden md:block bg-white text-gray-800 transition-all duration-200 ease-in-out ${
//             isSidebarOpen ? 'w-64' : 'w-0'
//           }`}
//         >
//           <div className={`${isSidebarOpen ? 'block w-64' : 'hidden'} h-[calc(100vh-4rem)]`}>
//             <h2 className="text-lg font-bold mb-4 flex justify-between items-center p-4">
//               Menu
//               <button className="block" onClick={toggleSidebar}>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </h2>
//             <ul className="space-y-2 p-4">
//               <li><a href="#" className="block hover:bg-gray-100 p-2 rounded">Dashboard</a></li>
//               <li><a href="#" className="block hover:bg-gray-100 p-2 rounded">Inventory</a></li>
//               <li><a href="#" className="block hover:bg-gray-100 p-2 rounded">Orders</a></li>
//               <li><a href="#" className="block hover:bg-gray-100 p-2 rounded">Settings</a></li>
//             </ul>
//           </div>
//         </aside>

//         {/* Mobile Sidebar */}
//         <aside
//           className={`md:hidden fixed top-16 left-0 bg-white text-gray-800 w-64 h-[calc(100vh-4rem)] transform transition-transform duration-200 ease-in-out z-50 ${
//             isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//           }`}
//         >
//           <div className="p-4">
//             <h2 className="text-lg font-bold mb-4 flex justify-between items-center">
//               Menu
//               <button className="block" onClick={() => setIsSidebarOpen(false)}>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </h2>
//             <ul className="space-y-2">
//               <li><a href="#" className="block hover:bg-gray-100 p-2 rounded">Dashboard</a></li>
//               <li><a href="#" className="block hover:bg-gray-100 p-2 rounded">Inventory</a></li>
//               <li><a href="#" className="block hover:bg-gray-100 p-2 rounded">Orders</a></li>
//               <li><a href="#" className="block hover:bg-gray-100 p-2 rounded">Settings</a></li>
//             </ul>
//           </div>
//         </aside>

//         {/* Mobile Overlay */}
//         {isSidebarOpen && (
//           <div
//             className="md:hidden fixed inset-0 bg-black/30 z-40"
//             onClick={() => setIsSidebarOpen(false)}
//           ></div>
//         )}

//         {/* Main content */}
//         <main className="flex-1 p-6 bg-gray-100 transition-all duration-200 ease-in-out">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;



// import React, { useState } from 'react';
// import Header from './Header';
// import MobileSidebar from './MobileSidebar';
// import Sidebar from './Sidebar';

// const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="flex flex-col min-h-screen w-full">
//       {/* Header */}
//       <Header toggleSidebar={toggleSidebar} />

//       {/* Main Content */}
//       <div className="flex flex-1 w-full">
//         {/* Desktop Sidebar */}
//         <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

//         {/* Mobile Sidebar */}
//         <MobileSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

//         {/* Mobile Overlay */}
//         {isSidebarOpen && (
//           <div
//             className="md:hidden fixed inset-0 bg-black/30 z-40"
//             onClick={() => setIsSidebarOpen(false)}
//           ></div>
//         )}

//         {/* Main content */}
//         <main className="flex-1 w-full p-6 bg-gray-100 transition-all duration-200 ease-in-out">

//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;




import React, { useEffect, useState } from 'react';
import Sidebar_ from './Sidebar_';
import Footer_ from './Footer_';
// import Header from './Header';
// import MobileSidebar from './MobileSidebar';
// import Sidebar from './Sidebar';


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (isMobile) {
      const sidebar = document.getElementById('sidebar');
      if (sidebar) {
        if (isSidebarOpen) {
          sidebar.classList.add('active');
        } else {
          sidebar.classList.remove('active');
        }
      }
    } else {
      if (isSidebarOpen) {
        document.body.classList.remove('sidebar-icon-only');
      } else {
        document.body.classList.add('sidebar-icon-only');
      }
    }
  }, [isSidebarOpen, isMobile]);


  return (
    <>
  {/* Required meta tags */}
  <meta charSet="utf-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, shrink-to-fit=no"
  />
  <title></title>


  <link rel="shortcut icon" href="../../images/favicon.png" />
  <div className="container-scroller">
    {/* partial:../../partials/_navbar.html */}
    <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <a className="navbar-brand brand-logo mr-5" href="../../index.html">
        <svg width="138" height="39" viewBox="0 0 138 39" fill="none" xmlns="http://www.w3.org/2000/svg">
	<g id="logo-ia">
		<path id="logo-icon" d="M118.53 18.84C120.65 14.7 123.75 11.51 127.8 9.27C127.8 9.28 118.54 0.01 118.54 0C113.9 4.65 111.17 7.36 109.27 9.27C113.19 11.41 116.24 14.51 118.53 18.84Z" fill="#FFF200"></path>
		<g id="logo-type">
			<path id="Vector" d="M7.83 16.21H5.73V10.56L0 2.43H2.66L6.77 8.53L10.9 2.44H13.53L7.83 10.51V16.21Z" fill="white"></path>
			<path id="Vector_2" d="M18.55 14.76C16.51 14.76 13.79 13.57 13.79 9.28C13.79 5.36 16.38 3.8 18.42 3.8C20.28 3.8 23.13 5.02 23.13 9.45C23.13 13.82 19.99 14.76 18.55 14.76ZM18.41 2.02C17.37 2.02 11.66 2.48 11.66 9.43C11.66 15.97 17.38 16.57 18.47 16.58C19.62 16.59 25.26 15.92 25.26 9.26C25.27 2.94 20.19 2.02 18.41 2.02Z" fill="white"></path>
			<path id="Vector_3" d="M28.4 16.2H26.31V2.43H28.53V8.95L35.02 2.43H37.87L32.14 8.18L38.32 16.2L35.64 16.21L30.53 9.46L28.4 11.48V16.2Z" fill="white"></path>
			<path id="Vector_4" d="M43.29 14.75C41.3 14.75 38.56 13.68 38.56 9.28C38.56 5.07 41.31 3.81 43.24 3.81C45.67 3.81 47.84 5.61 47.84 9.19C47.84 13.82 44.9 14.75 43.29 14.75ZM43.3 1.99C41.31 2.06 36.36 3.08 36.36 9.17C36.36 15.89 41.72 16.57 43.36 16.56C45.2 16.55 50.02 15.26 50.04 9.22C50.07 1.99 43.22 1.99 43.3 1.99Z" fill="white"></path>
			<path id="Vector_5" d="M57.81 8.96L63.78 8.97L63.76 16.15H62.11L61.87 14.82C60.58 16.08 59.29 16.52 57.2 16.52C54.19 16.51 50.9 14.12 50.9 9.22C50.9 5.89 53.01 2.08 57.44 2.1C59.78 2.1 63.04 2.88 63.6 6.51L61.43 6.5C61.16 5.59 60.38 3.8 57.62 3.8C55.36 3.8 53.13 5.18 53.13 9.37C53.13 13.34 55.61 14.8 57.51 14.8C59.37 14.8 61.13 14.17 61.84 10.86H57.83L57.81 8.96Z" fill="white"></path>
			<path id="Vector_6" d="M67.99 10.61L69.87 4.43L70.27 5.54L72.15 10.61H67.99ZM71.27 2.46L68.44 2.47L64.04 16.21H66.3L67.47 12.4L72.86 12.39L74.38 16.18L76.69 16.16L71.27 2.46Z" fill="white"></path>
			<path id="Vector_7" d="M74.14 2.44H76.49C78.34 9.92 78.7 11.23 79.11 12.69C79.43 11.31 80.1 9.51 81.92 2.44H84.05C86.2 10.06 86.52 11.24 86.99 12.77C87.31 11.49 87.76 9.97 89.6 2.44H91.83L88.14 16.18L85.94 16.21C84.15 10.11 83.93 9.37 83.03 6.16C82.29 8.72 82.14 9.38 80.23 16.2H77.96L74.14 2.44Z" fill="white"></path>
			<path id="Vector_8" d="M93.7 10.67L95.82 4.57V4.54L97.96 10.67H93.7ZM97.2 2.41H94.49L89.62 16.18H91.79L93.04 12.5L98.52 12.51L99.85 16.18L102.13 16.17L97.2 2.41Z" fill="white"></path>
		</g>
		<g id="logo-tagline">
			<path id="Vector_9" d="M21.86 30.12H20.61V36.44H21.86V30.12Z" fill="white"></path>
			<path id="Vector_10" d="M44.42 30.13L46.11 35.05L47.84 30.13H49.15L46.75 36.44H45.43L43.03 30.13H44.42Z" fill="white"></path>
			<path id="Vector_11" d="M61.97 30.12H60.71V36.44H61.97V30.12Z" fill="white"></path>
			<path id="Vector_12" d="M21.88 27.98H20.61V29.28H21.88V27.98Z" fill="white"></path>
			<path id="Vector_13" d="M61.97 27.98H60.69V29.28H61.97V27.98Z" fill="white"></path>
			<path id="Vector_14" d="M53.61 32.4C53.61 31.54 53.34 31.15 52.22 31.15H50.06V30.12H52.24C53.19 30.12 54.82 30.31 54.82 32.03V35.44C54.82 36.18 54.5 36.42 53.86 36.42H51.66C50.43 36.42 49.48 36.09 49.48 34.34C49.48 32.68 50.64 32.4 51.58 32.4H53.61ZM53.62 35.06V33.39L51.85 33.4C51.19 33.4 50.66 33.4 50.66 34.34C50.66 35.03 50.79 35.4 51.8 35.4H53.33C53.55 35.39 53.62 35.23 53.62 35.06Z" fill="white"></path>
			<path id="Vector_15" d="M63.4 36.44V31.98C63.4 31.25 63.62 30.72 64.06 30.4C64.5 30.08 65.2 29.92 66.14 29.92C67.08 29.92 67.77 30.08 68.21 30.4C68.65 30.72 68.87 31.24 68.87 31.98V36.44H67.62V32.24C67.62 31.63 67.58 31.23 66.96 31.07C66.55 30.96 65.71 30.98 65.31 31.07C64.78 31.19 64.65 31.47 64.65 32.24V36.44H63.4Z" fill="white"></path>
			<path id="Vector_16" d="M56.14 28.63H57.4V30.12H59.57V31.18H57.4V34.11C57.4 34.38 57.42 34.6 57.44 34.77C57.49 35.13 57.65 35.28 57.94 35.34C58.08 35.37 58.28 35.39 58.5 35.39H59.38V36.43H58.52C58.04 36.43 57.65 36.39 57.34 36.32C56.74 36.17 56.38 35.85 56.24 35.24C56.17 34.95 56.14 34.58 56.14 34.14V28.63Z" fill="white"></path>
			<path id="Vector_17" d="M21.86 30.12H20.61V36.44H21.86V30.12Z" fill="white"></path>
			<path id="Vector_18" d="M21.88 27.98H20.61V29.28H21.88V27.98Z" fill="white"></path>
			<path id="Vector_19" d="M18.99 32.69H15.82V33.84H18.99V32.69Z" fill="white"></path>
			<path id="Vector_20" d="M127.27 31.67L126.02 36.47H124.72L122.89 30.13H124.15L125.38 35.12L126.69 30.13H127.92L129.16 35.14L130.47 30.13H131.64L129.77 36.47H128.48L127.27 31.67Z" fill="white"></path>
			<path id="Vector_21" d="M135.08 27.97V28.13H134.33V30.09H134.14V28.13H133.39V27.97H135.08Z" fill="white"></path>
			<path id="Vector_22" d="M136.56 30.09H136.3L135.58 28.13C135.58 28.22 135.58 30.09 135.58 30.09H135.41V27.97H135.7L136.42 29.97L137.14 27.97H137.44V30.09H137.27V28.13L136.56 30.09Z" fill="white"></path>
			<path id="Vector_23" d="M112.44 36.47V32.13C112.44 31.03 112.96 30.44 113.82 30.22C114.11 30.15 114.43 30.11 114.78 30.11C114.78 30.11 115.95 30.1 116.18 30.12C116.18 30.12 116.19 31.04 116.18 31.19C115.96 31.2 115.28 31.17 114.9 31.18C114.62 31.19 114.4 31.21 114.24 31.26C113.76 31.41 113.7 31.8 113.7 32.42V36.47H112.44V36.47Z" fill="white"></path>
			<path id="Vector_24" d="M108.14 36.47V32.13C108.14 31.03 108.66 30.44 109.52 30.22C109.81 30.15 110.13 30.11 110.48 30.11C110.48 30.11 111.65 30.1 111.88 30.12C111.88 30.12 111.89 31.04 111.88 31.19C111.66 31.2 110.98 31.17 110.59 31.18C110.31 31.19 110.09 31.21 109.93 31.26C109.45 31.41 109.39 31.8 109.39 32.42V36.47H108.14V36.47Z" fill="white"></path>
			<path id="Vector_25" d="M99.49 30.4C99.07 30.09 98.45 29.94 97.63 29.94C96.82 29.94 96.08 30.21 95.76 30.65C95.44 30.21 94.7 29.94 93.89 29.94C93.07 29.94 92.45 30.09 92.03 30.4C91.61 30.71 91.4 31.24 91.4 31.99V36.46H92.66V32.56C92.66 31.86 92.59 31.26 93.21 31.07C93.61 30.95 94.33 30.98 94.59 31.07C95.18 31.27 95.15 31.75 95.14 32.83V36.46H96.38V32.83C96.36 31.75 96.34 31.27 96.93 31.07C97.19 30.98 97.91 30.95 98.31 31.07C98.93 31.26 98.86 31.86 98.86 32.56V36.46H100.12V31.99C100.12 31.24 99.91 30.71 99.49 30.4Z" fill="white"></path>
			<path id="Vector_26" d="M23.3 36.44V31.98C23.3 31.25 23.52 30.72 23.96 30.4C24.41 30.08 25.1 29.92 26.04 29.92C26.98 29.92 27.67 30.08 28.11 30.4C28.55 30.72 28.77 31.24 28.77 31.98V36.44H27.52V32.24C27.52 31.63 27.48 31.23 26.86 31.07C26.45 30.96 25.61 30.98 25.21 31.07C24.69 31.19 24.55 31.47 24.55 32.24V36.44H23.3Z" fill="white"></path>
			<path id="Vector_27" d="M30.16 36.44V31.98C30.16 31.25 30.38 30.72 30.83 30.4C31.27 30.08 31.96 29.92 32.9 29.92C33.84 29.92 34.53 30.08 34.98 30.4C35.42 30.72 35.64 31.24 35.64 31.98V36.44H34.38V32.24C34.38 31.63 34.34 31.23 33.72 31.07C33.31 30.96 32.46 30.98 32.07 31.07C31.54 31.19 31.41 31.47 31.41 32.24V36.44H30.16Z" fill="white"></path>
			<path id="Vector_28" d="M80.18 28.63H81.44V30.12H83.61V31.18H81.44V34.11C81.44 34.38 81.45 34.6 81.48 34.77C81.53 35.13 81.69 35.28 81.98 35.34C82.12 35.37 82.32 35.39 82.54 35.39H83.42V36.43H82.55C82.07 36.43 81.68 36.39 81.38 36.32C80.78 36.17 80.42 35.85 80.28 35.24C80.21 34.95 80.18 34.58 80.18 34.14V28.63V28.63Z" fill="white"></path>
			<path id="Vector_29" d="M39.71 29.95C40.63 29.95 41.4 30.06 41.92 30.58C42.15 30.81 42.32 31.12 42.43 31.51C42.54 31.9 42.59 32.38 42.59 32.97V33.64C42.59 34.22 42.54 34.71 42.43 35.1C42.32 35.49 42.15 35.8 41.92 36.03C41.46 36.49 40.72 36.66 39.71 36.66C38.71 36.66 37.97 36.5 37.5 36.03C37.27 35.8 37.1 35.49 36.99 35.1C36.88 34.71 36.83 34.22 36.83 33.64V32.97C36.83 32.38 36.88 31.9 36.99 31.51C37.1 31.12 37.27 30.81 37.5 30.58C38.02 30.06 38.85 29.95 39.71 29.95ZM41.32 32.97C41.32 32.54 41.29 32.2 41.25 31.94C41.21 31.68 41.13 31.48 41.01 31.35C40.78 31.07 40.4 31.01 39.71 31.01C39.16 31.01 38.67 31.04 38.42 31.35C38.3 31.49 38.22 31.69 38.18 31.94C38.13 32.2 38.12 32.54 38.12 32.97V33.64C38.12 34.07 38.14 34.42 38.18 34.67C38.22 34.93 38.3 35.12 38.42 35.27C38.66 35.56 39.08 35.61 39.71 35.61C40.49 35.61 40.81 35.51 41.01 35.27C41.13 35.13 41.21 34.93 41.25 34.67C41.29 34.41 41.32 34.07 41.32 33.64V32.97Z" fill="white"></path>
			<path id="Vector_30" d="M87.39 29.93C88.3 29.93 89.08 30.04 89.6 30.56C89.83 30.79 90 31.1 90.11 31.49C90.22 31.87 90.27 32.36 90.27 32.95V33.62C90.27 34.21 90.22 34.7 90.11 35.08C90 35.47 89.83 35.78 89.6 36.01C89.14 36.47 88.4 36.64 87.39 36.64C86.39 36.64 85.65 36.48 85.18 36.01C84.95 35.78 84.78 35.47 84.67 35.08C84.56 34.7 84.51 34.21 84.51 33.62V32.95C84.51 32.36 84.56 31.87 84.67 31.49C84.78 31.1 84.95 30.79 85.18 30.56C85.7 30.04 86.52 29.93 87.39 29.93ZM89 32.95C89 32.52 88.97 32.18 88.93 31.92C88.88 31.66 88.81 31.47 88.69 31.33C88.46 31.05 88.08 30.99 87.4 30.99C86.85 30.99 86.36 31.02 86.1 31.33C85.98 31.47 85.91 31.67 85.86 31.92C85.82 32.18 85.8 32.52 85.8 32.95V33.62C85.8 34.05 85.82 34.4 85.86 34.65C85.91 34.91 85.98 35.1 86.1 35.25C86.34 35.54 86.76 35.59 87.4 35.59C88.18 35.59 88.5 35.49 88.69 35.25C88.81 35.11 88.89 34.91 88.93 34.65C88.97 34.39 89 34.05 89 33.62V32.95Z" fill="white"></path>
			<path id="Vector_31" d="M104.14 29.93C105.05 29.93 105.83 30.04 106.35 30.56C106.58 30.79 106.75 31.1 106.86 31.49C106.97 31.87 107.02 32.36 107.02 32.95V33.62C107.02 34.21 106.97 34.7 106.86 35.08C106.76 35.47 106.58 35.78 106.35 36.01C105.89 36.47 105.15 36.64 104.14 36.64C103.14 36.64 102.4 36.48 101.93 36.01C101.7 35.78 101.53 35.47 101.42 35.08C101.31 34.7 101.25 34.21 101.25 33.62V32.95C101.25 32.36 101.3 31.87 101.42 31.49C101.53 31.1 101.7 30.79 101.93 30.56C102.45 30.04 103.28 29.93 104.14 29.93ZM105.74 32.95C105.74 32.52 105.72 32.18 105.67 31.92C105.63 31.66 105.55 31.47 105.43 31.33C105.2 31.05 104.81 30.99 104.13 30.99C103.58 30.99 103.09 31.02 102.83 31.33C102.71 31.47 102.63 31.67 102.59 31.92C102.55 32.18 102.53 32.52 102.53 32.95V33.62C102.53 34.05 102.55 34.4 102.59 34.65C102.63 34.91 102.71 35.1 102.83 35.25C103.07 35.54 103.49 35.59 104.13 35.59C104.91 35.59 105.23 35.49 105.43 35.25C105.55 35.11 105.63 34.91 105.67 34.65C105.71 34.39 105.74 34.05 105.74 33.62V32.95Z" fill="white"></path>
			<path id="Vector_32" d="M119.57 29.93C120.48 29.93 121.26 30.04 121.78 30.56C122.01 30.79 122.18 31.1 122.28 31.49C122.39 31.87 122.44 32.36 122.44 32.95V33.62C122.44 34.21 122.39 34.7 122.28 35.08C122.17 35.47 122 35.78 121.78 36.01C121.32 36.47 120.58 36.64 119.57 36.64C118.57 36.64 117.83 36.48 117.36 36.01C117.13 35.78 116.96 35.47 116.85 35.08C116.74 34.7 116.69 34.21 116.69 33.62V32.95C116.69 32.36 116.74 31.87 116.85 31.49C116.96 31.1 117.13 30.79 117.36 30.56C117.88 30.04 118.7 29.93 119.57 29.93ZM121.17 32.95C121.17 32.52 121.15 32.18 121.11 31.92C121.06 31.66 120.99 31.47 120.87 31.33C120.63 31.05 120.25 30.99 119.57 30.99C119.02 30.99 118.53 31.02 118.27 31.33C118.16 31.47 118.07 31.67 118.03 31.92C117.99 32.18 117.97 32.52 117.97 32.95V33.62C117.97 34.05 117.99 34.4 118.03 34.65C118.07 34.91 118.16 35.1 118.27 35.25C118.51 35.54 118.93 35.59 119.57 35.59C120.35 35.59 120.67 35.49 120.87 35.25C120.98 35.11 121.06 34.91 121.11 34.65C121.15 34.39 121.17 34.05 121.17 33.62V32.95Z" fill="white"></path>
			<path id="Vector_33" d="M14.46 31.5C14.35 31.11 14.19 30.8 13.95 30.57C13.43 30.05 12.65 29.94 11.74 29.94C9.04 29.94 8.94 31.09 8.62 32.91C8.33 34.56 8.31 35.36 6.86 35.36H5.71C4.14 35.36 4.04 33.84 4.04 33.12C4.04 32.7 4.03 31.72 4.03 31.46C4.03 29.01 5.2 29.12 5.77 29.12H8.02V28H5.72C4.41 28 2.68 28.49 2.68 31.46V33.04C2.68 35.17 3.54 36.48 5.79 36.48H6.89C8.93 36.48 9.53 35.6 9.89 33.09C10.16 31.23 10.32 31 11.74 31C12.42 31 12.8 31.06 13.03 31.34C13.14 31.48 13.23 31.68 13.27 31.93C13.31 32.19 13.34 32.53 13.34 32.97V33.64C13.34 34.07 13.31 34.42 13.27 34.67C13.23 34.93 13.15 35.12 13.03 35.27C12.84 35.5 12.51 35.63 11.74 35.63C10.92 35.63 10.16 35.42 10.03 34.85C9.86 35.44 9.72 35.67 9.46 36.03C9.71 36.32 10.28 36.67 11.74 36.67C12.75 36.67 13.49 36.5 13.95 36.04C14.18 35.81 14.35 35.5 14.46 35.11C14.57 34.73 14.62 34.23 14.62 33.65V32.98C14.62 32.37 14.57 31.88 14.46 31.5Z" fill="white"></path>
			<path id="Vector_34" d="M75.58 31.61C75.4 30.78 74.9 30.35 74.3 30.14C73.52 29.85 72.13 29.86 71.4 30.14C70.65 30.43 70.28 30.93 70.11 31.69C69.98 32.32 69.96 33.79 70.13 34.5C70.3 35.24 70.67 35.76 71.39 36.03C72.12 36.3 73.25 36.28 73.83 36.09C74.09 36.01 74.29 35.88 74.45 35.73V35.84C74.45 36.5 74.35 36.95 74.08 37.2C73.82 37.45 73.39 37.55 72.82 37.55C71.63 37.55 71.5 37.54 70.91 37.53V38.6C71.05 38.6 72.06 38.62 72.32 38.62C73.58 38.62 73.83 38.56 74.13 38.47C74.85 38.25 75.3 37.86 75.53 37.13C75.64 36.78 75.7 36.35 75.7 35.84V32.76C75.69 32.33 75.65 31.96 75.58 31.61ZM74.38 34.36C74.3 34.77 74.06 35.01 73.67 35.1C73.25 35.2 72.42 35.21 72 35.09C71.56 34.97 71.37 34.65 71.32 34.17C71.26 33.67 71.26 32.5 71.32 32C71.37 31.49 71.56 31.19 71.99 31.08C72.41 30.97 73.29 30.97 73.72 31.08C74.28 31.23 74.35 31.7 74.38 32C74.45 32.46 74.47 33.91 74.38 34.36Z" fill="white"></path>
		</g>
	</g>
</svg>
        </a>
        <a className="navbar-brand brand-logo-mini" href="../../index.html">
          <img src="/logo/Yokogawa_mn.png" alt="logo" />
        </a>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <button
          className="navbar-toggler navbar-toggler align-self-center"
          type="button"
          data-toggle="minimize"
          onClick={toggleSidebar}
        >
          <span className="icon-menu" />
        </button>
        {/* <ul className="navbar-nav mr-lg-2">
          <li className="nav-item nav-search d-none d-lg-block">
            <div className="input-group">
              <div
                className="input-group-prepend hover-cursor"
                id="navbar-search-icon"
              >
                <span className="input-group-text" id="search">
                  <i className="icon-search" />
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                id="navbar-search-input"
                placeholder="Search now"
                aria-label="search"
                aria-describedby="search"
              />
            </div>
          </li>
        </ul> */}
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item dropdown">
            <a
              className="nav-link count-indicator dropdown-toggle"
              id="notificationDropdown"
              href="#"
              data-toggle="dropdown"
            >
              <i className="icon-bell mx-0" />
              <span className="count" />
            </a>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
              aria-labelledby="notificationDropdown"
            >
              <p className="mb-0 font-weight-normal float-left dropdown-header">
                Notifications
              </p>
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-success">
                    <i className="ti-info-alt mx-0" />
                  </div>
                </div>
                <div className="preview-item-content">
                  <h6 className="preview-subject font-weight-normal">
                    Application Error
                  </h6>
                  <p className="font-weight-light small-text mb-0 text-muted">
                    Just now
                  </p>
                </div>
              </a>
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-warning">
                    <i className="ti-settings mx-0" />
                  </div>
                </div>
                <div className="preview-item-content">
                  <h6 className="preview-subject font-weight-normal">
                    Settings
                  </h6>
                  <p className="font-weight-light small-text mb-0 text-muted">
                    Private message
                  </p>
                </div>
              </a>
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-info">
                    <i className="ti-user mx-0" />
                  </div>
                </div>
                <div className="preview-item-content">
                  <h6 className="preview-subject font-weight-normal">
                    New user registration
                  </h6>
                  <p className="font-weight-light small-text mb-0 text-muted">
                    2 days ago
                  </p>
                </div>
              </a>
            </div>
          </li>
          <li className="nav-item nav-profile dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              data-toggle="dropdown"
              id="profileDropdown"
            >
              <img src="../../images/faces/face28.jpg" alt="profile" />
            </a>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown"
              aria-labelledby="profileDropdown"
            >
              <a className="dropdown-item">
                <i className="ti-settings text-primary" />
                Settings
              </a>
              <a className="dropdown-item">
                <i className="ti-power-off text-primary" />
                Logout
              </a>
            </div>
          </li>
          <li className="nav-item nav-settings d-none d-lg-flex">
            <a className="nav-link" href="#">
              <i className="icon-ellipsis" />
            </a>
          </li>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas"
          onClick={toggleSidebar}
        >
          <span className="icon-menu" />
        </button>
      </div>
    </nav>
    {/* partial */}
    <div className="container-fluid page-body-wrapper">
      {/* partial:../../partials/_settings-panel.html */}
      {/* <div className="theme-setting-wrapper">
        <div id="settings-trigger">
          <i className="ti-settings" />
        </div>
        <div id="theme-settings" className="settings-panel">
          <i className="settings-close ti-close" />
          <p className="settings-heading">SIDEBAR SKINS</p>
          <div className="sidebar-bg-options selected" id="sidebar-light-theme">
            <div className="img-ss rounded-circle bg-light border mr-3" />
            Light
          </div>
          <div className="sidebar-bg-options" id="sidebar-dark-theme">
            <div className="img-ss rounded-circle bg-dark border mr-3" />
            Dark
          </div>
          <p className="settings-heading mt-2">HEADER SKINS</p>
          <div className="color-tiles mx-0 px-4">
            <div className="tiles success" />
            <div className="tiles warning" />
            <div className="tiles danger" />
            <div className="tiles info" />
            <div className="tiles dark" />
            <div className="tiles default" />
          </div>
        </div>
      </div> */}
      <div id="right-sidebar" className="settings-panel">
        <i className="settings-close ti-close" />
        <ul
          className="nav nav-tabs border-top"
          id="setting-panel"
          role="tablist"
        >
          <li className="nav-item">
            <a
              className="nav-link active"
              id="todo-tab"
              data-toggle="tab"
              href="#todo-section"
              role="tab"
              aria-controls="todo-section"
              aria-expanded="true"
            >
              TO DO LIST
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="chats-tab"
              data-toggle="tab"
              href="#chats-section"
              role="tab"
              aria-controls="chats-section"
            >
              CHATS
            </a>
          </li>
        </ul>
        <div className="tab-content" id="setting-content">
          <div
            className="tab-pane fade show active scroll-wrapper"
            id="todo-section"
            role="tabpanel"
            aria-labelledby="todo-section"
          >
            <div className="add-items d-flex px-3 mb-0">
              <form className="form w-100">
                <div className="form-group d-flex">
                  <input
                    type="text"
                    className="form-control todo-list-input"
                    placeholder="Add To-do"
                  />
                  <button
                    type="submit"
                    className="add btn btn-primary todo-list-add-btn"
                    id="add-task"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
            <div className="list-wrapper px-3">
              <ul className="d-flex flex-column-reverse todo-list">
                <li>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="checkbox" type="checkbox" />
                      Team review meeting at 3.00 PM
                    </label>
                  </div>
                  <i className="remove ti-close" />
                </li>
                <li>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="checkbox" type="checkbox" />
                      Prepare for presentation
                    </label>
                  </div>
                  <i className="remove ti-close" />
                </li>
                <li>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="checkbox" type="checkbox" />
                      Resolve all the low priority tickets due today
                    </label>
                  </div>
                  <i className="remove ti-close" />
                </li>
                <li className="completed">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        className="checkbox"
                        type="checkbox"
                        defaultChecked=""
                      />
                      Schedule meeting for next week
                    </label>
                  </div>
                  <i className="remove ti-close" />
                </li>
                <li className="completed">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        className="checkbox"
                        type="checkbox"
                        defaultChecked=""
                      />
                      Project review
                    </label>
                  </div>
                  <i className="remove ti-close" />
                </li>
              </ul>
            </div>
            <h4 className="px-3 text-muted mt-5 font-weight-light mb-0">
              Events
            </h4>
            <div className="events pt-4 px-3">
              <div className="wrapper d-flex mb-2">
                <i className="ti-control-record text-primary mr-2" />
                <span>Feb 11 2018</span>
              </div>
              <p className="mb-0 font-weight-thin text-gray">
                Creating component page build a js
              </p>
              <p className="text-gray mb-0">The total number of sessions</p>
            </div>
            <div className="events pt-4 px-3">
              <div className="wrapper d-flex mb-2">
                <i className="ti-control-record text-primary mr-2" />
                <span>Feb 7 2018</span>
              </div>
              <p className="mb-0 font-weight-thin text-gray">
                Meeting with Alisa
              </p>
              <p className="text-gray mb-0 ">Call Sarah Graves</p>
            </div>
          </div>
          {/* To do section tab ends */}
          <div
            className="tab-pane fade"
            id="chats-section"
            role="tabpanel"
            aria-labelledby="chats-section"
          >
            <div className="d-flex align-items-center justify-content-between border-bottom">
              <p className="settings-heading border-top-0 mb-3 pl-3 pt-0 border-bottom-0 pb-0">
                Friends
              </p>
              <small className="settings-heading border-top-0 mb-3 pt-0 border-bottom-0 pb-0 pr-3 font-weight-normal">
                See All
              </small>
            </div>
            <ul className="chat-list">
              <li className="list active">
                <div className="profile">
                  <img src="../../images/faces/face1.jpg" alt="image" />
                  <span className="online" />
                </div>
                <div className="info">
                  <p>Thomas Douglas</p>
                  <p>Available</p>
                </div>
                <small className="text-muted my-auto">19 min</small>
              </li>
              <li className="list">
                <div className="profile">
                  <img src="../../images/faces/face2.jpg" alt="image" />
                  <span className="offline" />
                </div>
                <div className="info">
                  <div className="wrapper d-flex">
                    <p>Catherine</p>
                  </div>
                  <p>Away</p>
                </div>
                <div className="badge badge-success badge-pill my-auto mx-2">
                  4
                </div>
                <small className="text-muted my-auto">23 min</small>
              </li>
              <li className="list">
                <div className="profile">
                  <img src="../../images/faces/face3.jpg" alt="image" />
                  <span className="online" />
                </div>
                <div className="info">
                  <p>Daniel Russell</p>
                  <p>Available</p>
                </div>
                <small className="text-muted my-auto">14 min</small>
              </li>
              <li className="list">
                <div className="profile">
                  <img src="../../images/faces/face4.jpg" alt="image" />
                  <span className="offline" />
                </div>
                <div className="info">
                  <p>James Richardson</p>
                  <p>Away</p>
                </div>
                <small className="text-muted my-auto">2 min</small>
              </li>
              <li className="list">
                <div className="profile">
                  <img src="../../images/faces/face5.jpg" alt="image" />
                  <span className="online" />
                </div>
                <div className="info">
                  <p>Madeline Kennedy</p>
                  <p>Available</p>
                </div>
                <small className="text-muted my-auto">5 min</small>
              </li>
              <li className="list">
                <div className="profile">
                  <img src="../../images/faces/face6.jpg" alt="image" />
                  <span className="online" />
                </div>
                <div className="info">
                  <p>Sarah Graves</p>
                  <p>Available</p>
                </div>
                <small className="text-muted my-auto">47 min</small>
              </li>
            </ul>
          </div>
          {/* chat tab ends */}
        </div>
      </div>
      {/* partial */}
      {/* partial:../../partials/_sidebar.html */}
    
    <Sidebar_></Sidebar_>

      {/* partial */}
      <div className="main-panel">
        <div className="content-wrapper">
          {/* <div className="row"> */}
            {/* <div className="col-md-12 grid-margin stretch-card"> */}
                {children}
            {/* </div> */}
       
          {/* </div> */}
        </div>
        {/* content-wrapper ends */}
        {/* partial:../../partials/_footer.html */}
       
 <Footer_></Footer_>

        {/* partial */}
      </div>
      {/* main-panel ends */}
    </div>
    {/* page-body-wrapper ends */}
  </div>
  {/* container-scroller */}
  {/* plugins:js */}
  {/* endinject */}
  {/* Plugin js for this page */}
  {/* End plugin js for this page */}
  {/* inject:js */}
  {/* endinject */}
  {/* Custom js for this page*/}
  {/* End custom js for this page*/}
</>

  );
};

export default Layout;