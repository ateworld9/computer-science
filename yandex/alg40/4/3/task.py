def find_max_cut_weight(N, adjacency_matrix):
    edges = []
    for i in range(N):
        for j in range(i + 1, N):
            if adjacency_matrix[i][j] != 0:
                edges.append((adjacency_matrix[i][j], i, j))

    edges.sort(reverse=True)

    total_weight = 0
    partitions = [-1] * N

    for edge in edges:
        weight, vertex1, vertex2 = edge
        if partitions[vertex1] == -1 and partitions[vertex2] == -1:
            partitions[vertex1] = 1
            partitions[vertex2] = 2
            total_weight += weight
        elif partitions[vertex1] == -1:
            partitions[vertex1] = 3 - partitions[vertex2]
            total_weight += weight
        elif partitions[vertex2] == -1:
            partitions[vertex2] = 3 - partitions[vertex1]
            total_weight += weight
        elif partitions[vertex1] != partitions[vertex2]:
            total_weight += weight
            for i in range(N):
                if partitions[i] == partitions[vertex2]:
                    partitions[i] = partitions[vertex1]

    return total_weight, partitions


# Чтение входных данных
N = int(input())
adjacency_matrix = []
for _ in range(N):
    row = list(map(int, input().split()))
    adjacency_matrix.append(row)

# Получение результата
result_weight, result_partitions = find_max_cut_weight(N, adjacency_matrix)

# Вывод результата
print(result_weight)
print(*result_partitions)
