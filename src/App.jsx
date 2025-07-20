import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./components/pages/HomePage";
import CardsPage from "./components/pages/CardsPage";
import FavoritesPage from "./components/pages/FavoritesPage";
import MyCardsPage from "./components/pages/MyCardsPage";
import AboutPage from "./components/pages/AboutPage";
import CreateCardPage from "./components/pages/CreateCardPage";
import EditCardPage from "./components/pages/EditCardPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import NotFound from "./components/pages/NotFound";

import Navbar from "./components/Header";
import AuthModal from "./components/pages/AuthModal";

import "./index.css";

function App() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} setSearch={setSearch} />

      {!user && <AuthModal />}

      <Routes>
        <Route path="/" element={<HomePage user={user} search={search} />} />
        <Route
          path="/favorites"
          element={user ? <FavoritesPage user={user} search={search} /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-cards"
          element={user ? <MyCardsPage user={user} search={search} /> : <Navigate to="/login" />}
        />
        <Route
          path="/create"
          element={user ? <CreateCardPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit/:id"
          element={user ? <EditCardPage /> : <Navigate to="/login" />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<HomePage user={user} search={search} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
