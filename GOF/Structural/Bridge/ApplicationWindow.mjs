import { Window } from './Window.mjs';

class AplicationWindow extends Window {
  constructor() {
    super();
  }

  drawContents() {
    this.getView().drawOn(this);
  }
}
