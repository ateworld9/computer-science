x = float(input())


def f(x):
    if x <= -2:
        return 1 - (x + 2) ** 2
    elif -2 < x <= 2:
        return -(x / 2)
    elif 2 < x:
        print('asdf')
        return (x - 2) ** 2 + 1
    else:
        return 'error'


print(f(x))
