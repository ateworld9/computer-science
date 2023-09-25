#include <iostream>
using namespace std;

int main()
{
    int ctn = 0;
    cin >> ctn;
    for (int i = 0; i < ctn; i++)
    {
        int val1 = 0;
        int val2 = 0;
        cin >> val1 >> val2;
        cout << val1 + val2 << '\n';
    }

    return 0;
}
