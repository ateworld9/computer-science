from collections import deque, defaultdict
import heapq


def bfs(roads, speeds, city):
    distances = {city: 0}
    queue = deque([(0, city)])

    while queue:
        dist, current = queue.popleft()
        if current == 0:
            break

        for target_city, road_length in roads[current].items():
            new_dist = dist + road_length
            if target_city not in distances or new_dist < distances[target_city]:
                distances[target_city] = new_dist
                queue.append((new_dist, target_city))

    return [(target, speeds[city - 1][0] + distances[target] / speeds[city - 1][1]) for target in distances if target != city]


def dijkstra(graph, n, start):
    distances = {vertex: float('inf') for vertex in graph}
    distances[start] = 0
    heap = [(0, start)]
    path = [-1] * (n + 1)
    visited = [False] * (n + 1)

    last = None

    while heap:
        current_distance, current_vertex = heapq.heappop(heap)

        if visited[current_vertex]:
            continue
        visited[current_vertex] = True

        if current_distance > distances[current_vertex]:
            continue

        for neighbor, weight in graph[current_vertex]:

            distance = current_distance + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                path[neighbor] = current_vertex
                heapq.heappush(heap, (distance, neighbor))
        last = current_vertex

    path_to_n = []

    current = last
    while current != -1:
        path_to_n.append(current)
        current = path[current]
    return distances, path_to_n


def reverse_graph(graph):
    reversed_graph = defaultdict(list)
    for i, v in graph.items():
        for j, dist in v:
            reversed_graph[j].append((i, dist))

    return reversed_graph


with open('input.txt', 'r') as file:
    N = int(file.readline().strip())
    speeds = []

    for _ in range(N):
        delay, speed = map(int, file.readline().split())
        speeds.append((delay, speed))

    graph = defaultdict(dict)
    for i in range(N - 1):
        a, b, s = map(int, file.readline().split())
        graph[a][b] = s
        graph[b][a] = s

    print(graph)

dist = {}
for i in range(1, N + 1):
    dist[i] = bfs(graph, speeds, i)

reversed_graph = reverse_graph(dist)

result = {}
time, path = dijkstra(reversed_graph, N, 1)
# print(time, path)
latest_time = 0
latest_path = []

for i, travel_time in time.items():
    if travel_time > latest_time:
        latest_time = travel_time
        latest_path = path

print(f"{latest_time:.10f}")
print(' '.join(map(str, latest_path)))
