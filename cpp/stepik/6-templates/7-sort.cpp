// C
#include <cstddef> // size_t

void qsort(void *base, size_t nitems, size_t size, /* function */);

// C++
void sort(int *p, int *q);
void sort(double *p, double *q);

// C++ + OOP
struct IComparable
{
    virtual int compare(IComparable *comp) const = 0;
    virtual ~IComparable() {}
};
void sort(IComparable **p, IComparable **q);

// C++ + templates
template <typename Type>
void sort(Type *p, Type *q);
