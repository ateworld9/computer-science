with open('dataset_3363_2.txt', 'r') as f:
    s = f.readline().strip()

result = ''
i = 0
while i < len(s):
    char = s[i]
    count = ''
    i += 1
    while i < len(s) and s[i].isdigit():
        count += s[i]
        i += 1
    result += char * int(count)

with open('dataset_3363_2.txt', 'w') as f:
    f.write(result)
