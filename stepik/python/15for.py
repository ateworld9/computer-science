# a = int(input())
# b = int(input())
# c = int(input())
# d = int(input())

# print('\t', end='')
# for i in range(c, d + 1):
#   print(i, end='\t')
# print()
# for i in range(a, b + 1):
#     print(i, end='\t')
#     for j in range(c, d + 1):
#       print(i * j, end='\t')
#     print()

a = int(input())
b = int(input())
c = 0
s = 0 
for i in range(a, b + 1):
    if(i % 3 == 0):
        c += 1
        s += i
print(s / c)
