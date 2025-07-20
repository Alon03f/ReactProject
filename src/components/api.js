
export async function fetchCards() {
    const res = await fetch("/api/cards");
    if (!res.ok) throw new Error("Failed to fetch cards");
    return await res.json();
}

export async function createCard(cardData) {
    const res = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cardData),
    });
    if (!res.ok) throw new Error("Failed to create card");
    return await res.json();
}

export async function editCard(cardId, cardData) {
    const res = await fetch(`/api/cards/${cardId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cardData),
    });
    if (!res.ok) throw new Error("Failed to edit card");
    return await res.json();
}

export async function deleteCard(cardId) {
    const res = await fetch(`/api/cards/${cardId}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete card");
    return await res.json();
}