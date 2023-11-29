lst = input().split()
used = set()
for num in lst:
    if num in used:
        print("YES")
    else:
        print("NO")
        used.add(num)
