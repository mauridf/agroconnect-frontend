# AgroConnect Frontend

Este é o projeto frontend da aplicação **AgroConnect**, desenvolvido em **React + TypeScript**, com integração à API .NET 9. A aplicação é voltada para o gerenciamento de usuários, produtores rurais, fazendas, culturas e associações entre culturas e fazendas.

## 🔧 Tecnologias Utilizadas

- React
- TypeScript
- Vite
- Recharts (para gráficos)
- React Router DOM
- Estilização inline (sem uso de Tailwind ou CSS externo)

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis (Tabela, Menu, etc.)
├── pages/                # Páginas principais do sistema
├── services/             # Serviços de consumo da API (axios)
├── App.tsx               # Configuração de rotas
└── main.tsx              # Ponto de entrada da aplicação
```

## ✅ Funcionalidades

- Autenticação (login, registro, refresh/revogar token)
- Dashboard com estatísticas e gráficos
- Cadastro e listagem de:
  - Usuários
  - Produtores Rurais
  - Fazendas (com busca de CEP)
  - Culturas (com enum de categorias e exigência climática)
  - Associações de Culturas com Fazendas

## 🚀 Como Executar

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/agroconnect-frontend.git
cd agroconnect-frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o projeto:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

## ⚙️ Configuração

Configure a URL base da API no `axios` (geralmente em `services/api.ts`):

```ts
const api = axios.create({
  baseURL: 'https://sua-api.com/api',
})
```

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.
