import { WindowImp } from './WindowImp.mjs';

export class XWindowImp extends WindowImp {
  constructor() {
    super();
    this.display;
    this.windowId;
    this.graphicContext;
  }

  deviceRect(x0, y0, x1, y1) {
    let x = Math.round(Math.min(x0, x1));
    let y = Math.round(Math.min(y0, y1));
    let w = Math.round(Math.abs(x0 - x1));
    let h = Math.round(Math.abs(y0 - y1));

    this.XDrawRectangle(this.display, this.windowId, this.context, x, y, w, h);
  }

  XDrawRectangle(display, windowId, context, x, y, w, h) {}
}
