import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const foundUser = users.find(
            (user) =>
                user.email.toLowerCase() === formData.email.toLowerCase() &&
                user.password === formData.password
        );

        if (foundUser) {
            localStorage.setItem("user", JSON.stringify(foundUser));
            if (onLogin) onLogin(foundUser);

            // ✅ ניווט ורענון
            navigate("/");
            window.location.reload();
        } else {
            setError("המשתמש לא קיים. יש להזין שוב מייל וסיסמה.");
        }
    };

    return (
        <main>
            <h1>LOGIN</h1>
            <form onSubmit={handleSubmit}>
                <div className="login-form">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email*"
                        required
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password*"
                        required
                        onChange={handleChange}
                    />
                    {error && (
                        <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>
                    )}
                </div>
                <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                    <button type="button" className="cancel">CANCEL</button>
                    <button type="submit" className="success">SUBMIT</button>
                </div>
            </form>
        </main>
    );
}

export default LoginPage;
