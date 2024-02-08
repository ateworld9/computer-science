class ApplicationService {
	getEmailGateway() {
		throw new Error('getEmailGateway not implemented');
	}
	getIntegrationGateway() {
		throw new Error('getIntegrationGateway not implemented');
	}
}

/* interface */ class EmailGateway {
	sendEmailMessage(toAddress, subject, body) {}
}

/* interface */ class IntegrationGateway {
	publishRevenueRecognition(contract) {}
}

class RecognitionService extends ApplicationService {
	constructor() {
		super();
	}

	calculateRevenueRecognitions(contractId) {}
	recognizedRevenue() {}
}
