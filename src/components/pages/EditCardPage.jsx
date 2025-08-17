import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApiService } from "../api";

function EditCardPage({ onCardUpdated }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [cardData, setCardData] = useState({
        image: "",
        companyName: "",
        description: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        const allCards = JSON.parse(localStorage.getItem("cards")) || [];
        const cardToEdit = allCards.find(card => card.id === id);
        if (!cardToEdit) {
            alert("Card not found");
            return navigate("/my-cards");
        }

        setCardData({
            image: cardToEdit.image || "",
            companyName: cardToEdit.companyName || cardToEdit.title || "",
            description: cardToEdit.description || "",
            phone: cardToEdit.phone || "",
            address: cardToEdit.address || ""
        });
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCardData(prev => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const user = JSON.parse(localStorage.getItem("user"));

            const updatedCard = await ApiService.updateCard(id, {
                ...cardData,
                userId: user.id || 1
            });

            const allCards = JSON.parse(localStorage.getItem("cards")) || [];
            const updatedCards = allCards.map(card =>
                card.id === id ? { ...card, ...cardData } : card
            );
            localStorage.setItem("cards", JSON.stringify(updatedCards));

            if (onCardUpdated) onCardUpdated();
            navigate("/my-cards");
        } catch (error) {
            console.error("Failed to update card:", error);
            setError("Failed to update card. Please try again.");

            const allCards = JSON.parse(localStorage.getItem("cards")) || [];
            const updatedCards = allCards.map(card =>
                card.id === id ? { ...card, ...cardData } : card
            );
            localStorage.setItem("cards", JSON.stringify(updatedCards));

            if (onCardUpdated) onCardUpdated();
            navigate("/my-cards");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <main>
                <div style={{ textAlign: 'center' }}>
                    <h1>Updating Card...</h1>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '3px solid #333',
                        borderTop: '3px solid #007bff',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '2rem auto'
                    }}></div>
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

    return (
        <main>
            <h1>Edit Business Card</h1>
            <div style={{
                backgroundColor: '#f0f8ff',
                border: '1px solid #007bff',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '2rem',
                color: '#333'
            }}>
                <p style={{ margin: '0' }}>
                    Update your business card information. Changes will be saved via API and locally.
                </p>
            </div>

            <form onSubmit={handleSubmit} style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                maxWidth: "500px"
            }}>
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={cardData.image}
                    onChange={handleChange}
                    style={{
                        padding: "0.75rem",
                        border: "2px solid #ddd",
                        borderRadius: "8px",
                        fontSize: "1rem"
                    }}
                />
                <input
                    type="text"
                    name="companyName"
                    placeholder="Company name*"
                    value={cardData.companyName}
                    onChange={handleChange}
                    required
                    style={{
                        padding: "0.75rem",
                        border: "2px solid #ddd",
                        borderRadius: "8px",
                        fontSize: "1rem"
                    }}
                />
                <textarea
                    name="description"
                    placeholder="Description*"
                    value={cardData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    style={{
                        padding: "0.75rem",
                        border: "2px solid #ddd",
                        borderRadius: "8px",
                        fontSize: "1rem",
                        resize: "vertical",
                        minHeight: "100px"
                    }}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    value={cardData.phone}
                    onChange={handleChange}
                    style={{
                        padding: "0.75rem",
                        border: "2px solid #ddd",
                        borderRadius: "8px",
                        fontSize: "1rem"
                    }}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Business address"
                    value={cardData.address}
                    onChange={handleChange}
                    style={{
                        padding: "0.75rem",
                        border: "2px solid #ddd",
                        borderRadius: "8px",
                        fontSize: "1rem"
                    }}
                />

                {error && (
                    <div style={{
                        color: "#d32f2f",
                        backgroundColor: "#ffebee",
                        padding: "0.75rem",
                        borderRadius: "6px",
                        border: "1px solid #ffcdd2",
                        fontSize: "0.9rem"
                    }}>
                        {error}
                    </div>
                )}

                <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                    <button
                        type="button"
                        onClick={() => navigate("/my-cards")}
                        style={{
                            padding: "0.75rem 1.5rem",
                            backgroundColor: "#6c757d",
                            border: "none",
                            color: "white",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "1rem",
                            fontWeight: "500"
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: "0.75rem 1.5rem",
                            backgroundColor: loading ? "#666" : "#007bff",
                            border: "none",
                            color: "white",
                            borderRadius: "8px",
                            cursor: loading ? "not-allowed" : "pointer",
                            fontSize: "1rem",
                            fontWeight: "500",
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? "Saving Changes..." : "Save Changes"}
                    </button>
                </div>
            </form>

            <div style={{
                fontSize: '0.9rem',
                color: '#666',
                marginTop: '2rem',
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px'
            }}>
                <p style={{ margin: '0' }}>
                    💡 <strong>Tip:</strong> Changes are saved both via external API and locally for backup.
                </p>
            </div>
        </main>
    );
}

export default EditCardPage;