import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from './screens/Home'
import ClientPage from './screens/ClientPage'
import Register from './screens/Register'
import RegisterPlan from './screens/RegisterPlan'
import UpdatePayment from './screens/UpdatePayment'

export default function App() {


	const Stack = createNativeStackNavigator()
	return (
		<SafeAreaView style={styles.container}>

			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="Home"
						component={Home}
						options={{
							title: 'Inicio',
							headerTintColor: '#ffffff',
							headerStyle: { backgroundColor: '#1f1f1f' },
						}}
					/>
					<Stack.Screen
						name="ClientPage"
						component={ClientPage}
						options={{
							title: 'Pagina do Cliente',
							headerTintColor: '#ffffff',
							headerStyle: { backgroundColor: '#1f1f1f' },
						}}
					/>
					<Stack.Screen
						name="Register"
						component={Register}
						options={{
							title: 'Registrar Cliente',
							headerTintColor: '#ffffff',
							headerStyle: { backgroundColor: '#1f1f1f' },
						}}
					/>
					<Stack.Screen
						name="RegisterPlan"
						component={RegisterPlan}
						options={{
							title: 'Registrar Plano',
							headerTintColor: '#ffffff',
							headerStyle: { backgroundColor: '#1f1f1f' },
						}}
					/>
					<Stack.Screen
						name="UpdatePayment"
						component={UpdatePayment}
						options={{
							title: 'Atualizar Pagamento',
							headerTintColor: '#ffffff',
							headerStyle: { backgroundColor: '#1f1f1f' },
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#121212',
	},
})
