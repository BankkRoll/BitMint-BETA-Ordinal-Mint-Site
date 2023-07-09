import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { id } = req.query;

  if (!id) {
    res.status(400).json({ message: 'Missing order id' });
    return;
  }

  try {
    const response = await axios.get(`https://api2.ordinalsbot.com/order?id=${id}`);

    if (response.data.status !== 'ok') {
      throw new Error(response.data.error);
    }

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error as Error});
  }
}
