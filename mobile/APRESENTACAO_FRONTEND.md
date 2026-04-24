# 📱 Gestor de Hábitos — Documentação de Apresentação

## 1. Escopo do Projeto

Este projeto é um **aplicativo mobile completo** para gestão de hábitos e metas pessoais, desenvolvido com **React Native + Expo**. O app permite que usuários criem, acompanhem e concluam hábitos diários, com sistema de progresso visual e autenticação.

### Funcionalidades Principais

| Funcionalidade | Descrição |
|----------------|-----------|
| **Autenticação** | Login e cadastro de usuários com integração ao backend |
| **Gestão de Hábitos** | Criar, editar, excluir e marcar hábitos como concluídos |
| **Metas** | Agrupar hábitos em metas com período definido (ex: 1 mês) |
| **Progresso** | Visualização de percentual de conclusão diário e geral |
| **Configurações** | Gerenciamento de conta do usuário e informações do app |

---

## 2. Arquitetura do Frontend

### 2.1 Stack Tecnológico

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Mobile)                        │
├─────────────────────────────────────────────────────────────┤
│  Framework:     Expo SDK 54 (React Native 0.81)            │
│  Linguagem:     JavaScript / TypeScript                    │
│  Navegação:     React Navigation v7 (Native Stack)          │
│  Estado:        React Context API                          │
│  Estilo:        Styled Components + StyleSheet            │
│  HTTP Client:   Axios                                      │
│  Build:         Expo (sem necessidade de Xcode/Android)   │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Arquitetura de Pastas

```
mobile/
├── 📄 App.js                    ← Entry point principal
├── 📄 app.json                  ← Configuração do Expo
├── 📄 package.json              ← Dependências e scripts
├── 📄 tsconfig.json             ← Configuração TypeScript
├── 📄 eslint.config.js          ← Regras de lint
│
├── src/
│   ├── 📂 context/              ← Gerenciamento de estado global
│   │   └── AuthContext.js       ← Context de autenticação
│   │
│   ├── 📂 services/             ← Camada de comunicação externa
│   │   └── api.js               ← Configuração Axios + interceptors
│   │
│   ├── 📂 data/                 ← Dados mockados (temporários)
│   │   └── mockGoals.js        ← Dados de exemplo para metas
│   │
│   ├── 📂 components/           ← Componentes reutilizáveis
│   │   └── styles.js           ← Estilos globais (styled-components)
│   │
│   └── 📂 screens/              ← Telas/Pages da aplicação
│       ├── 📂 login/            ← Telas de autenticação
│       │   ├── Login.js
│       │   └── Signup.js
│       │
│       ├── 📂 home/             ← Tela principal (dashboard)
│       │   └── Home.js
│       │
│       ├── 📂 habits/           ← Gestão de hábitos
│       │   ├── AllHabits.js    ← Lista completa de hábitos
│       │   └── HabitConcluido.js ← Modal de sucesso
│       │
│       ├── 📂 progress/        ← Tela de progresso/relatórios
│       │   └── Progress.js
│       │
│       ├── 📂 configuration/  ← Configurações do app
│       │   ├── Configuracoes.js
│       │   ├── Conta.js       ← Edição de perfil
│       │   └── SobreOApp.js  ← Informações da equipe
│       │
│       └── 📂 modal/           ← Componentes modais
│           ├── GoalDetails.js ← Detalhes de uma meta
│           ├── GoalsProgress.js ← Lista de todas as metas
│           └── ExcluirConfirm.js ← Modal de confirmação
│
└── assets/                      ← Recursos estáticos (imagens, ícones)
```

---

## 3. Arquivos de Configuração

### 3.1 `package.json`

**Finalidade:** Define todas as dependências do projeto e scripts disponíveis.

```json
{
  "name": "mobile",
  "main": "node_modules/expo/AppEntry.js",
  "dependencies": {
    "expo": "~54.0.33",
    "react": "19.1.0",
    "react-native": "0.81.5",
    "@react-navigation/native": "^7.1.34",
    "@react-navigation/native-stack": "^7.14.6",
    "axios": "^1.13.6",
    "styled-components": "^6.3.12"
  },
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  }
}
```

**Scripts disponíveis:**
- `npm start` — Inicia o servidor de desenvolvimento
- `npm run android` — Build para Android
- `npm run ios` — Build para iOS
- `npm run web` — Build para Web

### 3.2 `app.json`

**Finalidade:** Configuração global do app Expo (nome, ícone, splash, plugins).

```json
{
  "expo": {
    "name": "mobile",
    "slug": "mobile",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "plugins": [
      "expo-router",
      ["expo-splash-screen", { "image": "./assets/images/splash-icon.png" }]
    ],
    "experiments": {
      "typedRoutes": true,
      "reactCompiler": true
    }
  }
}
```

**Destaques:**
- `newArchEnabled: true` — Ativa a nova arquitetura do React Native
- `expo-router` — Sistema de navegação baseado em arquivos
- `typedRoutes` — Tipagem forte para rotas

### 3.3 `tsconfig.json`

**Finalidade:** Configuração do TypeScript para análise estática de código.

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**Destaques:**
- Modo `strict` ativo — Maior rigor na verificação de tipos
- Alias `@/*` — Atalho para importações relativas (`@/src/screens`)

### 3.4 `App.js` (Entry Point)

**Finalidade:** Configura a navegação principal e providers globais.

```javascript
// mobile/App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/AuthContext';

// Importação de todas as telas
import Login from './src/screens/login/Login';
import Signup from './src/screens/login/Signup';
import Home from './src/screens/home/Home';
// ...outras telas

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Signup">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={Home} />
          // ...outras rotas
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
```

