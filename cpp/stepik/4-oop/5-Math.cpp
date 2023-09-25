#include <string>
#include <iostream>
using namespace std;

struct Expression
{
    virtual ~Expression() {}
    virtual double evaluate() const = 0;
    virtual void visit(Visitor *visitor) const = 0;
};

struct Number : Expression
{
    Number(double value)
        : value(value)
    {
    }

    double evaluate() const { return value; }
    double get_value() const { return value; }
    void visit(Visitor *visitor) const { visitor->visitNumber(this); }

private:
    double value;
};

struct BinaryOperation : Expression
{
    /*
      Здесь op это один из 4 символов: '+', '-', '*' или '/', соответствующих операциям,
      которые вам нужно реализовать.
     */
    BinaryOperation(Expression const *left, char op, Expression const *right)
        : left(left), op(op), right(right)
    {
    }
    ~BinaryOperation()
    {
        delete left;
        delete right;
    }

    Expression const *get_left() const { return left; }
    Expression const *get_right() const { return right; }
    char get_op() const { return op; }

    double evaluate() const
    {
        switch (op)
        {
        case '+':
            return left->evaluate() + right->evaluate();
        case '-':
            return left->evaluate() - right->evaluate();
        case '*':
            return left->evaluate() * right->evaluate();
        case '/':
            return left->evaluate() / right->evaluate();
        }
    }
    void visit(Visitor *visitor) const { visitor->visitBinaryOperation(this); }

private:
    Expression const *left;
    Expression const *right;
    char op;
};

bool check_equals(Expression const *left, Expression const *right)
{
    if (&left == &right)
    {
        return true;
    }
    else
    {
        return false;
    }
}

struct Visitor
{
    virtual void visitNumber(Number const *number) = 0;
    virtual void visitBinaryOperation(BinaryOperation const *operation) = 0;
    virtual ~Visitor() {}
};

struct PrintVisitor : Visitor
{
    void visitNumber(Number const *number)
    {
        std::cout << number->get_value();
    }

    void visitBinaryOperation(BinaryOperation const *bop)
    {
        std::cout << "(";
        bop->get_left()->visit(this);
        std::cout << " " << bop->get_op() << " ";
        bop->get_right()->visit(this);
        std::cout << ")";
    }
};

int main()
{
    // сначала создаём объекты для подвыражения 4.5 * 5
    Expression *sube = new BinaryOperation(new Number(4.5), '*', new Number(5));
    // потом используем его в выражении для +
    Expression *expr = new BinaryOperation(new Number(3), '+', sube);

    // вычисляем и выводим результат: 25.5
    std::cout << expr->evaluate() << std::endl;

    // тут освобождаются *все* выделенные объекты
    // (например, sube будет правым операндом expr, поэтому его удалять не нужно)
    delete expr;
}
