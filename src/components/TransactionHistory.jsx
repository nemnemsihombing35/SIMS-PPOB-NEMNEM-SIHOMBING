import React, { useState, useEffect } from 'react';
import { getTransactionHistory } from '../api/axios'; 

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const response = await getTransactionHistory({ offset: 0, limit: 3 });
        // Pastikan data yang diterima sesuai
        if (response.data.status === 0) {
          setTransactions(response.data.data.records);
        } else {
          setError('Failed to fetch transaction history');
        }
      } catch (error) {
        setError('Failed to fetch transaction history');
        console.error('Error fetching data:', error);  
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionHistory();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto py-4 px-6">
      <h1 className="text-2xl font-semibold mb-4">Transaction History</h1>
      <div className="space-y-4">
        {transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          transactions.map((transaction, index) => (
            <div key={index} className="border border-gray-300 p-4 rounded-md">
              <div className="flex justify-between">
                <p className="font-semibold">Invoice Number: {transaction.invoice_number}</p>
                <p className="text-gray-600">Date: {new Date(transaction.created_on).toLocaleDateString()}</p>
              </div>
              <div className="mt-2">
                <p className="text-sm">Amount: Rp. {transaction.total_amount.toLocaleString()}</p>
                <p className="text-sm">Transaction Type: {transaction.transaction_type}</p>
                <p className="text-sm">Description: {transaction.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
