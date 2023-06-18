// components/Countdown.tsx
import React from 'react';
import useCountdown from '../../utils/useCountdown';
import constants from '../../const/config';

const Countdown: React.FC = () => {
  const timeLeft = useCountdown(constants.mintOptions.publicMintStart);
  return (
    Object.keys(timeLeft).length > 0 && (
      <p className="text-xs sm:text-lg text-red-500">
        Minting starts in: {timeLeft["hours"]} hours, {timeLeft["minutes"]} minutes, {timeLeft["seconds"]} seconds
      </p>
    )
  );
};

export default Countdown;

