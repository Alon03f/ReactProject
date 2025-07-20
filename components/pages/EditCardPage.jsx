import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditCardPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cardData, setCardData] = useState({
        image: "",
        companyName: "",
        description: ""
    });

    useEffect(() => {
        const allCards = JSON.parse(localStorage.getItem("cards")) || [];
        const cardToEdit = allCards.find(card => card.id === id);
        if (!cardToEdit) {
            alert("Card not found");
            return navigate("/my-cards");
        }

        setCardData({
            image: cardToEdit.image,
            companyName: cardToEdit.companyName,
            description: cardToEdit.description
        });
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCardData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const allCards = JSON.parse(localStorage.getItem("cards")) || [];
        const updatedCards = allCards.map(card =>
            card.id === id ? { ...card, ...cardData } : card
        );

        localStorage.setItem("cards", JSON.stringify(updatedCards));
        navigate("/my-cards");
    };

    return (
        <main>
            <h1>עריכת כרטיס</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "500px" }}>
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={cardData.image}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="companyName"
                    placeholder="company name"
                    value={cardData.companyName}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="description"
                    value={cardData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                />
                <button type="submit">Save changes</button>
            </form>
        </main>
    );
}

export default EditCardPage;
