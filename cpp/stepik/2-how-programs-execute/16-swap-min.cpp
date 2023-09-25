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

void swap_min(int *m[], unsigned rows, unsigned cols)
{
    int minRowIndex = 0;
    int minValue = m[0][0];
    for (int i = 0; i < cols; ++i)
    {
        for (int j = 0; j < rows; ++j)
        {
            if (m[i][j] < minValue)
            {
                minValue = m[i][j];
                minRowIndex = i;
            }
        }
    }

    int *temp = m[0];
    m[0] = m[minRowIndex];
    m[minRowIndex] = temp;
}

int main()
{
    int **m = create_array2d(3, 3);
    int k = 10;
    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 3; j++)
        {
            m[i][j] = k;
            k--;
        }
    }

    print_array2d(m, 3, 3);

    swap_min(m, 3, 3);

    print_array2d(m, 3, 3);
    return 0;
}
