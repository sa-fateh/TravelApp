import { useEffect, useState } from 'react';
import api from '../api/client';

const BusinessesPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/businesses').then((res) => setItems(res.data)).catch(() => setItems([]));
  }, []);

  return (
    <section>
      <h1>Hotels & Restaurants</h1>
      <div className="grid">
        {items.map((item) => (
          <article key={item.id} className="card">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p><strong>Type:</strong> {item.type}</p>
            <p><strong>Rating:</strong> {item.rating}</p>
            <p><strong>Address:</strong> {item.address}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BusinessesPage;
