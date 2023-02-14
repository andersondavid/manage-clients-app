import { StyleSheet, View, Text, Pressable, Alert } from 'react-native'
import { ScrollView } from 'react-native'
import { TClientData, TPaymentHistory } from '../types'
import { useEffect, useState } from 'react'
import { getClientFromDatebase } from '../database/DatabaseActions'
import { formatDate } from '../utils/formatDate'
import Icon from 'react-native-vector-icons/MaterialIcons'

const PaymentHistoryTable = (props: { paymentHistory: TPaymentHistory[] }) => {
	const { paymentHistory } = props
	return (
		<View>
			{paymentHistory.map((item, index) => {
				return (
					<View key={index} style={styles.itensContainer}>
						<Text style={styles.itemClient}>{item.price}</Text>
						<Text style={styles.itemClient}>{formatDate(item.date)}</Text>
						<Text style={styles.itemClient}>{item.method}</Text>
					</View>
				)
			})}
		</View>
	)
}
const CreditHistoryTable = (props: {
	paymentHistory: TPaymentHistory[]
	creditHistory: number[]
}) => {
	const { paymentHistory, creditHistory } = props

	return (
		<View>
			{paymentHistory.map((item, index) => {
				return (
					<View key={index} style={styles.itensContainer}>
						<Text style={styles.itemClient}>{item.price}</Text>
						<Text style={styles.itemClient}>{creditHistory[index]}</Text>
						<Text style={styles.itemClient}>
							{item.price - creditHistory[index]}
						</Text>
					</View>
				)
			})}
		</View>
	)
}

export default function ClientPage({ route, navigation }: any) {
	const currentClientID = route.params.primaryKey
	const [clientData, setClientData] = useState<any | TClientData>({})

	const {
		_id,
		status,
		name,
		user,
		pass,
		plan,
		server,
		activationDate,
		device,
		whatsapp,
		paymentPerson,
		created_at,
		app,
		planPrice,
		primaryKey,
		creditHistory,
		expirationDate,
		paymentHistory,
	}: TClientData = clientData

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
					onPress={() =>
						navigation.navigate('Register', {
							primaryKey: currentClientID,
							isEditMode: true,
						})
					}
				>
					<Icon name="create" size={22} color="white" />
				</Pressable>
			),
		})
	}

	useEffect(() => {
		const loadClient = async () => {
			const clientData = await getClientFromDatebase(currentClientID)
			setClientData(clientData)
		}
		loadClient()

		setNavigationOptions()
	}, [])

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
					<Text style={styles.itemClient}>
						{created_at && formatDate(created_at)}
					</Text>
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
					<Text style={styles.itemClient}>Preço do Plano</Text>
					<Text style={styles.itemClient}>{planPrice}</Text>
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
					<Text style={styles.itemClient}>
						{activationDate && formatDate(activationDate)}
					</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Expira em</Text>
					<Text style={styles.itemClient}>
						{expirationDate && formatDate(expirationDate)}
					</Text>
				</View>

				<View style={styles.itemHeader}>
					<Text style={styles.itemHeaderText}>Status do Pagamento</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Nome do Pagador</Text>
					<Text style={styles.itemClient}>{paymentPerson}</Text>
				</View>

				<View style={styles.itemHeader}>
					<Text style={styles.itemHeaderText}>Histórico de Pagamento</Text>
				</View>

				<View style={styles.itensContainer}>
					<Text style={[styles.itemClient, styles.textBold]}>Valor</Text>
					<Text style={[styles.itemClient, styles.textBold]}>Data</Text>
					<Text style={[styles.itemClient, styles.textBold]}>Metodo</Text>
				</View>

				{paymentHistory.length > 0 ? (
					<PaymentHistoryTable paymentHistory={paymentHistory} />
				) : (
					<View style={styles.itensContainer}>
						<Text style={styles.itemClient}>Nenhum registro encontrado</Text>
					</View>
				)}

				<View style={styles.itemHeader}>
					<Text style={styles.itemHeaderText}>Histórico de Credito</Text>
				</View>

				<View style={styles.itensContainer}>
					<Text style={[styles.itemClient, styles.textBold]}>Pagos</Text>
					<Text style={[styles.itemClient, styles.textBold]}>Creditos</Text>
					<Text style={[styles.itemClient, styles.textBold]}>Lucro</Text>
				</View>

				{paymentHistory.length > 0 ? (
					<CreditHistoryTable
						paymentHistory={paymentHistory}
						creditHistory={creditHistory}
					/>
				) : (
					<View style={styles.itensContainer}>
						<Text style={styles.itemClient}>Nenhum registro encontrado</Text>
					</View>
				)}

				<View style={[styles.form, styles.formLoad]}>
					<Pressable onPress={() => navigation.navigate('UpdatePayment', {
						primaryKey,
					})}>
						<View style={styles.squareBtn}>
							<Text style={styles.textBtn}>ATUALIZAR PAGAMENTO</Text>
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
		textAlign: 'center',
	},
	textBold: {
		fontWeight: 'bold',
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
		paddingBottom: 0,
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
