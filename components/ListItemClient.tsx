import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { formatDate } from "../utils/formatDate";

import { IClientData } from "../types";

export default function ListItemClient(props: { clientData: IClientData; }) {
	const { clientData } = props;

	return (
		<View style={styles.container}>
			<View style={styles.nameRow}>
				<Text style={styles.clientName}>{clientData.name}</Text>
				<Text style={styles.desc}>{clientData.user} | {clientData.status} | {clientData.id}</Text>
			</View>
			<View style={styles.remainDaysContainer}>
				<Text style={styles.lastPayment}>{/*formatDate(clientData.lastPayment)*/}</Text>
				<Text style={styles.remainDays}>{clientData.daysLeft}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 8,
		flexDirection: "row",
	},
	nameRow: {
		flexGrow: 1,
	},
	clientName: {
		color: "#ffffff",
		fontSize: 16,
	},
	desc: {
		color: "#ffffff",
		fontSize: 14,
	},
	remainDaysContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	lastPayment: {
		color: "#ffffff",
		fontSize: 12,
	},
	remainDays: {
		color: "#ffffff",
		textAlign: "center",
		fontWeight: "bold",
	},
});
