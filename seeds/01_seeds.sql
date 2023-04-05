INSERT INTO users (name, email, password)
  VALUES ('Liu Kang', 'dragon@whitelotus.org', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Johnny Cage', 'yougotcaged@moviestar.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Sonya Blade', 'toughchick@specialforces.us', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Bi Han', 'subzero@linkuei.cn', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Hanzo Hasashi', 'scorpion@shirairyu.jp', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, cost_per_night, parking_spaces, num_of_bathrooms, num_of_bedrooms, thumbnail_url, cover_photo_url, country, province, city, street, postal_code)
  VALUES (1, 'Wu Shi Academy', 'Has some big statues.', 99.99, 0, 1, 1, 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 'China', 'Henan', 'Yellow River', 'Mt. Song', 'n/a'),
  (2, 'The Cage House', 'Big windows, on a hill.', 5000, 6, 4, 4, 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 'U.S.A.', 'California', 'Beverly Hills', '3 Luxury Rd.', '90210'),
  (5, 'Fire Gardens', 'Beautiful scenery, peaceful, fresh air.', 666, 1, 1, 12, 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 'Japan', 'Secret', 'Secret', 'Secret', 'Secret');

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
  VALUES ('2023-01-04', '2023-02-03', 2, 3),
  ('2023-09-04', '2023-10-31', 3, 4),
  ('2023-03-04', '2023-04-03', 2, 1);

INSERT INTO property_reviews (reservation_id, rating, message)
  VALUES (1, 6.5, 'It was messy and had a smell. But the view was nice, and a big patio. Good for party.'),
  (2, 8.5, 'Beautiful scenery as described. Loses 1 point for being full of ninjas trying to kill me.'),
  (3,  3.5, 'Bad energy, not good for meditation.');