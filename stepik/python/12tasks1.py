# a = int(input())
# b = int(input())
# c = int(input())

# p = (a + b + c) / 2

# S = (p * (p - a) * (p - b)  * (p - c)) ** 0.5
# print(S)

# n = int(input())

# def check(n):
# 	if -15 < n <= 12:
# 			print(True)
# 	elif 14 < n < 17:
# 			print(True)
# 	elif 19 <= n:
# 			print(True)
# 	else:
# 			print(False)

# check(-15) # False
# check(-14) # True
# check(12 ) # True
# check(13 ) # False
# check(14 ) # False
# check(15 ) # True
# check(17 ) # False
# check(18 ) # False
# check(19 ) # True
# check(20 ) # True

a = float(input())
b = float(input())	
op = input()

if op == "+":
    print(a + b)
elif op == "-":
    print(a - b)
elif op == "*":
    print(a * b)
elif op == "/":
    if b == 0:
        print("Деление на 0!")
    else:
        print(a / b)
elif op == "mod":
    if b == 0:
        print("Деление на 0!")
    else:
        print(a % b)
elif op == "pow":
    print(a ** b)
elif op == "div":
    if b == 0:
        print("Деление на 0!")
    else:
        print(a // b)
