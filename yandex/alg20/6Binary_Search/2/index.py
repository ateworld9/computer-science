def lbinsearch(l, r, check, checkparams):
    while l < r:
        m = (l + r) // 2
        if check(m, checkparams):
            r = m
        else:
            l = m + 1
    return l

arr = [1, 2, 2, 3]

def checker(m, params): 
    arr[m] == params

print(lbinsearch(0, len(arr), checker, 4 ))
print(lbinsearch(0, len(arr), checker, 3 ))
print(lbinsearch(0, len(arr), checker, 2 ))
print(lbinsearch(0, len(arr), checker, 1 ))
