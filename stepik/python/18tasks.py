# Поиск минимума в списке
a = [int(i) for i in input().split()]
m = a[0]
for x in a:
    if m > x:
        m = x
print(m)

'''
Напишите программу, которая считывает с консоли числа (по одному в строке) до тех пор,
пока сумма введённых чисел не будет равна 0 и сразу после этого выводит сумму квадратов всех считанных чисел.
Гарантируется, что в какой-то момент сумма введённых чисел окажется равной 0,
после этого считывание продолжать не нужно.
В примере мы считываем числа 1, -3, 5, -6, -10, 13; в этот момент замечаем,
что сумма этих чисел равна нулю и выводим сумму их квадратов, не обращая внимания на то, что остались ещё не прочитанные значения.

Sample Input:

1
-3
5
-6
-10
13
4
-8
Sample Output:

340
'''
num = int(input())
s = num
sqrt_sum = num ** 2
while s != 0:
    num = int(input())
    s += num
    sqrt_sum += num ** 2

print(sqrt_sum)

'''
Напишите программу, которая выводит часть последовательности 1 2 2 3 3 3 4 4 4 4 5 5 5 5 5 ...(число повторяется столько раз, чему равно).
На вход программе передаётся неотрицательное целое число n — столько элементов последовательности должна отобразить программа.
На выходе ожидается последовательность чисел, записанных через пробел в одну строку.
Например, если n = 7, то программа должна вывести 1 2 2 3 3 3 4.
Sample Input:
7
Sample Output:
1 2 2 3 3 3 4
'''
n = int(input())
count = 0
num = 1
while count < n:
    for i in range(num):
        print(num, end=' ')
        count += 1
        if count == n:
            break
    num += 1

'''
Напишите программу, которая считывает список чисел lst из первой строки и 
число x из второй строки, 
которая выводит все позиции, на которых встречается число x в переданном списке lst.
Позиции нумеруются с нуля, если число x не встречается в списке, 
вывести строку "Отсутствует" (без кавычек, с большой буквы).
Позиции должны быть выведены в одну строку, по возрастанию абсолютного значения.
Sample Input 1:
5 8 2 7 8 8 2 4
8
Sample Output 1:
1 4 5
Sample Input 2:
5 8 2 7 8 8 2 4
10
Sample Output 2:
Отсутствует
'''

lst = [int(i) for i in input().split()]
x = int(input())
positions = []
for i in range(len(lst)):
    if lst[i] == x:
        positions.append(i)
if positions:
    print(*positions)
else:
    print("Отсутствует")


'''
Напишите программу, на вход которой подаётся прямоугольная матрица в виде последовательности строк.
После последней строки матрицы идёт строка, содержащая только строку "end" (без кавычек, см. Sample Input).
Программа должна вывести матрицу того же размера, 
у которой каждый элемент в позиции i, j равен сумме элементов первой матрицы на позициях (i-1, j), (i+1, j), (i, j-1), (i, j+1). 
У крайних символов соседний элемент находится с противоположной стороны матрицы.
0В случае одной строки/столбца элемент сам себе является соседом по соответствующему направлению.

Sample Input 1:
9 5 3
0 7 -1
-5 2 9
end
Sample Output 1:
3 21 22
10 6 19
20 16 -1

Sample Input 2:
1
end
Sample Output 2:
4
'''

matrix = []
while True:
    row = input().split()
    if row == ['end']:
        break
    matrix.append([int(i) for i in row])

n_rows = len(matrix)
n_cols = len(matrix[0])

new_matrix = [[0 for j in range(n_cols)] for i in range(n_rows)]

for i in range(n_rows):
    for j in range(n_cols):
        top = matrix[i-1][j]
        bottom = matrix[(i+1) % n_rows][j]
        left = matrix[i][j-1]
        right = matrix[i][(j+1) % n_cols]
        new_matrix[i][j] = top + bottom + left + right

for row in new_matrix:
    print(*row)


'''
Выведите таблицу размером n × n
n×n, заполненную числами от 1 до n^2 
по спирали, выходящей из левого верхнего угла и закрученной по часовой стрелке, 
как показано в примере (здесь n=5)
Sample Input:

5
Sample Output:

1 2 3 4 5
16 17 18 19 6
15 24 25 20 7
14 23 22 21 8
13 12 11 10 9
'''
n = int(input())

# создаем матрицу из нулей размером n x n
matrix = [[0 for j in range(n)] for i in range(n)]

# начальное значение для заполнения матрицы
num = 1

# границы заполнения матрицы по строкам и столбцам
row_start = 0
row_end = n-1
col_start = 0
col_end = n-1

# заполняем матрицу по спирали, пока не достигнуты границы
while row_start <= row_end and col_start <= col_end:
    # заполняем верхнюю строку
    for j in range(col_start, col_end + 1):
        matrix[row_start][j] = num
        num += 1
    row_start += 1

    # заполняем правый столбец
    for i in range(row_start, row_end+1):
        matrix[i][col_end] = num
        num += 1
    col_end -= 1

    # заполняем нижнюю строку
    if row_start <= row_end:
        for j in range(col_end, col_start-1, -1):
            matrix[row_end][j] = num
            num += 1
        row_end -= 1

    # заполняем левый столбец
    if col_start <= col_end:
        for i in range(row_end, row_start-1, -1):
            matrix[i][col_start] = num
            num += 1
        col_start += 1

# выводим заполненную матрицу
for row in matrix:
    print(*row)
