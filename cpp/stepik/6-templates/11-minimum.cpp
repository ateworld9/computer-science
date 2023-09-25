#include <cstddef>
#include <iostream>

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
    template <class Other>
    Array(Array<Other> const &other)
        : data_(new T(other.size())), size_(other.size())
    {
        for (size_t i = 0; i < size_; ++i)
            data_[i] = other[i]
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
    template <class Other>
    Array &operator=(Array<Other> const &other);

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
    size_t size_;
    T *data_;
};

template <class Type>
template <class Other>
Array<Type> &Array<Type>::operator=(Array<Other> const &other)
{
    return *this
}

bool less(int a, int b)
{
    return a < b;
}

struct Greater
{
    bool operator()(int a, int b) const { return b < a; }
};

template <typename T, typename Cmp>
T minimum(Array<T> arr, Cmp comp)
{
    T min = arr[0];
    size_t len = arr.size();
    for (size_t i = 1; i < len; ++i)
    {
        if (comp(arr[i], min))
            min = arr[i];
    }
    return min;
}

// template <typename T>
// void flatten(const T &t, std::ostream &out)
// {
//     out << t << ' ';
// }

template <typename T>
void flatten(const Array<T> &array, std::ostream &out)
{
    size_t len = array.size();
    for (size_t i = 0; i < len; ++i)
    {
        out << array[i] << ' ';
    }
}

template <typename T>
void flatten(const Array<Array<T>> &array, std::ostream &out)
{
    size_t len = array.size();
    for (size_t i = 0; i < len; ++i)
    {
        flatten(array[i], out);
    }
}

int main()
{

    Array<int> ints(3);
    ints[0] = 10;
    ints[1] = 2;
    ints[2] = 15;
    int min = minimum(ints, less);      // в min должно попасть число 2
    int max = minimum(ints, Greater()); // в max должно попасть число 15

    std::cout << min << std::endl;
    std::cout << max << std::endl;

    Array<int> intss(2, 0);
    intss[0] = 10;
    intss[1] = 20;
    flatten(intss, std::cout); // выводит на экран строку "10 20"
    std::cout << std::endl;
    Array<double> doubles(10, 0.0);
    flatten(doubles, std::cout);

    std::cout << std::endl;

    Array<Array<int>> array_of_ints(2, ints);
    flatten(array_of_ints, std::cout);
}
