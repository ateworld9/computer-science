s = 'aTGcc'
s.upper() # ATGCC
s.lower() # atgcc
s.count('cc') # 1
s.find('cc') # 3
s.find('A') # -1
s.replace('c', 'C') # aTGCC


# str = input().lower()
# gc_count = str.count('g') + str.count('c')
# print(gc_count / len(str) * 100)

## SLICING
dna = 'ATTCGGAGCT'
print(dna[1])       # T
print(dna[1:4])     # TTC
print(dna[:4])      # ATTC
print(dna[4:])      # GGAGCT
print(dna[-4:])     # AGCT
print(dna[1:-1])    # TTCGGAGC
print(dna[1:-1:2])  # TCGG
print(dna[::-1])    # TCGAGGCTTA

# # palindrome

# s = input()
# i = 0
# j = len(s) - 1
# is_palindrome = True
# while i < j:
#     if s[i] != s[j]:
#         is_palindrom = False
#     i += 1
#     j -= 1
# if is_palindrome:
#     print('YES')
# else:
#     print('NO')

