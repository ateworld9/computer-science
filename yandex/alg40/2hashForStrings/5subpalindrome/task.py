def count_palindromic_substrings(s):
    n = len(s)
    s_new = '#'.join(s)
    s_new = '#' + s_new + '#'
    p = [0] * (2 * n + 1)
    c, r = 0, 0

    for i in range(1, 2 * n + 1):
        mirr = 2 * c - i
        if i < r:
            p[i] = min(r - i, p[mirr])

        a, b = i + (1 + p[i]), i - (1 + p[i])
        while a < 2 * n + 1 and b >= 0 and s_new[a] == s_new[b]:
            p[i] += 1
            a += 1
            b -= 1

        if i + p[i] > r:
            c, r = i, i + p[i]

    total_palindromes = sum((x + 1) // 2 for x in p)
    return total_palindromes


# Чтение входных данных
s = input().strip()

# Вывод результата
result = count_palindromic_substrings(s)
print(result)
