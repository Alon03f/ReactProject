import { useEffect, useState } from "react";
import AddCardModal from "./AddCardModal";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";

function HomePage({ user, search, cards, onCardsUpdate }) {
    const [showModal, setShowModal] = useState(false);
    const [localCards, setLocalCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageErrors, setImageErrors] = useState(new Set());
    const navigate = useNavigate();

    useEffect(() => {
        if (cards && cards.length > 0) {
            const limitedCards = cards.slice(0, 20);
            const mergedCards = limitedCards.map(card => {
                const localCard = getLocalCard(card.id);
                return {
                    ...card,
                    favoriteBy: localCard?.favoriteBy || []
                };
            });
            setLocalCards(mergedCards);
        }
    }, [cards]);

    const getLocalCard = (cardId) => {
        const localCards = JSON.parse(localStorage.getItem("localCards")) || [];
        return localCards.find(card => card.id === cardId);
    };

    const updateLocalCard = (cardId, updates) => {
        const localCards = JSON.parse(localStorage.getItem("localCards")) || [];
        const existingIndex = localCards.findIndex(card => card.id === cardId);

        if (existingIndex >= 0) {
            localCards[existingIndex] = { ...localCards[existingIndex], ...updates };
        } else {
            localCards.push({ id: cardId, ...updates });
        }

        localStorage.setItem("localCards", JSON.stringify(localCards));
    };

    const toggleFavorite = (cardId) => {
        if (!user) return;

        const updatedCards = localCards.map((card) => {
            if (card.id === cardId) {
                let updatedFavorites = card.favoriteBy || [];
                if (updatedFavorites.includes(user.email)) {
                    updatedFavorites = updatedFavorites.filter(email => email !== user.email);
                } else {
                    updatedFavorites.push(user.email);
                }

                updateLocalCard(cardId, { favoriteBy: updatedFavorites });

                return { ...card, favoriteBy: updatedFavorites };
            }
            return card;
        });

        setLocalCards(updatedCards);
    };

    const handleImageError = (cardId) => {
        setImageErrors(prev => new Set(prev).add(cardId));
    };

    const getImageSrc = (card) => {
        if (imageErrors.has(card.id)) {
            return `https://via.placeholder.com/400x300/1e1e1e/ffffff?text=${encodeURIComponent(card.companyName || card.title || 'Business Card')}`;
        }
        return card.image;
    };

    const filteredCards = localCards.filter(card =>
        search.trim() === "" ? true :
            card.companyName?.toLowerCase().includes(search.toLowerCase()) ||
            card.title?.toLowerCase().includes(search.toLowerCase()) ||
            card.description?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <main>
            <h1>Business Cards</h1>
            <p style={{ color: '#aaa', marginBottom: '2rem' }}>
                Discover amazing businesses and services.
            </p>

            {user?.isBusiness && (
                <button
                    onClick={() => setShowModal(true)}
                    style={{
                        position: "fixed",
                        bottom: "2rem",
                        right: "2rem",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        borderRadius: "50%",
                        border: "none",
                        width: "60px",
                        height: "60px",
                        cursor: "pointer",
                        fontSize: "1.5rem",
                        boxShadow: "0 4px 12px rgba(0,123,255,0.3)",
                        zIndex: 1000
                    }}
                    title="Create new business card"
                >
                    +
                </button>
            )}

            {filteredCards.length === 0 && search.trim() !== "" ? (
                <div style={{ textAlign: 'center', color: '#aaa', marginTop: '3rem' }}>
                    <h3>No cards found</h3>
                    <p>No cards match your search for "{search}". Try different keywords.</p>
                </div>
            ) : filteredCards.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#aaa', marginTop: '3rem' }}>
                    <h3>Loading Cards...</h3>
                    <p>Please wait while we load business cards from our API.</p>
                </div>
            ) : (
                <>
                    <div style={{
                        marginBottom: '1rem',
                        color: '#666',
                        fontSize: '0.9rem',
                        textAlign: 'center'
                    }}>
                        Showing {filteredCards.length} of 20 business cards
                    </div>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "2rem",
                        marginTop: "2rem",
                    }}>
                        {filteredCards.map((card) => (
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
                                <img
                                    src={getImageSrc(card)}
                                    alt={card.companyName || card.title}
                                    style={{
                                        width: "100%",
                                        height: "200px",
                                        objectFit: "cover",
                                        backgroundColor: "#333"
                                    }}
                                    onError={() => handleImageError(card.id)}
                                    loading="lazy"
                                />

                                {user && (
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
                                            justifyContent: "center",
                                            transition: "all 0.2s"
                                        }}
                                        title={card.favoriteBy?.includes(user.email) ? "Remove from favorites" : "Add to favorites"}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "scale(1.1)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "scale(1)";
                                        }}
                                    >
                                        {card.favoriteBy?.includes(user.email) ? "❤️" : "🤍"}
                                    </button>
                                )}

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

                                    {user && user.email === card.createdByEmail && (
                                        <div style={{ textAlign: "center", marginTop: "1rem" }}>
                                            <button
                                                onClick={() => navigate(`/edit/${card.id}`)}
                                                style={{
                                                    padding: "0.5rem 1rem",
                                                    backgroundColor: "#0d6efd",
                                                    border: "none",
                                                    color: "white",
                                                    borderRadius: "6px",
                                                    cursor: "pointer",
                                                    fontSize: "0.9rem"
                                                }}
                                            >
                                                Edit Card
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {showModal && (
                <AddCardModal
                    onClose={() => setShowModal(false)}
                    onCardCreated={() => {
                        setShowModal(false);
                        onCardsUpdate();
                    }}
                    user={user}
                />
            )}
        </main>
    );
}

export default HomePage;