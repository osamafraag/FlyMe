CREATE TABLE "complaint"(
    "id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "title" CHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "first_name" CHAR(255) NOT NULL,
    "last_name" CHAR(255) NOT NULL,
    "email" CHAR(255) NOT NULL
);
ALTER TABLE
    "complaint" ADD PRIMARY KEY("id");
CREATE TABLE "route"(
    "id" BIGINT NOT NULL,
    "source_airport_id" BIGINT NOT NULL,
    "destination_airport_id" BIGINT NOT NULL,
    "distance" BIGINT NOT NULL
);
ALTER TABLE
    "route" ADD PRIMARY KEY("id");
CREATE TABLE "booking_history"(
    "id" BIGINT NOT NULL,
    "flight_id" BIGINT NOT NULL,
    "passenger_id" BIGINT NOT NULL,
    "date" DATE NOT NULL,
    "status" BOOLEAN NOT NULL,
    "total_cost" BIGINT NOT NULL,
    "cash_back" BIGINT NOT NULL,
    "class_id" BIGINT NOT NULL,
    "payment_method" VARCHAR(255) CHECK
        ("payment_method" IN('')) NOT NULL,
        "type" VARCHAR(255)
    CHECK
        ("type" IN('')) NOT NULL
);
ALTER TABLE
    "booking_history" ADD PRIMARY KEY("id");
CREATE TABLE "country"(
    "id" BIGINT NOT NULL,
    "name" CHAR(255) NOT NULL,
    "flag" CHAR(255) NOT NULL,
    "calling_code" BIGINT NOT NULL,
    "nationality" BIGINT NOT NULL
);
ALTER TABLE
    "country" ADD PRIMARY KEY("id");
ALTER TABLE
    "country" ADD CONSTRAINT "country_name_unique" UNIQUE("name");
CREATE TABLE "class"(
    "id" BIGINT NOT NULL,
    "name" CHAR(255) NOT NULL,
    "additional_cost" BIGINT NOT NULL,
    "seat_category" VARCHAR(255) CHECK
        ("seat_category" IN('')) NOT NULL,
        "meal_category" VARCHAR(255)
    CHECK
        ("meal_category" IN('')) NOT NULL,
        "drink_category" VARCHAR(255)
    CHECK
        ("drink_category" IN('')) NOT NULL,
        "wifi_availability" BOOLEAN NOT NULL,
        "power_outlet" BOOLEAN NOT NULL,
        "stream_entertainment" BOOLEAN NOT NULL
);
ALTER TABLE
    "class" ADD PRIMARY KEY("id");
CREATE TABLE "flight_routes"(
    "flight_id" BIGINT NOT NULL,
    "route_id" BIGINT NOT NULL,
    "index" BIGINT NOT NULL,
    "date" DATE NOT NULL,
    "time" TIME(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "flight_routes" ADD PRIMARY KEY("flight_id");
ALTER TABLE
    "flight_routes" ADD PRIMARY KEY("route_id");
CREATE TABLE "wallet"(
    "user_id" BIGINT NOT NULL,
    "available_balance" BIGINT NOT NULL,
    "pendding_balance" BIGINT NOT NULL,
    "withdraw" BIGINT NOT NULL
);
ALTER TABLE
    "wallet" ADD PRIMARY KEY("user_id");
CREATE TABLE "user"(
    "id" BIGINT NOT NULL,
    "name" CHAR(255) NOT NULL,
    "username" CHAR(255) NOT NULL,
    "email" CHAR(255) NOT NULL,
    "password" CHAR(255) NOT NULL,
    "gender" VARCHAR(255) CHECK
        ("gender" IN('')) NOT NULL,
        "country_id" BIGINT NOT NULL,
        "DOB" DATE NOT NULL,
        "phone" BIGINT NOT NULL,
        "passport_number" BIGINT NOT NULL,
        "p_expire_date" DATE NOT NULL,
        "address" CHAR(255) NOT NULL,
        "post_code" BIGINT NOT NULL
);
ALTER TABLE
    "user" ADD PRIMARY KEY("id");
ALTER TABLE
    "user" ADD CONSTRAINT "user_username_unique" UNIQUE("username");
ALTER TABLE
    "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");
ALTER TABLE
    "user" ADD CONSTRAINT "user_phone_unique" UNIQUE("phone");
ALTER TABLE
    "user" ADD CONSTRAINT "user_passport_number_unique" UNIQUE("passport_number");
CREATE TABLE "aircraft"(
    "id" BIGINT NOT NULL,
    "name" CHAR(255) NOT NULL,
    "company" BIGINT NOT NULL,
    "capacity" BIGINT NOT NULL,
    "max_load" BIGINT NOT NULL,
    "baggage_weight" BIGINT NOT NULL,
    "max_travel_distance" BIGINT NOT NULL
);
ALTER TABLE
    "aircraft" ADD PRIMARY KEY("id");
CREATE TABLE "flight"(
    "id" BIGINT NOT NULL,
    "aircraft_id" BIGINT NOT NULL,
    "departure_time" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "arrival_time" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "max_baggage" BIGINT NOT NULL,
    "available_seats" BIGINT NOT NULL,
    "cost" BIGINT NOT NULL,
    "availabilty" BOOLEAN NOT NULL,
    "type" VARCHAR(255) CHECK
        ("type" IN('')) NOT NULL,
        "source_country_id" CHAR(255) NOT NULL,
        "destination_country_id" BIGINT NOT NULL
);
ALTER TABLE
    "flight" ADD PRIMARY KEY("id");
CREATE TABLE "airport"(
    "id" BIGINT NOT NULL,
    "name" CHAR(255) NOT NULL,
    "location" CHAR(255) NOT NULL,
    "country_id" CHAR(255) NOT NULL
);
ALTER TABLE
    "airport" ADD PRIMARY KEY("id");
ALTER TABLE
    "airport" ADD CONSTRAINT "airport_name_unique" UNIQUE("name");
CREATE TABLE "trending_places"(
    "id" BIGINT NOT NULL,
    "name" CHAR(255) NOT NULL,
    "location" CHAR(255) NOT NULL,
    "image" CHAR(255) NOT NULL,
    "rate" BIGINT NOT NULL,
    "country_id" BIGINT NOT NULL,
    "information" CHAR(255) NOT NULL
);
ALTER TABLE
    "trending_places" ADD PRIMARY KEY("id");
CREATE TABLE "user_review"(
    "id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "flight_id" BIGINT NOT NULL,
    "comment" CHAR(255) NOT NULL,
    "rate" INTEGER NOT NULL
);
ALTER TABLE
    "user_review" ADD PRIMARY KEY("id");
CREATE TABLE "payment_card"(
    "user_id" BIGINT NOT NULL,
    "cardholder_name" CHAR(255) NOT NULL,
    "card_number" BIGINT NOT NULL,
    "expiration_date" DATE NOT NULL,
    "CVV" BIGINT NOT NULL
);
ALTER TABLE
    "payment_card" ADD PRIMARY KEY("user_id");
ALTER TABLE
    "payment_card" ADD CONSTRAINT "payment_card_cardholder_name_unique" UNIQUE("cardholder_name");
ALTER TABLE
    "payment_card" ADD CONSTRAINT "payment_card_card_number_unique" UNIQUE("card_number");
CREATE TABLE "transaction"(
    "user_id" BIGINT NOT NULL,
    "amount" BIGINT NOT NULL,
    "date" DATE NOT NULL,
    "type" VARCHAR(255) CHECK
        ("type" IN('')) NOT NULL
);
ALTER TABLE
    "transaction" ADD PRIMARY KEY("user_id");
ALTER TABLE
    "booking_history" ADD CONSTRAINT "booking_history_class_id_foreign" FOREIGN KEY("class_id") REFERENCES "class"("id");
ALTER TABLE
    "booking_history" ADD CONSTRAINT "booking_history_passenger_id_foreign" FOREIGN KEY("passenger_id") REFERENCES "user"("id");
ALTER TABLE
    "complaint" ADD CONSTRAINT "complaint_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");
