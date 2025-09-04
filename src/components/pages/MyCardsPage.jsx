import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddCardModal from "./AddCardModal";
import { ApiService } from "../api";

function MyCardsPage({ user, search, onCardsUpdate }) {
    const [myCards, setMyCards] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadMyCards();
    }, [user]);

    const loadMyCards = async () => {
        if (!user) return;

        try {
            setLoading(true);
            const allCards = JSON.parse(localStorage.getItem("cards")) || [];
            const userCards = allCards.filter(card => card.createdByEmail === user.email);
            setMyCards(userCards);
        } catch (error) {
            console.error("Failed to load user cards:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCard = async (cardId) => {
        if (!window.confirm("Are you sure you want to delete this card?")) return;

        try {
            await ApiService.deleteCard(cardId);
            
            const allCards = JSON.parse(localStorage.getItem("cards")) || [];
            const updatedCards = allCards.filter(card => card.id !== cardId);
            localStorage.setItem("cards", JSON.stringify(updatedCards));
            
            loadMyCards();
            if (onCardsUpdate) onCardsUpdate();
        } catch (error) {
            console.error("Failed to delete card:", error);
            
            const allCards = JSON.parse(localStorage.getItem("cards")) || [];
            const updatedCards = allCards.filter(card => card.id !== cardId);
            localStorage.setItem("cards", JSON.stringify(updatedCards));
            
            loadMyCards();
            if (onCardsUpdate) onCardsUpdate();
        }
    };

    if (!user) {
        return (
            <main>
                <h1>My Cards</h1>
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
                    <p>You must be logged in to see your business cards.</p>
                </div>
            </main>
        );
    }

    if (loading) {
        return (
            <main>
                <h1>My Cards</h1>
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '3px solid #333',
                        borderTop: '3px solid #007bff',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '2rem auto'
                    }}></div>
                    <p>Loading your cards...</p>
                    <style>{`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>
            </main>
        );
    }

    const filteredCards = myCards.filter(card =>
        search.trim() === "" ? true :
            card.companyName?.toLowerCase().includes(search.toLowerCase()) ||
            card.title?.toLowerCase().includes(search.toLowerCase()) ||
            card.description?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <main>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "2rem"
            }}>
                <h1>My Business Cards</h1>
                {user.isBusiness && (
                    <button
                        onClick={() => setShowModal(true)}
                        style={{
                            backgroundColor: "#28a745",
                            color: "white",
                            border: "none",
                            padding: "0.75rem 1.5rem",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "1rem",
                            fontWeight: "500"
                        }}
                    >
                        + Create New Card
                    </button>
                )}
            </div>

            {!user.isBusiness && (
                <div style={{
                    backgroundColor: '#fff3cd',
                    borderRadius: '12px',
                    border: '1px solid #ffeaa7',
                    color: '#856404',
                    padding: '1rem',
                    marginBottom: '2rem'
                }}>
                    <p style={{ margin: 0 }}>
                        💡 <strong>Business Account Required:</strong> You need a business account to create business cards.
                    </p>
                </div>
            )}

            <p style={{ color: '#666', marginBottom: '2rem' }}>
                Manage and edit your business cards. Total cards: {myCards.length}
            </p>

            {filteredCards.length === 0 && search.trim() !== "" ? (
                <div style={{
                    textAlign: 'center',
                    padding: '2rem',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: '1px solid #dee2e6'
                }}>
                    <h3 style={{ color: '#6c757d' }}>No matching cards found</h3>
                    <p style={{ color: '#6c757d' }}>
                        No cards match your search for "{search}"
                    </p>
                </div>
            ) : myCards.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '12px',
                    border: '2px dashed #dee2e6'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
                    <h2 style={{ color: '#6c757d', marginBottom: '1rem' }}>No Cards Yet</h2>
                    <p style={{ color: '#6c757d', marginBottom: '2rem' }}>
                        You haven't created any business cards yet.<br />
                        {user.isBusiness ? 'Click the "Create New Card" button to get started!' : 'Upgrade to a business account to create cards.'}
                    </p>
                    {user.isBusiness && (
                        <button
                            onClick={() => setShowModal(true)}
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
                            Create Your First Card
                        </button>
                    )}
                </div>
            ) : (
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
                                backgroundColor: "rgba(40, 167, 69, 0.9)",
                                color: "white",
                                padding: "0.25rem 0.5rem",
                                borderRadius: "12px",
                                fontSize: "0.75rem",
                                fontWeight: "bold"
                            }}>
                                MY CARD
                            </div>

                            <img
                                src={card.image}
                                alt={card.companyName || card.title}
                                style={{ width: "100%", height: "200px", objectFit: "cover" }}
                                onError={(e) => {
                                    e.target.src = `https://via.placeholder.com/400x300/1e1e1e/ffffff?text=${encodeURIComponent(card.companyName || 'Business Card')}`;
                                }}
                            />

                            <div style={{
                                position: "absolute",
                                top: "15px",
                                right: "15px",
                                display: "flex",
                                gap: "0.5rem"
                            }}>
                                <button
                                    onClick={() => navigate(`/edit/${card.id}`)}
                                    style={{
                                        background: "rgba(0,123,255,0.8)",
                                        border: "none",
                                        fontSize: "1.2rem",
                                        cursor: "pointer",
                                        color: "#fff",
                                        borderRadius: "50%",
                                        width: "35px",
                                        height: "35px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                    title="Edit card"
                                >
                                    ✏️
                                </button>
                                <button
                                    onClick={() => handleDeleteCard(card.id)}
                                    style={{
                                        background: "rgba(220,53,69,0.8)",
                                        border: "none",
                                        fontSize: "1.2rem",
                                        cursor: "pointer",
                                        color: "#fff",
                                        borderRadius: "50%",
                                        width: "35px",
                                        height: "35px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                    title="Delete card"
                                >
                                    🗑️
                                </button>
                            </div>

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
            )}

            {showModal && (
                <AddCardModal
                    onClose={() => setShowModal(false)}
                    onCardCreated={() => {
                        setShowModal(false);
                        loadMyCards();
                        if (onCardsUpdate) onCardsUpdate();
                    }}
                    user={user}
                />
            )}
        </main>
    );
}

export default MyCardsPage;
