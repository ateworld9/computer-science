#include <iostream>
using namespace std;

char *resize(const char *str, unsigned size, unsigned new_size)
{
    char *new_str = new char[new_size];
    int m = size < new_size ? size : new_size;
    for (int i = 0; i < m; i++)
    {
        new_str[i] = str[i];
    }

    delete[] str;

    return new_str;
}

int main()
{
    char *m = new char[100];
    for (int i = 0; i < 100; i++)
    {
        m[i] = (char)i;
    }
    m = resize(m, 100, 90);

    for (int j = 0; j < 100; j++)
    {
        cout << m[j] << ' ';
    }
}
