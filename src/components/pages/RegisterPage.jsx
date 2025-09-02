import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiService } from "../api";

function RegisterPage({ onRegister }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        isBusiness: false,
        ceoName: "",
        companyName: "",
        street: "",
        city: "",
        country: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : value 
        }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (formData.password.length < 6) {
                throw new Error("Password must be at least 6 characters long");
            }

            const user = await ApiService.registerUser(formData);
            onRegister(user);
            navigate("/");
        } catch (error) {
            setError(error.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <h1>Sign Up</h1>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
                Create your account to start managing business cards.
            </p>

            <form onSubmit={handleSubmit} style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                maxWidth: "500px",
                margin: "0 auto"
            }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name*"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        style={{
                            padding: "0.75rem",
                            border: "2px solid #ddd",
                            borderRadius: "8px",
                            fontSize: "1rem"
                        }}
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name*"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        style={{
                            padding: "0.75rem",
                            border: "2px solid #ddd",
                            borderRadius: "8px",
                            fontSize: "1rem"
                        }}
                    />
                </div>

                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone*"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    style={{
                        padding: "0.75rem",
                        border: "2px solid #ddd",
                        borderRadius: "8px",
                        fontSize: "1rem"
                    }}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email*"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    style={{
                        padding: "0.75rem",
                        border: "2px solid #ddd",
                        borderRadius: "8px",
                        fontSize: "1rem"
                    }}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password* (min 6 characters)"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength="6"
                    disabled={loading}
                    style={{
                        padding: "0.75rem",
                        border: "2px solid #ddd",
                        borderRadius: "8px",
                        fontSize: "1rem"
                    }}
                />

                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "1rem",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                    border: "2px solid #ddd"
                }}>
                    <input
                        type="checkbox"
                        name="isBusiness"
                        id="isBusiness"
                        checked={formData.isBusiness}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <label htmlFor="isBusiness" style={{ fontSize: "1rem", cursor: "pointer" }}>
                        Register as Business Account
                    </label>
                </div>

                {formData.isBusiness && (
                    <>
                        <input
                            type="text"
                            name="ceoName"
                            placeholder="CEO Name"
                            value={formData.ceoName}
                            onChange={handleChange}
                            disabled={loading}
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
                            placeholder="Company Name"
                            value={formData.companyName}
                            onChange={handleChange}
                            disabled={loading}
                            style={{
                                padding: "0.75rem",
                                border: "2px solid #ddd",
                                borderRadius: "8px",
                                fontSize: "1rem"
                            }}
                        />
                    </>
                )}

                <h3 style={{ margin: "1rem 0 0.5rem 0", color: "#333" }}>Address Information</h3>
                
                <input
                    type="text"
                    name="street"
                    placeholder="Street"
                    value={formData.street}
                    onChange={handleChange}
                    disabled={loading}
                    style={{
                        padding: "0.75rem",
                        border: "2px solid #ddd",
                        borderRadius: "8px",
                        fontSize: "1rem"
                    }}
                />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        disabled={loading}
                        style={{
                            padding: "0.75rem",
                            border: "2px solid #ddd",
                            borderRadius: "8px",
                            fontSize: "1rem"
                        }}
                    />
                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleChange}
                        disabled={loading}
                        style={{
                            padding: "0.75rem",
                            border: "2px solid #ddd",
                            borderRadius: "8px",
                            fontSize: "1rem"
                        }}
                    />
                </div>

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

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: "0.75rem",
                        backgroundColor: loading ? "#666" : "#28a745",
                        border: "none",
                        color: "white",
                        borderRadius: "8px",
                        cursor: loading ? "not-allowed" : "pointer",
                        fontSize: "1rem",
                        fontWeight: "500",
                        opacity: loading ? 0.7 : 1,
                        marginTop: "1rem"
                    }}
                >
                    {loading ? "Creating Account..." : "Sign Up"}
                </button>

                <div style={{
                    textAlign: "center",
                    marginTop: "1rem",
                    color: "#666"
                }}>
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        style={{
                            background: "none",
                            border: "none",
                            color: "#007bff",
                            cursor: "pointer",
                            textDecoration: "underline"
                        }}
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </main>
    );
}

export default RegisterPage;
