N, M = map(int, input().split())

field = []
for _ in range(N):
    row = list(map(int, input().split()))
    field.append(row)

dp = [[0] * M for _ in range(N)]

for i in range(N):
    for j in range(M):
        if field[i][j] == 1:
            if i > 0 and j > 0:
                dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1
            else:
                dp[i][j] = 1

max_side = 0
for i in range(N):
    for j in range(M):
        max_side = max(max_side, dp[i][j])

print(max_side)
