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
- Forma de pagamento
- Valor do pagamento
- Data do pagamento
- Dias restantes
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

- Info de Pagamento
	- Metodo de pagamento
	- Nome do pagante
	- Ultimo Pagamento
	- Data de Expiração
	- Dias restantes
	- Valor total
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
		- nome
		- user
		- senha
		- status
		- data do cadastro
		- plano
		- servidor
		- app
		- data da ativação
		- nome do pagante
		- data de expiração
		- array de pagamento
			- valor
			- data
			- metodo