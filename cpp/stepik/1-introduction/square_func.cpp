#include <iostream>
#include <cmath>

using namespace std;

int main()
{
    int a = 0;
    int b = 0;
    int c = 0;

    cin >> a >> b >> c;
    double d = (b * b) - (4 * a * c);
    if (d < 0)
    {
        cout << "No real roots" << endl;
    }
    if (d == 0)
    {
        double x = -b / (2 * a);
        cout << x << ' ' << x << endl;
    }
    if (d > 0)
    {
        double x1 = (-b + sqrt(d)) / (2 * a);
        double x2 = (-b - sqrt(d)) / (2 * a);
        cout << x1 << ' ' << x2 << endl;
    }
    return 0;
}
