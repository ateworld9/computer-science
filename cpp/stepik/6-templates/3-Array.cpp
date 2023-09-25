#include <algorithm>
#include <cstddef>
#include <iostream>
using namespace std;

template <typename T>
class Array
{
    T *data_;
    size_t size_;

public:
    explicit Array(size_t size = 0, const T &value = T())
        : data_(new T[size]), size_(size)
    {
        for (size_t i = 0; i < size_; ++i)
        {
            data_[i] = value;
        }
    }
    Array(const Array &a) : data_(new T[a.size()]), size_(a.size())
    {
        for (size_t i = 0; i < size_; ++i)
        {
            data_[i] = a.data_[i];
        }
    }
    ~Array()
    {
        delete[] data_;
    }
    void swap(Array &a)
    {
        std::swap(size_, a.size_);
        std::swap(data_, a.data_);
    }
    Array &operator=(Array const &a)
    {
        if (this != &a)
            Array(a).swap(*this);
        return *this;
    }
    T &operator[](size_t i)
    {
        return data_[i];
    }
    const T &operator[](size_t i) const
    {
        return data_[i];
    }

    size_t size() const
    {
        return size_;
    }
};
int main()
{
    typedef Array<float> ArrayF;
    typedef Array<ArrayF> AArrayF;

    ArrayF a0(1, 3.14);
    cout << "a0 created" << endl;
    cout << a0[0] << endl
         << endl;

    AArrayF a(5, a0); // default constructor
    cout << "a created" << endl;
    cout << a[0][0] << endl
         << endl;

    AArrayF b(a); // copy constructor
    cout << "b created" << endl
         << endl;

    AArrayF c; // default constructor
    cout << "c created" << endl
         << endl;
    c = b; // assignment (calls copy constructor and swap)
    cout << "c changed" << endl
         << endl;
    return 0;
}
