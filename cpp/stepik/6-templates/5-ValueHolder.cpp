struct ICloneable
{
    virtual ICloneable *clone() const = 0;
    virtual ~ICloneable() {}
};

// Шаблон ValueHolder с типовым параметром T,
// должен содержать одно открытое поле data_
// типа T.
//
// В шаблоне ValueHolder должен быть определен
// конструктор от одного параметра типа T,
// который инициализирует поле data_.
//
// Шаблон ValueHolder должен реализовывать
// интерфейс ICloneable, и возвращать указатель
// на копию объекта, созданную в куче, из метода
// clone.

template <typename T>
struct ValueHolder : ICloneable
{
    ValueHolder(const T &data) : data_(data)
    {
    }
    virtual ValueHolder *clone() const
    {
        return new ValueHolder(*this);
    }
    T data_;
};

class Any
{
    // В классе Any должен быть конструктор,
    // который можно вызвать без параметров,
    // чтобы работал следующий код:
    //    Any empty; // empty ничего не хранит

    // В классе Any должен быть шаблонный
    // конструктор от одного параметра, чтобы
    // можно было создавать объекты типа Any,
    // например, следующим образом:
    //    Any i(10); // i хранит значение 10

    // Не забудьте про деструктор. Все выделенные
    // ресурсы нужно освободить.

    // В классе Any также должен быть конструктор
    // копирования (вам поможет метод clone
    // интерфейса ICloneable)

    // В классе должен быть оператор присваивания и/или
    // шаблонный оператор присваивания, чтобы работал
    // следующий код:
    //    Any copy(i); // copy хранит 10, как и i
    //    empty = copy; // empty хранит 10, как и copy
    //    empty = 0; // а теперь empty хранит 0

    // Ну и наконец, мы хотим уметь получать хранимое
    // значение, для этого определите в классе Any
    // шаблонный метод cast, который возвращает
    // указатель на хранимое значение, или нулевой
    // указатель в случае несоответствия типов или
    // если объект Any ничего не хранит:
    //    int *iptr = i.cast<int>(); // *iptr == 10
    //    char *cptr = i.cast<char>(); // cptr == 0,
    //        // потому что i хранит int, а не char
    //    Any empty2;
    //    int *p = empty2.cast<int>(); // p == 0
    // При реализации используйте оператор dynamic_cast.
    //
    // Допустим у вас есть два наследника класса Base: Derived1
    // и Derived2. Кроме того у вас есть указать baseptr
    // типа Base*. Как проверить указывает ли этот указатель на
    // самом деле на объект класса Derived1 или на объект
    // класса Derived2? Для этого можно воспользоваться dynamic_cast-ом:
    //
    // Derived1 *derived1ptr = dynamic_cast<Derived1*>(baseptr);
    //
    // Если derived1ptr не равен 0, то  baseptr на самом деле
    // указывал на объект класса Derived1, если же derivedptr равен 0,
    // то baseptr на самом деле указывал на объкт какого-то другого
    // класса (например, Derived2). Это можно проверить так:
    //
    // Derived2 *derived2ptr = dynamic_cast<Derived2*>(baseptr);
    //
    // dynamic_cast работает только, если в классе есть хотя бы
    // один виртуальный метод, и в шаблоне ValueHolder такой
    // как раз имеется.
public:
    Any() : ptr(0) {}

    ~Any()
    {
        delete ptr;
    }

    Any(const Any &other) : ptr(other.ptr ? other.ptr->clone() : 0) {}

    template <typename T>
    Any(const T val) : ptr(new ValueHolder<T>(val)) {}

    Any &operator=(const Any &other)
    {
        if (this != &other)
        {
            delete ptr;
            ptr = other.ptr ? other.ptr->clone() : 0;
        }

        return *this;
    }
    template <typename T>
    Any &operator=(const T &val)
    {
        delete ptr;
        ptr = new ValueHolder<T>(val);

        return *this;
    }

    template <typename T>
    T *cast()
    {
        if (ptr == 0)
            return 0;
        else
        {
            ValueHolder<T> *pvh = dynamic_cast<ValueHolder<T> *>(ptr);
            if (pvh == 0)
                return 0;
            else
                return &(pvh->data_);
        }
    }

private:
    ICloneable *ptr;
};
