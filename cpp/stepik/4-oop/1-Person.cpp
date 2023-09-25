#include <string>
#include <iostream>
using namespace std;

struct Person
{
    Person(string name, int age) : name_(name), age_(age)
    {
    }
    virtual ~Person() {}
    virtual string name() const { return name_; }
    int age() const { return age_; }
    // virtual string occupation() const = 0;

protected:
    string name_;
    int age_;
};

struct Student : Person
{
    Student(string name, int age, string uni)
        : Person(name, age), uni_(uni)
    {
    }
    string university() const { return uni_; }
    string occupation() const { return "student"; }
    virtual int group() const { return group_; }

private:
    string uni_;
    int group_;
};

struct Professor : Person
{
    Professor(string name, int age)
        : Person(name, age)
    {
    }
    string name() const
    {
        return "Prof. " + Person::name();
    }
    string occupation() const { return "professor"; }
};

int main()
{
    string name = "dmitriy";
    string uni = "MSUCE";
    Student s(name, 23, uni);

    cout << s.name() << endl
         << s.age() << endl
         << s.university() << endl;

    Person &l = s;  // Student & -> Person &
    Person *r = &s; // Student * -> Person *
    Person p = s;

    Professor pr("Stroustrup", 50);
    cout << pr.name() << endl; // Prof. Stroustrup
    Person *f = &pr;
    cout << f->name() << endl; // Stroustrup
};
