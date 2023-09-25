SELECT digest('Hello, world!', 'md5');
CREATE EXTENSION pg_crypto;
CREATE DATABASE db;
ALTER DATABASE db RENAME TO appdb;
ALTER DATABASE appdb CONNECTION LIMIT 10;

SELECT * FROM pg_tablespace; -- \db

SELECT * FROM pg_database; -- \l
SELECT datname, datistemplate, datallowconn, datconnlimit FROM pg_database;
SELECT pg_size_pretty(pg_database_size('appdb'));
SELECT * FROM pg_authid WHERE rolname NOT LIKE 'pg%'; -- \du


-- СХЕМА(NAMESPACE) - если в субд несколько баз данных и имена их объектов пересекаются, нужно разделить их по разным схемам
SELECT * FROM pg_namespace; -- \dn
CREATE SCHEMA app;
SELECT current_schemas(true);
CREATE TABLE t (s text);
INSERT INTO t VALUES('table - t');
ALTER TABLE t SET SCHEMA app;
SELECT * FROM app.t;
SHOW search_path;
ALTER DATABASE appdb SET search_path = app;

-- ВРЕМЕННЫЕ ТАБЛИЦЫ(TEMP TABLES)

CREATE TEMP TABLE t(s text);
INSERT INTO t VALUES('temp table - t');
SELECT current_schemas(true);
SELECT * FROM app.t;
SELECT * FROM pg_temp.t;

-- \c appdb

DROP SCHEMA app;
DROP SCHEMA app CASCADE;
