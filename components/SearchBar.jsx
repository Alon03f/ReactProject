import { useState } from "react";

function SearchBar({ onSearch }) {
    const [search, setSearch] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(search);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem" }}>
            <input
                type="search"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ minWidth: "120px" }}
            />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;