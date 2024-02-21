const CardList = ({cards}) => (
  <div className='w-100 bg-primary text-white fs-4 text '>
    <h2 className='mb-4 text-center'>Cards</h2>
    <div className='list-group'>
      {cards.map(card => (
        <div
          key={card.id}
          className='list-group-item list-group-item-action text-center'
        >
          <p>Card Number: {card.cardNumber}</p>
          <p>Balance: {card.balance}</p>
        </div>
      ))}
    </div>
  </div>
);

export default CardList;
