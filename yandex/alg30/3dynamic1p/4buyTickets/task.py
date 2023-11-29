
def buyTicketsMinimumTime(A, B, C, n, dp=None):
    if dp is None:
        dp = [None] * (n + 1)
        dp[0] = A[0]
        if n > 0:
            dp[1] = min(
                A[0] + A[1],
                B[0],
            )
        if n > 1:
            dp[2] = min(
                A[0] + A[1] + A[2],
                B[0] + A[2],
                A[0] + B[1],
                C[0],
            )
    if dp[n] is None:
        dp[n] = min(
            buyTicketsMinimumTime(A, B, C, n - 1, dp) + A[n],
            buyTicketsMinimumTime(A, B, C, n - 2, dp) + B[n - 1],
            buyTicketsMinimumTime(A, B, C, n - 3, dp) + C[n - 2],
        )

    # print(dp)

    return dp[n]


n = int(input())
i = 0
A = [None] * n
B = [None] * n
C = [None] * n
while i < n:
    a, b, c = input().split(' ')
    A[i] = int(a)
    B[i] = int(b)
    C[i] = int(c)
    i += 1

# print(A)
# print(B)
# print(C)

print(buyTicketsMinimumTime(A, B, C, n-1))
