template <typename Num>
Num square(Num n) { return n * n; }

template <typename Type>
void sort(Type *p, Type *q);

template <typename Type>
void sort(Array<Type> &ar);

void foo()
{
    int a = square<int>(3);
    int b = square(a) + square(4);
    float *m = new float[10];
    sort(m, m + 10);
    // sort(m, &a);
    Array<double> ad(100);
    sort(ad);
}
