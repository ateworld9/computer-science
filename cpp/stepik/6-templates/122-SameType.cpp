
#include <type_traits>

// Определите шаблон SameType с двумя типовыми
// параметрами. В шаблоне должна быть определена
// одна статическая константа типа bool с именем
// value

template <class A, class B>
struct SameType
{
    static const bool value = std::is_same<A, B>::value;
};
