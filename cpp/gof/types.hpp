#include <stdint.h>

#ifndef LEXI_TYPES_HPP
#define LEXI_TYPES_HPP'

using width_t = uint32_t;
using height_t = uint32_t;

struct GlyphParams
{
    unsigned int x = 0;
    unsigned int y = 0;
    width_t width = 0;
    height_t height = 0;
};

struct Point
{
    unsigned int x = 0;
    unsigned int y = 0;

    bool operator==(const Point &rhs)
    {
        return x == rhs.x && y == rhs.y;
    }
};

#endif // LEXI_TYPES_HPP
