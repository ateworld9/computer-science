#ifndef LEXI_GLYPH_HPP
#define LEXI_GLYPH_HPP

#include "types.hpp"

#include <memory>
#include <list>
#include <string>

namespace Gui
{
    class Window;
}

class IGlyph
{
public:
    explicit IGlyph(const GlyphParams params) : m_params(params) {}
    IGlyph(unsigned int x, unsigned int y, width_t w, height_t h) : m_params({x, y, w, h}) {}

    using GlyphPtr = std::unique_ptr<IGlyph>;
    virtual void Draw(Gui::Window *) = 0;
    virtual void Insert(GlyphPtr, size_t)
    {
    }

    virtual void Add(GlyphPtr glyph)
    {
    }

    virtual ~IGlyph() = default;

protected:
    GlyphParams m_params;
};

class ICompositeGlyph : public IGlyph
{
public:
}

#endif // LEXI_GLYPH_HPP
