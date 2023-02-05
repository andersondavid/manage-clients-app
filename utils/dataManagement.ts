import { IFullData, IClientData } from "../types";

let currentState: IFullData = {
	clientsData: [],
	lastUpdate: new Date()
}

const addClient = (client: IClientData) => {
	let state = currentState.clientsData.push(client);
	console.log("addClient: " + JSON.stringify(currentState));
	return state;
};

const removeClient = (clientId: string) => {
	let state = currentState.clientsData.filter(
		(clientItem) => clientItem.id !== clientId
	);
	console.log("removeClient: " + currentState);
	return state;
};

const updateClient = (client: IClientData) => {
	let clientIndex = currentState.clientsData.findIndex( 
		(clientItem) => clientItem.id !== client.id
	);

	let state = (currentState.clientsData[clientIndex] = { ...client });
	console.log("updateClient: " + currentState);
	return state;
};

const readAllClients = () => console.log(JSON.stringify(currentState));


export { addClient, removeClient, updateClient, readAllClients };
