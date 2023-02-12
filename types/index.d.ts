export type TClientData = {
	_id: string
	primaryKey: string
	created_at: Date
	name?: string;
	user?: string;
	pass?: string;
	status?: string;
	whatsapp?: string;
	plan?: string;
	server?: string;
	app: string;
	device?: string;
	paymentPerson?: string;
	activationDate?: Date;
	expirationDate?: Date;
	creditHistory?: [number];
	paymentHistory?: [TPaymentHistory]
}

type TPaymentHistory = {
	price: number;
	date: Date;
	method: string;
}

export type RootStackParamList = {
  Home: undefined;
	ClientPage: {
		_id: string | undefined
	};
	RegisterPlan: undefined;
	UpdatePayment: undefined;
  Register: {
    isEditMode: boolean | undefined;
    _id: string;
  };
};
