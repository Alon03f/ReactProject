import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthModal.css";

function AuthModal() {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            setShowModal(true);
        }
    }, []);

    const handleClose = () => {
        setShowModal(false);
    };

    const handleNavigate = (path) => {
        setShowModal(false);
        navigate(path);
    };

    if (!showModal) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <button className="close-btn" onClick={handleClose}>✖</button>
                <h2>Welcome!</h2>
                <p>To continue, select one of the options:</p>
                <div className="modal-buttons">
                    <button onClick={() => handleNavigate("/register")}>Sign up</button>
                    <button onClick={() => handleNavigate("/login")}>Sign in</button>
                </div>
                <p className="continue-as-guest" onClick={handleClose}>Continue as a guest</p>
            </div>
        </div>
    );
}

export default AuthModal;
