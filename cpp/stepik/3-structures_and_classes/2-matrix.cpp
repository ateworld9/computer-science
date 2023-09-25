#include <iostream>
#include <cstdlib>
using namespace std;

struct IntArray2D
{
    size_t rows;
    size_t cols;
    int **data;
};

int **create_array2d(size_t rows, size_t cols)
{
    int **m = new int *[rows];
    m[0] = new int[rows * cols];
    for (size_t i = 1; i < rows; ++i)
    {
        m[i] = m[i - 1] + 4;
    }
    return m;
}

void free_array2d(int **m, )
{
    delete[] m[0];
    delete[] m;
}

void print_array2d(int **m, size_t rows, size_t cols)
{
    for (size_t i = 0; i != rows; ++i)
    {
        for (size_t j = 0; j != cols; ++j)
        {
            cout << m[i][j] << ' ';
        }
        cout << endl;
    }
}

int main()
{
    int rows = 5;
    int cols = 6;
    IntArray2D a = { rows,
                     cols,
                     create_array2d(rows, cols) }
}
