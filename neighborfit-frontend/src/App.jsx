import { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({
    quietness: 5,
    budget: 5,
    parks: 5,
    vehicleFriendly: 5,
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value),
    });
  };

  /*//actual code
    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:4000/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to fetch matches');
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };*/

  //my code
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error('Failed to fetch matches');
    const data = await res.json();
    setResults(data);
  } catch (err) {
    setError(err.message || 'Unknown error');
  } finally {
    setLoading(false);
  }
};

  return (
    <div
      style={{
        maxWidth: 650,
        margin: '40px auto',
        padding: 30,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#f5f7fa',
        borderRadius: 12,
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          color: '#2c3e50',
          marginBottom: 30,
          fontWeight: '700',
          letterSpacing: '1.2px',
        }}
      >
        NeighborFit - Find Your Best Neighborhood
      </h1>

      <form onSubmit={handleSubmit}>
        {['quietness', 'budget', 'parks', 'vehicleFriendly'].map((key) => (
          <div
            key={key}
            style={{
              marginBottom: 25,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <label
              htmlFor={key}
              style={{
                marginBottom: 8,
                fontSize: 16,
                fontWeight: '600',
                color: '#34495e',
                textTransform: 'capitalize',
              }}
            >
              {key.replace(/([A-Z])/g, ' $1')} (1 - 10):
            </label>
            <input
              id={key}
              type="number"
              name={key}
              min={1}
              max={10}
              value={formData[key]}
              onChange={handleChange}
              required
              style={{
                padding: '10px 14px',
                fontSize: 16,
                borderRadius: 6,
                border: '1.8px solid #bdc3c7',
                transition: 'border-color 0.3s ease',
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#2980b9')}
              onBlur={(e) => (e.target.style.borderColor = '#bdc3c7')}
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px 0',
            backgroundColor: loading ? '#7f8c8d' : '#2980b9',
            color: '#fff',
            fontSize: 18,
            fontWeight: '700',
            border: 'none',
            borderRadius: 8,
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: loading
              ? 'none'
              : '0 4px 10px rgba(41, 128, 185, 0.4)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            if (!loading) e.target.style.backgroundColor = '#1c5980';
          }}
          onMouseLeave={(e) => {
            if (!loading) e.target.style.backgroundColor = '#2980b9';
          }}
        >
          {loading ? 'Matching...' : 'Find Neighborhoods'}
        </button>
      </form>

      {error && (
        <p
          style={{
            color: '#e74c3c',
            marginTop: 25,
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          {error}
        </p>
      )}

      {results.length > 0 && (
        <div
          style={{
            marginTop: 40,
            backgroundColor: '#fff',
            padding: 25,
            borderRadius: 12,
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          }}
        >
          <h2
            style={{
              marginBottom: 20,
              color: '#2c3e50',
              borderBottom: '2px solid #2980b9',
              paddingBottom: 8,
              fontWeight: '700',
            }}
          >
            Matched Neighborhoods:
          </h2>
          <ul
            style={{
              listStyleType: 'none',
              paddingLeft: 0,
              maxHeight: 300,
              overflowY: 'auto',
            }}
          >
            {results.map((n) => (
              <li
                key={n.id}
                style={{
                  marginBottom: 18,
                  padding: 15,
                  borderRadius: 8,
                  backgroundColor: '#ecf0f1',
                  boxShadow: 'inset 0 0 5px rgba(0,0,0,0.05)',
                }}
              >
                <strong
                  style={{ fontSize: 18, color: '#34495e', display: 'block' }}
                >
                  {n.name}
                </strong>
                <span style={{ color: '#7f8c8d', fontSize: 14 }}>
                  Quietness: {n.quietness} | Budget: {n.budget} | Parks:{' '}
                  {n.parks} | Vehicle Friendly: {n.vehicleFriendly}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
