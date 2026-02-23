import { useMemo, useState } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [reservation, setReservation] = useState({ date: '', businessId: '' });
  const [review, setReview] = useState({ rating: 5, comment: '', businessId: '' });
  const [rental, setRental] = useState({ address: '', price: '', contact: '', description: '' });

  const roleSummary = useMemo(() => {
    if (!user) return 'Please login.';
    if (user.role === 'admin') return 'Admin: manage users, approve businesses, and moderate landmarks.';
    if (user.role === 'business_owner') return 'Business Owner: manage profile, reservations, and respond to reviews.';
    if (user.role === 'tourist_agency') return 'Tourist Agency: publish and update transportation services.';
    return 'Registered User: book reservations, leave reviews, and upload house rentals.';
  }, [user]);

  const post = async (url, payload) => {
    try {
      await api.post(url, payload);
      setMessage('Action completed successfully.');
    } catch {
      setMessage('Failed to submit action. Check role permissions or payload.');
    }
  };

  if (!user) return <section><h1>Dashboard</h1><p>Please login first.</p></section>;

  return (
    <section>
      <h1>{user.name}'s Dashboard</h1>
      <p>{roleSummary}</p>
      {message && <p>{message}</p>}

      {user.role === 'user' && (
        <div className="grid">
          <article className="card">
            <h3>Make Reservation</h3>
            <input type="date" value={reservation.date} onChange={(e) => setReservation({ ...reservation, date: e.target.value })} />
            <input placeholder="Business ID" value={reservation.businessId} onChange={(e) => setReservation({ ...reservation, businessId: e.target.value })} />
            <button onClick={() => post('/reservations', reservation)}>Reserve</button>
          </article>
          <article className="card">
            <h3>Leave Review</h3>
            <input placeholder="Business ID" value={review.businessId} onChange={(e) => setReview({ ...review, businessId: e.target.value })} />
            <input type="number" min="1" max="5" value={review.rating} onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })} />
            <textarea placeholder="Your comment" value={review.comment} onChange={(e) => setReview({ ...review, comment: e.target.value })} />
            <button onClick={() => post('/reviews', review)}>Submit Review</button>
          </article>
          <article className="card">
            <h3>Upload House Rental</h3>
            <input placeholder="Address" value={rental.address} onChange={(e) => setRental({ ...rental, address: e.target.value })} />
            <input placeholder="Price" value={rental.price} onChange={(e) => setRental({ ...rental, price: e.target.value })} />
            <input placeholder="Contact" value={rental.contact} onChange={(e) => setRental({ ...rental, contact: e.target.value })} />
            <textarea placeholder="Description" value={rental.description} onChange={(e) => setRental({ ...rental, description: e.target.value })} />
            <button onClick={() => post('/profile/house-rentals', rental)}>Publish Rental</button>
          </article>
        </div>
      )}
    </section>
  );
};

export default DashboardPage;
