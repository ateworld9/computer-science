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

char *getline()
{
    const int CHUNK_SIZE = 10;
    int size = CHUNK_SIZE;
    int length = 0;
    char *str = new char[size];

    char ch;
    while (cin.get(ch) && ch != '\n')
    {
        if (length == size - 1)
        {
            str = resize(str, size, size + CHUNK_SIZE);
            size += CHUNK_SIZE;
        }
        str[length] = ch;
        ++length;
    }

    str[length] = '\0';
    return str;
}
