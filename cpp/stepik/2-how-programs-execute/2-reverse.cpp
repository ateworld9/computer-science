#include <iostream>
using namespace std;

void reverse()
{
    int temp = 0;
    cin >> temp;
    if (temp == 0)
        return;
    reverse();
    cout << temp << ' ';
}

int main()
{
    reverse();
}
