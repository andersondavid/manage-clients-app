export type TClientData = {
	shareKey: string
	_id: string
	created_at: Date
	name: string;
	user: string;
	pass: string;
	status?: string;
	whatsapp?: string;
	plan: string;
	planPrice: number;
	server: string;
	app: string;
	device: string;
	paymentPerson?: string;
	activationDate?: Date;
	expirationDate?: Date;
	paymentHistory: TPaymentHistory[]
}

type TPaymentHistory = {
	price: number;
	_uniq_id: string;
	date: Date;
	method: string;
	creditHistory: number,
	_id: string;
}

export type RootStackParamList = {
  Home: undefined;
	ClientPage: {
		_id: string | undefined
	};
	UpdatePayment: {
    _id: string;
  };
  Register: {
    isEditMode: boolean | undefined;
    _id: string;
  };
};