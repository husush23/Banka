import {useState} from 'react';

function App() {
  const [userId, setUserId] = useState('');
  const [cards, setCards] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const fetchCards = async userId => {
    const response = await fetch(
      `http://localhost:3000/cards?userId=${userId}`
    );
    if (response.ok) {
      const data = await response.json();
      setCards(data);
      data.forEach(card => fetchTransactions(card.id));
    } else {
      console.error('Failed to fetch cards');
    }
  };

  const fetchTransactions = async cardId => {
    const response = await fetch(
      `http://localhost:3000/cards/${cardId}/transactions`
    );
    if (response.ok) {
      const data = await response.json();
      // Append transactions of this card to the state
      setTransactions(prev => [...prev, ...data]);
    } else {
      // Handle error
      console.error(`Failed to fetch transactions for card ${cardId}`);
    }
  };

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault(); // Prevent default form submission
    fetchCards(userId);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your user ID:</label>
        <input
          type='text'
          value={userId}
          onChange={e => setUserId(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
      <div>
        <h2>Cards</h2>
        {cards.map(card => (
          <div key={card.id}>
            <p>Card Number: {card.cardNumber}</p>
            <p>Balance: {card.balance}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>Transactions</h2>
        {transactions.map((transaction, index) => (
          <div key={index}>
            <p>Type: {transaction.type}</p>
            <p>Amount: {transaction.amount}</p>
            <p>Date: {new Date(transaction.timestamp).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
