[PoEAA](../../PoEAA.md)

# Service Layer

Service Layer - Определяет границы приложения и множество операций, предоставляемых им для интерфейсных клиентских слоев кода.

- Инкапсулирует бизнес-логику приложения(application logic)
- Управляет транзакциями
- Координирует реакции на действия.

### Разновидности бизнес-логики:

**Domain logic** - имеет дело только с предметной областью как таковой (прим. стратегия определения зачтенного дохода)

**Application logic** - описывает сферу ответственности приложения (прим. уведомляет пользователей и сторонние приложения о протекании процесса вычисления доходов)

Смешивание логики приводит к:

1. **Domain logic** сложнее повторно использовать, если они специфическую реализуют **application logic** и зависят от тех или иных прикладных библиотек-инструментов.
1. Затрудняет возможность новой реализации **application logic** с помощью специфичных библиотек-инструментов

### Варианты реализации

- Domain facade - набор "тонких" интерфейсов, натянутых на _Domain Module_.
  - Устанавливает границы.
  - Определяет множество операций посредством которых клиентские слои взаимодействуют с приложением.
- Operation script - воплощает в себе application logic, но за бизнес логикой обращаются к классам домена.

Небольшому приложению вполне может хватить одной абстракции, названной по имени самого приложения. Более крупные приложения обычно разбиваются на несколько подсистем, каждая из которых включает в себя вертикальный срез всех имеющихся архитектурных слоев. В этом случае я предпочитаю создавать по одной одноименной абстракции для каждой подсистемы. В качестве альтернатив можно предложить создание абстракций, отражающих основные составляющие модели предметной области, если таковые отличаются от подсистем или абстракций, названных в соответствии с типами поведения.