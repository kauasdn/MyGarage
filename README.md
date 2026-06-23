<table>
<tr>
<td width="98">
<img src="https://github.com/user-attachments/assets/cd1ba671-aa08-40d5-ba62-da3442089e40" width="84">
</td>
<td>

<h1>MyGarage – Sistema de Gestão de Veículos</h1>

</td>
</tr>
</table>

## Sobre o Projeto

O **MyGarage** é uma aplicação web que permite aos usuários registrar e acompanhar informações sobre seus veículos, incluindo histórico de abastecimentos e manutenções.

O sistema tem como objetivo ajudar motoristas a controlar custos, acompanhar consumo de combustível e manter o histórico de manutenção do veículo organizado.

---

## Domínio do Problema

Muitos proprietários de veículos não possuem uma forma eficiente de registrar informações importantes sobre seus carros, como trocas de óleo, revisões ou consumo de combustível.

Essas informações geralmente ficam espalhadas em anotações ou são esquecidas ao longo do tempo.

O sistema MyGarage propõe uma solução web para centralizar essas informações, permitindo que o usuário registre e consulte facilmente o histórico do veículo.

---

## Funcionalidades

- **Gestão de Frota:** Cadastro completo de veículos (marca, modelo, ano e placa) com suporte a múltiplos veículos por usuário.
- **Controle Financeiro e Performance:** Registro de abastecimentos (data, litros, valor e quilometragem) com cálculo automático de consumo (km/L) e histórico de manutenções.
- **Visualização:** Exibição consolidada de histórico e eventos por veículo, além de um sistema de Ranking Geral com gráficos analíticos via Recharts.
- **Autenticação:** Sistema de login e cadastro seguro, com controle de sessão e interface adaptável (Modo Claro/Escuro).
- **Painel Administrativo:** Gestão de usuários e visão geral da plataforma com controle de acesso baseado em cargos (RBAC).

---

# Requisitos Funcionais (RF)

- **RF01** – O sistema deve permitir cadastrar veículos  
- **RF02** – O sistema deve permitir registrar abastecimentos  
- **RF03** – O sistema deve calcular o consumo de combustível do veículo  
- **RF04** – O sistema deve permitir registrar manutenções  
- **RF05** – O sistema deve permitir visualizar o histórico do veículo  

---

# Requisitos Não Funcionais (RNF)

- **RNF01** – O sistema deve ser acessível através de navegadores web  
- **RNF02** – O sistema deve possuir interface simples e intuitiva  
- **RNF03** – Os dados devem ser armazenados em banco de dados relacional  
- **RNF04** – O sistema deve responder às requisições em até 2 segundos  

---

# Organização das Tarefas

## Parte 1
- Mockup das páginas
- Desenvolvimento do frontend

## Parte 2
- Desenvolvimento do backend
- Criação da API
- Integração com banco de dados
- Integração com API

---

## Tecnologias

### Frontend

| Tecnologia | Uso |
|---|---|
| [React 19](https://react.dev/) | Biblioteca principal para construção da interface |
| [Vite](https://vitejs.dev/) | Ferramenta de build rápido |
| [Tailwind CSS](https://tailwindcss.com/) | Estilização da interface |
| [Axios](https://axios-http.com/) | Requisições HTTP ao backend |
| [Recharts](https://recharts.org/) | Gráficos e visualizações analíticas |
| TypeScript | Tipagem estática do código |
| ESLint | Conformidade e qualidade do código |

### Backend

| Tecnologia | Uso |
|---|---|
| [Node.js](https://nodejs.org/) | Ambiente de execução do servidor |
| [Express](https://expressjs.com/) | Framework para criação da API REST |
| [PostgreSQL](https://www.postgresql.org/) via [Neon](https://neon.tech/) | Banco de dados relacional hospedado na nuvem |
| [Prisma ORM](https://www.prisma.io/) | Gestão de schema, migrations e acesso ao banco |
| [`@prisma/adapter-pg`](https://www.prisma.io/docs/orm/overview/databases/postgresql) + `pg` | Driver e adaptador para PostgreSQL |
| [JWT](https://jwt.io/) | Autenticação e controle de sessão |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | Criptografia de senhas |
| [dotenv](https://github.com/motdotla/dotenv) | Gerenciamento de variáveis de ambiente |
| [cors](https://github.com/expressjs/cors) | Controle de requisições externas (CORS) |
| [Jest](https://jestjs.io/) + [Supertest](https://github.com/ladjs/supertest) | Testes automatizados |

### Infraestrutura e CI/CD

| Ferramenta | Uso |
|---|---|
| Git + [GitHub](https://github.com/) | Versionamento e repositório do código |
| [GitHub Actions](https://github.com/features/actions) | Pipeline de CI/CD |
| [Railway](https://railway.app/) | Deploy automático do backend |
| [Vercel](https://vercel.com/) | Deploy automático do frontend |

---

## Como Executar Localmente

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Uma string de conexão PostgreSQL (ex: via [Neon](https://neon.tech/))

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/kauasdn/MyGarage.git
   cd MyGarage
   ```

2. Configure as variáveis de ambiente do backend. Crie um arquivo `.env` em `backend/`:
   ```env
   DATABASE_URL="sua_string_de_conexao_neon"
   JWT_SECRET="seu_segredo_jwt"
   PORT=3000
   ```

3. Instale as dependências e execute as migrations:
   ```bash
   cd backend
   npm install
   npx prisma migrate deploy
   ```

4. Instale as dependências do frontend:
   ```bash
   cd ../frontend
   npm install
   ```

5. Inicie o projeto (a partir da raiz):
   ```bash
   cd ..
   npm run dev
   ```

---

## Testes

Para rodar a suíte de testes automatizados do backend:

```bash
cd backend
npm test
```

---

## Estrutura do Projeto

```
MyGarage/
├── frontend/        # Aplicação React (Vite + Tailwind)
├── backend/         # API REST (Node.js + Express + Prisma)
└── package.json     # Script raiz com concurrently
```

---

## Projeto no Figma

https://www.figma.com/design/KctESLfa88grMvg1dCNwTy/MyGarage?node-id=0-1&t=gxWx4pI4D6iaI64J-1

---

## Autor

**Kauã M. Bassan** – [github.com/kauasdn](https://github.com/kauasdn)