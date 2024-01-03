class Glyph {
  constructor() {}

  draw(window, glyphContext) {}

  setFont(font, glyphContext) {}
  getFont(glyphContext) {}

  first(glyphContext) {}
  next(glyphContext) {}
  isDone(glyphContext) {}
  current(glyphContext) {}

  insert(glyph, glyphContext) {}
  remove(glyphContext) {}
}

class Character extends Glyph {
  constructor(charCode) {
    super();
    this.charCode = charCode;
  }

  draw(window, glyphContext) {}
}

class GlyphContext {
  constructor() {
    this.index;
    this.fonts;
  }

  next(step = 1) {}
  insert(quantity = 1) {}

  getFont() {}
  setFont(font, span = 1) {}
}

class Font {
  constructor(name) {
    this.name = name;
  }
}

const glyphContext = new GlyphContext();
const times12 = new Font('Times-Roman-12');
const timesItalic12 = new Font('Times-Italic-12');

glyphContext.setFont(times12);

glyphContext.insert(6);
glyphContext.setFont(timesItalic12);

class GlyphFactory {
  constructor() {}

  createCharacter() {}
  createRow() {
    // return new Row();
  }
  createColumn() {
    // return new Column();
  }
  // ...
}
