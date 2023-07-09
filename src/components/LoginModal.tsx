// components/LoginModal.tsx
import React, { useEffect, useState } from 'react';
import 'animate.css';
import { getAddress } from "sats-connect";
import { AddressPurposes } from 'sats-connect';
import { toast } from 'react-hot-toast';
import { useUserContext } from '../../utils/userContext';
import Cookies from 'js-cookie';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AddressResponse {
  addresses: { address: string }[];
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { isConnected, setIsConnected, ordinalsAddress, setOrdinalsAddress, setWalletType } = useUserContext();
  const [isVisible, setIsVisible] = useState(isOpen);
  const [modalAnimation, setModalAnimation] = useState('animate__bounceInDown');

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setModalAnimation('animate__bounceInDown');
      checkWalletConnection();
    } else {
      setModalAnimation('animate__bounceOutUp');
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const checkWalletConnection = () => {
    const connectedInfoStr = Cookies.get('connectedInfo');
    if (connectedInfoStr) {
      const connectedInfo = JSON.parse(connectedInfoStr);
      const currentTime = new Date().getTime();
      const hoursDiff = (currentTime - connectedInfo.connectTime) / (1000 * 60 * 60);
      if (hoursDiff <= 24) {
        setOrdinalsAddress(connectedInfo.ordinalsAddress);
        setIsConnected(true);
        toast.success("Connected to wallet successfully!");
        onClose();
      } else {
        Cookies.remove('connectedInfo');
        setIsConnected(false);
        setOrdinalsAddress('');
      }
    }
  };

  const connectWallet = async (walletType: "Unisat" | "Xverse" | "Hiro") => {
    if (walletType === "Unisat") {
      connectUnisatWallet(walletType);
    } else if (walletType === "Hiro") {
      connectHiroWallet(walletType);
    } else if (walletType === "Xverse") {
      connectXverseWallet(walletType);
    }
  };

  const connectUnisatWallet = async (walletType: "Unisat") => {
    try {
      if (typeof window.unisat !== 'undefined') {
        let accounts = await window.unisat.requestAccounts();
        if (accounts && accounts[0]) {
          const connectedInfo = {
            ordinalsAddress: accounts[0],
            paymentAddress: accounts[0],
            connectTime: new Date().getTime(),
          };
          Cookies.set('connectedInfo', JSON.stringify(connectedInfo), { expires: 1 });
          setOrdinalsAddress(accounts[0]);
          setIsConnected(true);
          setWalletType(walletType); // set wallet type after successful connection
          toast.success("Connected to UniSat wallet successfully!");
          onClose();
        } else {
          toast.error("Failed to connect to UniSat wallet");
        }
      } else {
        toast.error("UniSat wallet is not installed");
      }
    } catch (e) {
      console.error(e);
      toast.error("An error occurred while trying to connect to UniSat wallet");
    }
  };

  const connectHiroWallet = async (walletType: "Hiro") => {
    // Call Hiro API here
    toast.error("Hiro Wallet Not Supported: Coming Soon!");
    // When implemented, add: setWalletType(walletType);
  };

  const connectXverseWallet = async (walletType: "Xverse") => {
    const getAddressOptions = {
      payload: {
        purposes: [AddressPurposes.ORDINALS, AddressPurposes.PAYMENT],
        message: `Address for receiving Ordinals using ${walletType}`,
        network: {
          type: "Mainnet" as const,
        },
      },
      onFinish: (response: AddressResponse) => {
        const connectedInfo = {
          ordinalsAddress: response.addresses[0].address,
          paymentAddress: response.addresses[1].address,
          connectTime: new Date().getTime(),
        };
        Cookies.set('connectedInfo', JSON.stringify(connectedInfo), { expires: 1 });
        setOrdinalsAddress(response.addresses[0].address);
        setIsConnected(true);
        setWalletType(walletType); // set wallet type after successful connection
        toast.success("Connected to Xverse wallet successfully!");
        onClose();
      },
      onCancel: () => toast.error("Request canceled"),
    };
    getAddress(getAddressOptions);
  };

  if (!isVisible) return null;

  return (
    <>
    <div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
      <div className={`animate__animated ${modalAnimation} bg-black border-2 border-white text-white p-5 m-4 shadow-lg relative`}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl hover:scale-110 transition-all duration-300"
        >
          X
        </button>
        <div className="space-y-2 m-6">
          <h2 className="text-center text-2xl sm:text-3xl mb-4">Connect to Wallet</h2>
          <div className="flex flex-col space-y-4 p-4 bg-black">
            <button
              onClick={() => connectWallet("Xverse")}
              className="w-full boxy-button2 py-4 px-8 shadow-md flex items-center justify-center space-x-2"
            >
              <p className="button-text flex py-4 px-8 items-center justify-center">
              <img src="https://pbs.twimg.com/profile_images/1658458671045570563/uvxAQs60_200x200.png" className='w-8 h-8 rounded-full mr-2'></img>
              Connect to Xverse Wallet
              </p>
            </button>
          </div>
          <div className="flex flex-col space-y-4 p-4 bg-black">
            <button
              onClick={() => connectWallet("Unisat")}
              className="w-full boxy-button2 py-4 px-8 shadow-md flex items-center justify-center space-x-2"
            >
              <p className="button-text flex py-4 px-8 items-center justify-center">
              <img src="https://pbs.twimg.com/profile_images/1635946239555674112/fA12aBLU_400x400.jpg" className='w-8 h-8 rounded-full mr-2'></img>
              Connect to Unisat Wallet
              </p>
            </button>
          </div>
          <div className="flex flex-col space-y-4 p-4 bg-black">
            <button
              onClick={() => connectWallet("Hiro")}
              className="w-full boxy-button2 py-4 px-8 shadow-md flex items-center justify-center space-x-2"
            >
              <p className="button-text flex py-4 px-8 items-center justify-center">
              <img src="https://pbs.twimg.com/profile_images/1626552151572119559/j80vxWry_400x400.jpg" className='w-8 h-8 rounded-full mr-2'></img>
              Connect to Hiro Wallet
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );

};

export default LoginModal;
