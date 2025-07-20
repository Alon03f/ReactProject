import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
            <nav style={{ width: "100%", display: "flex", justifyContent: "center", gap: "2rem" }}>
                <Link to="/about">About</Link>
                <Link to="/favorites">Favorites</Link>
                <Link to="/my-cards">My Cards</Link>
            </nav>
        </footer>
    );
}

export default Footer;