-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP table if exists books;

CREATE table books (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR NOT NULL,
  released INT NOT NULL
);

INSERT into books (title, released) VALUES
('Winnie the Pooh', 1984 ),
('Clifford the Big Red Dog', 1940),
('The Giving Tree', 1924);
