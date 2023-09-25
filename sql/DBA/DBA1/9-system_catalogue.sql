-- Системный католог - Набор таблиц и представлений, описывающий все объекты кластера баз данных
CREATE DATABASE data_catalog OWNER STUDENT;
-- \c data_catalog


CREATE TABLE employees(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text,
    manager integer
) ;

CREATE VIEW top_managers AS 
SELECT * FROM employees where manager IS NULL;

-- databases
SELECT * FROM pg_database where datname = 'data_catalog' \gx
-- schemas 
SELECT * FROM pg_namespace where nspname = 'public' \gx -- \dn
-- relations (tables, views, indexes, sequences) -- \dtvis
SELECT relname, relkind, relnamespace, relfilenode, relowner, reltablespace
    FROM pg_class where relname ~ '^(em|top).*';

SELECT schemaname, tablename, tableowner, tablespace FROM pg_tables where schemaname = 'public'; -- \dt
SELECT * FROM pg_views where schemaname = 'public'; -- \dv public.*

-- \d top_managers 


-- Функции
-- \df
-- \dfS pg*size -- функции, включая системные 
-- \sf pg_catalog.pg_database_size(oid) -- показать функцию 


-- все функции psql -- \?


-- \set ECHO_HIDDEN on -- показать какие запросы выполняет psql для комманд
-- \dt employees
-- \unset ECHO_HIDDEN
