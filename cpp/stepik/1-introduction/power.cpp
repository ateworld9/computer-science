#include <iostream>

int power(int x, unsigned p)
{
    int answer = x;
    if (p == 0)
    {
        return 1;
    }
    for (int i = 1; i < p; ++i)
    {
        answer *= x;
    }
    return answer;
}

int main()
{
    std::cout << power(2, 3);
}
