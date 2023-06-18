// api/verifyAddress.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { btcAddress } = req.body;

  // Check if btcAddress is present
  if (!btcAddress) {
    return res.status(400).json({ message: 'No address provided' });
  }

  // Check if it potentially is a valid Taproot address
  if (!btcAddress.startsWith('bc1p')) {
    return res.status(400).json({ message: 'Invalid Taproot address' });
  }

  try {
    const response = await axios.get(`https://blockchain.info/rawaddr/${btcAddress}`);
    if (!response.data) {
      return res.status(404).json({ message: 'Address not found on the blockchain' });
    }
    res.status(200).json(response.data);
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400) {
        return res.status(400).json({ message: 'Bad Request' });
      }
      if (error.response.status === 404) {
        return res.status(404).json({ message: 'Address not found on the blockchain' });
      }
    }
    res.status(500).json({ message: 'Error verifying address', error: error.message });
  }
}

