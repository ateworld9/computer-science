ans = []


def gen(p, cur):
    if cur == n:
        ans.append(''.join(p))
    else:
        for i in range(cur, n):
            p[i], p[cur] = p[cur], p[i]
            gen(p, cur + 1)
            p[i], p[cur] = p[cur], p[i]


with open('input.txt', 'r') as file:
    n = int(file.readline())
    p = list(map(str, range(1, n + 1)))

print(p)
gen(p, 0)

output = open('output.txt', 'w')
print('\n'.join(ans), file=output)
