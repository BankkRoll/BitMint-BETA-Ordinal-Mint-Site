// components/MintCard.tsx
import React, { useState, useEffect } from 'react';
import Countdown from './Countdown';
import PendingOrders from './PendingOrders';
import SocialLinks from './SocialLinks';

interface MintCardProps {
  constants: any;
  startDateString: string;
  inscribedQuantity: number;
  mintDisabled: boolean;
  quantity: number;
  setQuantity: (quantity: number) => void;
  ordinalsAddress: string;
  handleMint: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  pendingOrders: any[];
}

const MintCard: React.FC<MintCardProps> = ({
  constants,
  startDateString,
  inscribedQuantity,
  mintDisabled,
  quantity,
  setQuantity,
  ordinalsAddress,
  handleMint,
  pendingOrders,
}) => {

  return (
    <div className="flex flex-col items-center justify-between w-full md:w-3/5 lg:w-2/5 p-4 md:p-6 bg-black rounded-lg shadow-md text-white space-y-4 md:space-y-8 max-w-screen-md mx-auto text-center border-2 border-white">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-white">{constants.title}</h2>
        <p className="text-base max-w-md md:text-lg text-gray-300">{constants.description}</p>
        <p className="text-base md:text-lg text-white pt-8">
            Mint Price: <span className="font-bold">{(constants.mintOptions.publicMintPrice / 1e8).toFixed(6)} BTC</span>
        </p>
        <p className="text-base md:text-lg text-white">Mint Start: <span className="font-bold">{startDateString}</span></p>
        <p className="text-base md:text-lg text-white pb-6">Amount Inscribed:<span className="font-bold"> {inscribedQuantity} / {constants.mintOptions.totalSupply}</span></p>
      </div>
      <div className="w-2/3 space-y-4">
        <div className="flex items-center justify-center space-x-2 sm:space-x-4">
          <button
            disabled={mintDisabled}
            className={`px-2 sm:px-3 py-1 text-sm sm:text-lg ${mintDisabled ? 'bg-gray-600 cursor-not-allowed' : 'boxy-button3'}`}
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <span className="button-text">-</span>
          </button>
          <input
            disabled={mintDisabled}
            className={`w-3/4 sm:w-1/2 mx-2 sm:m-4 py-1 text-center text-md sm:text-2xl border border-white ${mintDisabled ? 'bg-gray-700 cursor-not-allowed' : 'bg-white text-black'}`}
            type="number"
            min="1"
            max={constants.mintOptions.limitPerWallet}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Math.min(constants.mintOptions.limitPerWallet, Number(e.target.value))))}
          />
          <button
            disabled={mintDisabled}
            className={`px-2 sm:px-3 py-1 text-sm sm:text-lg ${mintDisabled ? 'bg-gray-600 cursor-not-allowed' : 'boxy-button2'}`}
            onClick={() => setQuantity(Math.min(constants.mintOptions.limitPerWallet, quantity + 1))}
          >
            <span className="button-text">+</span>
          </button>
        </div>
        <form className="flex flex-col items-center space-y-4 md:my-16 sm:space-y-4 lg:space-y-6">
          <input
            className={`w-full px-2 sm:px-4 py-2 sm:py-2 text-xs ${mintDisabled || ordinalsAddress === 'N/A' ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-600 text-white'}`}
            type="text"
            required={true}
            value={ordinalsAddress}
            readOnly={true}
            placeholder="Your Taproot Address (autofilled)"
          />


          <button
            disabled={mintDisabled || ordinalsAddress === 'N/A'}
            className={`w-full px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-lg ${mintDisabled || ordinalsAddress === 'N/A' ? 'bg-gray-600 cursor-not-allowed' : 'boxy-button-mint'}`}
            onClick={handleMint}
          >
            <span className="button-text">Mint {quantity}</span>
          </button>


        </form>
        <Countdown />
        <div>
          {pendingOrders.length > 0 && (
            <PendingOrders pendingOrders={pendingOrders} orderIds={[]} />
          )}
        </div>
        <div>
          <SocialLinks />
        </div>
      </div>
    </div>
  );
};

export default MintCard;