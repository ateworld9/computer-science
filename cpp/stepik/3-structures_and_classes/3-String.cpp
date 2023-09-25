#include <iostream>
#include <cstddef> // size_t
#include <cstring> // strlen, strcpy
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

struct String
{
    size_t size;
    char *str;

    String(const char *str = "")
    {
        this->size = strlen(str);
        this->str = new char[this->size + 1];
        strcpy(this->str, str);
    }
    String(size_t n, char c)
    {
        this->size = n;
        this->str = new char[n + 1];
        for (int i = 0; i < n; i++)
        {
            this->str[i] = c;
        }
        this->str[n] = '\0';
    }

    ~String()
    {
        delete[] str;
    }

    void append(String &other)
    {
        size_t new_size = this->size + other.size;
        char *new_str = new char[new_size + 1];
        for (size_t i = 0; i < this->size; i++)
        {
            new_str[i] = this->str[i];
        }
        for (size_t i = 0; i <= other.size; i++)
        {
            new_str[i + this->size] = other.str[i];
        }

        delete[] this->str;

        this->size = new_size;
        this->str = new_str;
    }
};

int main()
{
    const size_t ntest = 10;

    std::string tests[ntest][2] = {
        {"", ""},
        {"", "test"},
        {"test", ""},
        {"test", "test"},
        {"Hello ", " world!"},
        {"Supercalifragilistic", "expialidocious"}};

    for (size_t i = 0; i < ntest; ++i)
    {
        String t1(tests[i][0].c_str());
        String t2(tests[i][1].c_str());

        t1.append(t2);

        std::string res(t1.str);
        if (res != tests[i][0] + tests[i][1])
        {
            std::cout << "Test " << i + 1 << " failed!" << std::endl;
            std::cout << "Must be " << tests[i][0] + tests[i][1] << std::endl;
            std::cout << "But result is " << res << std::endl;
        }
        else
        {
            std::cout << "Test " << i + 1 << " passed!" << std::endl;
        }
    }

    std::string last = "Same pointer test";
    String t(last.c_str());
    t.append(t);

    std::string res(t.str);

    if (res != last + last)
    {
        std::cout << "Test " << ntest + 1 << " failed!" << std::endl;
        std::cout << "Must be " << last + last << std::endl;
        std::cout << "But result is " << res << std::endl;
    }
    else
    {
        std::cout << "Test " << ntest + 1 << " passed!" << std::endl;
    }

    return 0;
}
