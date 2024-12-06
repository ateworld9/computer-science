
# Перезаписывает файл полностью
ouf = open('file.txt', 'w', encoding='utf-8')
ouf.write('Some text\n')
ouf.write(str(25))
ouf.close()
with open('text.txt', 'w') as ouf:
    ouf.write('Some text\n')
    ouf.write(str(253))

# здесь файл уже закрыт
