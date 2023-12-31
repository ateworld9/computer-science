[Linux](./Linux.md)

# Виртуализация

Виртуализация — задача поддержки нескольких сред

Эмуляция — задача имитации оборудования для отдельной среды

Системными ресурсы — Процессорное время, память и устройства ввода\вывода.  
Виртуальная машина(_VM_) — Изолированная операционная система  
**Гипервизор** — посредник между _VM_ и аппаратным обеспечением, управляющий системными ресурсами  
Виртуальные машины получают доступ к системным ресурсам **_исключительно_** через гипервизор

### Полная виртуализация

Гипервизор полностью эмулирует базовое оборудование, изолированные ОС используют виртуальные: уст-ва управления прерываниями, сетевые уст-ва, материнские платы, жесткие диски, BIOS…  
**+** Не требует модификации ОС  
**\-** Не требует особого оборудования  
**\-** Низкая скорость(издержки эмуляции всего оборудования)

### Паравиртуализация

Модифицированная ОС распознает свое виртуальное состояние и активно взаимодействует с гипервизором для организации доступа к аппаратному обеспечению

**\-** средняя производительность  
**\-** ОС должны быть сильно модифицированы

### Аппаратная виртуализация

Процессор и контроллер памяти виртуализируется с помощью аппаратного обеспечения, хотя и под управлением гипервизора(для эмуляции аппаратного обеспечения, помимо ЦП)

**\+** Высокая скорость  
**\+** Не требует модификации ОС  
**\-** требуется процессор поддерживающий виртуализацию

### Динамическая миграция

Динамическая миграция — Виртуальные машины могут перемещаться между гипервизорами, работающими на разных физических уст-вах, в реальном времени, без перерывов в обслуживании или потери связи.

### Контейнеризация

Контейнеризация — Виртуализация на уровне ОС при которой используются функции ядра, которые позволяют изолировать процессы от остальной системы

- **Требуется совместимое ядро ОС**(Исключает использование нескольких видов ОС)
- Не требуется виртуализация

У каждого контейнера процесса:

- своя файловую систему
- свое пространство имен процессов
- совместно использует ядро и другие службы хост-системы
- не может обращаться к файлам или ресурсам за пределами своих контейнеров
- Отличия от виртуализации
