import { useEffect, useState } from "react";
import AddCardModal from "./AddCardModal";
import { useNavigate } from "react-router-dom";

function MyCardsPage({ user, search }) {
    const [myCards, setMyCards] = useState([]);
    const [showModal, setShowModal] = useState(false);
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

    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure you want to delete the card?");
        if (!confirm) return;

        const allCards = JSON.parse(localStorage.getItem("cards")) || [];
        const updatedCards = allCards.filter(card => card.id !== id);
        localStorage.setItem("cards", JSON.stringify(updatedCards));
        loadMyCards();
    };

    const handleCreate = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        loadMyCards();
    };

    if (!user) {
        return (
            <main>
                <h1>My cards</h1>
                <p>You must log in to see your tickets.</p>
            </main>
        );
    }

    if (!user.isBusiness) {
        return (
            <main>
                <h1>My cards</h1>
                <p>
                    You are on a private account and therefore do not have any tabs.<br />
                    To create a card for your business, you must create a business user.
                </p>
            </main>
        );
    }

    const filteredCards = myCards.filter(card =>
        search.trim() === ""
            ? true
            : card.companyName.toLowerCase() === search.toLowerCase()
    );

    if (myCards.length === 0) {
        return (
            <main>
                <h1>My cards</h1>
                <p>
                    You haven't created your business card yet.<br />
                    To create a card, click on the plus on this page or on the home page and advertise your business to thousands of people with us!
                </p>

                <button
                    className="floating-add-btn"
                    onClick={handleCreate}
                    title="Create new card"
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

    return (
        <main>
            <h1>My cards</h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "2rem",
                    marginTop: "2rem"
                }}
            >
                {filteredCards.map(card => (
                    <div
                        key={card.id}
                        style={{
                            backgroundColor: "#1e1e1e",
                            borderRadius: "1rem",
                            overflow: "hidden",
                            boxShadow: "0 0 10px rgba(255,255,255,0.1)",
                            position: "relative"
                        }}
                    >
                        <img
                            src={card.image}
                            alt={card.companyName}
                            style={{ width: "100%", height: "200px", objectFit: "cover" }}
                        />
                        <div style={{ padding: "1rem" }}>
                            <h2>{card.companyName}</h2>
                            <p style={{ color: "#ccc" }}>{card.description}</p>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginTop: "1rem",
                                    fontSize: "0.85rem",
                                    color: "#aaa"
                                }}
                            >
                                <span>CEO: {card.ceo}</span>
                                <span>{card.createdAt}</span>
                            </div>

                            <div style={{
                                textAlign: "center",
                                marginTop: "1rem",
                                display: "flex",
                                justifyContent: "center",
                                gap: "0.5rem"
                            }}>
                                <button
                                    onClick={() => navigate(`/edit/${card.id}`)}
                                    style={{
                                        padding: "0.4rem 1rem",
                                        backgroundColor: "#0d6efd",
                                        border: "none",
                                        color: "white",
                                        borderRadius: "6px",
                                        cursor: "pointer"
                                    }}
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(card.id)}
                                    style={{
                                        padding: "0.4rem 1rem",
                                        backgroundColor: "#dc3545",
                                        border: "none",
                                        color: "white",
                                        borderRadius: "6px",
                                        cursor: "pointer"
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <br />

            <button
                className="floating-add-btn"
                onClick={handleCreate}
                title="Create new card"
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
