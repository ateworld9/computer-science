struct Expression;
struct Number;
struct BinaryOperation;

struct Help
{
    Help(Expression *ptr = nullptr)
    {
        this->ptr = ptr;
        cnt = 1;
    }
    ~Help()
    {
        delete ptr;
    }
    Expression *ptr;
    mutable int cnt;
};

struct SharedPtr
{
    // реализуйте следующие методы
    //
    explicit SharedPtr(Expression *ptr = 0)
    {
        if (ptr != 0)
            h = new Help(ptr);
        else
            h = nullptr;
    }
    ~SharedPtr()
    {
        if (h != nullptr)
        {
            --(h->cnt);
            if (h->cnt == 0)
                delete h;
        }
    }
    SharedPtr(const SharedPtr &other)
    {
        this->h = other.h;
        if (this->h != nullptr && this->h->cnt)
            ++(this->h->cnt);
    }
    SharedPtr &operator=(const SharedPtr &other)
    {
        if (this != &other)
        {
            this->~SharedPtr();
            this->h = other.h;
            if (this->h != nullptr)
                ++(this->h->cnt);
        }
    }
    Expression *get() const
    {
        if (this->h != nullptr)
            return this->h->ptr;
        else
            return nullptr;
    }
    void reset(Expression *ptr = 0)
    {
        this->~SharedPtr();
        if (ptr != 0)
            h = new Help(ptr);
        else
            h = nullptr;
    }
    Expression &operator*() const
    {
        if (this->h != nullptr)
            return *(this->h->ptr);
        else
            return *(Expression *)nullptr;
    }
    Expression *operator->() const
    {
        if (this->h != nullptr)
            return this->h->ptr;
        else
            return nullptr;
    }

private:
    Help *h = nullptr;
};
