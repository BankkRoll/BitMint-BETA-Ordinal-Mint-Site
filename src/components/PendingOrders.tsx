// components/PendingOrders.tsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

// Order interface
export interface OrderProps {
  orderNumber: number;
  title: string;
  imgSrc: string;
  uid: string;
}

export interface OrderStatus {
  id: string;
  status: 'unpaid' | 'paid' | 'error';
  error?: string;
}

interface PendingOrdersProps {
  pendingOrders: OrderProps[];
  orderIds: string[];
}

const PendingOrders: React.FC<PendingOrdersProps> = ({ pendingOrders, orderIds }) => {
  // Add state for storing order statuses
  const [orderStatuses, setOrderStatuses] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderStatuses = async () => {
      for(const orderId of orderIds){
        try {
          const response = await fetch(`https://ordinalsbot.com/api/order?id=${orderId}`);
          const data = await response.json();

          // Save the order status in state
          setOrderStatuses(prevStatuses => ({ ...prevStatuses, [orderId]: data }));

          // Log success
          console.log(`Successfully fetched status for order ${orderId}`);
        } catch (error) {
          // Log failure
          console.error(`Failed to fetch status for order ${orderId}:`, error);
          setError(`Failed to fetch status for order ${orderId}`);
        }
      }
      setLoading(false);
    };

    fetchOrderStatuses();
    const intervalId = setInterval(fetchOrderStatuses, 1000 * 60); // Fetch every minute

    // Clear interval on component unmount
    return () => clearInterval(intervalId);

  }, [orderIds]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="content text-white bg-black border-2 border-white p-4 rounded-lg">
      <h1 className="text-xl mb-4">Pending Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 inscription-orders">
        {pendingOrders.map(({ orderNumber, title, imgSrc, uid }) => (
          <div key={uid} className="inscription-order bg-white text-black border-2 border-black rounded-lg shadow-md p-4">
            <Link href={`/orders/${uid}`}>
              <a className="text-black"><p className="title font-bold">#{orderNumber} {title}</p></a>
            </Link>
            <div className="preview mt-4">
            <div className="inscription-preview">
                <img src={imgSrc} className="w-16 h-16" alt="Preview" />
              </div>
            </div>
            <div className="progress mt-4" title={`${orderStatuses[uid]?.status || 'Pending'}`}>
              <div className={`step time-elapsed ${orderStatuses[uid]?.status === 'fulfilled' ? 'bg-green-500' : 'bg-gray-600'}`} style={{width: orderStatuses[uid]?.status === 'fulfilled' ? '100%' : `${orderStatuses[uid]?.progress || 0}%`}}></div>
            </div>
            <p>Status: {orderStatuses[uid]?.status}</p>
            <div className="hint mt-4">
              <a href="#" className="text-red-500 btn-cancel redirect" data-uid={uid}>Cancel</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingOrders;