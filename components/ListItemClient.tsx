import { View, Text, StyleSheet } from 'react-native'
//import { formatDate } from '../utils/formatDate'

import { TClientData } from '../types'

export default function ListItemClient(props: { clientData: TClientData }) {
	const { clientData } = props

	return (
		<View style={styles.container}>
			<View style={styles.idView}>
				<View style={styles.idCicle}>
					<Text style={styles.idText}>{clientData._id}</Text>
				</View>
			</View>
			<View style={styles.nameRow}>
				<Text style={styles.clientName}>{clientData.name}</Text>
				<Text style={styles.desc}>{clientData.user} | {clientData.status || 'Indefinido'}</Text>
			</View>
			<View style={styles.remainDaysContainer}>
				{clientData.lastPayment && <Text style={styles.lastPayment}>{clientData.lastPayment}</Text>}
				<Text style={styles.remainDays}>{clientData.daysLeft}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	idView: {
		height: 56,
		width: 56
	},
	idCicle: {
		height: 36,
		width: 36,
		backgroundColor: 'white',
		borderRadius: 23,
		margin: 10
	},
	idText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'black',
		justifyContent: 'center',
		textAlign: 'center'
	},
	nameRow: {
		flexGrow: 1,
	},
	clientName: {
		color: '#ffffff',
		fontSize: 16,
		lineHeight: 28
	},
	desc: {
		color: '#ffffff75',
		fontSize: 14,
		lineHeight: 28
	},
	remainDaysContainer: {
		justifyContent: 'center',
		height: 56,
		width: 56,
		alignItems: 'center',
	},
	lastPayment: {
		color: '#ffffff',
		fontSize: 12,
	},
	remainDays: {
		color: '#ffffff',
		textAlign: 'center',
		fontWeight: 'bold',
	},
})
