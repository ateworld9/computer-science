#include <cstddef>
template <class T>
struct Array
{
    T *data_;
};
template <>
struct Array<bool>
{
    static int const INTBITS = 8 * sizeof(int);
    explicit Array(size_t size)
        : size_(size), data_(new int[size_ / INTBITS + 1])
    {
    }
    bool operator[](size_t i) const
    {
        return data_[i / INTBITS] & (1 << (i % INTBITS));
    }

private:
    size_t size_;
    int *data_;
};
