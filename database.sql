
CREATE TABLE "user_info" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "email" VARCHAR (80) NOT NULL,
    "rules_confirmed" BOOLEAN,
    "age_confirmed" BOOLEAN
);

CREATE TABLE "toy_info" (
    "id" SERIAL PRIMARY KEY,
    "owner_id" INTEGER NOT NULL,
    "name" VARCHAR (100) NOT NULL,
    "cost" DECIMAL,
    "picture_url" VARCHAR (10000),
    "description" VARCHAR (10000),
    "status" VARCHAR (30)
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