#include <cstddef> // size_t

// реализуйте шаблонную функцию array_size,
// которая возвращает значение типа size_t.

// put your code here

template <typename A, size_t size>
size_t array_size(A (&array)[size]) { return size; }
