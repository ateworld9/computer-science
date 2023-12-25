def min_operations(n):
    dp = [float('inf')] * (n + 1)
    prev = [-1] * (n + 1)

    dp[1] = 0

    for i in range(1, n + 1):
        if i * 2 <= n and dp[i * 2] > dp[i] + 1:
            dp[i * 2] = dp[i] + 1
            prev[i * 2] = i

        if i * 3 <= n and dp[i * 3] > dp[i] + 1:
            dp[i * 3] = dp[i] + 1
            prev[i * 3] = i

        if i + 1 <= n and dp[i + 1] > dp[i] + 1:
            dp[i + 1] = dp[i] + 1
            prev[i + 1] = i

    # Восстановление последовательности операций
    sequence = []
    i = n
    while i != -1:
        sequence.append(i)
        i = prev[i]

    return dp[n], reversed(sequence)

# Пример ввода
n = 5

# Получение результата и вывод
result, sequence = min_operations(n)
print(result)
print(*sequence)
