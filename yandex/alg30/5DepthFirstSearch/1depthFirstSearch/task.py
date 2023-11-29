def makeAdjaencyList(edges, vertexCount):
    adjaencyList = [[] * m for i in range(vertexCount + 1)]

    for i in range(0, len(edges)):
        a, b = edges[i]
        if adjaencyList[a] == 0:
            adjaencyList[a] = [b]
        else:
            adjaencyList[a].append(b)
        if adjaencyList[b] == 0:
            adjaencyList[b] = [a]
        else:
            adjaencyList[b].append(a)
    return adjaencyList


def doDFS(graph, vertexCount):
    visited = [0] * (vertexCount + 1)
    component = 1

    def DFS(now):
        visited[now] = component
        for i in range(0, len(graph[now])):
            if visited[graph[now][i]] == 0:
                DFS(graph[now][i])

    for i in range(1, vertexCount + 1):
        if visited[i] == 0:
            DFS(i)
            component += 1

    return visited


n, m = map(int, input().split(' '))
i = 0
edges = list()

while (i < m):
    edges.append(list(map(int, input().split(' '))))
    i += 1

graph = makeAdjaencyList(edges, n)
components = doDFS(graph, n)

result = []

for i in range(1, len(components)):
    if components[i] == 1:
        result.append(i)
# print(graph)
# print(components)
print(len(result))
print(' '.join(str(e) for e in result))
