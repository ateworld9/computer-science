class Scanner {
	constructor(inputStream) {
		this.inputStream = inputStream;
	}

	scan() {}
}

class Parser {
	constructor() {}
	parse(scanner, programNodeBuilder) {}
}

// Builder
class ProgramNodeBuilder {
	constructor() {
		this.node;
	}

	newVariable(variableName) {}
	newAssignment(variable, expression) {}
	newReturnStatement(value) {}
	newCondition(condition, truePart, falsePart) {}

	getRootNode() {}
}

// Composite
class ProgramNode {
	constructor() {}

	// операции с узлом программы
	getSourcePosition(line, index) {}
	// ...

	// операции с потомками
	add(node) {}
	remove(node) {}
	// ...

	traverse(codeGenerator) {}
}
class StatementNode {}
class ExpressionNode {}

// Visitor
class CodeGenerator {
	constructor(bytecodeStream) {
		this.output = bytecodeStream;
	}
	visit(node) {
		if (node instanceof StatementNode) {
			return;
		}
		if (node instanceof ExpressionNode) {
			return;
		}
	}
}

class StackMachineCodeGenerator extends CodeGenerator {}
class RISCCodeGenerator extends CodeGenerator {
	constructor(bytecodeStream) {
		super(bytecodeStream);
	}
}

// Facade
class Compiler {
	constructor() {}

	compile(inputStream, outputStream) {
		this.scanner = new Scanner(inputStream);

		this.builder = new ProgramNodeBuilder();

		this.parser = new Parser();
		this.parser.parse(this.scanner, this.builder);

		this.generator = new RISCCodeGenerator(outputStream);
		const parseTree = this.builder.getRootNode();
		parseTree.traverse(this.generator);
	}
}
