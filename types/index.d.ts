export type TClientData = {
	_id: number;
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
	created_at: Date
}

export type RootStackParamList = {
  Home: undefined;
	ClientPage: {
		_id: number | undefined
	};
	RegisterPlan: undefined;
	UpdatePayment: undefined;
  Register: {
    isEditMode: boolean | undefined;
    _id: number | undefined;
  };
};
