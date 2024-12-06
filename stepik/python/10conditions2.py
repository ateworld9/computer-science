# a = int(input())
# b = int(input())
# h = int(input())
# if h > b:
#     print('Пересып')
# elif h < a:
#     print('Недосып')
# else:
#     print('Это нормально')

# year = 2100
# year = 2000
year = int(input())

if year % 4 == 0 and year % 100 != 0:
    print('Високосный')
elif year % 400 == 0:
    print('Високосный')
else:
    print('Обычный')
    
