# nums = [int(i) for i in input().split()]
# s = 0
# for i in nums:
#     s += i
# print(s)


nums = [int(i) for i in input().split()]

if len(nums) == 1:
    print(nums[0])
else:
    for i in range(len(nums)):
        if i == len(nums) - 1:
            print(int(nums[-2]) + int(nums[0]), end=' ')
        else:
            print(nums[i + 1] + nums[i - 1], end=' ')

s = input().split()
duplicates = []
s.sort()
for i in range(1, len(s)):
    if s[i] == s[i-1] and s[i] not in duplicates:
        duplicates.append(s[i])
print(' '.join(duplicates))
