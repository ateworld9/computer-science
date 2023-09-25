#include <iostream>
using namespace std;

void swap(int &a, int &b)

{
    int temp = a;
    a = b;
    b = temp;
}
int main()
{
    int k = 10;
    int m = 20;
    cout << k << " " << m << endl;
    swap(k, m);
    cout << k << " " << m << endl;
}
