// components/Mint.tsx
import React, { useState, useEffect } from 'react';
import constants from '../../const/config';
import Navbar from './Navbar';
import { toast } from 'react-hot-toast';
import { useUserContext } from '../../utils/userContext';
import MintCard from './MintCard';
import { OrderProps, OrderStatus } from './PendingOrders';
import Cookies from 'js-cookie';

const Mint: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [inscribedQuantity, setInscribedQuantity] = useState<number>(0);
  const { ordinalsAddress, setOrdinalsAddress, isConnected, walletType } = useUserContext(); // <-- get walletType here
  const startDateString = `${constants.mintOptions.publicMintStart.toLocaleDateString()} ${constants.mintOptions.publicMintStart.toLocaleTimeString()}`;
  const mintDisabled = constants.mintOptions.publicMintStart > new Date();
  const [pendingOrders, setPendingOrders] = useState<OrderProps[]>([]);
  const [orderIds, setOrderIds] = useState<string[]>([]);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [invoice, setInvoice] = useState<string | null>(null);

  useEffect(() => {
    const updateAddress = () => {
        const connectedInfoStr = Cookies.get('connectedInfo');
        if (connectedInfoStr) {
            const connectedInfo = JSON.parse(connectedInfoStr);
            if (connectedInfo && connectedInfo.ordinalsAddress) {
                setOrdinalsAddress(connectedInfo.ordinalsAddress);
            }
        }
    }

    updateAddress();
    const intervalId = setInterval(updateAddress, 30000);

    return () => {
        clearInterval(intervalId);
    };
}, []);



const handleMint = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  event.preventDefault();

  if (!isConnected) { // <-- use isConnected directly
    toast.error('Please connect your wallet.');
    return;
  }

  if (!ordinalsAddress) {
    toast.error('Please make sure your Taproot address is valid.');
    return;
  }

  try {
    // Place an order with the local API endpoint
    const orderResponse = await fetch('/api/placeOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity,
        ordinalsAddress,
      }),
    });

    if (!orderResponse.ok) {
      const orderData = await orderResponse.json();
      throw new Error(orderData.message);
    }

    const orderData = await orderResponse.json();

    setOrderId(orderData.id);
    setInvoice(orderData.invoice);

    // Depending on the wallet type, perform the corresponding actions
    switch(walletType) { // <-- use walletType directly
      case 'Xverse':
        // Xverse wallet code here
        const getAddressOptions = {
          // ...
        };
        const response = await window.satsConnect.getAddress(getAddressOptions);
        // handle the response as needed
        break;

      case 'Unisat':
        // UniSat wallet code here
        const accounts = await window.unisat.requestAccounts();

        // Send Bitcoin transaction for minting operation.
        // Use the amount of satoshis returned from the API endpoint.
        const txid = await window.unisat.sendBitcoin(ordinalsAddress, orderData.satoshis);

        // handle the transaction ID as needed
        break;

      case 'Hiro':
        // Hiro wallet code here
        // Implement the connection logic for Hiro wallet when it's supported.
        break;

      default:
        throw new Error(`Unsupported wallet type: ${walletType}`);
    }

    // On success, show success toast
    toast.success('Minting successful!');
  } catch (error) {
    // On error, show error toast
    toast.error('Minting failed: ' + error);
  }
};


// New function to check order status
const checkOrderStatus = async () => {
  if (!orderId) return;

  const res = await fetch(`/api/checkOrderStatus?id=${orderId}`);
  const data: OrderStatus = await res.json();

  if (data.status === 'paid') {
    toast.success('Order paid!');
    setOrderId(null);
    setInvoice(null);
  } else if (data.status === 'error') {
    toast.error('Error processing payment: ' + data.error);
    setOrderId(null);
    setInvoice(null);
  }
};

useEffect(() => {
  const intervalId = setInterval(checkOrderStatus, 10000); // Check the order status every 10 seconds

  return () => {
    clearInterval(intervalId);
  };
}, [orderId]);

  return (
    <div className="border-2 border-white overflow-hidden m-4">
      <Navbar />
      <div className="flex flex-wrap items-center justify-around md:m-6 p-6 md:px-8 min-h-screen">
        <div className="flex flex-col items-center w-full justify-center my-4 md:my-0 md:w-2/5 lg:w-3/5">
          <img
            className="rounded-xl shadow-md object-cover w-full h-2/3 md:h-5/6 md:w-5/6"
            src={constants.collectionImage}
            alt={constants.title}
          />
        </div>
        <MintCard
          constants={constants}
          startDateString={startDateString}
          inscribedQuantity={inscribedQuantity}
          mintDisabled={mintDisabled}
          quantity={quantity}
          setQuantity={setQuantity}
          ordinalsAddress={ordinalsAddress}
          handleMint={handleMint}
          pendingOrders={pendingOrders}
        />
      </div>
    </div>
  );
};

export default Mint;
