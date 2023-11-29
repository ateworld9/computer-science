def is_safe(board, row, col, N):
    # Проверяем, можно ли разместить ферзя на данной позиции
    # по горизонтали, вертикали и диагоналям
    for i in range(row):
        if board[i] == col or \
           board[i] - i == col - row or \
           board[i] + i == col + row:
            return False
    return True


def count_queen_arrangements_util(board, row, N):
    # Если все ферзи размещены, увеличиваем счетчик
    if row == N:
        return 1

    count = 0
    for col in range(N):
        # Проверяем, можно ли разместить ферзя на данной позиции
        if is_safe(board, row, col, N):
            # Размещаем ферзя и рекурсивно вызываем для следующей строки
            board[row] = col
            count += count_queen_arrangements_util(board, row + 1, N)
            # Отменяем последнее размещение для backtracking
            board[row] = -1

    return count


def count_queen_arrangements(N):
    # Используем одномерный массив для хранения позиций ферзей
    board = [-1] * N
    return count_queen_arrangements_util(board, 0, N)


N = int(input())
result = count_queen_arrangements(N)
print(result)
