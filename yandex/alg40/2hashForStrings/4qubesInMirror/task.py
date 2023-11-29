import math


def prefixSubstringsHashes(arr, x=257, p=10 ** 9 + 7):
    arr_length = len(arr)
    reversed_arr = arr[::-1]
    arr = [0] + arr
    reversed_arr = [0] + reversed_arr
    hashes = [0] * (arr_length + 1)
    reversed_hashes = [0] * (arr_length + 1)
    X = [0] * (arr_length + 1)
    X[0] = 1

    for i in range(1, arr_length + 1):
        hashes[i] = (hashes[i - 1] * x + arr[i]) % p
        reversed_hashes[i] = (reversed_hashes[i - 1] * x + reversed_arr[i]) % p
        X[i] = (X[i - 1] * x) % p

    print(arr)
    print(reversed_arr)

    print(hashes)
    print(reversed_hashes)

    def compareStrings(strlen, from1, from2):
        h1 = (hashes[from1 + strlen] + reversed_hashes[from2] * X[strlen]) % p
        h2 = (reversed_hashes[from2 + strlen] + hashes[from1] * X[strlen]) % p
        return (h1 == h2)
    return compareStrings


# N, M = map(int, input().split(' '))
# arr = list(map(int, input().split(' ')))
arr = [1, 1, 2, 2, 1, 1]
compareStrings = prefixSubstringsHashes(arr, 7, 9973)
# half = math.floor(N/2)

result = []

# for i in range(half - 1, len(arr)):
#     result.append(i) if compareStrings()

# print(compareStrings(1, 1, 6))
# print(compareStrings(2, 2, 5))
print(compareStrings(3, 3, 3))
print(compareStrings(4, 2, 2))
print(compareStrings(5, 1, 1))
print(compareStrings(6, 0, 0))
# print(compareStrings(6, 6, 1))
