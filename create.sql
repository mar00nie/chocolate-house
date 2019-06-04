PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS customers_items;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Shop;
DROP TABLE IF EXISTS Treats;
DROP TABLE IF EXISTS Drinks;

CREATE TABLE Drinks (
  id INT PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  image TEXT NOT NULL
);

CREATE TABLE Treats (
  id INT PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  image TEXT NOT NULL
);

CREATE TABLE Shop (
  id INT PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  image TEXT NOT NULL
);

CREATE TABLE Customers (
  email TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE customers_items (
  custEmail TEXT,
  itemId INT,
  totalPrice INT NOT NULL,
  quantity INT NOT NULL,
  orderDate DATETIME NOT NULL,
  FOREIGN KEY (custEmail) REFERENCES Customers (email),
  FOREIGN KEY (itemId) REFERENCES Shop (id)
);


INSERT INTO Drinks VALUES (1, 'white', 3.5, 'white.png');
INSERT INTO Drinks VALUES (2, 'roasted white', 3.5, 'roastw.png');
INSERT INTO Drinks VALUES (3, 'milk', 3.5, 'milk.png');
INSERT INTO Drinks VALUES (4, 'classic', 3.5, 'classic.png');
INSERT INTO Drinks VALUES (5, 'dark', 3.5, 'dark.png');
INSERT INTO Drinks VALUES (6, 'very original', 3.5, 'original.png');
INSERT INTO Drinks VALUES (7, 'latte', 2.9, 'latte.png');
INSERT INTO Drinks VALUES (8, 'americano', 2.7, 'americano.png');
INSERT INTO Drinks VALUES (9, 'cappuccino', 2.9, 'capp.png');
INSERT INTO Drinks VALUES (10, 'flat white', 2.9, 'flatw.png');
INSERT INTO Drinks VALUES (11, 'mocha', 3.5, 'mocha.png');
INSERT INTO Drinks VALUES (12, 'espresso', 2.7, 'espresso.png');

INSERT INTO Treats VALUES (1, 'chocolate dream cake', 3.5, 'choccake.jpg');
INSERT INTO Treats VALUES (2, 'salted caramel cake', 3.5, 'caramelcake.jpg');
INSERT INTO Treats VALUES (3, 'victoria sponge', 3.5, 'sponge.jpg');
INSERT INTO Treats VALUES (4, 'carrot cake', 3.5, 'carrotcake.jpg');
INSERT INTO Treats VALUES (5, 'chocolate cupcake', 3.1, 'choccupcake.jpg');
INSERT INTO Treats VALUES (6, 'vanilla cupcake', 3.1, 'vanillacupcake.jpg');
INSERT INTO Treats VALUES (7, 'chocolate chip cookie sandwich', 2.5, 'chocchipsandwich.jpg');
INSERT INTO Treats VALUES (8, 'double chocolate cookie sandwich', 2.5, 'doublechocsandwich.jpg');
INSERT INTO Treats VALUES (9, 'double chocolate cookie', 2.1, 'doublechoccookies.jpg');
INSERT INTO Treats VALUES (10, 'dulce de leche', 2.1, 'dulcedeleche.jpg');
INSERT INTO Treats VALUES (11, 'chocolate walnut brownie', 2.1, 'chocwalnutbr.jpg');
INSERT INTO Treats VALUES (12, 'white chocolate blondie', 2.1, 'blondie.jpg');

INSERT INTO Shop VALUES (1, 'vanilla cupcakes (12 pcs)', 22.50, 'vanillacupcake.jpg');
INSERT INTO Shop VALUES (2, 'salted caramel cake (whole)', 50, 'caramelcake.jpg');
INSERT INTO Shop VALUES (3, 'dulce de leche (12 pcs)', 30, 'dulcedeleche.jpg');
INSERT INTO Shop VALUES (4, 'chocolate walnut brownies (12 pcs)', 30, 'chocwalnutbr.jpg');
INSERT INTO Shop VALUES (5, 'double chocolate cookie sandwich (6 pcs)', 17, 'doublechoccookies.jpg');
INSERT INTO Shop VALUES (6, 'chocolate dream cake (whole)', 50, 'choccake.jpg');
INSERT INTO Shop VALUES (7, 'milk chocolate', 2.5, 'mbar.jpg');
INSERT INTO Shop VALUES (8, 'honeycomb chocolate', 3.5, 'hbar.jpg');
INSERT INTO Shop VALUES (9, 'mint chocolate', 2.5, 'mint.jpg');
INSERT INTO Shop VALUES (10, 'orange chocolate', 2.5, 'obar.jpg');
INSERT INTO Shop VALUES (11, 'sea salt caramel', 2.5, 'cbar.jpg');


SELECT * FROM Drinks;
SELECT * FROM Treats;
SELECT * FROM Shop;
SELECT * FROM Customers;
SELECT * FROM customers_items;
