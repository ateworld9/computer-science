[План](./00plan.md)

# Введение в EVM и Solidity

Адрес кошелька - последние 20 байт открытого ключа
Адрес смарт-контракта - хеш от смарта наверное

минт - выпуск токенов

storage - persistent memory
memory - оперативная
call_data -

## Data Types

**bool**

operators:! && || == !=

**int(8-256)**
**uint(8-256)**
operators:

- <=, <, ==, !=, >=, > -- приводят к bool
- &, |, ^, ~
- <<, >>
- +, -, \*, /, % , \*\*

type(X).min type(X).max

**fixed**
**ufixed**

- <=, <, ==, !=, >=, > -- приводят к bool
  +, -, \*, /, %

**address**

address: последние 20 байт открытого ключа

address payable

## Видимость

public

internal
