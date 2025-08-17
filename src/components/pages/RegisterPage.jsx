import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiService } from "../api";

function RegisterPage({ onRegister }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        country: "",
        city: "",
        street: "",
        houseNumber: "",
        zip: "",
        isBusiness: false,
        ceoName: "",
        companyName: ""
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const newUser = await ApiService.registerUser(formData);

            const localUsers = JSON.parse(localStorage.getItem("users")) || [];
            localUsers.push(newUser);
            localStorage.setItem("users", JSON.stringify(localUsers));
            localStorage.setItem("user", JSON.stringify(newUser));

            if (onRegister) onRegister(newUser);
            navigate("/");
        } catch (error) {
            console.error("Registration failed:", error);
            setError("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <main>
                <div style={{ textAlign: 'center' }}>
                    <h1>Creating Account...</h1>
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
            <h1>REGISTER</h1>
            <div style={{
                backgroundColor: '#f0f8ff',
                border: '1px solid #007bff',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '2rem',
                color: '#333'
            }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#007bff' }}>Registration Info:</h3>
                <p style={{ margin: '0.5rem 0' }}>
                    Create your account to manage business cards and favorites.
                </p>
                <p style={{ margin: '0.5rem 0' }}>
                    Check "Register as business user" to create and manage your own business cards.
                </p>
            </div>

            <form className="register-form" onSubmit={handleSubmit}>
                <input
                    name="firstName"
                    placeholder="First name*"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <input
                    name="lastName"
                    placeholder="Last name*"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email*"
                    required
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password*"
                    required
                    value={formData.password}
                    onChange={handleChange}
                />
                <input
                    name="phone"
                    placeholder="Phone*"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                />
                <input
                    name="country"
                    placeholder="Country*"
                    required
                    value={formData.country}
                    onChange={handleChange}
                />
                <input
                    name="city"
                    placeholder="City*"
                    required
                    value={formData.city}
                    onChange={handleChange}
                />
                <input
                    name="street"
                    placeholder="Street"
                    value={formData.street}
                    onChange={handleChange}
                />
                <input
                    name="houseNumber"
                    placeholder="House Number"
                    value={formData.houseNumber}
                    onChange={handleChange}
                />
                <input
                    name="zip"
                    placeholder="ZIP Code"
                    value={formData.zip}
                    onChange={handleChange}
                />

                <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    backgroundColor: formData.isBusiness ? '#e3f2fd' : 'transparent',
                    borderRadius: '6px',
                    border: formData.isBusiness ? '2px solid #2196f3' : '2px solid transparent'
                }}>
                    <input
                        type="checkbox"
                        name="isBusiness"
                        checked={formData.isBusiness}
                        onChange={handleChange}
                        style={{ cursor: 'pointer' }}
                    />
                    <span style={{ color: formData.isBusiness ? '#1976d2' : 'white', fontWeight: formData.isBusiness ? 'bold' : 'normal' }}>
                        Register as a business user
                    </span>
                </label>

                {formData.isBusiness && (
                    <>
                        <input
                            name="ceoName"
                            placeholder="Full name of the company's CEO*"
                            required
                            value={formData.ceoName}
                            onChange={handleChange}
                            style={{ backgroundColor: '#e3f2fd', border: '2px solid #2196f3' }}
                        />
                        <input
                            name="companyName"
                            placeholder="Company name*"
                            required
                            value={formData.companyName}
                            onChange={handleChange}
                            style={{ backgroundColor: '#e3f2fd', border: '2px solid #2196f3' }}
                        />
                    </>
                )}

                {error && (
                    <div style={{
                        color: "#d32f2f",
                        backgroundColor: "#ffebee",
                        padding: "0.75rem",
                        borderRadius: "6px",
                        border: "1px solid #ffcdd2",
                        marginTop: "0.5rem",
                        fontSize: "0.9rem"
                    }}>
                        {error}
                    </div>
                )}

                <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
                    <button
                        type="button"
                        className="cancel"
                        onClick={() => navigate("/")}
                    >
                        CANCEL
                    </button>
                    <button
                        type="submit"
                        className="success"
                        disabled={loading}
                    >
                        {loading ? "CREATING..." : "SIGN UP"}
                    </button>
                </div>
            </form>

            <div style={{
                textAlign: 'center',
                marginTop: '2rem',
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                color: 'white'
            }}>
                <p>Already have an account? <a href="/login" style={{ color: '#007bff' }}>Login here</a></p>
            </div>
        </main>
    );
}

export default RegisterPage;