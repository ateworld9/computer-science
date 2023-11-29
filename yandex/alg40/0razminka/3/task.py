import math

xA, yA, xB, yB = map(int, input().split())


def vectorLength(x, y):
    return math.sqrt(x ** 2 + y ** 2)


OA = vectorLength(xA, yA)
a1 = math.atan2(yA, xA)

OB = vectorLength(xB, yB)
a2 = math.atan2(yB, xB)


L = min(OA, OB) * abs(a1 - a2) + abs(OA - OB)

# print(xA, yA, xB, yB)
print(L)


# print(math.pi * 5)

# print(math.pi * OA - L)
