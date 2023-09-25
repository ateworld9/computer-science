// C
int squarei(int x) { return x * x; }
float squaref(float x) { return x * x; }

// C++
int square(int x) { return x * x; }
float square(float x) { return x * x; }

// C++ + OOP
struct INumber
{
    virtual INumber *multiply(INumber *x) const = 0;
};
struct Int : INumber
{
    Int *multiply(Int *x) { return x * x; }
};
struct Float : INumber
{
    Float *multiply(Float *x) { return x * x; }
};
INumber *square(INumber *x) { return x - > multiply(x); }
// C++ + templates
template <typename Num>
Num square(Num x) { return x * x; }
