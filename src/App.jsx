import {useState} from 'react';
import CardList from './components/CardList';
import Transactions from './components/Transactions';

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
        <div className='col-md-6 d-flex flex-column align-items-center'>
          <form onSubmit={handleSubmit} className='mb-5 w-100'>
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
            <div className='d-flex justify-content-center'>
              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
            </div>
          </form>
          {userId && (
            <div className='sections'>
              <CardList cards={cards} />
              <Transactions transactions={transactions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
