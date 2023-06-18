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
      'https://api2.ordinalsbot.com/collection-order',
      {
        id: constants.collectionOptions.id,
        count: quantity,
        receiveAddress: ordinalsAddress,
      },
      {
        headers: {
          'x-api-key': process.env.ORDINALSBOT_API_KEY,
        },
      }
    );

    if (response.data.status !== 'ok') {
      throw new Error(response.data.error);
    }

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error});
  }
}
