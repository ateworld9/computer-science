[PoEAA](../../PoEAA.md)

# Table Data Gateway (Шлюз Таблицы Данных)

Объект, инкапсулирующий доступ к базе данных.

**Принцип действия**: Передает данные из таблицы и в таблицу. Каждый метод передает входные параметры вызову соответствующей SQL команды.

Как правило, для каждой таблицы создается свой **_Table Data Gateway_**, кроме того отдельные **_Table Data Gateway_** могут быть созданы для представлений(views) и даже некоторых запросов, не хранящихся в базе данных в форме представлений.  
Шлюз для представлений не сможет обновлять данные и поэтому не будет обладать соответствующими методами