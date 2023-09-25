#include <iostream>
#include <cstdlib>

using namespace std;

int **create_array2d(size_t cols, size_t rows)
{
    int **m = new int *[cols];
    for (size_t i = 0; i != cols; ++i)
    {
        m[i] = new int[rows];
    }
    return m;
}

void free_array2d(int **m, size_t cols, size_t rows)
{
    for (size_t i = 0; i != cols; ++i)
    {
        delete[] m[i];
    }
    delete[] m;
}

int **create_array2d_effective(size_t cols, size_t rows)
{
    int **m = new int *[cols];
    m[0] = new int[cols * rows];
    for (size_t i = 1; i < cols; ++i)
    {
        m[i] = m[i - 1] + 4;
    }
    return m;
}

void free_array2d_effective(int **m, size_t cols, size_t rows)
{
    delete[] m[0];
    delete[] m;
}

void print_array2d(int **m, size_t cols, size_t rows)
{
    for (size_t i = 0; i != cols; ++i)
    {
        for (size_t j = 0; j != rows; ++j)
        {
            cout << m[i][j] << ' ';
        }
        cout << endl;
    }
}

int main()
{
    int **arr2d = create_array2d(5, 4);
    free_array2d(arr2d, 5, 4);

    return 0;
}
