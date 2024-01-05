class TCPOctetStream {}

class TCPState {
	transmit(tcpConnection, tcpOctetStream) {}
	activeOpen(tcpConnection) {}
	passiveOpen(tcpConnection) {}
	close(tcpConnection) {}
	synchronize(tcpConnection) {}
	acknowledge(tcpConnection) {}
	send(tcpConnection) {}

	changeState(tcpConnection, tcpState) {
		tcpConnection.changeState(tcpState);
	}
}

class TCPConnection {
	constructor() {
		this.state = TCPClosed.Instance();
	}

	activeOpen() {
		this.state.activeOpen(this);
	}
	passiveOpen() {
		this.state.passiveOpen(this);
	}
	close() {
		this.state.close(this);
	}
	send() {}
	acknowledge() {
		this.state.acknowledge(this);
	}
	synchronize() {
		this.state.synchronize(this);
	}

	processOctet() {}

	changeState(tcpState) {
		this.state = tcpState;
	}
}

class TCPEstablished extends TCPState {
	instance = null;
	static Instance() {
		if (TCPEstablished.instance === null) {
			TCPEstablished.instance = new TCPEstablished();
		}
		return TCPEstablished.instance;
	}
	close(tcpConnection) {
		// Послать FIN, получить ACK для FIN
		this.changeState(tcpConnection, TCPListen.Instance());
	}
	transmit(tcpConnection, tcpOctetStream) {
		tcpConnection.processOctet(tcpOctetStream);
	}
}
class TCPListen extends TCPState {
	instance = null;
	static Instance() {
		if (TCPListen.instance === null) {
			TCPListen.instance = new TCPListen();
		}
		return TCPListen.instance;
	}

	send(tcpConnection) {
		// Послать SYN, получить SYN, и т.д.
		this.changeState(tcpConnection, TCPEstablished.Instance());
	}
}
class TCPClosed extends TCPState {
	instance = null;
	static Instance() {
		if (TCPClosed.instance === null) {
			TCPClosed.instance = new TCPClosed();
		}
		return TCPClosed.instance;
	}

	activeOpen(tcpConnection) {
		// Послать SYN, получить SYN, ACK и т.д.
		this.changeState(tcpConnection, TCPEstablished.Instance());
	}
	passiveOpen(tcpConnection) {
		this.changeState(tcpConnection, TCPListen.Instance());
	}
}
