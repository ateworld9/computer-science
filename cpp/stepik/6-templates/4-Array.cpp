#include <algorithm>
#include <cstddef>
#include <iostream>
using namespace std;

template <typename T>
class Array
{
public:
    explicit Array(size_t size, const T &value = T())
        : size_(size), data_(nullptr)
    {
        data_ = static_cast<T *>(operator new(size_ * sizeof(T)));
        for (size_t i = 0; i < size_; ++i)
            new (&data_[i]) T(value);
    }

    Array()
        : size_(0), data_(nullptr)
    {
    }

    Array(const Array &other)
        : size_(other.size_), data_(nullptr)
    {
        data_ = static_cast<T *>(operator new(size_ * sizeof(T)));
        for (size_t i = 0; i < size_; ++i)
            new (&data_[i]) T(other.data_[i]);
    }

    ~Array()
    {
        for (size_t i = 0; i < size_; ++i)
            data_[i].~T();
        operator delete(data_);
    }

    Array &operator=(const Array &other)
    {
        if (this != &other)
        {
            Array<T> temp(other);
            swap(temp);
        }
        return *this;
    }

    size_t size() const
    {
        return size_;
    }

    T &operator[](size_t index)
    {
        return data_[index];
    }

    const T &operator[](size_t index) const
    {
        return data_[index];
    }

private:
    void swap(Array &other)
    {
        std::swap(size_, other.size_);
        std::swap(data_, other.data_);
    }

    size_t size_;
    T *data_;
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
