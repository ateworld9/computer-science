#include <cstddef> // size_t
#include <algorithm>

struct IntArray
{
    IntArray(int size)
    {
        size_ = size;
        data_ = new int[size];
    }
    // copy constructor, cause one argument of type IntArray const &
    IntArray(IntArray const &a)
    // : size_(a.size_), data_(new int[size_])
    {
        size_ = a.size_;
        data_ = new int[size_];
        for (size_t i = 0; i != size_; ++i)
            data_[i] = a.data_[i];
    }

    // assignment operator overloading
    // IntArray &operator=(IntArray const &a)
    // {
    //     if (this != &a)
    //     {
    //         delete[] data_;
    //         size_ = a.size_;
    //         data_ = new int[size_];
    //         for (size_t i = 0; i != size_; ++i)
    //             data_[i] = a.data_[i];
    //     }
    //     return *this;
    // }
    IntArray &operator=(IntArray const &a)
    {
        if (this != &a)
            IntArray(a).swap(*this);
        return *this;
    }

    void swap(IntArray &a)
    {
        size_t const t1 = size_;
        size_ = a.size_;
        a.size_ = t1;

        int *const t2 = data_;
        data_ = a.data_;
        a.data_ = t2;
    }

private:
    size_t size_;
    int *data_;
};

int main()
{
    IntArray a1(10);
    IntArray a2(20);
    IntArray a3 = a1; // copying
    a2 = a1;
    return 0;
}
