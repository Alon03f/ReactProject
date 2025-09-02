import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiService } from "../api";

function LoginPage({ onLogin }) {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const user = await ApiService.authenticateUser(formData.email, formData.password);
            onLogin(user);
            navigate("/");
        } catch (error) {
            setError(error.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <h1>Sign In</h1>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
                Enter your credentials to access your account. Use demo123 as password for demo users.
            </p>

            <form onSubmit={handleSubmit} style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                maxWidth: "400px",
                margin: "0 auto"
            }}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email address*"
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
                    placeholder="Password*"
                    value={formData.password}
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
                    {loading ? "Signing In..." : "Sign In"}
                </button>

                <div style={{
                    textAlign: "center",
                    marginTop: "1rem",
                    color: "#666"
                }}>
                    Don't have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                        style={{
                            background: "none",
                            border: "none",
                            color: "#007bff",
                            cursor: "pointer",
                            textDecoration: "underline"
                        }}
                    >
                        Sign Up
                    </button>
                </div>
            </form>

            <div style={{
                fontSize: '0.9rem',
                color: '#666',
                marginTop: '3rem',
                textAlign: 'center',
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px'
            }}>
                <p style={{ margin: '0 0 1rem 0' }}>
                    💡 <strong>Demo Credentials:</strong>
                </p>
                <p style={{ margin: '0' }}>
                    Email: demo@example.com | Password: demo123
                </p>
            </div>
        </main>
    );
}

export default LoginPage;
