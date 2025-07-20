import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header({ user, onLogout, setSearch }) {
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearch = (e) => {
        e.preventDefault();

        const current = location.pathname;
        const isLiveSearch = ["/", "/favorites", "/my-cards"].includes(current);

        if (current === "/about") {
            navigate("/");
            setSearch(searchInput);
            return;
        }

        if (!isLiveSearch && searchInput.trim()) {
            navigate(`/cards?search=${searchInput}`);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);

        const isLiveSearch = ["/", "/favorites", "/my-cards"].includes(location.pathname);

        if (isLiveSearch) {
            setSearch(value);
        }
    };

    return (
        <header
            className="header"
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                backgroundColor: "#1e1e1e",
                color: "#fff",
            }}
        >

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span style={{ fontWeight: "bold", fontSize: "1.3rem" }}>
                    Business Card Ltd.
                </span>
                <nav style={{ display: "flex", gap: "1rem" }}>
                    <Link to="/" style={{ color: "inherit" }}>HOME</Link>
                    <Link to="/about" style={{ color: "inherit" }}>ABOUT</Link>
                    <Link to="/favorites" style={{ color: "inherit" }}>FAV CARDS</Link>
                    <Link to="/my-cards" style={{ color: "inherit" }}>MY CARDS</Link>
                </nav>
            </div>

            <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.5rem" }}>
                <input
                    type="search"
                    placeholder="Search"
                    value={searchInput}
                    onChange={handleInputChange}
                    style={{
                        minWidth: "120px",
                        padding: "5px",
                        borderRadius: "6px",
                        border: "0px solid #ccc",
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: "5px 10px",
                        borderRadius: "6px",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Search
                </button>
            </form>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                {!user ? (
                    <>
                        <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>Sign In</Link>
                        <Link to="/register" style={{ color: "#fff", textDecoration: "none" }}>Sign Up</Link>
                    </>
                ) : (
                    <button
                        onClick={onLogout}
                        style={{ background: "none", border: "none", color: "red", cursor: "pointer" }}
                    >
                        Log Out
                    </button>
                )}
                <span role="img" aria-label="user" style={{ fontSize: "1.8rem" }}>
                    👤
                </span>
            </div>
        </header>
    );
}

export default Header;
