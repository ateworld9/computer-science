#include <iostream>

int main()
{
    int i = 42;
    double d = 3.14;
    const char *s = "C-style string";
    bool t = true;
    bool f = false;

    std::cout << "This is an integer " << i << "\n";
    std::cout << "This is a double " << d << "\n";
    std::cout << "This is a \"" << s << "\"\n";
    std::cout << "This is bool \"" << t << "\"\n";
    std::cout << "This is bool \"" << f << "\"\n";

    return 0;
}
