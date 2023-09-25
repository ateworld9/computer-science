// #include <cstddef> // size_t
#define DEFINE_ARRAY(Name, Type)
struct Name
{
    explicit Name(size_t size)
        : data_(new Type[size]), size_(size)
    {
    }

    ~Name() { delete[] data_; }
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
