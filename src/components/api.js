const API_BASE = 'https://jsonplaceholder.typicode.com';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const SAFE_IMAGES = [
    'https://via.placeholder.com/400x300/1e1e1e/ffffff?text=Business+Card+1',
    'https://via.placeholder.com/400x300/2c3e50/ffffff?text=Business+Card+2',
    'https://via.placeholder.com/400x300/34495e/ffffff?text=Business+Card+3',
    'https://via.placeholder.com/400x300/27ae60/ffffff?text=Business+Card+4',
    'https://via.placeholder.com/400x300/3498db/ffffff?text=Business+Card+5',
    'https://via.placeholder.com/400x300/9b59b6/ffffff?text=Business+Card+6',
    'https://via.placeholder.com/400x300/e74c3c/ffffff?text=Business+Card+7',
    'https://via.placeholder.com/400x300/f39c12/ffffff?text=Business+Card+8',
    'https://via.placeholder.com/400x300/1abc9c/ffffff?text=Business+Card+9',
    'https://via.placeholder.com/400x300/e67e22/ffffff?text=Business+Card+10'
];

export class ApiService {
    static async fetchUsers() {
        try {
            await delay(300);
            const response = await fetch(`${API_BASE}/users`);
            if (!response.ok) throw new Error('Failed to fetch users');
            const users = await response.json();

            return users.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                password: 'demo123',
                phone: user.phone,
                website: user.website,
                company: user.company,
                address: user.address,
                isBusiness: user.id % 2 === 0,
                ceoName: user.company?.name ? `${user.name}` : null,
                companyName: user.company?.name || null
            }));
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    static async fetchCards() {
        try {
            await delay(400);
            const response = await fetch(`${API_BASE}/posts?_limit=20`);
            if (!response.ok) throw new Error('Failed to fetch cards');
            const posts = await response.json();

            return posts.map((post, index) => ({
                id: post.id.toString(),
                cardNumber: `100${post.id.toString().padStart(3, '0')}`,
                title: post.title.charAt(0).toUpperCase() + post.title.slice(1),
                description: post.body.charAt(0).toUpperCase() + post.body.slice(1),
                companyName: post.title.split(' ').slice(0, 2).join(' ').charAt(0).toUpperCase() + post.title.split(' ').slice(0, 2).join(' ').slice(1),
                phone: `050-${Math.floor(Math.random() * 9000000) + 1000000}`,
                address: `${Math.floor(Math.random() * 999) + 1} Business St.`,
                image: SAFE_IMAGES[index % SAFE_IMAGES.length],
                createdByEmail: `user${post.userId}@demo.com`,
                createdAt: new Date().toLocaleDateString('en-GB'),
                ceo: `CEO ${post.userId}`,
                favoriteBy: [],
                userId: post.userId
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
                address: "123 Tech Street",
                image: SAFE_IMAGES[0],
                createdByEmail: "user1@demo.com",
                createdAt: today,
                ceo: "CEO 1",
                favoriteBy: [],
                userId: 1
            },
            {
                id: "2",
                cardNumber: "100002",
                title: "Green Energy Co",
                description: "Sustainable energy solutions for a better tomorrow.",
                companyName: "Green Energy Co",
                phone: "050-2345678",
                address: "456 Green Avenue",
                image: SAFE_IMAGES[1],
                createdByEmail: "user2@demo.com",
                createdAt: today,
                ceo: "CEO 2",
                favoriteBy: [],
                userId: 2
            },
            {
                id: "3",
                cardNumber: "100003",
                title: "Design Studio",
                description: "Creative design services for all your branding needs.",
                companyName: "Design Studio",
                phone: "050-3456789",
                address: "789 Creative Lane",
                image: SAFE_IMAGES[2],
                createdByEmail: "user3@demo.com",
                createdAt: today,
                ceo: "CEO 3",
                favoriteBy: [],
                userId: 3
            }
        ];
    }

    static async createCard(cardData) {
        try {
            await delay(500);
            const response = await fetch(`${API_BASE}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    title: cardData.companyName,
                    body: cardData.description,
                    userId: cardData.userId || 1
                }),
            });

            if (!response.ok) throw new Error('Failed to create card');
            const newPost = await response.json();

            return {
                id: newPost.id.toString(),
                cardNumber: `100${newPost.id.toString().padStart(3, '0')}`,
                title: cardData.companyName,
                description: cardData.description,
                companyName: cardData.companyName,
                phone: cardData.phone || `050-${Math.floor(Math.random() * 9000000) + 1000000}`,
                address: cardData.address || `${Math.floor(Math.random() * 999) + 1} Business St.`,
                image: cardData.image || SAFE_IMAGES[newPost.id % SAFE_IMAGES.length],
                createdByEmail: cardData.createdByEmail,
                createdAt: new Date().toLocaleDateString('en-GB'),
                ceo: cardData.ceo,
                favoriteBy: [],
                userId: cardData.userId || 1
            };
        } catch (error) {
            console.error('Error creating card:', error);
            throw error;
        }
    }

    static async updateCard(cardId, cardData) {
        try {
            await delay(400);
            const response = await fetch(`${API_BASE}/posts/${cardId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    id: cardId,
                    title: cardData.companyName,
                    body: cardData.description,
                    userId: cardData.userId || 1
                }),
            });

            if (!response.ok) throw new Error('Failed to update card');
            const updatedPost = await response.json();

            return {
                ...cardData,
                id: updatedPost.id.toString(),
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
            const response = await fetch(`${API_BASE}/posts/${cardId}`, {
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
            const users = await this.fetchUsers();
            const user = users.find(u =>
                u.email.toLowerCase() === email.toLowerCase() &&
                password === 'demo123'
            );

            if (user) {
                return user;
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            console.error('Error authenticating user:', error);
            throw error;
        }
    }

    static async registerUser(userData) {
        try {
            await delay(700);
            const newUser = {
                id: Date.now(),
                name: `${userData.firstName} ${userData.lastName}`,
                email: userData.email,
                password: userData.password,
                phone: userData.phone,
                isBusiness: userData.isBusiness,
                ceoName: userData.ceoName,
                companyName: userData.companyName,
                address: {
                    street: userData.street,
                    city: userData.city,
                    country: userData.country
                }
            };

            return newUser;
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    }
}