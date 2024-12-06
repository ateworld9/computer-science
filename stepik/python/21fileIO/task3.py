with open('dataset_3363_4.txt', 'r') as f:
    lines = f.readlines()

subject_scores = {'math': [], 'physics': [], 'russian': []}
student_scores = []

for line in lines:
    data = line.strip().split(';')
    surname = data[0]
    math_score = int(data[1])
    physics_score = int(data[2])
    russian_score = int(data[3])
    student_scores.append((surname, math_score, physics_score, russian_score))
    subject_scores['math'].append(math_score)
    subject_scores['physics'].append(physics_score)
    subject_scores['russian'].append(russian_score)

with open('dataset_3363_4.txt', 'w') as f:
    for student in student_scores:
        avg_score = sum(student[1:]) / 3
        f.write(f"{avg_score:.9f}\n")

    math_avg = sum(subject_scores['math']) / len(subject_scores['math'])
    physics_avg = sum(subject_scores['physics']) / \
        len(subject_scores['physics'])
    russian_avg = sum(subject_scores['russian']) / \
        len(subject_scores['russian'])

    f.write(
        f"{math_avg:.9f} {physics_avg:.9f} {russian_avg:.9f}")
