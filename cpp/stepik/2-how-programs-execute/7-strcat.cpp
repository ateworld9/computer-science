#include <iostream>
using namespace std;

void strcat(char *to, const char *from)
{
    while (*to != '\0')
    {
        to++;
    }

    // Копируем символы из строки from в конец строки to
    while (*from != '\0')
    {
        *to = *from;
        to++;
        from++;
    }

    // Добавляем нулевой символ в конец строки to
    *to = '\0';
}

int main()
{
    const int maxLength = 100;
    char str1[maxLength] = "Hello, ";
    const char *str2 = "world!";

    strcat(str1, str2);

    std::cout << str1 << std::endl; // Выводит "Hello, world!"

    return 0;
}
