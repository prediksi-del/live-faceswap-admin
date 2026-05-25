import React from 'react';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface SwapRequestPayload {
  sourceImage: string;
  targetImage: string;
  mode: 'face_swap' | 'body_changer';
  intensity: number;
}

// Menjamin kustomisasi komponen UI dasar aman dari error type
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}
