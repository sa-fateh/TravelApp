import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';

const roles = ['user', 'business_owner', 'tourist_agency'];

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/auth/register', form);
    setMessage('Registration successful. Redirecting to login...');
    setTimeout(() => navigate('/login'), 800);
  };

  return (
    <section className="form-card">
      <h1>Register</h1>
      <form onSubmit={submit}>
        <input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} minLength={6} required />
        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          {roles.map((role) => <option key={role}>{role}</option>)}
        </select>
        {message && <p>{message}</p>}
        <button type="submit">Create Account</button>
      </form>
    </section>
  );
};

export default RegisterPage;
