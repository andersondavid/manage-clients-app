import { StyleSheet, View, Text, Pressable, Alert } from 'react-native'
import { ScrollView } from 'react-native'
import { TClientData } from '../types'
import { useEffect, useState } from 'react'
import { getClientFromDatebase } from '../database/DatabaseActions'
import { formatDate } from '../utils/formatDate'
import Icon from 'react-native-vector-icons/MaterialIcons'




export default function ClientPage({ route, navigation }: any) {
	const currentClientID = route.params.id
	const [clientState, setClientState] = useState<any | TClientData>({})

	const removeClient = () => {
		Alert.alert(
			'Apagar Cliente',
			'Deseja remover esse cliente dos registros?\nO processo é inreversivel',
			[
				{
					text: 'Cancelar',
					onPress: () => console.log('Cancel Pressed'),
				},
				{
					text: 'Apagar',
					onPress: () => console.log('Remover Pressed'),
				},
			]
		)
	}
	const setNavigationOptions = () => {
		navigation.setOptions({
			headerRight: () => (
				<Pressable
					onPress={() => navigation.navigate('Register', { _id: currentClientID, editMode: true })}
				>
					<Icon name="create" size={22} color="white" />
				</Pressable >
			),
		})
	}

	useEffect(() => {
		const loadClient = async () => {
			const clientData = await getClientFromDatebase(currentClientID)
			setClientState(clientData)
		}; loadClient()

		setNavigationOptions()
	}, [])

	const {
		_id,
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
		paymentPerson,
		created_at,
		app
	}: TClientData = clientState

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
					<Text style={styles.itemClient}>{_id}</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>WhatsApp</Text>
					<Text style={styles.itemClient}>{whatsapp}</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Cadastrado em </Text>
					<Text style={styles.itemClient}>{created_at && formatDate(created_at)}</Text>
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
					<Text style={styles.itemClient}>Aplicativo</Text>
					<Text style={styles.itemClient}>{app}</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Servidor</Text>
					<Text style={styles.itemClient}>{server}</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Data da Ativação</Text>
					<Text style={styles.itemClient}>{activationDate && formatDate(activationDate)}</Text>
				</View>

				<View style={styles.itemHeader}>
					<Text style={styles.itemHeaderText}>Status do Pagamento</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Nome do Pagador</Text>
					<Text style={styles.itemClient}>{paymentPerson}</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Meio de Pagamento</Text>
					<Text style={styles.itemClient}>{paymentMethod}</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Ultimo Pagamento</Text>
					<Text style={styles.itemClient}>{lastPayment && formatDate(lastPayment)}</Text>
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
				<View style={[styles.form, styles.formLoad]}>
					<Pressable onPress={() => navigation.navigate('UpdatePayment')}>
						<View style={styles.squareBtn}>
							<Text style={styles.textBtn}>ATUALIZAR</Text>
						</View>
					</Pressable>
				</View>
				<View style={[styles.form, styles.formLoad]}>
					<Pressable onPress={removeClient}>
						<View style={[styles.squareBtn, { backgroundColor: '#ff2233' }]}>
							<Text style={styles.textBtn}>APAGAR CLIENTE</Text>
						</View>
					</Pressable>
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#121212',
	},
	nameContainer: {
		paddingHorizontal: 8,
		paddingVertical: 8,
		backgroundColor: '#2233FF',
	},
	clientName: {
		fontSize: 18,
		color: '#fff',
	},
	itemHeader: {
		backgroundColor: '#2233FF',
		padding: 4,
	},
	itemHeaderText: {
		fontSize: 16,
		color: '#fff',
		backgroundColor: '#2233FF',
		textAlign: 'center',
	},
	itensContainer: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomColor: '#fff2',
		borderBottomWidth: 0.5,
	},
	itemClient: {
		fontSize: 14,
		color: '#fff',
	},
	form: {
		flex: 1,
		padding: 16,
		paddingBottom: 0
	},
	formLoad: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
	},
	squareBtn: {
		backgroundColor: '#2233FF',
		borderRadius: 5,
		width: '100%',
		paddingVertical: 10,
		paddingHorizontal: 15,
	},
	textBtn: {
		lineHeight: 18,
		fontSize: 16,
		color: '#fff',
	},
})
