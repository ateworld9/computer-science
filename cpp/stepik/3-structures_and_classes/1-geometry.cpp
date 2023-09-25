#include <cmath>

struct Point
{
    double x;
    double y;
};

struct Segment
{
    Point p1;
    Point p2;
};

double length(Segment s)
{
    double dx = s.p1.x - s.p2.x;
    double dy = s.p1.y - s.p2.y;
    return sqrt(dx * dx + dy * dy);
}
double length(Segment *s)
{
    double dx = s->p1.x - s->p2.x;
    double dy = s->p1.y - s->p2.y;
    return sqrt(dx * dx + dy * dy);
}

bool intersects(
    Segment s1,
    Segment s2,
    Point *p)
{
}

int main()
{
    Point p1 = {0.4, 1.6};
    Point p2 = {1.2, 6.3};

    Segment s = {p1, p2};
}
