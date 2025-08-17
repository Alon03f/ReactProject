import { useEffect, useState } from "react";

function FavoritesPage({ user, search, cards }) {
    const [favoriteCards, setFavoriteCards] = useState([]);

    useEffect(() => {
        loadFavorites();
    }, [user, cards]);

    const loadFavorites = () => {
        if (!user || !cards) return;

        const localCards = JSON.parse(localStorage.getItem("localCards")) || [];

        const favCards = cards.filter(card => {
            const localCard = localCards.find(local => local.id === card.id);
            return localCard?.favoriteBy?.includes(user.email);
        }).map(card => {
            const localCard = localCards.find(local => local.id === card.id);
            return {
                ...card,
                favoriteBy: localCard?.favoriteBy || []
            };
        });

        setFavoriteCards(favCards);
    };

    const toggleFavorite = (cardId) => {
        if (!user) return;

        const localCards = JSON.parse(localStorage.getItem("localCards")) || [];
        const existingIndex = localCards.findIndex(card => card.id === cardId);

        if (existingIndex >= 0) {
            let updatedFavorites = localCards[existingIndex].favoriteBy || [];
            if (updatedFavorites.includes(user.email)) {
                updatedFavorites = updatedFavorites.filter(email => email !== user.email);
            } else {
                updatedFavorites.push(user.email);
            }
            localCards[existingIndex] = { ...localCards[existingIndex], favoriteBy: updatedFavorites };
        } else {
            localCards.push({
                id: cardId,
                favoriteBy: [user.email]
            });
        }

        localStorage.setItem("localCards", JSON.stringify(localCards));
        loadFavorites();
    };

    if (!user) {
        return (
            <main>
                <h1>Favorite Cards</h1>
                <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    backgroundColor: '#fff3cd',
                    borderRadius: '12px',
                    border: '1px solid #ffeaa7',
                    color: '#856404'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
                    <h2>Login Required</h2>
                    <p>You must be logged in to see your favorite cards.</p>
                </div>
            </main>
        );
    }

    const filteredCards = favoriteCards.filter(card =>
        search.trim() === ""
            ? true
            : card.companyName?.toLowerCase().includes(search.toLowerCase()) ||
            card.title?.toLowerCase().includes(search.toLowerCase())
    );

    if (favoriteCards.length === 0) {
        return (
            <main>
                <h1>Favorite Cards</h1>
                <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '12px',
                    border: '2px dashed #dee2e6'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💔</div>
                    <h2 style={{ color: '#6c757d', marginBottom: '1rem' }}>No Favorites Yet</h2>
                    <p style={{ color: '#6c757d', marginBottom: '2rem' }}>
                        You haven't added any cards to your favorites yet.<br />
                        Browse cards and click the heart icon to add them here!
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            padding: '0.75rem 2rem',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: 'bold'
                        }}
                    >
                        Browse Cards
                    </button>
                </div>
            </main>
        );
    }

    if (filteredCards.length === 0 && search.trim() !== "") {
        return (
            <main>
                <h1>Favorite Cards</h1>
                <div style={{
                    textAlign: 'center',
                    padding: '2rem',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: '1px solid #dee2e6'
                }}>
                    <h3 style={{ color: '#6c757d' }}>No matching favorites found</h3>
                    <p style={{ color: '#6c757d' }}>
                        No favorite cards match your search for "{search}"
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main>
            <h1>Favorite Cards</h1>
            <p style={{ color: '#6c757d', marginBottom: '2rem' }}>
                Your favorite business cards. Data synced from external API.
            </p>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2rem",
                marginTop: "2rem"
            }}>
                {filteredCards.map(card => (
                    <div key={card.id} style={{
                        backgroundColor: "#1e1e1e",
                        borderRadius: "1rem",
                        overflow: "hidden",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                        position: "relative",
                        transition: "transform 0.2s, box-shadow 0.2s"
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-5px)";
                            e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.4)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
                        }}>

                        <div style={{
                            position: "absolute",
                            top: "15px",
                            left: "15px",
                            backgroundColor: "rgba(220, 53, 69, 0.9)",
                            color: "white",
                            padding: "0.25rem 0.5rem",
                            borderRadius: "12px",
                            fontSize: "0.75rem",
                            fontWeight: "bold"
                        }}>
                            FAVORITE
                        </div>

                        <img
                            src={card.image}
                            alt={card.companyName || card.title}
                            style={{ width: "100%", height: "200px", objectFit: "cover" }}
                            onError={(e) => {
                                e.target.src = `https://via.placeholder.com/400x300/1e1e1e/ffffff?text=${encodeURIComponent(card.companyName || 'Business Card')}`;
                            }}
                        />

                        <button
                            onClick={() => toggleFavorite(card.id)}
                            style={{
                                position: "absolute",
                                top: "15px",
                                right: "15px",
                                background: "rgba(0,0,0,0.6)",
                                border: "none",
                                fontSize: "1.5rem",
                                cursor: "pointer",
                                color: card.favoriteBy?.includes(user.email) ? "red" : "#fff",
                                borderRadius: "50%",
                                width: "40px",
                                height: "40px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                            title="Remove from favorites"
                        >
                            {card.favoriteBy?.includes(user.email) ? "❤️" : "🤍"}
                        </button>

                        <div style={{ padding: "1.5rem" }}>
                            <h2 style={{ margin: "0 0 0.5rem 0", color: "#fff" }}>
                                {card.companyName || card.title}
                            </h2>
                            <p style={{
                                color: "#ccc",
                                lineHeight: "1.5",
                                marginBottom: "1rem",
                                display: "-webkit-box",
                                WebkitLineClamp: "3",
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden"
                            }}>
                                {card.description}
                            </p>

                            {card.phone && (
                                <p style={{ color: "#aaa", fontSize: "0.9rem", margin: "0.5rem 0" }}>
                                    📞 {card.phone}
                                </p>
                            )}

                            {card.address && (
                                <p style={{ color: "#aaa", fontSize: "0.9rem", margin: "0.5rem 0" }}>
                                    📍 {card.address}
                                </p>
                            )}

                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginTop: "1rem",
                                fontSize: "0.85rem",
                                color: "#aaa",
                                borderTop: "1px solid #333",
                                paddingTop: "1rem"
                            }}>
                                <span>CEO: {card.ceo}</span>
                                <span>{card.createdAt}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{
                fontSize: '0.9rem',
                color: '#666',
                marginTop: '3rem',
                textAlign: 'center',
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px'
            }}>
                <p style={{ margin: '0' }}>
                    💡 <strong>Tip:</strong> Your favorites are saved locally while card data comes from external API.
                </p>
            </div>
        </main>
    );
}

export default FavoritesPage;