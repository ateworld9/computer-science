#include <cstddef> // size_t

struct ArrayInt
{
    explicit ArrayInt(size_t size)
        : data_(new int[size]), size_(size)
    {
    }

    ~ArrayInt() { delete[] data_; }
    size_t size()
    {
        return size_;
    }
    int operator[](size_t i) const
    {
        return data_[i];
    }
    int &operator[](size_t i)
    {
        return data_[i];
    }

private:
    int *data_;
    size_t size_;
};

struct ArrayFlt
{
    explicit ArrayFlt(size_t size)
        : data_(new float[size]), size_(size)
    {
    }

    ~ArrayFlt() { delete[] data_; }
    size_t size()
    {
        return size_;
    }
    float operator[](size_t i) const
    {
        return data_[i];
    }
    float &operator[](size_t i)
    {
        return data_[i];
    }

private:
    float *data_;
    size_t size_;
};

// C-style: Macroses
// DEFINE_ARRAY(ArrayInt, int);
// DEFINE_ARRAY(ArrayFlt, float)
// C++-style
template <class Type>
struct Array
{
    explicit Array(size_t size)
        : data_(new Type[size]), size_(size)
    {
    }

    ~Array() { delete[] data_; }
    size_t size()
    {
        return size_;
    }
    Type operator[](size_t i) const
    {
        return data_[i];
    }
    Type &operator[](size_t i)
    {
        return data_[i];
    }

private:
    Type *data_;
    size_t size_;
};

int main()
{
    ArrayInt ai(10);
    ArrayFlt af(20);

    Array<int> ai1(10);
    Array<float> af1(20);

    return 0;
}
