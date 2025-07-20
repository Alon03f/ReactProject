import { useEffect, useState } from "react";

function FavoritesPage({ user, search }) {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        loadFavorites();
    }, [user]);

    const loadFavorites = () => {
        const allCards = JSON.parse(localStorage.getItem("cards")) || [];
        const favoriteCards = allCards.filter(card =>
            card.favoriteBy?.includes(user?.email)
        );
        setCards(favoriteCards);
    };

    const toggleFavorite = (cardId) => {
        const allCards = JSON.parse(localStorage.getItem("cards")) || [];

        const updatedCards = allCards.map(card => {
            if (card.id === cardId) {
                let updatedFavorites = card.favoriteBy || [];

                if (updatedFavorites.includes(user.email)) {
                    updatedFavorites = updatedFavorites.filter(email => email !== user.email);
                } else {
                    updatedFavorites.push(user.email);
                }

                return { ...card, favoriteBy: updatedFavorites };
            }
            return card;
        });

        localStorage.setItem("cards", JSON.stringify(updatedCards));
        loadFavorites();
    };

    if (!user) {
        return (
            <main>
                <h1>Favorites cards</h1>
                <p>You must be logged in to see favorite cards.</p>
            </main>
        );
    }

    const filteredCards = cards.filter(card =>
        search.trim() === ""
            ? true
            : card.companyName.toLowerCase() === search.toLowerCase()
    );

    if (filteredCards.length === 0) {
        return (
            <main>
                <h1>Favorites cards</h1>
                <p>No favorite tickets<br />To add a card to your favorites, mark it with a heart.</p>
            </main>
        );
    }

    return (
        <main>
            <h1>כרטיסים מועדפים</h1>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "2rem",
                marginTop: "2rem"
            }}>
                {filteredCards.map(card => (
                    <div key={card.id} style={{
                        backgroundColor: "#1e1e1e",
                        borderRadius: "1rem",
                        overflow: "hidden",
                        boxShadow: "0 0 10px rgba(255,255,255,0.1)",
                        position: "relative"
                    }}>
                        <img
                            src={card.image}
                            alt={card.companyName}
                            style={{ width: "100%", height: "200px", objectFit: "cover" }}
                        />

                        {user && (
                            <button
                                onClick={() => toggleFavorite(card.id)}
                                style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "-30px",
                                    background: "none",
                                    border: "none",
                                    fontSize: "1.5rem",
                                    cursor: "pointer",
                                    color: card.favoriteBy?.includes(user.email) ? "red" : "#aaa"
                                }}
                                title="הסר מהמועדפים"
                            >
                                {card.favoriteBy?.includes(user.email) ? "❤️" : "🤍"}
                            </button>
                        )}

                        <div style={{ padding: "1rem" }}>
                            <h2>{card.companyName}</h2>
                            <p style={{ color: "#ccc" }}>{card.description}</p>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "1rem",
                                fontSize: "0.85rem",
                                color: "#aaa"
                            }}>
                                <span>מנכ"ל: {card.ceo}</span>
                                <span>{card.createdAt}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default FavoritesPage;
