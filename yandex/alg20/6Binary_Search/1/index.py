def lbinsearch(l, r, check, checkparams):
    while l < r:
        m = (l + r) // 2
        if check(m, checkparams):
            r = m
        else:
            l = m + 1
    return l
        
def rbinsearch(l, r, check, checkparams):
    while l < r:
        m = (l + r + 1) // 2
        if check(m, checkparams):
            l = m
        else:
            r = m - 1
    return l


arrLen = int(input())
arr = list(map(int, input().split()))
arr.sort()
# print(arr)
segment = int(input())
answer = []
for i in range(segment): 
    l, r = map(int, input().split()) 
    def lchecker(m, params):
      return params <= arr[m] 
    def rchecker(m, params):
      return params >= arr[m] 
    li = lbinsearch(0, arrLen - 1, lchecker, l)
    ri = rbinsearch(0, arrLen - 1, rchecker, r)
    answer.append(ri + 1 - li)
print(*answer)
    
