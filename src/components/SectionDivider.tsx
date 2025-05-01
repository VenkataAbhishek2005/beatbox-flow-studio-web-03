
import React from "react";

interface SectionDividerProps {
  className?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ className = "" }) => {
  return (
    <div className={`flex justify-center my-16 ${className}`}>
      <div className="w-16 h-1 bg-studio-blue rounded mx-1"></div>
      <div className="w-4 h-1 bg-studio-blue rounded mx-1"></div>
      <div className="w-2 h-1 bg-studio-blue rounded mx-1"></div>
    </div>
  );
};

export default SectionDivider;
