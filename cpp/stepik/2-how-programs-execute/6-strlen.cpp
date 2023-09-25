#include <iostream>
using namespace std;

unsigned strlen(const char *str)
{
    unsigned len = 0;
    while (*str != '\0')
    {
        len++;
        *str++;
    }
    return len;
}

int main()
{
    unsigned len = 0;
    char copy[15] = "C-style string";

    len = strlen(copy);
    cout << "len: " << len << endl;
}
