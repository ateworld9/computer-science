#include <iostream>
using namespace std;

int main()
{
    // Создание массива из 1000 int
    int *m = (int *)malloc(1000 * sizeof(int));
    // изменение массива до 2000 int
    m = (int *)realloc(m, 2000 * sizeof(int));
    // Освобождение массива
    free(m);
    // Создание массива нулей
    m = (int *)calloc(3000, sizeof(int));
    free(m);
    m = 0;
}
