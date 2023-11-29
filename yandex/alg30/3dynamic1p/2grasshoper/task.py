def count_ways(N, k):
    if N == 1:
        return 1
    total_ways = 0
    for i in range(1, min(k, N) + 1):
        total_ways += count_ways(N - i, k)
    return total_ways

N, k = map(int, input().split())
ways = count_ways(N, k)
print(ways)
