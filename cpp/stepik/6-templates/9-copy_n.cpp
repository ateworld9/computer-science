#include <cstddef>
#include <iostream>
using namespace std;

template <typename U,
          typename T>
void copy_n(T *t, U *u, size_t n)
{
    for (size_t i = 0; i < n; ++i)
    {
        t[i] = (T)u[i];
    }
}

int main()
{
    int ints[] = {1, 2, 3, 4};
    double doubles[4] = {};
    copy_n(doubles, ints, 4);

    for (size_t i = 0; i < 4; ++i)
    {
        cout << doubles[i] << endl;
    }
}
