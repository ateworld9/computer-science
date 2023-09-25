#include <iostream>
using namespace std;

int max(int *p, int *q)
{
    int max = *p;
    for (; p != q; p++)
    {
        if (*p > max)
            max = *p;
    }
    return max;
}

int *max2(int *p, int *q)
{
    int *pmax = p;
    for (; p != q; p++)
    {
        if (*p > *pmax)
            pmax = p;
    }

    return pmax;
}

bool max(int *p, int *q, int *res)
{
    if (p == q)
    {
        return false;
    }
    *res = *p;
    for (; p != q; ++p)
    {
        if (*p > *res)
            *res = *p;
    }
    return true;
}

bool max(int *p, int *q, int **res)
{
    if (p == q)
        return false;
    *res = p;
    for (; p != q; ++p)
        if (*p > **res)
            *res = p;
    return true;
}

int main()
{
    int arr[10] = {1, 2, 3, 4, 5};

    int max_1 = max(arr, arr + 10);
    cout << "max_1: " << max_1 << '\n';

    int *max_2 = max2(arr, arr + 10);
    cout << "*max_2: " << *max_2 << "     max_2: " << max_2 << '\n';

    int max_3 = 0;
    if (max(arr, arr + 10, &max_3))
    {
        cout << "max_3: " << max_3 << '\n';
    }

    int *pmax_4 = 0;
    if (max(arr, arr + 10, &pmax_4))
    {
        cout << "*pmax_4: " << *pmax_4 << "     pmax_4: " << pmax_4 << '\n';
    }
}
