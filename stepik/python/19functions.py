def min(*a):
    m = a[0]
    for x in a:
        if m > x:
            m = x
    return m


print(min(5))
print(min(5, 3, 6, 10))
print(min([5, 3, 6, 10]))


def init_values():
    a = 100
    b = 200


a = 0
init_values()
# print(a + b)  # NameError: name 'b' is not defined
print(a)  # 0


def print_value():
    # print(a) # UnboundLocalError: local variable 'a' referenced before assignment
    a = 10
    print(a)


a = 5
print_value()
