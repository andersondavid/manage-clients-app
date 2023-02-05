import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native";

import { FormInput } from "../components/TextInputEl";
import SquareButton from "../components/SquareButton";
import InfoText from "../components/InfoText";

import { allClientes } from "../dataTest";
import { formatDate } from "../utils/formatDate";
import { IClientData } from "../types";

export default function Update({ route }: any) {
	const selectedId = route.params.id;
	const selectedClient: IClientData = allClientes.find(
		(client) => client.id === selectedId
	)!;

	const {
		id,
		status,
		name,
		user,
		pass,
		plan,
		server,
		paymentMethod,
		activationDate,
		lastPayment,
		daysLeft,
		device,
		whatsapp,
		totalValue,
		creditedValue,
		profitValue,
	} = selectedClient;

	return (
		<View style={styles.container}>
			<ScrollView>
				<View style={[styles.form]}>
					<InfoText label={"Nome do Cliente"}>{name}</InfoText>
					<InfoText label={"ID do Cliente"}>{id}</InfoText>
					<InfoText label={"Data do Ultimo Pagamento"}></InfoText>
					<InfoText label={"Dias Restantes"}>123</InfoText>
					<FormInput label={"Novo Pagamento"} placeholder={"DD/MM/AAAA"} />
					<FormInput label={"Valor"} placeholder={"R$ 12,34"} />
					<FormInput label={"Adicionar dias (soma)"} placeholder={"123"} />
				</View>
				<View style={[styles.form, styles.formLoad]}>
					<SquareButton>ATUALIZAR</SquareButton>
				</View>
				<View style={[styles.formLoad, { paddingHorizontal: 16 }]}>
					<SquareButton>Abrir pagina do cliente</SquareButton>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#121212",
	},
	form: {
		flex: 1,
		padding: 16,
	},
	formLoad: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "flex-end",
	},
});
