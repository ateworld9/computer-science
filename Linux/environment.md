[Linux](./Linux.md)

# Переменные окружения

Переменные командной оболочки — фрагменты данных, инициализируемые командой bash

Переменные окружения — практически все остальное

| DISPLAY | Имя вашего дисплея, если вы работаете в графическом окружении. Обычно это :0, что означает первый дисплей, сгенерированный X сервером                                                                                                                                    |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| EDITOR  | Имя программы, используемой в качестве текстового редактора                                                                                                                                                                                                              |
| SHELL   | Имя программы командной оболочки                                                                                                                                                                                                                                         |
| HOME    | Путь к домашнему каталогу                                                                                                                                                                                                                                                |
| LANG    | Определяет набор символов и порядок сортировки для вашего языка                                                                                                                                                                                                          |
| OLDPWD  | Предыдущий рабочий каталог                                                                                                                                                                                                                                               |
| PAGER   | Имя программы для постраничного просмотра. Часто имеет значение /usr/bin/less                                                                                                                                                                                            |
| PATH    | Список каталогов, разделенных двоеточием, в которых производится поиск выполняемых программ по их именам                                                                                                                                                                 |
| PS1     | Строка приглашения к вводу №1. Определяет содержимое строки приглашения к вводу в командной оболочке. Эту строку можно менять весьма существенно                                                                                                                         |
| PWD     | Текущий рабочий каталог                                                                                                                                                                                                                                                  |
| TERM    | Тип терминала. Unix-подобные системы поддерживают множество протоколов для работы с терминалами; эта переменная определяет протокол, который будет использоваться при обмене данными с эмулятором терминала                                                              |
| TZ      | Определяет часовой пояс. В большинстве Unix-подобных систем внутренние часы компьютера устанавливаются в координированное универсальное время (Coordinated Universal Time, UTC), а при выводе значения времени к нему добавляется смещение, определяемое этой переменной |
| USER    | Ваше имя пользователя                                                                                                                                                                                                                                                    |

### Как устанавливается окружение?

- **Сеанс командной оболочки входа** (login shell session) — это сеанс, который на входе запрашивает имя пользователя и пароль, например, когда вход выполняется в виртуальной консоли.

  | Файл            | Содержит                                                                                                                                                                           |
  | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | /etc/profile    | Общесистемный конфигурационный сценарий, настройки из которого применяются для всех пользователей                                                                                  |
  | ~/.bash_profile | Личный пользовательский файл запуска. Может использоваться для расширения и/или переопределения общесистемных настроек                                                             |
  | ~/.bash_login   | Если файл ~/.bash_profile присутствует в домашнем каталоге, bash пытается прочитать его                                                                                            |
  | ~/.profile      | Если в домашнем каталоге нет ни ~/.bash_profile, ни ~/.bash_login, bash пытается прочитать этот файл. Используется по умолчанию в дистрибутивах на основе Debian, таких как Ubuntu |

- **Сеанс простой командной оболочки** (non-login shell session) обычно начинается, когда запускается терминал в графическом окружении

  | Файл                                                        | Содержит                                                                                          |
  | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
  | /etc/bash.bashrc                                            | Общесистемный конфигурационный сценарий, настройки из которого применяются для всех пользователей |
  | ~/.bashrc                                                   | Личный пользовательский файл запуска. Может использоваться                                        |
  | для расширения и/или переопределения общесистемных настроек |

`printenv` — выводит часть или все окружение

'$VARIABLE'=”abracadabra”

`set` — устанавливает параметры командной оболочки

`export` — экспортировать