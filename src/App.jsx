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
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <form onSubmit={handleSubmit} className='mb-5'>
            <div className='mb-3'>
              <label htmlFor='userIdInput' className='form-label'>
                Enter your user ID:
              </label>
              <input
                type='text'
                className='form-control'
                id='userIdInput'
                value={userId}
                onChange={e => setUserId(e.target.value)}
                placeholder='User ID'
              />
            </div>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </form>

          {userId && (
            <>
              <div>
                <h2 className='mb-4'>Cards</h2>
                <div className='list-group'>
                  {cards.map(card => (
                    <div
                      key={card.id}
                      className='list-group-item list-group-item-action'
                    >
                      <p>Card Number: {card.cardNumber}</p>
                      <p>Balance: {card.balance}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className='mt-5'>
                <h2 className='mb-4'>Transactions</h2>
                {transactions.map((transaction, index) => (
                  <div key={index} className='card mb-3'>
                    <div className='card-body'>
                      <h5 className='card-title'>
                        {transaction.type} - {transaction.amount}
                      </h5>
                      <p className='card-text'>
                        Date:{' '}
                        {new Date(transaction.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
