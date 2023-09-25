struct File
{
    void write(char const *s);
    // ...
};

struct FormattedFile : File
{
    void write(int i);
    void write(double d);
    using File::write;
    // ...
};

int main()
{
    FormattedFile f;
    f.write(4);
    f.write("Hello");

    return 0;
}
