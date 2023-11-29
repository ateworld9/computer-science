with open('input.txt', 'r') as file:
    n = int(file.readline())
    sled = [0]
    contst = [0]+[[] for _ in range(n)]
    for i in range(n):
        sled.append(list(map(int, file.readline().split())))
    for i in range(n-1):
        a, b, l = map(int, file.readline().split())
        contst[a].append([b, l])
        contst[b].append([a, l])
cont = [0]+[[] for _ in range(n)]
for i in range(1, n+1):
    visit = [False]*(n+1)
    que = [[i, 0]]
    b, f = 0, 1
    while f > b:
        visit[que[b][0]] = True
        for j in range(len(contst[que[b][0]])):
            if not visit[contst[que[b][0]][j][0]]:
                f += 1
                que.append([contst[que[b][0]][j][0], que[b]
                           [1] + contst[que[b][0]][j][1]])
                cont[contst[que[b][0]][j][0]].append(
                    [i, sled[i][0] + ((que[b][1] + contst[que[b][0]][j][1])/sled[i][1])])

        b += 1
contst = None
visit = [False]*(n+1)
rast = [-1]*(n+1)
rast[1] = 0
dadl = [0 for _ in range(n+1)]
visit = [False]*(n+1)
minpos = 1
while not visit[minpos]:
    visit[minpos] = True

    for i in range(len(cont[minpos])):
        if not visit[cont[minpos][i][0]] and (rast[cont[minpos][i][0]] == -1 or rast[cont[minpos][i][0]] > rast[minpos]+cont[minpos][i][1]):
            rast[cont[minpos][i][0]] = rast[minpos]+cont[minpos][i][1]
            dadl[cont[minpos][i][0]] = minpos
    a = minpos
    minpos = 0
    for i in range(1, n+1):
        if not visit[i] and rast[i] != -1 and (rast[minpos] == -1 or rast[i] < rast[minpos]):
            minpos = i
    if minpos == 0:
        minpos = 1

print(rast[a])
i = a
k = [a]
while i != 1:
    k.append(dadl[i])
    i = dadl[i]
print(*k)
