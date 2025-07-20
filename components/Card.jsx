function Card({ title, description, phone, address, cardNumber, image, onEdit, onDelete, onFavorite }) {
    return (
        <div className="card">
            <img src={image} alt={title} />
            <div className="card-title">{title}</div>
            <div className="card-details">{description}</div>
            <div className="card-details">Phone: {phone}</div>
            <div className="card-details">Address: {address}</div>
            <div className="card-details">Card Number: {cardNumber}</div>
            <div className="card-actions">
                <button className="icon-btn" onClick={onEdit} title="Edit">✏️</button>
                <button className="icon-btn" onClick={onDelete} title="Delete">🗑️</button>
                <button className="icon-btn" onClick={onFavorite} title="Favorite">❤️</button>
            </div>
        </div>
    );
}

export default Card;