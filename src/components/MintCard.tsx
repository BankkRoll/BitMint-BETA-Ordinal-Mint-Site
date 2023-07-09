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

interface FeeEstimate {
  blocks: number;
  feerate: number;
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
  const [fee, setFee] = useState<number>(0);  // default fee set to 0
  const [feeEstimates, setFeeEstimates] = useState<FeeEstimate[]>([]);

  useEffect(() => {
    const fetchFeeEstimates = async () => {
      const response = await fetch('https://unisat.io/brc20-api-v2/fee-estimate');
      const data = await response.json();
      if (data && data.data && data.data.BlocksFeeRateEstimate) {
        setFeeEstimates(data.data.BlocksFeeRateEstimate);
        // Set the fee to the "Normal" fee after fetching the estimates
        const normalFee = data.data.BlocksFeeRateEstimate[Math.floor(data.data.BlocksFeeRateEstimate.length / 2)]?.feerate;
        setFee(normalFee);
      }
    };

    fetchFeeEstimates();
  }, []);

  // Assume the fee estimates are sorted by ascending number of blocks
  const slowFee = feeEstimates[feeEstimates.length - 1]?.feerate;  // highest number of blocks
  const normalFee = feeEstimates[Math.floor(feeEstimates.length / 2)]?.feerate;  // medium number of blocks
  const fastFee = feeEstimates[0]?.feerate;  // lowest number of blocks

  const handleFeeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Convert the event.target.value from string to number
    const newFee = Number(event.target.value);

    // Make sure the new fee is a number and within the desired range before updating the state
    if (!isNaN(newFee) && newFee >= 1 && newFee <= (fastFee + 50)) {
      setFee(newFee);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between w-full md:w-3/5 lg:w-2/5 p-4 md:p-6 bg-black rounded-lg shadow-md text-white space-y-4 md:space-y-8 max-w-screen-md mx-auto text-center border-2 border-white">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-white">{constants.title}</h2>
        <p className="text-base max-w-md md:text-lg text-gray-300">{constants.description}</p>
        <p className="text-base md:text-lg text-white pt-8">
            Mint Price: <span className="font-bold">{(constants.mintOptions.publicMintPrice)} BTC</span>
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

          <div className="fee-choose" style={{ marginTop: '32px', fontSize: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div>Select the network fee you want to pay:</div>
            <div className="fee-list" style={{ display: 'flex', flexDirection: 'row', marginTop: '8px' }}>
              <div className={`fee-item ${fee === slowFee ? 'selected' : ''}`} style={{ cursor: 'pointer', padding: '8px', border: fee === slowFee ? '2px solid white' : 'none' }} onClick={() => setFee(slowFee)}>
                <div>Slow</div>
                <div className="flex-row-v-center"><span className="fee-rate">{slowFee}</span> sats/vB</div>
              </div>
              <div className={`fee-item ${fee === normalFee ? 'selected' : ''}`} style={{ cursor: 'pointer', padding: '8px', border: fee === normalFee ? '2px solid white' : 'none' }} onClick={() => setFee(normalFee)}>
                <div>Normal</div>
                <div className="flex-row-v-center"><span className="fee-rate">{normalFee}</span> sats/vB</div>
              </div>
              <div className={`fee-item ${fee === fastFee ? 'selected' : ''}`} style={{ cursor: 'pointer', padding: '8px', border: fee === fastFee ? '2px solid white' : 'none' }} onClick={() => setFee(fastFee)}>
                <div>Fast</div>
                <div className="flex-row-v-center"></div>
                <div className="flex-row-v-center" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <input type="range" min="1" max={fastFee ? fastFee + 50 : 0} step="0.01" value={fee} onChange={handleFeeChange} onClick={(e) => e.stopPropagation()} />
                  <span className="fee-rate">{fee} sats/vB</span>
                </div>
              </div>
            </div>
          </div>

          <button
            disabled={mintDisabled || ordinalsAddress === 'N/A'}
            className={`w-full px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-lg ${mintDisabled || ordinalsAddress === 'N/A' ? 'bg-gray-600 cursor-not-allowed' : 'boxy-button-mint'}`}
            onClick={handleMint}
          >
            <span className="button-text">Mint {quantity}</span>
          </button>

          {ordinalsAddress !== ' ' && (
            <div className="text-xs">
              Connected as:
              <input
                className={`w-full px-2 sm:px-4 py-2 sm:py-2 text-xs ${mintDisabled || ordinalsAddress === 'N/A' ? 'bg-black cursor-not-allowed' : 'bg-black text-white'}`}
                type="text"
                required={true}
                value={ordinalsAddress}
                readOnly={true}
                placeholder="Taproot Address (autofilled)"
              />
            </div>
          )}

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