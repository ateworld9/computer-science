struct Cls
{
    Cls(char c, double d, int i);

private:
    char c;
    double d;
    int i;
};

char &get_c(Cls &cls)
{
    return *(char *)(&cls);
}

double &get_d(Cls &cls)
{
    return *(double *)((char *)(&cls) + 8);
}

int &get_i(Cls &cls)
{
    return *(int *)((char *)(&cls) + 16);
}
