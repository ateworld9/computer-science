word = input()
counter = 0
length = len(word)
for i in range(length // 2):
    if word[i] != word[length - 1 - i]:
        counter = counter + 1
print(counter)
