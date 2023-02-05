import { StyleSheet, View, Text, Pressable } from "react-native";
import { ScrollView } from "react-native";
import { allClientes } from "../dataTest";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

import { formatDate } from "../utils/formatDate";

import { IClientData } from "../types";
import { useEffect } from "react";

const ButtonUpdate = ({ navigation, clientID }: any) => {
	return (
		<Pressable
			onPressIn={() => navigation.navigate("Update", { id: clientID })}
		>
			{/* <MaterialCommunityIcons name="update" size={24} color="#ffffff" /> */}
		</Pressable>
	);
};

export default function ClientPage({ route, navigation }: any) {
	const selectedId = route.params.id;
	const selectedClient: IClientData = allClientes.find(
		(client) => client.id === selectedId
	)!;

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<ButtonUpdate clientID={selectedId} navigation={navigation} />
			),
		});
	}, []);

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
				<View style={styles.nameContainer}>
					<Text style={styles.clientName}>{name}</Text>
				</View>

				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Usuario</Text>
					<Text style={styles.itemClient}>{user}</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Senha</Text>
					<Text style={styles.itemClient}>{pass}</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>ID</Text>
					<Text style={styles.itemClient}>{id}</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>WhatsApp</Text>
					<Text style={styles.itemClient}>{whatsapp}</Text>
				</View>

				<View style={styles.itemHeader}>
					<Text style={styles.itemHeaderText}>Plano</Text>
				</View>

				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Plano</Text>
					<Text style={styles.itemClient}>{plan}</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Status</Text>
					<Text style={styles.itemClient}>{status}</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Aparelho</Text>
					<Text style={styles.itemClient}>{device}</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Servidor</Text>
					<Text style={styles.itemClient}>{server}</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Data da Ativação</Text>
					<Text style={styles.itemClient}>{}</Text>
				</View>

				<View style={styles.itemHeader}>
					<Text style={styles.itemHeaderText}>Status do Pagamento</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Meio de Pagamento</Text>
					<Text style={styles.itemClient}>{paymentMethod}</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Ultimo Pagamento</Text>
					<Text style={styles.itemClient}>{}</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Dias Restantes</Text>
					<Text style={styles.itemClient}>{daysLeft}</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Valor Total</Text>
					<Text style={styles.itemClient}>{totalValue}</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Valor Creditado</Text>
					<Text style={styles.itemClient}>{creditedValue}</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Lucro</Text>
					<Text style={styles.itemClient}>{profitValue}</Text>
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
	nameContainer: {
		paddingHorizontal: 8,
		paddingVertical: 8,
		backgroundColor: "#2233FF",
	},
	clientName: {
		fontSize: 18,
		color: "#fff",
	},
	itemHeader: {
		backgroundColor: "#2233FF",
		padding: 4,
	},
	itemHeaderText: {
		fontSize: 16,
		color: "#fff",
		backgroundColor: "#2233FF",
		textAlign: "center",
	},
	itensContainer: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		flexDirection: "row",
		justifyContent: "space-between",
		borderBottomColor: "#fff2",
		borderBottomWidth: 0.5,
	},
	itemClient: {
		fontSize: 14,
		color: "#fff",
	},
});
