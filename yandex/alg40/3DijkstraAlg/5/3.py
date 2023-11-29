from collections import deque


def find_nearest_vertex(distances, visited):
    min_distance = float('inf')
    nearest_vertex = None

    for i in range(0, len(distances)):
        if distances[i] < min_distance and not visited[i]:
            min_distance = distances[i]
            nearest_vertex = i

    return nearest_vertex


def dijkstra(graph, start):
    n = len(graph)
    visited = [False] * n
    distances = [float('inf')] * n
    previous = [-1] * n

    distances[start] = 0

    last = None

    def handle_vertex(from_v):
        for i in range(0, len(graph[from_v])):
            if distances[from_v] + graph[from_v][i][1] < distances[graph[from_v][i][0]]:
                distances[graph[from_v][i][0]] = distances[from_v] + \
                    graph[from_v][i][1]
                previous[graph[from_v][i][0]] = from_v
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
    return distances[last], final_path


input = open('input.txt', 'r')
output = open('output.txt', 'w')

n = int(input.readline().strip())
prep_time = []
speeds = []
roads = {}

for _ in range(n):
    t, v = map(int, input.readline().strip().split())
    prep_time.append(t)
    speeds.append(v)

for _ in range(n - 1):
    a, b, s = map(int, input.readline().strip().split())
    roads.setdefault(a - 1, []).append((b - 1, s))
    roads.setdefault(b - 1, []).append((a - 1, s))

full_graph = [[] for _ in range(n)]


def bfs(roads, city, speeds, prep_time):
    distances = {city: 0}
    queue = deque([(0, city)])

    while queue:
        time, current = queue.popleft()
        if current == 0:
            break

        for target_city, road_length in roads.get(current, []):
            new_time = time + road_length
            if target_city not in distances or new_time < distances[target_city]:
                distances[target_city] = new_time
                queue.append((new_time, target_city))

    return [(target, distances[target] / speeds[city] + prep_time[city]) for target in distances if target != city]


for city in range(1, n):
    arr = bfs(roads, city, speeds, prep_time)
    for edge in arr:
        full_graph[edge[0]].append([city, edge[1]])

travel_time, path = dijkstra(full_graph, 0)


print(f"{travel_time:.10f}", file=output)
print(*path, file=output)


input.close()
output.close()
