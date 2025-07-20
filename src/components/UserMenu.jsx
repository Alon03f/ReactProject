function UserMenu({ user, onLogout }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span role="img" aria-label="user" style={{ fontSize: "1.7rem" }}>
                🧑
            </span>
            {user ? (
                <>
                    <span>{user.name}</span>
                    <button onClick={onLogout} className="icon-btn" title="Logout">
                        🚪
                    </button>
                </>
            ) : (
                <>
                    <a href="/login" className="icon-btn" title="Login">🔑</a>
                    <a href="/register" className="icon-btn" title="Register">📝</a>
                </>
            )}
        </div>
    );
}

export default UserMenu;