ALTER TABLE
    "user_review" ADD CONSTRAINT "user_review_flight_id_foreign" FOREIGN KEY("flight_id") REFERENCES "flight"("id");
ALTER TABLE
    "booking_history" ADD CONSTRAINT "booking_history_flight_id_foreign" FOREIGN KEY("flight_id") REFERENCES "flight"("id");
ALTER TABLE
    "flight" ADD CONSTRAINT "flight_source_country_id_foreign" FOREIGN KEY("source_country_id") REFERENCES "country"("id");
ALTER TABLE
    "flight_routes" ADD CONSTRAINT "flight_routes_flight_id_foreign" FOREIGN KEY("flight_id") REFERENCES "flight"("id");
ALTER TABLE
    "flight" ADD CONSTRAINT "flight_destination_country_id_foreign" FOREIGN KEY("destination_country_id") REFERENCES "country"("id");
ALTER TABLE
    "user" ADD CONSTRAINT "user_id_foreign" FOREIGN KEY("id") REFERENCES "transaction"("user_id");
ALTER TABLE
    "wallet" ADD CONSTRAINT "wallet_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");
ALTER TABLE
    "user" ADD CONSTRAINT "user_id_foreign" FOREIGN KEY("id") REFERENCES "payment_card"("user_id");
ALTER TABLE
    "flight" ADD CONSTRAINT "flight_aircraft_id_foreign" FOREIGN KEY("aircraft_id") REFERENCES "aircraft"("id");
ALTER TABLE
    "route" ADD CONSTRAINT "route_destination_airport_id_foreign" FOREIGN KEY("destination_airport_id") REFERENCES "airport"("id");
ALTER TABLE
    "route" ADD CONSTRAINT "route_source_airport_id_foreign" FOREIGN KEY("source_airport_id") REFERENCES "airport"("id");
ALTER TABLE
    "airport" ADD CONSTRAINT "airport_country_id_foreign" FOREIGN KEY("country_id") REFERENCES "country"("id");
ALTER TABLE
    "flight_routes" ADD CONSTRAINT "flight_routes_route_id_foreign" FOREIGN KEY("route_id") REFERENCES "route"("id");
ALTER TABLE
    "user" ADD CONSTRAINT "user_country_id_foreign" FOREIGN KEY("country_id") REFERENCES "country"("id");
ALTER TABLE
    "user_review" ADD CONSTRAINT "user_review_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");
ALTER TABLE
    "trending_places" ADD CONSTRAINT "trending_places_country_id_foreign" FOREIGN KEY("country_id") REFERENCES "country"("id");