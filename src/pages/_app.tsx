// pages/_app.tsx
import '@/styles/globals.css'
import { useEffect } from 'react'
import constants from '../../const/config'
import type { AppProps } from 'next/app'
import toast, { Toaster } from 'react-hot-toast';
import { UserProvider } from '../../utils/userContext';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.body.style.fontFamily = constants.fontStyle
  }, [])
  
  return (
    <UserProvider>
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </UserProvider>
  );
}
