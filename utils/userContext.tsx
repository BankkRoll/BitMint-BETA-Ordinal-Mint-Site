// utils/userContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface UserContextData {
  isConnected: boolean;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  ordinalsAddress: string;
  setOrdinalsAddress: React.Dispatch<React.SetStateAction<string>>;
  walletType: "Unisat" | "Xverse" | "Hiro" | "";
  setWalletType: React.Dispatch<React.SetStateAction<"Unisat" | "Xverse" | "Hiro" | "">>;
  signOut: () => void;
}

const defaultContextData: UserContextData = {
  isConnected: false,
  setIsConnected: () => {},
  ordinalsAddress: '',
  setOrdinalsAddress: () => {},
  walletType: '',
  setWalletType: () => {},
  signOut: () => {},
};


const UserContext = createContext<UserContextData>(defaultContextData);

export const useUserContext = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [ordinalsAddress, setOrdinalsAddress] = useState<string>('');
  const [walletType, setWalletType] = useState<"Unisat" | "Xverse" | "Hiro" | "">('');

  const signOut = () => {
    setIsConnected(false);
    setOrdinalsAddress('');
    Cookies.remove('connectedInfo');
  };


  return (
    <UserContext.Provider
      value={{
        isConnected,
        setIsConnected,
        ordinalsAddress,
        setOrdinalsAddress,
        walletType,
        setWalletType,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
