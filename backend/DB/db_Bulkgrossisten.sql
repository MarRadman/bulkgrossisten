-- Användartabell
CREATE TABLE
    users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(100) NOT NULL,
        address VARCHAR(255),
        phone_number VARCHAR(15)
    );

-- Produkttabell
CREATE TABLE
    products (
        product_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL
        -- Här kan man lägga till fler attribut som storlek, vikt, allergener etc
    );

-- Beställningstabell
CREATE TABLE
    orders (
        order_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users (user_id),
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        delivery_address VARCHAR(255) NOT NULL,
        status VARCHAR(20) DEFAULT 'pending'
    );

-- Beställningsdetaljerstabell
CREATE TABLE
    order_details (
        order_detail_id SERIAL PRIMARY KEY,
        order_id INT REFERENCES orders (order_id),
        product_id INT REFERENCES products (product_id),
        quantity INT NOT NULL,
        special_instructions TEXT
    );

-- Menytabell
CREATE TABLE
    menus (
        menu_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT
        -- Här kan man lägga till ytterligare attribut som behövs för menyer eller recept
    );

-- Leveranstabell
CREATE TABLE
    deliveries (
        delivery_id SERIAL PRIMARY KEY,
        order_id INT REFERENCES orders (order_id),
        carrier VARCHAR(100),
        delivery_status VARCHAR(20) DEFAULT 'pending',
        expected_delivery_time TIMESTAMP
    );