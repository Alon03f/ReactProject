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
import LoadingSpinner from "./components/LoadingSpinner";

import "./index.css";
import { ApiService } from "./components/api";

function App() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setLoading(true);

      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      await loadCards();
    } catch (error) {
      console.error("Failed to initialize app:", error);
      setError("Failed to load application data");
    } finally {
      setLoading(false);
    }
  };

  const loadCards = async () => {
    try {
      const apiCards = await ApiService.fetchCards();
      setCards(apiCards);

      localStorage.setItem("cards", JSON.stringify(apiCards));
    } catch (error) {
      console.error("Failed to load cards:", error);
      const savedCards = localStorage.getItem("cards");
      if (savedCards) {
        setCards(JSON.parse(savedCards));
      }
    }
  };

  const handleLogin = async (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        color: '#fff'
      }}>
        <h2>Error Loading Application</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} setSearch={setSearch} />

      {!user && <AuthModal />}

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/home"
          element={<HomePage user={user} search={search} cards={cards} onCardsUpdate={loadCards} />}
        />

        <Route
          path="/favorites"
          element={user ? <FavoritesPage user={user} search={search} cards={cards} /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-cards"
          element={user ? <MyCardsPage user={user} search={search} onCardsUpdate={loadCards} /> : <Navigate to="/login" />}
        />
        <Route
          path="/create"
          element={user ? <CreateCardPage onCardCreated={loadCards} /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit/:id"
          element={user ? <EditCardPage onCardUpdated={loadCards} /> : <Navigate to="/login" />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage onRegister={handleLogin} />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
}

export default App;