-- CREATE DATABASE admin_monitoring owner student;
-- \c admin_monitoring
-- СТАТИСТИКА
ALTER SYSTEM
SET track_io_timing = on;
-- bash $ pgbench -i admin_monitoring 
SELECT pg_reload_conf();
SELECT pg_stat_reset();
SELECT pg_stat_reset_shared('bgwriter');
-- bash $ pgbench -T 90 admin_monitoring
SELECT *
FROM pg_stat_all_tables
WHERE relid = 'pgbench_accounts'::regclass;
SELECT *
FROM pg_statio_all_tables
WHERE relid = 'pgbench_accounts'::regclass;
SELECT *
FROM pg_stat_all_indexes
WHERE relid = 'pgbench_accounts'::regclass;
SELECT *
FROM pg_statio_all_indexes
WHERE relid = 'pgbench_accounts'::regclass;
SELECT *
FROM pg_stat_database
WHERE datname = 'admin_monitoring';
CHECKPOINT;
SELECT *
FROM pg_stat_bgwriter;
-- ТЕКУЩАЯ АКТИВНОСТЬ
CREATE TABLE t(n integer);
INSERT INTO t
VALUES(42);
-- 1 --psql -d admin_monitoring -U student -h localhost -p 5432
BEGIN;
UPDATE t
SET n = n + 1;
-- 2 --psql -d admin_monitoring -U student -h localhost -p 5432
UPDATE t
SET n = n + 2;
-- 1 ;
SELECT pid,
    query,
    state,
    wait_event,
    wait_event_type,
    pg_blocking_pids(pid)
FROM pg_stat_activity
WHERE backend_type = 'client backend';
-- ЗАВЕРШИТЬ БЛОКИРУЮЩИЙ СЕАНС ВРУЧНУЮ
SELECT pid as blocked_pid
FROM pg_stat_activity
WHERE backend_type = 'client backend'
    AND cardinality(pg_blocking_pids(pid)) > 0;
-- ВЫКЛЮЧИТЬ ПРОЦЕСС(backend), который блокирует процесс 1226
SELECT pg_terminate_backend(b)
FROM unnest(pg_blocking_pids(1226)) as b;
SELECT pid,
    query,
    state,
    wait_event,
    wait_event_type,
    pg_blocking_pids(pid)
FROM pg_stat_activity
WHERE backend_type = 'client backend';
SELECT pid,
    backend_type,
    backend_start,
    state
FROM pg_stat_activity;
-- sudo head -n 1 /var/lib/postgresql/14/main/postmaster.pid
-- sudo ps -f --ppid 35626
---ЛОГИ И АНАЛИЗ ЛОГОВ ------------------------------------------------------
-- sudo grep FATAL/var/log/postgresql/postgresql-14-main.log
