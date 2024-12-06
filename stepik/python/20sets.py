s = set()  # создание пустого множества
# создание множества с элеменатми
basket = {'apple', 'orange', 'apple', 'pear', 'orange', 'banana'}
print(basket)              # {'apple', 'orange', 'pear', 'banana'}
print('orange' in basket)  # True
print('python' in basket)  # False
s = basket
s.add('apple')
print(s)            # {'apple', 'orange', 'pear', 'banana'}
s.remove('apple')
print(s)            # {'orange', 'pear', 'banana'}
s.discard('apple')
print(s)            # {'orange', 'pear', 'banana'}
s.clear()
print(s)            # set()
print(basket)       # set()

basket = {'apple', 'orange', 'apple', 'pear', 'orange', 'banana'}
for x in basket:  # не сохраняет порядок
    print(x)
# apple
# orange
# pear
# banana
