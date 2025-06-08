import Router from './Router'

function App() {
  // Watermark styles
  const watermarkStyle = {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    fontSize: '11px',
    color: 'rgba(50, 50, 50, 0.85)',
    fontFamily: 'Arial, sans-serif',
    fontWeight: '500',
    userSelect: 'none',
    zIndex: 1000,
    padding: '4px 8px',
    borderRadius: '4px',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(2px)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
    lineHeight: '1',
  };

  const linkStyle = {
    color: 'rgba(37, 99, 235, 0.85)',
    textDecoration: 'none',
    cursor: 'pointer',
    pointerEvents: 'auto',
    transition: 'color 0.2s ease',
  };

  return (
    <>
      <Router />
      <div style={watermarkStyle}>
        Developed by <a 
          href="https://www.linkedin.com/in/juhil-koshiya/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={linkStyle}
          onMouseEnter={(e) => e.target.style.color = 'rgba(37, 99, 235, 1)'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(37, 99, 235, 0.85)'}
        >
          Juhil Koshiya
        </a>
      </div>
    </>
  )
}

export default App
