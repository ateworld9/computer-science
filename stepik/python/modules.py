# import requests

# # Ссылка на файл с адресом другого файла
# file_url = "https://stepic.org/media/attachments/course67/3.6.2/429.txt"

# # Загрузка файла
# response = requests.get(file_url.strip())

# # Проверка успешности запроса
# if response.status_code == 200:
#     # Получение текста из файла
#     file_text = response.text

#     # Подсчет числа строк
#     num_lines = len(file_text.splitlines())

#     print("Число строк в файле:", num_lines)
# else:
#     print("Ошибка при загрузке файла.")

import requests

# Ссылка на первый файл
first_file_url = "https://stepic.org/media/attachments/course67/3.6.3/699991.txt"

# Загрузка содержимого последнего файла
current_file_url = first_file_url
while True:
    response = requests.get(current_file_url.strip())
    if response.status_code == 200:
        file_text = response.text.strip()

        # Проверка, является ли текущий файл последнимa
        if file_text.startswith("We"):
            break

        # Получение ссылки на следующий файл
        current_file_url = "https://stepic.org/media/attachments/course67/3.6.3/" + file_text
        # Вывод содержимого последнего файла
        print(file_text)
    else:
        print("Ошибка при загрузке файла.")
        break

'''
We are the champions, my friends,
And we'll keep on fighting 'til the end.
We are the champions.
We are the champions.
No time for losers
'Cause we are the champions of the world.
'''
