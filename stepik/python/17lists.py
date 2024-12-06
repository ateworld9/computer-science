students = ['Ivan', 'Masha', 'Sasha']
print(students[1])  # 'Ivan'
print(students[-1]) # 'Sasha'
for student in students: # 'Ivan' 'Masha' 'Sasha'
    print("Hello, " + student + "!")

students = ['Ivan', 'Masha', 'Sasha']
teachers = ['Oleg', 'Alex']
print(students + teachers)  # 'Ivan' 'Masha' 'Sasha' 'Oleg' 'Alex'


students = ['Ivan', 'Masha', 'Sasha']
students.append('Olga')
print(students) # ['Ivan', 'Masha', 'Sasha', 'Olga']

students += ['Olga']
print(students) # ['Ivan', 'Masha', 'Sasha', 'Olga', 'Olga']

students = ['Ivan', 'Masha', 'Sasha']
students.insert(1, 'Olga') # ['Ivan', 'Olga', 'Masha', 'Sasha']

students = ['Ivan', 'Masha', 'Sasha']
students.remove('Sasha')
print(students) # ['Ivan', 'Masha']
del students[0]
print(students) # ['Ivan']

students = ['Ivan', 'Masha', 'Sasha']
if 'Ivan' in students:
    print('Ivan is here!')
if 'Ann' not in students:
    print('Ann is out')

ind = students.index('Sasha')
print(ind) # 2
# ind = students.index('Ann') # ValueError: 'Ann' is not in list

students = ['Sasha', 'Ivan', 'Masha']
ordered_students = sorted(students)
print(ordered_students) # ['Ivan', 'Masha', 'Sasha']
print(students)
students.sort()
print(students)


min(students) # 'Ivan'
max(students) # 'Sasha'


students = ['Sasha', 'Ivan', 'Masha']
students.reverse()
print(students) # ['Masha', 'Ivan', 'Sasha']

print(list(reversed(students))) # ['Sasha', 'Ivan', 'Masha']
print(students[::-1]) # ['Sasha', 'Ivan', 'Masha']



a = [1, 'A', 2]
b = a
a[0] = 42
print(a)    # [42, 'A', 2]
print(b)    # [42, 'A', 2]
b[2] = 30
print(a)    # [42, 'A', 30]
print(b)    # [42, 'A', 30]

a = [0] * 5
print(a)    # [0, 0, 0, 0, 0]

a = [i * i for i in range(5)]
print(a)    # [0, 1, 4, 9, 16]

a = [int(i) for i in input().split()] # 2 5 3 7
print(a)    # [2, 5, 3, 7]

n = 3
a = [[0] * n for i in range(n)]
print(a)    # [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
a = [[0 for j in range(n)] for i in range(n)]
print(a)    # [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
