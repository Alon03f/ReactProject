import { useState } from "react";
import "./AddCardModal.css";

function AddCardModal({ onClose, onCardCreated, user }) {
    const [formData, setFormData] = useState({
        image: "",
        companyName: "",
        description: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const today = new Date();
        const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

        const defaultImage = "https://plus.unsplash.com/premium_photo-1675249003499-0570ce14c7b4?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

        const newCard = {
            id: Date.now().toString(),
            image: formData.image.trim() !== "" ? formData.image : defaultImage,
            companyName: formData.companyName,
            description: formData.description,
            CEO: user.ceoName,
            createdAt: formattedDate,
            createdByEmail: user.email,
            isFavorite: false,
            favoriteBy: []
        };

        const existingCards = JSON.parse(localStorage.getItem("cards")) || [];
        existingCards.push(newCard);
        localStorage.setItem("cards", JSON.stringify(existingCards));
        onCardCreated();
        onClose();
    };

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <button onClick={onClose} className="close-btn">✖</button>
                <h2>Make new card</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <input
                        name="image"
                        placeholder="Image URL"
                        onChange={handleChange}
                    />
                    <input
                        name="companyName"
                        placeholder="company name"
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="description"
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Upload card !</button>
                </form>
            </div>
        </div>
    );
}

export default AddCardModal;
