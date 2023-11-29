from collections import deque


def bfs(roads, source):
    distances = [float('inf')] * n
    distances[source] = 0
    queue = deque()
    queue.append(source)

    while queue:
        current = queue.popleft()
        if current == 0:
            break

        for target_city, road_length in roads[current]:
            new_time = distances[current] + road_length
            if distances[target_city] == float('inf'):
                distances[target_city] = new_time
                queue.append(target_city)

    return distances


def find_nearest_vertex(distances, visited):
    min_distance = float('inf')
    nearest_vertex = None

    for i in range(n):
        if distances[i] < min_distance and not visited[i]:
            min_distance = distances[i]
            nearest_vertex = i

    return nearest_vertex


def dijkstra(graph, start):
    visited = [False] * n
    distances = [float('inf')] * n
    previous = [-1] * n

    distances[start] = 0

    last = None

    def handle_vertex(from_v):
        for i in range(len(graph[from_v])):
            if distances[from_v] + graph[from_v][i] < distances[i]:
                distances[i] = distances[from_v] + graph[from_v][i]
                previous[i] = from_v
        visited[from_v] = True

    active = find_nearest_vertex(distances, visited)
    while active != None:
        handle_vertex(active)
        last = active
        active = find_nearest_vertex(distances, visited)

    final_path = []
    current = last
    while current != -1:
        final_path.append(current + 1)
        current = previous[current]

    # print(distances)
    return distances[last], final_path


input = open('input.txt', 'r')
output = open('output.txt', 'w')

n = int(input.readline().strip())
prep_time = []
speeds = []
roads = [[] for _ in range(n)]
full_graph = [[float('inf')] * n for _ in range(n)]

for i in range(n):
    delay, speed = map(int, input.readline().strip().split())
    prep_time.append(delay)
    speeds.append(speed)

for _ in range(n - 1):
    a, b, dist = map(int, input.readline().strip().split())
    roads[a - 1].append((b - 1, dist))
    roads[b - 1].append((a - 1, dist))

# print('roads')

for city in range(1, n):
    distances = bfs(roads, city)
    for i in range(n):
        if (i != city and distances[i] != float('inf')):
            full_graph[i][city] = distances[i] / speeds[city] + prep_time[city]

# print('full_graph')

travel_time, path = dijkstra(full_graph, 0)

print(f"{travel_time:.10f}", file=output)
print(*path, file=output)

print(f"{travel_time:.10f}")
print(*path)

input.close()
output.close()
