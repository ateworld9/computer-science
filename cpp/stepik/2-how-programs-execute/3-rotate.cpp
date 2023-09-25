#include <iostream>
using namespace std;

void rotate_to_left(int arr[], unsigned size, int shift)
{
    if (shift == 0 || shift == size)
    {
        return;
    }

    shift = shift % size;

    for (int i = 0; i < shift; i++)
    {
        int temp = arr[0];

        for (int j = 0; j < size - 1; j++)
        {
            arr[j] = arr[j + 1];
        }
        arr[size - 1] = temp;
    }
}

int main()
{
    int arr[] = {1, 2, 3, 4, 5};
    int size = sizeof(arr) / sizeof(arr[0]);
    int shift = 2;

    int *p = &shift;
    int *a = &arr[0];
    cout << *p << " " << &shift << "\n";
    cout << *a << " " << &arr << " " << &arr[1] << "\n";

    rotate_to_left(arr, size, shift);

    for (int i = 0; i < size; i++)
    {
        cout << arr[i] << " ";
    }
}
