import { useEffect, useState } from 'react';
import api from '../api/client';

const HomePage = () => {
  const [wilayas, setWilayas] = useState([]);

  useEffect(() => {
    api.get('/wilayas').then((res) => setWilayas(res.data)).catch(() => setWilayas([]));
  }, []);

  return (
    <section>
      <h1>Explore Algerian Destinations</h1>
      <p>Browse wilayas, discover landmarks, and plan your next trip.</p>
      <div className="grid">
        {wilayas.map((w) => (
          <article key={w.id} className="card">
            <h3>{w.name}</h3>
            <p>{w.description}</p>
            <small>Landmarks: {w.Landmarks?.length || 0}</small>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HomePage;
