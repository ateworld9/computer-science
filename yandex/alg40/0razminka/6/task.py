import math


def lift(capacity, floors):
    result = 0
    rest = 0

    for i in reversed(range(len(floors))):
        if (floors[i] == 0):
            continue
        if (floors[i] > rest):
            result += math.ceil((floors[i] - rest) / capacity) * (i + 1) * 2
            rest = capacity - ((floors[i] - rest) % capacity or capacity)
        else:
            rest -= floors[i]
    return result


cap = int(input())
n = int(input())
levels = []
# cap = 2
# n = 3
# levels = [3, 0, 1]
while (n > 0):
    levels.append(int(input()))
    n -= 1
# print(levels)
print(lift(cap, levels))
