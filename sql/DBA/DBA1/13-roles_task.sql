CREATE ROLE creator WITH NOLOGIN CREATEROLE CREATEDB;
CREATE ROLE weak WITH LOGIN;
CREATE TABLE test (id integer);
GRANT creator TO weak;
