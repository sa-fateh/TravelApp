import bcrypt from 'bcryptjs';
import { Business, Landmark, TransportAgency, User, Wilaya } from '../models/index.js';

export const seedData = async () => {
  const existingUsers = await User.count();
  if (existingUsers > 0) return;

  const password = await bcrypt.hash('Password123!', 10);
  const [admin, user, owner, agency] = await Promise.all([
    User.create({ name: 'Admin', email: 'admin@travel.com', password, role: 'admin' }),
    User.create({ name: 'Traveler One', email: 'user@travel.com', password, role: 'user' }),
    User.create({ name: 'Hotel Owner', email: 'owner@travel.com', password, role: 'business_owner' }),
    User.create({ name: 'Agency Team', email: 'agency@travel.com', password, role: 'tourist_agency' }),
  ]);

  const [algiers, oran] = await Promise.all([
    Wilaya.create({ name: 'Algiers', description: 'Capital city with seaside and culture.' }),
    Wilaya.create({ name: 'Oran', description: 'Coastal city famous for music and architecture.' }),
  ]);

  await Promise.all([
    Landmark.create({ name: 'Martyrs Memorial', category: 'Monument', location: 'Algiers', description: 'Iconic monument in Algiers.', wilayaId: algiers.id }),
    Landmark.create({ name: 'Fort Santa Cruz', category: 'Historical', location: 'Oran', description: 'Historic fort overlooking Oran.', wilayaId: oran.id }),
  ]);

  await Promise.all([
    Business.create({ name: 'Atlas Hotel', type: 'hotel', address: 'Downtown Algiers', contact: '+213-555-111', description: '4-star business hotel.', rating: 4.4, wilayaId: algiers.id, ownerId: owner.id, isApproved: true }),
    Business.create({ name: 'Taste of Oran', type: 'restaurant', address: 'Oran Marina', contact: '+213-555-222', description: 'Seafood and local cuisine.', rating: 4.7, wilayaId: oran.id, ownerId: owner.id, isApproved: true }),
  ]);

  await TransportAgency.create({ name: 'Sahara Travels', contact: '+213-555-333', services: 'Airport transfer, city tours, desert trips', ownerId: agency.id });

  console.log(`Seed complete. Admin user: ${admin.email}, sample traveler: ${user.email}`);
};
