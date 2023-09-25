#include <iostream>
using namespace std;

struct Rational
{
    Rational(int numerator = 0, int denominator = 1) : numerator_(numerator), denominator_(denominator){};

    void add(Rational rational)
    {
        numerator_ = numerator_ * rational.denominator_ + rational.numerator_ * denominator_;
        denominator_ *= rational.denominator_;
    }
    void sub(Rational rational)
    {
        numerator_ = numerator_ * rational.denominator_ - rational.numerator_ * denominator_;
        denominator_ *= rational.denominator_;
    }
    void mul(Rational rational)
    {
        numerator_ *= rational.numerator_;
        denominator_ *= rational.denominator_;
    }
    void div(Rational rational)
    {
        numerator_ *= rational.denominator_;
        denominator_ *= rational.numerator_;
    }

    int numerator() const
    {
        return numerator_;
    }
    int denominator() const
    {
        return denominator_;
    }

    void neg()
    {
        numerator_ = -numerator_;
    }
    void inv();
    double to_double() const
    {
        return numerator_ / (double)denominator_;
    }

    operator double() const
    {
        return to_double();
    }

    Rational &
    operator+=(Rational rational)
    {
        add(rational);
        return *this;
    };
    Rational &operator-=(Rational rational)
    {
        add(-rational);
        return *this;
    };
    Rational &operator*=(Rational rational)
    {
        mul(rational);
        return *this;
    };
    Rational &operator/=(Rational rational)
    {
        div(rational);
        return *this;
    };

    Rational operator-() const
    {
        return Rational(-numerator_, denominator_);
    };
    Rational operator+() const
    {
        return *this;
    };

private:
    int numerator_;
    int denominator_;
};

Rational operator+(Rational r1, Rational r2)
{
    return r1 += r2;
}

Rational operator-(Rational r1, Rational r2)
{
    return r1 -= r2;
}
Rational operator*(Rational r1, Rational r2)
{
    return r1 *= r2;
}
Rational operator/(Rational r1, Rational r2)
{
    return r1 /= r2;
}

bool operator==(Rational r1, Rational r2)
{
    return r1.numerator() == r2.numerator() && r1.denominator() == r2.denominator();
}

bool operator!=(Rational r1, Rational r2)
{
    return !(r1 == r2);
}
bool operator<(Rational r1, Rational r2)
{
    return r1.numerator() * r2.denominator() < r2.numerator() * r1.denominator();
}
bool operator>(Rational r1, Rational r2)
{
    return r2 < r1;
}
bool operator<=(Rational r1, Rational r2)
{
    return !(r1 > r2);
}
bool operator>=(Rational r1, Rational r2)
{
    return !(r1 < r2);
}

int main()
{
    Rational r1(1, 2);
    Rational r2(1, 3);
    Rational r3(5);

    r1.add(r2);
    cout << r1.to_double() << endl;
    r1.sub(r2);
    cout << r1.to_double() << endl;
    r1.neg();
    cout << r1.to_double() << endl;
    r3.mul(r1);
    cout << r3.to_double() << endl;
    r3.div(r2);
    cout << r3.to_double() << endl;
}
