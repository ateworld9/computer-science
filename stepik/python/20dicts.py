# type: ignore
d = dict()              # Инициализация пустого словаря
d = {}                  # Инициализация пустого словаря
d = {'a': 239, 10: 100} # Инициализация наполненного словаря
print(d['a'])           # 239
print(d[10])            # 100
dictionary = d
print('a' in dictionary)    # True 
print('a' not in dictionary)# False
dictionary['a'] = 42
print(dictionary['a'])      # 42
print(dictionary.get(10))   # 100
del dictionary['a']
print(dictionary)           # {10: 100}



d = {}
'''
Напишите функцию update_dictionary(d, key, value), которая принимает на вход словарь d и два числа: key и value.
Если ключ key есть в словаре d, то добавьте значение value в список, который хранится по этому ключу.
Если ключа key нет в словаре, то нужно добавить значение в список по ключу 2 ∗ n key. 
Если и ключа 2 ∗ key нет, то нужно добавить ключ 2 ∗ key в словарь и сопоставить ему список из переданного элемента [value].
'''
def update_dictionary(d, key, value):
    if key in d:
        d[key].append(value)
    elif 2*key in d:
        d[2*key].append(value)
    else:
        d[2*key] = [value]
    return None
print(update_dictionary(d, 1, -1))  # None
print(d)                            # {2: [-1]}
update_dictionary(d, 2, -2)
print(d)                            # {2: [-1, -2]}
update_dictionary(d, 1, -3)
print(d)                            # {2: [-1, -2, -3]}
