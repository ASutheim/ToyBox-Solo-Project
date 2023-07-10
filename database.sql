
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
);

CREATE TABLE "user_email" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR (100) UNIQUE NOT NULL
)


CREATE TABLE "toy_info" (
    "id" SERIAL PRIMARY KEY,
    "owner_id" INTEGER NOT NULL,
    "name" VARCHAR (100) NOT NULL,
    "picture_url" VARCHAR (10000),
    "description" VARCHAR (10000),
    "status" VARCHAR (30),
    "date_created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "toy_category" (
    "toy_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL
);

CREATE TABLE "toy_age" (
    "toy_id" INTEGER NOT NULL,
    "age_id" INTEGER NOT NULL
);

CREATE TABLE "age" (
      "id" SERIAL PRIMARY KEY,
      "age_name" VARCHAR (30)
);

CREATE TABLE "category" (
    "id" SERIAL PRIMARY KEY,
    "category_name" VARCHAR (30)
);

INSERT INTO "age" ("id", "age_name") 
VALUES (1, '0-2 year olds'),
(2, '2-4 year olds'),
(3, '4-6 year olds'),
(4, '7 and up'),
(5, '10 and up'),
(6, '12 and up'),
(7, 'Any age!');

INSERT INTO "category" ("id", "category_name")
VALUES (1, 'Outdoors'),
(2, 'Sports'),
(3, 'STEM'),
(4, 'Art and Music'),
(5, 'Language/Reading'),
(6, 'Play Pretend'),
(7, 'Dolls/Figurines'),
(8, 'Animals'),
(9, 'Vehicles'),
(10, 'Tools'),
(11, 'Puzzles'),
(12, 'Games'),
(13, 'Electronics'),
(14, 'Building'),
(15, 'Collectibles'),
(16, 'Sensory');

--SAMPLE DATA FOR TESTING:

INSERT INTO "user" ("id", "username", "password")
VALUES (1, 'Me', 'password'),
(2, 'Maryyy', 'password'),
(3, 'Solhaus', 'password'),
(4, 'JoNiels', 'password'),
(5, 'TenthouseFam', 'password'),
(6, 'QuinnAndCompany', 'password')


INSERT INTO "user_email" ("id", "email")
VALUES (1, 'anna@my_email.com'),
(2, 'user@mary_email.com'),
(3, 'user@email.com'),
(4, 'user3@email.com'),
(5, 'user@tenthousegarden.org'),
(6, 'quinn@quinnhaus')


INSERT INTO "toy_info" ("id", "owner_id", "name", "picture_url", "description", "status")
VALUES (1, 1, 'Rainbow Slinky', 'https://www.windycitynovelties.com/jumbo-rainbow-magic-spring.html?rmsrc=1&gclid=Cj0KCQjw7uSkBhDGARIsAMCZNJtWQTUAHtJvd7IsXseZAj8fI7iMpdQms1FcUN90LIT5Kog5r9AqdB8aAiT2EALw_wcB', 'So much fun on stairs!', 'available'), 
(2, 1, 'Finger Puppets', 'https://cdn.shoplightspeed.com/shops/605340/files/44641348/1652x1652x2/estella-animal-finger-puppets-crochet-safari.jpg', 'My mom made these, so cute', 'available'),
(3, 1, 'Bubble wand', 'https://s7.orientaltrading.com/is/image/OrientalTrading/PDP_VIEWER_IMAGE/small-bubble-wands-12-pc-~12_4927', 'We have a ton of these left over from a party, come get as many as you want!', 'available'),
(4, 2, 'Train tracks',  'https://assets.maisonette.com/spree/images/attachments/000/352/634/product_zoom/pbxukwyszsfmmfunoope.jpg?1622754911=&width=375&format=webp&crop=1%3A1', 'My kids have done a fair amount of scribble on the tracks but they are still fun to play with', 'available'),
(5, 2, 'Watering can',  'https://www.zoro.com/static/cms/product/full/Buy%20Supply%20Inc%20dba%20Linq%20USA%20Corp_bus141783trvxxfb6919.jpeg', 'You might not think your kids will enjoy this... trust me, they will', 'available'), 
(6, 3, 'Play food',  'https://www.melissaanddoug.com/cdn/shop/products/Cutting-Food-000487-1-Pieces-Out_d34886be-35c2-4db7-85b3-b03229d35284.jpg?v=1666634911&width=670', 'It''s got some toothmarks on it', 'available'), 
(7, 3, 'Puzzle', 'https://www.howwemontessori.com/.a/6a0147e1d4f40f970b0240a5106340200b-800wi', 'Missing one piece', 'available');

INSERT INTO "toy_age" ("toy_id", "age_id")
VALUES (1, 7), (2, 7), (3, 2), (3, 3), (4, 2), (4, 3), 
(4, 4), (5, 7), (6, 1), (6, 2), (6, 3), (6, 4), (7, 2), (7, 3);

INSERT INTO "toy_category" ("toy_id", "category_id")
VALUES (1, 3), (1, 16), (2, 6), (2, 7), (2, 8), (3, 1), 
(3, 16), (4, 9), (4, 14), (5, 1), (5, 3), (5, 16), (6, 6), (7, 11), (7, 9);