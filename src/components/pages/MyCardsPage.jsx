import { useEffect, useState } from "react";
import AddCardModal from "./AddCardModal";
import { useNavigate } from "react-router-dom";
import { ApiService } from "../api";

function MyCardsPage({ user, search, onCardsUpdate }) {
    const [myCards, setMyCards] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            loadMyCards();
        }
    }, [user]);

    const loadMyCards = () => {
        const allCards = JSON.parse(localStorage.getItem("cards")) || [];
        const userCards = allCards.filter(card => card.createdByEmail === user.email);
        setMyCards(userCards);
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this card?");
        if (!confirm) return;

        setLoading(true);
        setError("");

        try {
            await ApiService.deleteCard(id);

            const allCards = JSON.parse(localStorage.getItem("cards")) || [];
            const updatedCards = allCards.filter(card => card.id !== id);
            localStorage.setItem("cards", JSON.stringify(updatedCards));

            loadMyCards();
            if (onCardsUpdate) onCardsUpdate();
        } catch (error) {
            console.error("Failed to delete card:", error);
            setError("Failed to delete card. Please try again.");

            const allCards = JSON.parse(localStorage.getItem("cards")) || [];
            const updatedCards = allCards.filter(card => card.id !== id);
            localStorage.setItem("cards", JSON.stringify(updatedCards));
            loadMyCards();
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        loadMyCards();
        if (onCardsUpdate) onCardsUpdate();
    };

    if (!user) {
        return (
            <main>
                <h1>My Cards</h1>
                <p>You must log in to see your cards.</p>
            </main>
        );
    }

    if (!user.isBusiness) {
        return (
            <main>
                <h1>My Cards</h1>
                <div style={{
                    backgroundColor: '#fff3cd',
                    border: '1px solid #ffeaa7',
                    color: '#856404',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '2rem'
                }}>
                    <h3 style={{ margin: '0 0 0.5rem 0' }}>Business Account Required</h3>
                    <p style={{ margin: '0' }}>
                        You are on a regular account and cannot create business cards.<br />
                        To create business cards, you need to register as a business user.
                    </p>
                </div>
                <button
                    onClick={() => navigate('/register')}
                    style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    Register as Business User
                </button>
            </main>
        );
    }

    const filteredCards = myCards.filter(card =>
        search.trim() === ""
            ? true
            : card.companyName?.toLowerCase().includes(search.toLowerCase()) ||
            card.title?.toLowerCase().includes(search.toLowerCase())
    );

    if (myCards.length === 0) {
        return (
            <main>
                <h1>My Business Cards</h1>
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
                        Create your first card to showcase your business!
                    </p>
                    <button
                        onClick={handleCreate}
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
                </div>

                {showModal && (
                    <AddCardModal
                        onClose={handleModalClose}
                        onCardCreated={handleModalClose}
                        user={user}
                    />
                )}
            </main>
        );
    }

    return (
        <main>
            <h1>My Business Cards</h1>
            <p style={{ color: '#6c757d', marginBottom: '2rem' }}>
                Manage your business cards. Cards are synced with external API.
            </p>

            {error && (
                <div style={{
                    color: "#d32f2f",
                    backgroundColor: "#ffebee",
                    padding: "0.75rem",
                    borderRadius: "6px",
                    border: "1px solid #ffcdd2",
                    marginBottom: "1rem"
                }}>
                    {error}
                </div>
            )}

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2rem",
                marginBottom: "2rem"
            }}>
                {filteredCards.map(card => (
                    <div
                        key={card.id}
                        style={{
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
                        }}
                    >
                        <div style={{
                            position: "absolute",
                            top: "15px",
                            right: "15px",
                            backgroundColor: "rgba(0,123,255,0.9)",
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

                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "0.75rem",
                                marginTop: "1.5rem"
                            }}>
                                <button
                                    onClick={() => navigate(`/edit/${card.id}`)}
                                    style={{
                                        padding: "0.5rem 1rem",
                                        backgroundColor: "#0d6efd",
                                        border: "none",
                                        color: "white",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                        fontSize: "0.9rem",
                                        fontWeight: "500"
                                    }}
                                    disabled={loading}
                                >
                                    ✏️ Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(card.id)}
                                    style={{
                                        padding: "0.5rem 1rem",
                                        backgroundColor: "#dc3545",
                                        border: "none",
                                        color: "white",
                                        borderRadius: "6px",
                                        cursor: loading ? "not-allowed" : "pointer",
                                        fontSize: "0.9rem",
                                        fontWeight: "500",
                                        opacity: loading ? 0.7 : 1
                                    }}
                                    disabled={loading}
                                >
                                    🗑️ {loading ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                className="floating-add-btn"
                onClick={handleCreate}
                title="Create new business card"
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
            >
                +
            </button>

            {showModal && (
                <AddCardModal
                    onClose={handleModalClose}
                    onCardCreated={handleModalClose}
                    user={user}
                />
            )}
        </main>
    );
}

export default MyCardsPage;