import Link from 'next/link';
import styles from './css/PricingCard.module.css';
import { FaBookmark, FaTag } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function PricingCard({ category, services, categoryId }) {
  const [credit, setCredit] = useState('0'); 
  const [fontSizeClass, setFontSizeClass] = useState('');
  // Create an array of services with placeholders
    const serviceList = [...services];

    // If there are more than 4 services, slice the array and add "And more..."
    const displayServices = serviceList.length > 4 ? 
        [...serviceList.slice(0, 4), { serviceName: 'And more...' }] : 
        serviceList;

    // Ensure there are always 4 items in the list
    while (displayServices.length < 4) {  
        displayServices.push({ serviceName: 'No service available' }); // Add placeholder service
    }
        //fetch category credit
  useEffect(() => {
    if (categoryId) {
        // Fetch the initial category credit using fetch
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/categorypricing/${categoryId}`)
            .then(response => response.json())
            .then(data => {
              setCredit(data.credit || 0);
            })
            .catch(error => {
                console.error('Error fetching category credit:', error);
            });
    }
    if (credit.toString().length > 5) {
      setFontSizeClass(styles.smallFontSize);
    } else {
      setFontSizeClass('');
    }
}, [categoryId, styles]);
    return (
        <section className={styles.cardSection} id="card-section">
            <div className={styles.card}>
                < div className={`${styles.cardPart} ${styles.cardTop}`}>
                    <FaBookmark className={styles.cardIcon} />
                    <h2 className={styles.cardTitle}>{category || 'No Category'}</h2>
                    <Link href={`/pricing-catalogue-form/pricing-detail?categoryId=${categoryId}`} passHref>
                        <button className={styles.btnDetail}>Manage</button> {/* Use Link for navigation */}
                    </Link>
                </div>
                <div className={`${styles.cardPart} ${styles.cardCenter}`}>
    <span className={styles.sign}><FaTag size={24} /></span> {/* Replacing $ with price tag icon */}
    {credit !== 0 ? (
      <>
         <span className={`${styles.price} ${fontSizeClass}`}>{credit}</span>
        <span className={styles.time}> Credit</span>
      </>
    ) : (
      <span>Not Configured</span>
    )}
  </div>
                 <div className={`${styles.cardPart} ${styles.cardBottom}`}>
                    <ul className={styles.listOptions}>
                        {displayServices.map((service, index) => (
                            <li key={index} style={{ color: service.serviceName === 'No service available' ? '#7a7b7d' : '#7a7b7d', textAlign: 'left' }}>
                                {index + 1}. {service.serviceName}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}