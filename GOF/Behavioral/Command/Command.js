class Application {}
class Document {
  constructor(name) {
    this.name = name;
  }
  open() {}
  paste() {}
}

class Command {
  execute() {
    throw new Error('Command: execute is not implemented');
  }
}

class Open extends Command {
  constructor(application) {
    super();
    this.application = application;
    this.response;
  }

  #askUser() {
    return 'new document';
  }

  execute() {
    const name = this.#askUser();
    if (name.length > 0) {
      const document = new Document(name);
      this.application.add(document);
      document.open();
    }
  }
}

class Paste extends Command {
  constructor(document) {
    super();
    this.document = document;
  }
  execute() {
    this.document.paste();
  }
}

class SimpleCommand extends Command {
  constructor(receiver, action) {
    super();
    this.receiver = receiver;
    this.action = action;
  }

  execute() {}
}

class MacroCommand extends Command {
  constructor() {
    super();
    this.commands = new Set();
  }

  add(command) {
    this.commands.add(command);
  }
  remove(command) {
    this.commands.delete(command);
  }

  execute() {
    for (const command of this.commands) {
      command.execute();
    }
  }
  unexecute() {}
}
