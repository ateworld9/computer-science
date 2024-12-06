with open('dataset_3363_3.txt', 'r') as f:
    text = f.read()

word_count = {}
for word in text.split():
    if word in word_count:
        word_count[word] += 1
    else:
        word_count[word] = 1

most_common_word = ''
max_count = 0
for word, count in word_count.items():
    if count > max_count or (count == max_count and word < most_common_word):
        most_common_word = word
        max_count = count

with open('dataset_3363_3.txt', 'w') as f:
    f.write(most_common_word + ' ' + str(max_count))
