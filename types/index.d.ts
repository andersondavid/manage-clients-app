export interface IClientData {
	id: number;
	status?: string;
	name?: string;
	user?: string;
	pass?: string;
	plan?: string;
	server?: string;
	app: string;
	paymentMethod?: string;
	paymentPerson: string;
	activationDate?: string;
	lastPayment?: string;
	daysLeft?: number;
	device?: string;
	whatsapp?: string;
	totalValue?: number;
	creditedValue?: number;
	profitValue?: number;
}

export interface IFullData {
	lastUpdate: Date
	clientsData: IClientData[]
}

type InputsForms = {
  example: string,
  exampleRequired: string,
};