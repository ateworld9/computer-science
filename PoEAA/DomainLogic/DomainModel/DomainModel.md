[PoEAA](../../PoEAA.md)

# Domain Module

- Добавляет слой объектов, описывающих различные стороны определенной области бизнеса.
- Обычно в ходе выполнения сеанса в память загружается полный граф объектов.
- Может сочетается с [Row Data Gateway](../../DataSource/RowDataGateway/RowDataGateway.md) и [Table Data Gateway](../../DataSource/TableDataGateway/TableDataGateway.md)

Две разновидности:

- **Простая** - Во многом походит на схему базы данных и содержит по одному объекту на каждую таблицу.
  - Достаточно применять [Active Record](../../ObjRelDataSource/ActiveRecord/ActiveRecord.md)
- **Сложная** - Может отличаться от структуры базы данных, содержать иерархии наследования, [Стратегии](../../../GOF/Behavioral/Strategy/Strategy.md) и [другие паттерны](../../../GOF/Patterns.md), а также сложные сети мелких взаимосвязанных объектов.
  - Более удачно представляет сложную бизнес-логику, но труднее поддается отображению в реляционную БД
  - Не обойтись без [Data Mapper](../../ObjRelDataSource/DataMapper/DataMapper.md)
