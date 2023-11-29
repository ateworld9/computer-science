def prefixSubstringsHashes(string, x=257, p=10 ** 9 + 7):
    str_length = len(string)
    hashes = [0] * (str_length)
    hashes[0] = ord(string[0]) % p
    reversed_hashes = [0] * (str_length)
    reversed_hashes[str_length - 1] = 0
    X = [0] * (str_length + 1)
    X[0] = 1

    for i in range(1, str_length):
        hashes[i] = (hashes[i - 1] * x + ord(string[i])) % p
        X[i] = (X[i - 1] * x) % p

    X[str_length] = (X[-2] * x) % p
    # print(hashes)
    # print(X)

    def compareStrings(strlen, from1, from2):
        h1 = 0
        h2 = 0
        if from1 == 0 and from2 == 0:
            h1 = (hashes[from1 + strlen - 1]) % p
            h2 = (hashes[from2 + strlen - 1]) % p
        elif from1 == 0:
            h1 = (hashes[strlen - 1] + hashes[from2 - 1] * X[strlen]) % p
            h2 = (hashes[from2 + strlen - 1]) % p
        elif from2 == 0:
            h1 = (hashes[from1 + strlen - 1]) % p
            h2 = (hashes[strlen - 1] + hashes[from1 - 1] * X[strlen]) % p
        else:
            h1 = (hashes[from1 + strlen - 1] +
                  hashes[from2 - 1] * X[strlen]) % p
            h2 = (hashes[from2 + strlen - 1] +
                  hashes[from1 - 1] * X[strlen]) % p
        # print(h1, h2)
        return (h1 == h2)
    return compareStrings


string = input()
compareStrings = prefixSubstringsHashes(string)

q = int(input())

while (q > 0):
    leng, f1, f2 = map(int, input().split(' '))
    print('yes' if compareStrings(leng, f1, f2) else 'no')
    q -= 1
