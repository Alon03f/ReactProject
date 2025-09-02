const API_BASE = 'https://bcard-ojqa.onrender.com';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export class ApiService {
    static async fetchUsers() {
        try {
            await delay(300);
            const response = await fetch(`${API_BASE}/users`);
            if (!response.ok) throw new Error('Failed to fetch users');
            const users = await response.json();

            return users.map(user => ({
                id: user._id,
                name: `${user.name?.first || 'User'} ${user.name?.last || ''}`.trim(),
                email: user.email,
                password: 'demo123',
                phone: user.phone || '050-0000000',
                website: user.web || '',
                company: { name: user.name?.first || 'Company' },
                address: user.address || {},
                isBusiness: user.isBusiness || false,
                ceoName: `${user.name?.first || 'CEO'} ${user.name?.last || ''}`.trim(),
                companyName: user.name?.first || 'Company'
            }));
        } catch (error) {
            console.error('Error fetching users:', error);
            return this.getFallbackUsers();
        }
    }

    static getFallbackUsers() {
        return [
            {
                id: "1",
                name: "Demo User",
                email: "demo@example.com",
                password: 'demo123',
                phone: "050-1234567",
                website: "",
                company: { name: "Demo Company" },
                address: {},
                isBusiness: true,
                ceoName: "Demo User",
                companyName: "Demo Company"
            },
            {
                id: "2",
                name: "Test User",
                email: "test@example.com",
                password: 'demo123',
                phone: "050-2345678",
                website: "",
                company: { name: "Test Company" },
                address: {},
                isBusiness: false,
                ceoName: "Test User",
                companyName: "Test Company"
            }
        ];
    }

    static async fetchCards() {
        try {
            await delay(400);
            const response = await fetch(`${API_BASE}/cards`);
            if (!response.ok) throw new Error('Failed to fetch cards');
            const cards = await response.json();

            return cards.map(card => ({
                id: card._id,
                cardNumber: card.bizNumber?.toString() || Math.floor(Math.random() * 1000000).toString(),
                title: card.title,
                description: card.description,
                companyName: card.title,
                phone: card.phone,
                address: `${card.address?.street || ''} ${card.address?.houseNumber || ''}, ${card.address?.city || ''}, ${card.address?.country || ''}`.trim(),
                image: card.image?.url || 'https://via.placeholder.com/400x300/1e1e1e/ffffff?text=Business+Card',
                createdByEmail: card.email || 'unknown@example.com',
                createdAt: new Date(card.createdAt).toLocaleDateString('en-GB') || new Date().toLocaleDateString('en-GB'),
                ceo: card.subtitle || 'CEO',
                favoriteBy: card.likes || [],
                userId: card.user_id,
                email: card.email,
                web: card.web,
                bizNumber: card.bizNumber
            }));
        } catch (error) {
            console.error('Error fetching cards:', error);
            return this.getFallbackCards();
        }
    }

    static getFallbackCards() {
        const today = new Date().toLocaleDateString('en-GB');
        return [
            {
                id: "1",
                cardNumber: "100001",
                title: "Tech Solutions Inc",
                description: "We provide innovative technology solutions for modern businesses.",
                companyName: "Tech Solutions Inc",
                phone: "050-1234567",
                address: "123 Tech Street, Tel Aviv, Israel",
                image: 'https://via.placeholder.com/400x300/1e1e1e/ffffff?text=Tech+Solutions',
                createdByEmail: "user1@demo.com",
                createdAt: today,
                ceo: "CEO Tech",
                favoriteBy: [],
                userId: "1"
            },
            {
                id: "2",
                cardNumber: "100002",
                title: "Green Energy Co",
                description: "Sustainable energy solutions for a better tomorrow.",
                companyName: "Green Energy Co",
                phone: "050-2345678",
                address: "456 Green Avenue, Haifa, Israel",
                image: 'https://via.placeholder.com/400x300/27ae60/ffffff?text=Green+Energy',
                createdByEmail: "user2@demo.com",
                createdAt: today,
                ceo: "CEO Green",
                favoriteBy: [],
                userId: "2"
            }
        ];
    }

    static async createCard(cardData) {
        try {
            await delay(500);
            const response = await fetch(`${API_BASE}/cards`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: cardData.companyName,
                    subtitle: cardData.ceo || 'CEO',
                    description: cardData.description,
                    phone: cardData.phone,
                    email: cardData.createdByEmail,
                    web: cardData.web || '',
                    image: {
                        url: cardData.image,
                        alt: cardData.companyName
                    },
                    address: {
                        state: '',
                        country: 'Israel',
                        city: cardData.address?.split(',')[1]?.trim() || 'Tel Aviv',
                        street: cardData.address?.split(',')[0]?.trim() || 'Main Street',
                        houseNumber: Math.floor(Math.random() * 999) + 1,
                        zip: Math.floor(Math.random() * 90000) + 10000
                    }
                }),
            });

            if (!response.ok) throw new Error('Failed to create card');
            const newCard = await response.json();

            return {
                id: newCard._id,
                cardNumber: newCard.bizNumber?.toString() || Math.floor(Math.random() * 1000000).toString(),
                title: newCard.title,
                description: newCard.description,
                companyName: newCard.title,
                phone: newCard.phone,
                address: `${newCard.address?.street || ''} ${newCard.address?.houseNumber || ''}, ${newCard.address?.city || ''}, ${newCard.address?.country || ''}`.trim(),
                image: newCard.image?.url || cardData.image,
                createdByEmail: newCard.email,
                createdAt: new Date(newCard.createdAt).toLocaleDateString('en-GB'),
                ceo: newCard.subtitle || 'CEO',
                favoriteBy: [],
                userId: newCard.user_id,
                email: newCard.email,
                web: newCard.web,
                bizNumber: newCard.bizNumber
            };
        } catch (error) {
            console.error('Error creating card:', error);
            throw error;
        }
    }

    static async updateCard(cardId, cardData) {
        try {
            await delay(400);
            const response = await fetch(`${API_BASE}/cards/${cardId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: cardData.companyName,
                    subtitle: cardData.ceo || 'CEO',
                    description: cardData.description,
                    phone: cardData.phone,
                    email: cardData.createdByEmail,
                    web: cardData.web || '',
                    image: {
                        url: cardData.image,
                        alt: cardData.companyName
                    },
                    address: {
                        state: '',
                        country: 'Israel',
                        city: cardData.address?.split(',')[1]?.trim() || 'Tel Aviv',
                        street: cardData.address?.split(',')[0]?.trim() || 'Main Street',
                        houseNumber: Math.floor(Math.random() * 999) + 1,
                        zip: Math.floor(Math.random() * 90000) + 10000
                    }
                }),
            });

            if (!response.ok) throw new Error('Failed to update card');
            const updatedCard = await response.json();

            return {
                ...cardData,
                id: updatedCard._id,
                title: cardData.companyName,
                description: cardData.description,
                companyName: cardData.companyName
            };
        } catch (error) {
            console.error('Error updating card:', error);
            throw error;
        }
    }

    static async deleteCard(cardId) {
        try {
            await delay(300);
            const response = await fetch(`${API_BASE}/cards/${cardId}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete card');
            return { success: true, id: cardId };
        } catch (error) {
            console.error('Error deleting card:', error);
            throw error;
        }
    }

    static async authenticateUser(email, password) {
        try {
            await delay(600);
            const response = await fetch(`${API_BASE}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });

            if (response.ok) {
                const user = await response.json();
                return {
                    id: user._id,
                    name: `${user.name?.first || 'User'} ${user.name?.last || ''}`.trim(),
                    email: user.email,
                    phone: user.phone,
                    isBusiness: user.isBusiness,
                    ceoName: `${user.name?.first || 'CEO'} ${user.name?.last || ''}`.trim(),
                    companyName: user.name?.first || 'Company',
                    address: user.address
                };
            } else {
                const fallbackUsers = this.getFallbackUsers();
                const user = fallbackUsers.find(u => 
                    u.email.toLowerCase() === email.toLowerCase() && 
                    password === 'demo123'
                );
                
                if (user) {
                    return user;
                } else {
                    throw new Error('Invalid credentials');
                }
            }
        } catch (error) {
            console.error('Error authenticating user:', error);
            throw error;
        }
    }

    static async registerUser(userData) {
        try {
            await delay(700);
            const response = await fetch(`${API_BASE}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: {
                        first: userData.firstName,
                        middle: '',
                        last: userData.lastName
                    },
                    phone: userData.phone,
                    email: userData.email,
                    password: userData.password,
                    image: {
                        url: 'https://via.placeholder.com/400x400/1e1e1e/ffffff?text=User',
                        alt: `${userData.firstName} ${userData.lastName}`
                    },
                    address: {
                        state: '',
                        country: userData.country || 'Israel',
                        city: userData.city || 'Tel Aviv',
                        street: userData.street || 'Main Street',
                        houseNumber: Math.floor(Math.random() * 999) + 1,
                        zip: Math.floor(Math.random() * 90000) + 10000
                    },
                    isBusiness: userData.isBusiness || false
                }),
            });

            if (response.ok) {
                const newUser = await response.json();
                return {
                    id: newUser._id,
                    name: `${newUser.name?.first || ''} ${newUser.name?.last || ''}`.trim(),
                    email: newUser.email,
                    phone: newUser.phone,
                    isBusiness: newUser.isBusiness,
                    ceoName: userData.ceoName || `${userData.firstName} ${userData.lastName}`,
                    companyName: userData.companyName || `${userData.firstName} Company`,
                    address: newUser.address
                };
            } else {
                const newUser = {
                    id: Date.now().toString(),
                    name: `${userData.firstName} ${userData.lastName}`,
                    email: userData.email,
                    password: userData.password,
                    phone: userData.phone,
                    isBusiness: userData.isBusiness,
                    ceoName: userData.ceoName || `${userData.firstName} ${userData.lastName}`,
                    companyName: userData.companyName || `${userData.firstName} Company`,
                    address: {
                        street: userData.street,
                        city: userData.city,
                        country: userData.country
                    }
                };

                return newUser;
            }
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    }
}
