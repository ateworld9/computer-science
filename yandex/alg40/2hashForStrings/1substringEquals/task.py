def prefixSubstringsHashes(string, x=257, p=10 ** 9 + 7):
    str_length = len(string)
    reversed_str = string[::-1]
    print(reversed_str)
    hashes = [0] * (str_length + 1)
    reversed_hashes = [0] * (str_length + 1)
    X = [0] * (str_length + 1)
    X[0] = 1

    string = ' ' + string

    for i in range(1, str_length + 1):
        hashes[i] = (hashes[i - 1] * x + ord(string[i])) % p
        X[i] = (X[i - 1] * x) % p

    def compareStrings(strlen, from1, from2):
        h1 = (hashes[from1 + strlen] + hashes[from2] * X[strlen]) % p
        h2 = (hashes[from2 + strlen] + hashes[from1] * X[strlen]) % p
        return (h1 == h2)
    return compareStrings


string = input()
compareStrings = prefixSubstringsHashes(string)

q = int(input())

while (q > 0):
    leng, f1, f2 = map(int, input().split(' '))
    print('yes' if compareStrings(leng, f1, f2) else 'no')
    q -= 1
