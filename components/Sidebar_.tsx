import { useSidebar } from '@/components/SidebarContext';
import Link from 'next/link';

export default function Sidebar_() {
    const { openSections, toggleSection } = useSidebar();

    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link" href="/dashboard">
                        <i className="icon-grid menu-icon" />
                        <span className="menu-title">Dashboard</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        onClick={(e) => {
                            e.preventDefault(); // Prevent default anchor behavior
                            toggleSection('master'); // Toggle master menu
                        }}
                        aria-expanded={openSections.master}
                    >
                        <i className="icon-layout menu-icon" />
                        <span className="menu-title">Master</span>
                        <i className="menu-arrow" />
                    </a>
                    <div className={`collapse ${openSections.master ? 'show' : ''}`} id="ui-basic">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item">
                                <Link href="/services-category-form" className="nav-link">
                                    Category
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/credit-rule-manager" className="nav-link">
                                    Credit Rule
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/servicename-management-form" className="nav-link">
                                    Service
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/customers" className="nav-link">
                                    Customers
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        onClick={(e) => {
                            e.preventDefault(); // Prevent default anchor behavior
                            toggleSection('catalogue'); // Toggle catalogue menu
                        }}
                        aria-expanded={openSections.catalogue}
                    >
                        <i className="icon-columns menu-icon" />
                        <span className="menu-title">Catalogue</span>
                        <i className="menu-arrow" />
                    </a>
                    <div className={`collapse ${openSections.catalogue ? 'show' : ''}`} id="form-elements">
                        <ul className="nav flex-column sub-menu">
                        <li className="nav-item">
                                <Link href="/pricing-category" className="nav-link">
                                    Pricing Category
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/pricing-catalogue-form" className="nav-link">
                                    Pricing Catalogue
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        onClick={(e) => {
                            e.preventDefault(); // Prevent default anchor behavior
                            toggleSection('management'); // Toggle management menu
                        }}
                        aria-expanded={openSections.management}
                    >
                        <i className="icon-bar-graph menu-icon" />
                        <span className="menu-title">Management</span>
                        <i className="menu-arrow" />
                    </a>
                    <div className={`collapse ${openSections.management ? 'show' : ''}`} id="charts">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item">
                                <Link href="/manage-service-form" className="nav-link">
                                    Manage Service
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/manage-purchase-form" className="nav-link">
                                    Manage Purchase
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/service-history" className="nav-link">
                                    Service Logs
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        onClick={(e) => {
                            e.preventDefault(); // Prevent default anchor behavior
                            toggleSection('settings'); // Toggle settings menu
                        }}
                        aria-expanded={openSections.settings}
                    >
                        <i className="ti-settings menu-icon" />
                        <span className="menu-title">Settings</span>
                        <i className="menu-arrow" />
                    </a>
                    <div className={`collapse ${openSections.settings ? 'show' : ''}`} id="settings">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item">
                                <Link href="/manage-purchase-form" className="nav-link">
                                    Config
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </nav>
    );
}