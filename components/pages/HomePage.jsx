import { useEffect, useState } from "react";
import AddCardModal from "./AddCardModal";
import { useNavigate } from "react-router-dom";

function HomePage({ user, search }) {
    const [cards, setCards] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadCards();
    }, []);

    const loadCards = () => {
        let storedCards = JSON.parse(localStorage.getItem("cards")) || [];

        const today = new Date();
        const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

        if (storedCards.length === 0) {
            const defaultCards = [
                {
                    id: Date.now().toString() + "a",
                    image: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?q=80&w=996&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    companyName: "NovaTech Solutions",
                    description: "NovaTech develops smart AI solutions for small and medium-sized businesses.",
                    ceo: "Eyal Hayon",
                    createdAt: formattedDate,
                    createdByEmail: "demo@demo.com",
                    isFavorite: false,
                    favoriteBy: [],
                },
                {
                    id: Date.now().toString() + "b",
                    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    companyName: "GreenRoots",
                    description: "Innovative and green agricultural solutions — the future starts here.",
                    ceo: "Galit Raz",
                    createdAt: formattedDate,
                    createdByEmail: "demo@demo.com",
                    isFavorite: false,
                    favoriteBy: [],
                },
                {
                    id: Date.now().toString() + "c",
                    image: "https://plus.unsplash.com/premium_photo-1670966282879-ef5f3cbf1000?q=80&w=823&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    companyName: "Plastic facial sculpture",
                    description: "Facial design with modern plastic surgery with the best doctors and surgeons in Israel.",
                    ceo: "Itzik Boblil",
                    createdAt: formattedDate,
                    createdByEmail: "demo@demo.com",
                    isFavorite: false,
                    favoriteBy: [],
                },
                {
                    id: Date.now().toString() + "d",
                    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    companyName: "Home interior design",
                    description: "Our company offers full home interior design starting at $45,000 Come see what we have to offer !",
                    ceo: "Avraham Cohen",
                    createdAt: formattedDate,
                    createdByEmail: "demo@demo.com",
                    isFavorite: false,
                    favoriteBy: [],
                },
                {
                    id: Date.now().toString() + "e",
                    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    companyName: "dog groomer",
                    description: "Give your dog the most enjoyable grooming experience they'll ever have. Gentle, sensitive and dynamic care is included for all types of dogs.",
                    ceo: "Arthur Rosenberg",
                    createdAt: formattedDate,
                    createdByEmail: "demo@demo.com",
                    isFavorite: false,
                    favoriteBy: [],
                },
                {
                    id: Date.now().toString() + "f",
                    image: "https://images.unsplash.com/photo-1608232034071-c604ddc8470a?q=80&w=706&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    companyName: "photo frames",
                    description: "Come design your personal, dreamy frame for the perfect picture with us, from simple home furniture to wedding photos!",
                    ceo: "Leo de Nol",
                    createdAt: formattedDate,
                    createdByEmail: "demo@demo.com",
                    isFavorite: false,
                    favoriteBy: [],
                },
                {
                    id: Date.now().toString() + "g",
                    image: "https://images.unsplash.com/photo-1504904126298-3fde501c9b31?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    companyName: "Perfect sound",
                    description: "Our company offers a comprehensive sound service and a maintenance person who will come to your event and assign you to operate all the equipment, equipment worth thousands of dollars, especially for events such as weddings and concerts.",
                    ceo: "Oren Levy",
                    createdAt: formattedDate,
                    createdByEmail: "demo@demo.com",
                    isFavorite: false,
                    favoriteBy: [],
                },
            ];
            localStorage.setItem("cards", JSON.stringify(defaultCards));
            storedCards = defaultCards;
        }

        setCards(storedCards);
    };

    const toggleFavorite = (cardId) => {
        const allCards = JSON.parse(localStorage.getItem("cards")) || [];
        const updatedCards = allCards.map((card) => {
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
        setCards(updatedCards);
    };

    const filteredCards = cards.filter(card =>
        search.trim() === "" ? true : card.companyName.toLowerCase() === search.toLowerCase()
    );

    return (
        <main>
            <h1>Cards</h1>

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
                        width: "50px",
                        height: "50px",
                        cursor: "pointer",
                    }}
                >
                    +
                </button>
            )}

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "2rem",
                marginTop: "2rem",
            }}>
                {filteredCards.map((card) => (
                    <div key={card.id} style={{
                        backgroundColor: "#1e1e1e",
                        borderRadius: "1rem",
                        overflow: "hidden",
                        boxShadow: "0 0 10px rgba(255,255,255,0.1)",
                        position: "relative",
                    }}>
                        <img src={card.image} alt={card.companyName} style={{ width: "100%", height: "200px", objectFit: "cover" }} />

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
                                title="Mark as favorite"
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
                                <span>CEO: {card.ceo}</span>
                                <span>{card.createdAt}</span>
                            </div>

                            {user && user.email === card.createdByEmail && (
                                <div style={{ textAlign: "center", marginTop: "1rem" }}>
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
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <AddCardModal
                    onClose={() => setShowModal(false)}
                    onCardCreated={loadCards}
                    user={user}
                />
            )}
        </main>
    );
}

export default HomePage;
