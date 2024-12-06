import os

inf = open('file.txt', 'r',  encoding="utf-8")  # open('file.txt')
s1 = inf.readline().strip()
s2 = inf.readline().strip()
print(s1)
print(s2)
inf.close()

with open('text.txt',  encoding="utf-8") as inf:
    s1 = inf.readline().strip()
    s2 = inf.readline().strip()
    print(s1)
    print(s2)
# здесь файл уже закрыт

path = os.path.join('.', 'dirname', 'filename.txt')
print(path)

# Построчное чтение из файла
with open('input.txt', encoding='utf-8') as inf:
    for line in inf:
        line = line.strip()
        print(line)
