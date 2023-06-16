import React, { useEffect, useState } from 'react';
import data from './data.json';

const RewardPoints = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setTransactions(data.transactions);
    };

    fetchData();
  }, []);

  const calculatePoints = (amount) => {
    let points = 0;

    if (amount > 100) {
      points += (amount - 100) * 2;
    }

    if (amount > 50 && amount <= 100) {
      points += (amount - 50) * 1;
    }

    return points;
  };

  const calculateMonthlyPoints = (transactions) => {
    const monthlyPoints = {};

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const month = date.getMonth();
      const year = date.getFullYear();
      const transactionAmount = transaction.amount;

      const key = `${year}-${month}`;

      if (!monthlyPoints[key]) {
        monthlyPoints[key] = 0;
      }

      monthlyPoints[key] += calculatePoints(transactionAmount);
    });

    return monthlyPoints;
  };

  const calculateTotalPoints = (transactions) => {
    let totalPoints = 0;

    transactions.forEach((transaction) => {
      totalPoints += calculatePoints(transaction.amount);
    });

    return totalPoints;
  };

  const monthlyPoints = calculateMonthlyPoints(transactions);
  const totalPoints = calculateTotalPoints(transactions);

  return (
    <div>
      <h2>Monthly Points</h2>
      {Object.keys(monthlyPoints).map((key) => (
        <p key={key}>
          {key}: {monthlyPoints[key]} points
        </p>
      ))}
      <h2>Total Points</h2>
      <p>{totalPoints} points</p>
    </div>
  );
};

export default RewardPoints;
