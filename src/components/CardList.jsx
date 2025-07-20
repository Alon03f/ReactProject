import Card from "./Card";

function CardList({ cards, onEdit, onDelete, onFavorite }) {
    if (!cards || cards.length === 0) {
        return <p>No cards to display.</p>;
    }

    return (
        <div className="card-list">
            {cards.map((card) => (
                <Card
                    key={card.cardNumber}
                    title={card.title}
                    description={card.description}
                    phone={card.phone}
                    address={card.address}
                    cardNumber={card.cardNumber}
                    image={card.image}
                    onEdit={() => onEdit(card)}
                    onDelete={() => onDelete(card)}
                    onFavorite={() => onFavorite(card)}
                />
            ))}
        </div>
    );
}

export default CardList;