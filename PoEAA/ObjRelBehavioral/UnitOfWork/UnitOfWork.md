[PoEAA](../../PoEAA.md)

# Unit of Work

Содержит список объектов, охватываемых бизнес-транзакцией, координирует запись изменений в БД и разрешает проблемы параллелизма.

Если **при каждом изменении** сущностей **изменять БД**, это выльется в гигантское количество мелких запросов к БД, что **значительно снизит производительность**.

tags:  
#db_optimization
