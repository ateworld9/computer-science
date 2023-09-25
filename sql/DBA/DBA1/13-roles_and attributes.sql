-- Attributes: 
-- SUPERUSER
-- LOGIN
-- CREATEDB
-- CREATEROLE
-- REPLICATION
--
CREATE DATABASE access_roles;
-- \c access_roles
CREATE ROLE alice WITH LOGIN CREATEROLE;
-- \c - alice
CREATE ROLE bob WITH LOGIN;
-- psql -U bob -d access_roles
--  \du
ALTER ROLE bob NOLOGIN;
-- включение роли в группу
GRANT dba TO alice;
-- исключение роли из группы
REVOKE dba
FROM alice;
--------------------------------------------
-- все команды попадали в log
ALTER ROLE alice
SET log_min_duration_statement = 0;
ALTER ROLE alice RESET log_min_duration_statement;
-- все команды в access_roles попадали в log
ALTER ROLE alice IN DATABASE access_roles
SET log_min_duration_statement = 0;
-----------------------------------
--- получить права группы student(если состоишь в этой группе)
SET ROLE student;
SELECT session_user,
    current_user;
RESET ROLE;
-- вернуть старые права
SELECT session_user,
    current_user;
