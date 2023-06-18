// components/LogoutModal.tsx
import React, { useState, useEffect } from 'react';
import 'animate.css';
import { toast } from 'react-hot-toast';
import { useUserContext } from '../../utils/userContext';
import Cookies from 'js-cookie';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}


const LogoutModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [modalAnimation, setModalAnimation] = useState('animate__bounceInDown');
  const [ordinalsAddress, setOrdinalsAddress] = useState("");
  const [paymentAddress, setPaymentAddress] = useState("");
  const [copyOrdinalsSuccessful, setCopyOrdinalsSuccessful] = useState(false);
  const [copyPaymentSuccessful, setCopyPaymentSuccessful] = useState(false);
  const { isConnected, signOut } = useUserContext();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setModalAnimation('animate__bounceInDown');
    } else {
      setModalAnimation('animate__bounceOutUp');
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleOrdinalsCopy = async () => {
    try {
      await navigator.clipboard.writeText(ordinalsAddress);
      const shortAddress = `${ordinalsAddress.slice(0, 8)}...${ordinalsAddress.slice(-8)}`;
      toast.success("Ordinals Address copied to clipboard! \n" + shortAddress);
      setCopyOrdinalsSuccessful(true);
    } catch (err) {
      toast.error("Failed to copy text: " + err);
    } finally {
      setTimeout(() => setCopyOrdinalsSuccessful(false), 5000);
    }
  };
  
  const handlePaymentCopy = async () => {
    try {
      await navigator.clipboard.writeText(paymentAddress);
      const shortAddress = `${paymentAddress.slice(0, 8)}...${paymentAddress.slice(-8)}`;
      toast.success("BTC Address copied to clipboard! \n" + shortAddress);
      setCopyPaymentSuccessful(true);
    } catch (err) {
      toast.error("Failed to copy text: " + err);
    } finally {
      setTimeout(() => setCopyPaymentSuccessful(false), 5000);
    }
  };
  


  const disconnectWallet = () => {
    Cookies.remove('connectedInfo');
    signOut();
    toast.success("Wallet disconnected");
    onClose();
  };

  useEffect(() => {
    const connectedInfoStr = Cookies.get('connectedInfo');
    if (connectedInfoStr) {
      const connectedInfo = JSON.parse(connectedInfoStr);
      const currentTime = new Date().getTime();
      const hoursDiff = (currentTime - connectedInfo.connectTime) / (1000 * 60 * 60);
      if (hoursDiff <= 24) {
        setOrdinalsAddress(connectedInfo.ordinalsAddress);
        setPaymentAddress(connectedInfo.paymentAddress);
      } else {
        disconnectWallet();
      }
    } else {
      onClose();
    }
  }, []);

  if (!isVisible) return null;

  return (
    <>
    <div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
      <div className={`animate__animated ${modalAnimation} bg-black border-2 border-white text-white p-5 m-4 shadow-lg relative`}>
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-white text-2xl hover:scale-125 transition-all duration-300"
        >
          X
        </button>
          <div className="space-y-6">
            <h2 className="text-center text-2xl sm:text-3xl mb-4">Connected to Wallet</h2>

            <div className="flex flex-col space-y-4 p-4 bg-black border-2 border-white">
            <h3 className="text-lg sm:text-xl text-white">Ordinals & BRC-20 Address</h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 sm:space-x-2">
                <p className="text-white break-all">{ordinalsAddress}</p>
                <button
                  onClick={handleOrdinalsCopy}
                  className=" text-white px-2 py-1 hover:scale-110 transition-all duration-300"
                >
                  {copyOrdinalsSuccessful ?
                    <img src="/images/checkmark.svg" className="w-8 h-8" alt="Copied" />
                    :
                    <img src="/images/copy.svg" className="w-8 h-8" alt="Copy" />
                  }
                </button>
              </div>
            </div>

            <div className="flex flex-col space-y-4 p-4 bg-black border-2 border-white">
              <h3 className="text-lg sm:text-xl text-white">BTC Address</h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 sm:space-x-2">
                <p className="text-white overflow-ellipsis overflow-hidden">{paymentAddress}</p>
                <button
                  onClick={handlePaymentCopy}
                  className="text-white px-2 py-1 hover:scale-110 transition-all duration-300"
                >
                  {copyPaymentSuccessful ?
                    <img src="/images/checkmark.svg" className="w-8 h-8" alt="Copied" />
                    :
                    <img src="/images/copy.svg" className="w-8 h-8" alt="Copy" />
                  }
                </button>
              </div>
            </div>

            <button
              onClick={disconnectWallet}
              className="w-full boxy-button py-2 shadow-md"
            >
              Disconnect Wallet
            </button>
          </div>
        </div>
    </div>
    </>
    );
};

export default LogoutModal;