---

## 4. Estrutura de Componentes

### 4.1 Context API — `AuthContext.js`

Gerencia o estado de autenticação globalmente.

```javascript
// src/context/AuthContext.js
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(userData) { setUser(userData); }
  function logout() { setUser(null); }
  function updateUser(dados) { /* atualiza dados do usuário */ }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
```

**Uso:** Qualquer componente pode acessar `const { user, login, logout } = useAuth()`

### 4.2 Camada de API — `api.js`

Configuração centralizada do Axios com interceptors.

```javascript
// src/services/api.js
const host = Constants.expoConfig?.hostUri?.split(':')[0] || 'localhost';
const BASE_URL = `http://${host}:3000`;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Interceptor de request — log de todas as chamadas
api.interceptors.request.use((config) => {
  console.log(`[API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  return config;
});
```

**Destaque:** Detecta automaticamente o IP da máquina para conexão com backend.

### 4.3 Estilos Globais — `styles.js`

Componentes styled-components reutilizáveis.

```javascript
// src/components/styles.js
export const Colors = {
  primary: '#ffffff',
  brand: '#10B981',   // Verde principal
  green: '#10B981',
  red: '#EF4444',     // Vermelho para erros/excluir
};

export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${StatusBarHeight + 10}px;
  background-color: ${primary};
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${secondary};
  // ...outros estilos
`;
```

---

## 5. Fluxo de Navegação

```
┌──────────────────────────────────────────────────────────────────┐
│                        FLUXO DE NAVEGAÇÃO                        │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────┐     ┌─────────┐     ┌─────────┐                  │
│   │ Signup  │────▶│  Login  │────▶│  Home   │                  │
│   │(cadastro)│     │         │     │(dashboard)│                 │
│   └─────────┘     └─────────┘     └────┬────┘                  │
│                                         │                       │
│                    ┌────────────────────┼────────────────┐     │
│                    │                    │                │     │
│              ┌─────▼─────┐        ┌─────▼─────┐    ┌─────▼─────┐ │
│              │ Progress  │        │Configura- │    │ AllHabits │ │
│              │(relatórios)│       │   ções    │    │(todos)    │ │
│              └─────┬─────┘        └─────┬─────┘    └───────────┘ │
│                    │                    │                        │
│              ┌─────▼────────────┐ ┌─────▼─────┐                 │
│              │  GoalsProgress    │ │   Conta   │                 │
│              │ (lista metas)     │ │(perfil)   │                 │
│              └─────────┬─────────┘ └───────────┘                 │
│                        │                                        │
│                  ┌─────▼─────┐                                  │
│                  │GoalDetails│                                  │
│                  │(detalhes) │                                  │
│                  └───────────┘                                  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 6. Sugestão de Divisão para Apresentação (5 Pessoas)

| Pessoa | Tema | Arquivos/Screens |
|--------|------|------------------|
| **1** | **Arquitetura & Configuração** | `package.json`, `app.json`, `tsconfig.json`, `App.js` — Explicar stack, dependências e estrutura de pastas |
| **2** | **Autenticação & Context** | `AuthContext.js`, `Login.js`, `Signup.js` — Context API, login/cadastro, integração com backend |
| **3** | **Home & Gestão de Hábitos** | `Home.js`, `AllHabits.js`, `HabitConcluido.js` — Dashboard, criar/editar hábitos, modal de sucesso |
| **4** | **Progresso & Metas** | `Progress.js`, `GoalsProgress.js`, `GoalDetails.js`, `mockGoals.js` — Relatórios, visualização de metas, detalhes |
| **5** | **Configurações & Modais** | `Configuracoes.js`, `Conta.js`, `SobreOApp.js`, `ExcluirConfirm.js` — Menu configurações, perfil, equipe, modais |

---

## 7. Pontos-Chave para Apresentação

### O que destacar:

1. **Expo SDK 54** — Latest version com nova arquitetura React Native
2. **React Navigation v7** — Navegação native stack com performance
3. **Context API** — Estado global sem bibliotecas externas (simplicidade)
4. **Styled Components** — Estilização CSS-in-JS
5. **Axios com interceptors** — Logging automático de requisições
6. **IP dinâmico** — Conexão automática com backend sem hardcode
7. **Tipagem TypeScript** — Código mais seguro e manutenível

### Diferenciais do projeto:

- ✅ Interface limpa e intuitiva
- ✅ Sistema de progresso visual (círculos, barras)
- ✅ Modal de confirmação para ações destrutivas
- ✅ Navegação fluida entre telas
- ✅ Separação clara de responsabilidades (context, services, screens)

---

## 8. Como Executar

```bash
# Na pasta mobile/
cd mobile

# Instalar dependências
npm install

# Iniciar desenvolvimento
npm start

# Ou diretamente para Android
npm run android
```

> ⚠️ **Pré-requisito:** Ter o backend rodando (`cd backend && node server.js`)

---

## 9. Equipe de Desenvolvimento

| Nome | RA |
|------|-----|
| Guilherme Ferreira de Souza | 2412130057 |
| Heitor dos Santos Ribeiro | 2412130143 |
| Danielly de Sousa Luz | 2412130158 |
| Eduardo Lima dos Santos | 2412130074 |
| Vitor Alexandre Pereira da Silva | 2312130217 |
| Emanuel Nunes Almeida | 2412130094 |

---

*Documento gerado para apresentação do projeto Gestor de Hábitos*