#include <iostream>

using namespace std;

int main()
{
    int a = 10;
    const int *p1 = &a; // указатель на константу
    int const *p2 = &a; // указатель на константу

    // *p1  = 20;       // ОШИБКА
    p2 = 0;

    cout << *p1 << endl;
    cout << p2 << "  << REFERNCE" << endl;

    int *const p3 = &a; //  константный указатель

    *p3 = 30; // a = 30
    cout << *p3 << endl;
    // p3 = 0;          // ОШИБКА

    int const *const p4 = &a;

    // *p4= 40;         // ОШИБКА
    // p4 = 0;          // ОШИБКА

    cout << *p4 << endl;

    int b = 100;
    int *pb = &b;

    // указатель на указатель на const int
    int const **pb1 = &pb;

    // указатель на константный указатель на const int
    int *const *pb2 = &pb;

    // константный указатель на указатель на const int
    int **const pb3 = &pb;
}
