def max_remaining_money(n, m, gifts):
    remaining_money = 0
    current_credit = 0

    for gift_cost in gifts:
        if gift_cost <= current_credit:
            current_credit -= gift_cost
        else:
            remaining_money += current_credit
            additional_credit = min(m - current_credit, gift_cost)
            current_credit = m - additional_credit

    remaining_money += current_credit
    return remaining_money

# Чтение входных данных
n, m = map(int, input().split())
gifts = list(map(int, input().split()))
print(n,m,gifts)
# Вывод результата
result = max_remaining_money(n, m, gifts)
print(result)
