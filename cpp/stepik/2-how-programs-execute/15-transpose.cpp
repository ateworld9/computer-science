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

void print_array2d(int **m, size_t a, size_t b)
{
    for (size_t i = 0; i != a; ++i)
    {
        for (size_t j = 0; j != b; ++j)
        {
            cout << m[i][j] << ' ';
        }
        cout << endl;
    }
}

int **transpose(const int *const *m, unsigned rows, unsigned cols)
{
    int **transposed = create_array2d(cols, rows);

    for (int i = 0; i < cols; i++)
    {
        for (int j = 0; j < rows; j++)
        {
            transposed[j][i] = m[i][j];
        }
    }

    return transposed;
}

int main()
{
    int **matrix = create_array2d(3, 3);
    int k = 1;
    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 3; j++)
        {
            matrix[i][j] = k;
            k++;
        }
    }
    print_array2d(matrix, 3, 3);
    int **matrix_transposed = transpose(matrix, 3, 3);
    cout << "\ntransposition: \n"
         << endl;
    print_array2d(matrix_transposed, 3, 3);
}
