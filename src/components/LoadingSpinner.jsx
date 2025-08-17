function LoadingSpinner() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#121212',
            flexDirection: 'column'
        }}>
            <div style={{
                width: '50px',
                height: '50px',
                border: '3px solid #333',
                borderTop: '3px solid #007bff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{
                color: '#fff',
                marginTop: '1rem',
                fontSize: '1.1rem'
            }}>
                Loading...
            </p>

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

export default LoadingSpinner;