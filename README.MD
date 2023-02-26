## Pagina Inicial
### Itens
- Botão de Cadastro
- Campo de pesquisa
- Lista de cliente
### Itens da lista
- Clicavel para pagina do cliente
- Breve informação
	- Icone de status
	- Nome
	- Id
	- Plano
	- Dias restantes

## Cadastro
### Campos
- id
- Nome
- Usuario
- Senha
- Servidor
- Plano
- Valor do plano
- Nome do pagador
- Dispositivo
- Aplicativo
- Whatsapp
### Botões
- Registrar
- Cancelar

## Editar Cliente
### Campos
- id
- Nome
- usuario
- Senha
- Servidor
- Plano
- Nome do pagador
- Dispositivo
- Aplicativo
- Whatsapp
### BOTÕES
- Salvar
- Cancelar

## Atualizar pagamento

### Campos
- Valor do pagamento
- Data do pagamento
- Metodo de pagamento
- Data de Vecimento
### Campos
- Salvar
- Cancelar

## Pagina do Cliente
### Informacões
- Informações do Cliente
	- Id
	- Nome
	- Usuario
	- Senha
	- Status
	- Data do cadastro

- Info do Plano
	- Plano escolhido
	- Servidor
	- Aplicativo
	- Data de ativação
	- Preço do plano

- Info de Pagamento
	- Metodo de pagamento
	- Nome do pagante
	- Ultimo Pagamento
	- Data de Expiração
	- Dias restantes
	- Valor total
	- Hitorico de credito
		- Tela com todo historico de pagamento
	- Historico de pagamento
		- Tela com todo historico de pagamento
	- Lucro total
### Botões
- Editar
- Atualizar pagamento
- Excluir cliente

# Estrutura do banco de dados

- array de cliente
	- cliente
		- id
		- _id
		- data do cadastro
		- nome
		- user
		- senhas
		- status
		- whatsapp
		- plano
		- preço do plano
		- servidor
		- app
		- aparelho
		- nome do pagante
		- data da ativação
		- data de expiração
		- array historico de credito
			- valor
		- array de pagamento
			- valor
			- data
			- metodo