a = int(input())
b = int(input())
c = int(input())

max_num = max(a, b, c)
min_num = min(a, b, c)
mid_num = (a + b + c) - max_num - min_num

print(max_num)
print(min_num)
print(mid_num)
