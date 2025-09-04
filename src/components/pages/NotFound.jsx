import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    return (
        <main>
            <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                maxWidth: '600px',
                margin: '0 auto'
            }}>
                <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>404</div>
                <h1 style={{ 
                    fontSize: '2.5rem', 
                    marginBottom: '1rem',
                    color: '#333'
                }}>
                    Page Not Found
                </h1>
                <p style={{ 
                    fontSize: '1.2rem', 
                    color: '#666',
                    marginBottom: '3rem',
                    lineHeight: '1.6'
                }}>
                    Sorry, the page you are looking for doesn't exist or has been moved.
                    Let's get you back to where you need to be.
                </p>

                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            padding: '0.75rem 2rem',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '500',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#0056b3';
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#007bff';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        🏠 Go Home
                    </button>
                    
                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            padding: '0.75rem 2rem',
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '500',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#545b62';
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#6c757d';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        ← Go Back
                    </button>
                </div>

                <div style={{
                    marginTop: '4rem',
                    padding: '2rem',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '12px',
                    border: '1px solid #dee2e6'
                }}>
                    <h3 style={{ color: '#333', marginBottom: '1rem' }}>Popular Pages</h3>
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <button
                            onClick={() => navigate('/about')}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#007bff',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                textDecoration: 'underline'
                            }}
                        >
                            About Us
                        </button>
                        <button
                            onClick={() => navigate('/favorites')}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#007bff',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                textDecoration: 'underline'
                            }}
                        >
                            Favorites
                        </button>
                        <button
                            onClick={() => navigate('/my-cards')}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#007bff',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                textDecoration: 'underline'
                            }}
                        >
                            My Cards
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default NotFound;
