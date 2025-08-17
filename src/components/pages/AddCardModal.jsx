import { useState } from "react";
import { ApiService } from "../api";
import "./AddCardModal.css";

function AddCardModal({ onClose, onCardCreated, user }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        image: "",
        companyName: "",
        description: "",
        phone: "",
        address: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const defaultImage = `https://via.placeholder.com/400x300/1e1e1e/ffffff?text=${encodeURIComponent(formData.companyName || 'Business Card')}`;

            const cardData = {
                image: formData.image.trim() !== "" && formData.image.startsWith('https://via.placeholder.com') ? formData.image : defaultImage,
                companyName: formData.companyName,
                description: formData.description,
                phone: formData.phone || `050-${Math.floor(Math.random() * 9000000) + 1000000}`,
                address: formData.address || `${Math.floor(Math.random() * 999) + 1} Business St.`,
                ceo: user.ceoName || user.name,
                createdByEmail: user.email,
                userId: user.id || 1
            };

            const newCard = await ApiService.createCard(cardData);

            const existingCards = JSON.parse(localStorage.getItem("cards")) || [];
            existingCards.push(newCard);
            localStorage.setItem("cards", JSON.stringify(existingCards));

            onCardCreated();
            onClose();
        } catch (error) {
            console.error("Failed to create card:", error);
            setError("Failed to create card. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <button onClick={onClose} className="close-btn" disabled={loading}>✖</button>
                <h2>Create New Business Card</h2>
                <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    Fill in the details for your new business card
                </p>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ color: '#ccc', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                            Image URL (optional - use placeholder URLs only):
                        </label>
                        <input
                            name="image"
                            placeholder="e.g., https://via.placeholder.com/400x300/333/fff?text=Your+Company"
                            value={formData.image}
                            onChange={handleChange}
                            disabled={loading}
                            style={{ fontSize: '0.9rem' }}
                        />
                        <small style={{ color: '#888', fontSize: '0.8rem', display: 'block', marginTop: '0.5rem' }}>
                            Leave empty for automatic placeholder image
                        </small>
                    </div>

                    <input
                        name="companyName"
                        placeholder="Company name*"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                    <textarea
                        name="description"
                        placeholder="Description*"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        rows={3}
                    />
                    <input
                        name="phone"
                        placeholder="Phone number (optional)"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <input
                        name="address"
                        placeholder="Business address (optional)"
                        value={formData.address}
                        onChange={handleChange}
                        disabled={loading}
                    />

                    {error && (
                        <div style={{
                            color: "#ff6b6b",
                            backgroundColor: "rgba(255, 107, 107, 0.1)",
                            padding: "0.75rem",
                            borderRadius: "6px",
                            border: "1px solid rgba(255, 107, 107, 0.3)",
                            fontSize: "0.9rem"
                        }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            backgroundColor: loading ? '#666' : '#007bff',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? (
                            <>
                                <span style={{ display: 'inline-block', marginRight: '0.5rem' }}>
                                    ⏳
                                </span>
                                Creating...
                            </>
                        ) : (
                            'Create Card'
                        )}
                    </button>
                </form>

                <div style={{
                    fontSize: '0.8rem',
                    color: '#888',
                    marginTop: '1rem',
                    textAlign: 'center'
                }}>
                    Card will be created via external API and saved locally.<br />
                    Only safe placeholder images are supported to prevent CORS errors.
                </div>
            </div>
        </div>
    );
}

export default AddCardModal;