import { useEffect, useState } from 'react';
import api from '../api/client';

const TransportPage = () => {
  const [agencies, setAgencies] = useState([]);

  useEffect(() => {
    api.get('/transport').then((res) => setAgencies(res.data)).catch(() => setAgencies([]));
  }, []);

  return (
    <section>
      <h1>Transportation Services</h1>
      <div className="grid">
        {agencies.map((agency) => (
          <article key={agency.id} className="card">
            <h3>{agency.name}</h3>
            <p>{agency.services}</p>
            <p><strong>Contact:</strong> {agency.contact}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TransportPage;
