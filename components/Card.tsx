// components/Card.tsx
import React from 'react';
import { Card } from 'antd';

interface CustomCardProps {
  title: string;
  children: React.ReactNode;
  maxWidth?: number;
  fullWidth?: boolean; // Add a prop to control full width
}

const CustomCard: React.FC<CustomCardProps> = ({ title, children, maxWidth = 1200, fullWidth = false }) => {
  return (
    <Card
      title={title}
      bordered={false}
      style={{
        width: '100%',
        maxWidth: fullWidth ? '100%' : maxWidth, // Use full width if `fullWidth` is true
        margin: '0 auto',
        transition: 'max-width 0.2s ease-in-out', // Smooth transition
      }}
    >
      {children}
    </Card>
  );
};

export default CustomCard;