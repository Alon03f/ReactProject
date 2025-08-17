function AboutPage() {
    return (
        <main>
            <h1>About Business Card Ltd</h1>

            <div style={{
                backgroundColor: '#f0f8ff',
                border: '1px solid #007bff',
                padding: '2rem',
                borderRadius: '12px',
                marginBottom: '3rem',
                color: '#333'
            }}>
                <h2 style={{ color: '#007bff', marginTop: '0' }}>Welcome to Business Card Ltd!</h2>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                    This system allows you to discover, manage, and create business cards with ease.
                    Connect with amazing businesses and showcase your own services to thousands of potential customers.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                marginBottom: '3rem'
            }}>
                <div style={{
                    padding: '1.5rem',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    border: '1px solid #e9ecef'
                }}>
                    <h3 style={{ color: '#007bff', marginTop: '0' }}>Discover</h3>
                    <p style={{ color: 'black' }}>Browse through hundreds of business cards from various industries and find the services you need.</p>
                </div>

                <div style={{
                    padding: '1.5rem',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    border: '1px solid #e9ecef'
                }}>
                    <h3 style={{ color: '#007bff', marginTop: '0' }}>Favorite</h3>
                    <p style={{ color: 'black' }}>Save your favorite business cards for easy access and never lose track of great services.</p>
                </div>

                <div style={{
                    padding: '1.5rem',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    border: '1px solid #e9ecef'
                }}>
                    <h3 style={{ color: '#007bff', marginTop: '0' }}>Create</h3>
                    <p style={{ color: 'black' }}>Register as a business user and create stunning business cards to promote your services.</p>
                </div>
            </div>

            <div style={{
                backgroundColor: '#e3f2fd',
                border: '1px solid #2196f3',
                padding: '2rem',
                borderRadius: '12px',
                marginBottom: '3rem'
            }}>
                <h2 style={{ color: '#1976d2', marginTop: '0' }}>External API Integration</h2>
                <p style={{ color: '#333', marginBottom: '1rem' }}>
                    This application demonstrates modern web development practices by integrating with external APIs:
                </p>
                <ul style={{ color: '#333', lineHeight: '1.6' }}>
                    <li><strong>JSONPlaceholder API:</strong> Provides demo user data and posts that are transformed into business cards</li>
                    <li><strong>Real-time Data:</strong> Card information is fetched from external sources and displayed dynamically</li>
                    <li><strong>Hybrid Storage:</strong> Combines API data with local storage for favorites and user preferences</li>
                    <li><strong>Error Handling:</strong> Graceful fallback to local data if API is unavailable</li>
                </ul>
            </div>

            <div style={{
                backgroundColor: '#f8f9fa',
                padding: '2rem',
                borderRadius: '12px',
                marginBottom: '2rem'
            }}>
                <h2 style={{ marginTop: '0', color: '#495057' }}>Technical Features</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1rem',
                    marginTop: '1rem'
                }}>
                    <div style={{ color: '#333' }}>
                        <h4 style={{ margin: '0 0 0.5rem 0', color: '#007bff' }}>API Integration</h4>
                        <p style={{ margin: '0', fontSize: '0.9rem' }}>RESTful API calls with async/await</p>
                    </div>
                    <div style={{ color: '#333' }}>
                        <h4 style={{ margin: '0 0 0.5rem 0', color: '#007bff' }}>Responsive Design</h4>
                        <p style={{ margin: '0', fontSize: '0.9rem' }}>Works on desktop, tablet, and mobile</p>
                    </div>
                    <div style={{ color: '#333' }}>
                        <h4 style={{ margin: '0 0 0.5rem 0', color: '#007bff' }}>Modern UI</h4>
                        <p style={{ margin: '0', fontSize: '0.9rem' }}>Clean, intuitive user interface</p>
                    </div>
                    <div style={{ color: '#333' }}>
                        <h4 style={{ margin: '0 0 0.5rem 0', color: '#007bff' }}>Fast Loading</h4>
                        <p style={{ margin: '0', fontSize: '0.9rem' }}>Optimized performance and caching</p>
                    </div>
                </div>
            </div>

            <div style={{
                textAlign: 'center',
                padding: '2rem',
                backgroundColor: '#28a745',
                color: 'black',
                borderRadius: '12px',
                marginBottom: '2rem'
            }}>
                <h2 style={{ marginTop: '0' }}> Get Started Today!</h2>
                <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                    Join our community of businesses and customers. Create your account and start exploring!
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => window.location.href = '/register'}
                        style={{
                            backgroundColor: 'white',
                            color: '#28a745',
                            border: 'none',
                            padding: '0.75rem 2rem',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        Register Now
                    </button>
                    <button
                        onClick={() => window.location.href = '/'}
                        style={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            border: '2px solid white',
                            padding: '0.75rem 2rem',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        Browse Cards
                    </button>
                </div>
            </div>

            <div style={{
                fontSize: '0.9rem',
                color: '#666',
                textAlign: 'center',
                padding: '1rem',
                borderTop: '1px solid #dee2e6'
            }}>
                <p style={{ margin: '0' }}>
                    Built as part of a full-stack development course • Demonstrates React, API integration, and modern web practices
                </p>
            </div>
        </main>
    );
}

export default AboutPage;