#include <iostream>
using namespace std;

bool contains1(int *m, int size, int value)
{
    for (int i = 0; i != size; ++i)
    {
        if (m[i] == value)
        {
            return true;
        }
    }
    return false;
}

bool contains2(int *p, int *q, int value)
{
    for (; p != q; ++p)
    {
        if (*p == value)
            return true;
    }
    return false;
}

int main()
{
    int arr[10] = {1, 2, 3, 4, 5};

    cout << "1 " << contains1(arr, 10, 4) << '\n';
    cout << "2 " << contains2(arr, arr + 10, 4) << '\n';
}
