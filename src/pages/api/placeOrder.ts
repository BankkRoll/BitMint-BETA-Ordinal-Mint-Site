// pages/api/placeOrder.ts
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import constants from '../../../const/config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { quantity, ordinalsAddress } = req.body;

  try {
    const response = await axios.post(
      'https://api2.ordinalsbot.com/order',
      {
        id: constants.collectionOptions.id,
        count: quantity,
        receiveAddress: ordinalsAddress,
      }
    );

    if (response.data.status !== 'ok') {
      throw new Error(response.data.error);
    }

    res.status(200).json(response.data);
  } catch (error) {
    if (error instanceof Error) {
      // If error is an instance of Error, we know it has a .message property
      res.status(500).json({ message: error.message });
    } else {
      // If error is not an instance of Error, it's something unexpected and we should log the entire error
      console.error(error);
      res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  }
}
