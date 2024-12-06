'''
Игра Сапер
вводные данные
строки, столбцы, число мин
5 4 4 
1 1
2 2
3 2
4 4
'''

rows, cols, mines_count = (int(i) for i in input().split()) # n - строки, m - столбцы, k - число мин
playing_field = [[0 for j in range(cols)] for i in range(rows)]  # заполнение поля нулями
bomb_symb = '*'
bomb_val = -1
# for row in playing_field:
#     print(row)

for i in range(mines_count):
    row, col = (int(i) - 1 for i in input().split())
    playing_field[row][col] = bomb_val # бомба

for i in range(rows):
    for j in range(cols):
        if playing_field[i][j] == 0:
            for di in range(-1, 2):             # перебор всех клеток вокруг [i][j]
                for dj in range(-1, 2):
                    ai = i + di
                    aj = j + dj
                    
                    if 0 <= ai < rows and 0 <= aj < cols and playing_field[ai][aj] == bomb_val: # проверка ai, aj находятся на поле И там стоит мина
                        playing_field[i][j] += 1

# вывод результата
for i in range(rows):
    for j in range(cols):
        if playing_field[i][j] == -1:
            print(bomb_symb, end='')
        elif playing_field[i][j] == 0:
            print('.', end='')
        else:
            print(playing_field[i][j], end='')
    print()
