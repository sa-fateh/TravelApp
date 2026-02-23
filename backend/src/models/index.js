import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { isEmail: true } },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('visitor', 'user', 'business_owner', 'tourist_agency', 'admin'), defaultValue: 'user' },
});

const Wilaya = sequelize.define('Wilaya', {
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.TEXT, allowNull: false },
});

const Landmark = sequelize.define('Landmark', {
  name: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
});

const Business = sequelize.define('Business', {
  name: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.ENUM('hotel', 'restaurant'), allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  contact: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  rating: { type: DataTypes.FLOAT, defaultValue: 0 },
  isApproved: { type: DataTypes.BOOLEAN, defaultValue: false },
});

const Reservation = sequelize.define('Reservation', {
  date: { type: DataTypes.DATEONLY, allowNull: false },
  status: { type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'), defaultValue: 'pending' },
});

const Review = sequelize.define('Review', {
  rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
  comment: { type: DataTypes.TEXT, allowNull: false },
  response: { type: DataTypes.TEXT },
});

const TransportAgency = sequelize.define('TransportAgency', {
  name: { type: DataTypes.STRING, allowNull: false },
  contact: { type: DataTypes.STRING, allowNull: false },
  services: { type: DataTypes.TEXT, allowNull: false },
});

const HouseRental = sequelize.define('HouseRental', {
  address: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  contact: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
});

Wilaya.hasMany(Landmark, { foreignKey: 'wilayaId' });
Landmark.belongsTo(Wilaya, { foreignKey: 'wilayaId' });

Wilaya.hasMany(Business, { foreignKey: 'wilayaId' });
Business.belongsTo(Wilaya, { foreignKey: 'wilayaId' });

User.hasMany(Business, { foreignKey: 'ownerId' });
Business.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });

User.hasMany(Reservation, { foreignKey: 'userId' });
Reservation.belongsTo(User, { foreignKey: 'userId' });

Business.hasMany(Reservation, { foreignKey: 'businessId' });
Reservation.belongsTo(Business, { foreignKey: 'businessId' });

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

Business.hasMany(Review, { foreignKey: 'businessId' });
Review.belongsTo(Business, { foreignKey: 'businessId' });

User.hasMany(TransportAgency, { foreignKey: 'ownerId' });
TransportAgency.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });

User.hasMany(HouseRental, { foreignKey: 'userId' });
HouseRental.belongsTo(User, { foreignKey: 'userId' });

export {
  sequelize,
  User,
  Wilaya,
  Landmark,
  Business,
  Reservation,
  Review,
  TransportAgency,
  HouseRental,
};
