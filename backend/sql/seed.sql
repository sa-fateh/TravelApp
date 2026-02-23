INSERT INTO users(name,email,password,role) VALUES
('Admin','admin@travel.com','$2a$10$JdNzcn5dpz3j2Yt2VioZ9e9sQXgXm/p1mQ2KNfV8hly4s89fU1TYa','admin'),
('Traveler One','user@travel.com','$2a$10$JdNzcn5dpz3j2Yt2VioZ9e9sQXgXm/p1mQ2KNfV8hly4s89fU1TYa','user'),
('Hotel Owner','owner@travel.com','$2a$10$JdNzcn5dpz3j2Yt2VioZ9e9sQXgXm/p1mQ2KNfV8hly4s89fU1TYa','business_owner'),
('Agency Team','agency@travel.com','$2a$10$JdNzcn5dpz3j2Yt2VioZ9e9sQXgXm/p1mQ2KNfV8hly4s89fU1TYa','tourist_agency');

INSERT INTO wilayas(name,description) VALUES
('Algiers','Capital city with seaside and culture.'),
('Oran','Coastal city famous for music and architecture.');

INSERT INTO landmarks(name,category,location,description,wilaya_id) VALUES
('Martyrs Memorial','Monument','Algiers','Iconic monument in Algiers.',1),
('Fort Santa Cruz','Historical','Oran','Historic fort overlooking Oran.',2);

INSERT INTO businesses(name,type,address,contact,description,rating,is_approved,wilaya_id,owner_id) VALUES
('Atlas Hotel','hotel','Downtown Algiers','+213-555-111','4-star business hotel.',4.4,TRUE,1,3),
('Taste of Oran','restaurant','Oran Marina','+213-555-222','Seafood and local cuisine.',4.7,TRUE,2,3);

INSERT INTO transport_agencies(name,contact,services,owner_id) VALUES
('Sahara Travels','+213-555-333','Airport transfer, city tours, desert trips',4);
