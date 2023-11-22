CREATE TABLE admin.tenants (
    id INT AUTO_INCREMENT,
    tenant_name VARCHAR(100) UNIQUE,
    can_access BOOLEAN,
    valid_till DATETIME,
    PRIMARY KEY (id)
);

-- INSERT INTO admin.tenants (tenant_name, can_access, valid_till) VALUES 
-- ('harsh', TRUE, '2023-12-31 23:59:59'),
-- ('anwar', FALSE, '2023-12-31 23:59:59'),
-- ('anushka', TRUE, '2024-12-31 23:59:59'),
-- ('shiv', TRUE, '2023-11-15 23:59:59');

-- SELECT * FROM admin.tenants; 

-- DROP TABLE admin.users;

CREATE TABLE admin.users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    last_login DATETIME,
    created_on DATETIME
);

-- select * from admin.users;
