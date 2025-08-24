import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 40, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Family-focused logo icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Dad Building Legacy logo - Father protecting family"
      >
        {/* Protective father figure */}
        <circle 
          cx="24" 
          cy="16" 
          r="6" 
          fill="currentColor" 
          className="text-primary"
          opacity="0.9"
        />
        <path 
          d="M14 22c0-2 2-4 6-4h8c4 0 6 2 6 4v8c0 2-2 4-6 4h-8c-4 0-6-2-6-4v-8z"
          fill="currentColor"
          className="text-primary"
          opacity="0.8"
        />
        
        {/* Family members being protected */}
        <circle 
          cx="18" 
          cy="32" 
          r="3" 
          fill="currentColor" 
          className="text-secondary"
          opacity="0.7"
        />
        <circle 
          cx="30" 
          cy="32" 
          r="3" 
          fill="currentColor" 
          className="text-secondary"
          opacity="0.7"
        />
        <circle 
          cx="24" 
          cy="38" 
          r="2.5" 
          fill="currentColor" 
          className="text-accent"
          opacity="0.6"
        />
        
        {/* Protective arms/embrace */}
        <path 
          d="M12 28c0 0 3-2 6-2s6 2 6 2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-primary"
          opacity="0.4"
          fill="none"
        />
        <path 
          d="M24 28c0 0 3-2 6-2s6 2 6 2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-primary"
          opacity="0.4"
          fill="none"
        />
        
        {/* Heart symbol for love */}
        <path 
          d="M20 8c0-2 2-3 4-3s4 1 4 3c0 2-4 6-4 6s-4-4-4-6z"
          fill="currentColor"
          className="text-accent"
          opacity="0.5"
        />
      </svg>
      
      {/* Text logo */}
      <div className="flex flex-col">
        <span className="text-lg font-bold text-primary leading-tight">
          Dad Building Legacy
        </span>
        <span className="text-xs text-muted-foreground leading-tight">
          Protecting • Providing • Prospering
        </span>
      </div>
    </div>
  );
}

export function LogoIcon({ size = 32, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="DBL logo icon"
    >
      {/* Protective father figure */}
      <circle 
        cx="24" 
        cy="16" 
        r="6" 
        fill="currentColor" 
        className="text-primary"
        opacity="0.9"
      />
      <path 
        d="M14 22c0-2 2-4 6-4h8c4 0 6 2 6 4v8c0 2-2 4-6 4h-8c-4 0-6-2-6-4v-8z"
        fill="currentColor"
        className="text-primary"
        opacity="0.8"
      />
      
      {/* Family members */}
      <circle 
        cx="18" 
        cy="32" 
        r="3" 
        fill="currentColor" 
        className="text-secondary"
        opacity="0.7"
      />
      <circle 
        cx="30" 
        cy="32" 
        r="3" 
        fill="currentColor" 
        className="text-secondary"
        opacity="0.7"
      />
      <circle 
        cx="24" 
        cy="38" 
        r="2.5" 
        fill="currentColor" 
        className="text-accent"
        opacity="0.6"
      />
      
      {/* Heart for love */}
      <path 
        d="M20 8c0-2 2-3 4-3s4 1 4 3c0 2-4 6-4 6s-4-4-4-6z"
        fill="currentColor"
        className="text-accent"
        opacity="0.5"
      />
    </svg>
  );
}