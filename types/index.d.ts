export type TClientData = {
	_id: string
	primaryKey: string
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
	date: Date;
	method: string;
	creditHistory: number
}

export type RootStackParamList = {
  Home: undefined;
	ClientPage: {
		primaryKey: string | undefined
	};
	RegisterPlan: undefined;
	UpdatePayment: {
    primaryKey: string;
  };
  Register: {
    isEditMode: boolean | undefined;
    primaryKey: string;
  };
};