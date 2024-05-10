-- User table
CREATE TABLE
    users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(100) NOT NULL,
        address VARCHAR(255),
        phone_number VARCHAR(15)
    );

-- Product table
CREATE TABLE
    products (
        product_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL
        -- Additional attributes like size, weight, allergens, etc. can be added here
    );

-- Order table
CREATE TABLE
    orders (
        order_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users (user_id),
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        delivery_address VARCHAR(255) NOT NULL,
        status VARCHAR(20) DEFAULT 'pending'
    );

-- Order details table
CREATE TABLE
    order_details (
        order_detail_id SERIAL PRIMARY KEY,
        order_id INT REFERENCES orders (order_id),
        product_id INT REFERENCES products (product_id),
        quantity INT NOT NULL,
        special_instructions TEXT
    );

-- Menu table
CREATE TABLE
    menus (
        menu_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT
        -- Additional attributes needed for menus or recipes can be added here
    );

-- Delivery table
CREATE TABLE
    deliveries (
        delivery_id SERIAL PRIMARY KEY,
        order_id INT REFERENCES orders (order_id),
        carrier VARCHAR(100),
        delivery_status VARCHAR(20) DEFAULT 'pending',
        expected_delivery_time TIMESTAMP
    );

INSERT INTO
    users (
        username,
        email,
        password_hash,
        address,
        phone_number
    )
VALUES
    (
        'fitness_guru',
        'fitness@example.com',
        'hashed_password_1',
        '123 Gym St, Fitness City, Country',
        '+1234567890'
    ),
    (
        'muscle_maniac',
        'muscle@example.com',
        'hashed_password_2',
        '456 Protein Ave, Muscle Town, Country',
        '+9876543210'
    );

INSERT INTO
    products (name, description, price)
VALUES
    (
        'Proteinpulver',
        'Vasslebaserat proteinpulver för muskelåterhämtning och tillväxt',
        2999
    ),
    (
        'Kycklingbröst',
        'Färskt kycklingbröst med högt proteininnehåll och lågt fettinnehåll',
        999
    ),
    (
        'Kvarg',
        'Mager kvarg med högt proteininnehåll och lågt kolhydratinnehåll',
        249
    ),
    (
        'Havregryn',
        'Helkornig havregryn för långvarig energi och kolhydratintag',
        399
    ),
    (
        'Ägg',
        'Färska ägg för högvärdigt protein och viktiga näringsämnen',
        499
    ),
    (
        'Tonfisk på burk',
        'Tonfisk i vatten för bekväm proteinkälla',
        199
    ),
    (
        'Keso',
        'Mager keso med högt proteininnehåll och lågt fettinnehåll',
        179
    ),
    (
        'Mandelsmör',
        'Naturligt mandelsmör för hälsosamma fetter och energi',
        799
    );

INSERT INTO
    orders (user_id, delivery_address)
VALUES
    (1, '123 Gym St, Fitness City, Country'),
    (2, '456 Protein Ave, Muscle Town, Country');

INSERT INTO
    order_details (
        order_id,
        product_id,
        quantity,
        special_instructions
    )
VALUES
    (1, 1, 2, 'No flavor preference'),
    (1, 2, 1, 'Skinless and boneless only'),
    (2, 3, 3, 'Low fat only');

INSERT INTO
    menus (name, description)
VALUES
    (
        'Bulk Breakfast',
        'High protein and high calorie breakfast options for bulking'
    ),
    (
        'Bulk Lunch',
        'Nutrient-dense lunch options for bulking phase'
    ),
    (
        'Bulk Dinner',
        'Protein-rich and satisfying dinner options for bulking phase'
    );

INSERT INTO
    deliveries (order_id, carrier, expected_delivery_time)
VALUES
    (1, 'BulkDelivery', '2024-05-10 09:00:00'),
    (2, 'MuscleExpress', '2024-05-10 12:00:00');
