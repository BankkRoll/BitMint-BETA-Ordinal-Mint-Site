// components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import constants from '../../const/config';
import LoginModal from './LoginModal';
import LogoutModal from './LogoutModal';
import { useUserContext } from '../../utils/userContext';
import Cookies from 'js-cookie';

const Navbar = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const { isConnected, setIsConnected } = useUserContext();

    const openLoginModal = () => {
      setIsLoginModalOpen(true);
    };

    const closeLoginModal = () => {
      setIsLoginModalOpen(false);
    };

    const openLogoutModal = () => {
      setIsLogoutModalOpen(true);
    };

    const closeLogoutModal = () => {
      setIsLogoutModalOpen(false);
    };

    const checkConnection = () => {
      const connectedInfoStr = Cookies.get('connectedInfo');
      if (connectedInfoStr) {
        const connectedInfo = JSON.parse(connectedInfoStr);
        const currentTime = new Date().getTime();
        const hoursDiff = (currentTime - connectedInfo.connectTime) / (1000 * 60 * 60);
        if (hoursDiff <= 24) {
          setIsConnected(true);
        } else {
          Cookies.remove('connectedInfo');
          setIsConnected(false);
        }
      } else {
        setIsConnected(false);
      }
    }

    useEffect(() => {
      checkConnection();
      const checkConnectionInterval = setInterval(checkConnection, 60000); // Check every minute
      return () => {
        clearInterval(checkConnectionInterval);
      }
    }, []);

    return (
      <>
        <nav className="p-4 border-b-2 border-white">
            <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
            <LogoutModal isOpen={isLogoutModalOpen} onClose={closeLogoutModal} />
            <div className="mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <img src={constants.navbarImage} alt="logo" className="h-6 w-6 md:h-8 md:w-8 mr-2" />
                    <div className="text-white text-md md:text-2xl">
                        {constants.title}
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={isConnected ? openLogoutModal : openLoginModal}
                        className={`boxy-button px-4 py-2`}
                    >
                        {isConnected ? 'Profile' : 'Connect Wallet'}
                    </button>
                </div>
            </div>
        </nav>
        </>
    )
}

export default Navbar;


