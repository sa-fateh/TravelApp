import { useEffect, useState } from 'react';
import api from '../api/client';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.get('/reviews').then((res) => setReviews(res.data)).catch(() => setReviews([]));
  }, []);

  return (
    <section>
      <h1>Traveler Reviews</h1>
      <div className="grid">
        {reviews.map((review) => (
          <article key={review.id} className="card">
            <h3>{review.Business?.name}</h3>
            <p>{review.comment}</p>
            <p><strong>Rating:</strong> {review.rating}/5</p>
            <small>By: {review.User?.name}</small>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ReviewsPage;
