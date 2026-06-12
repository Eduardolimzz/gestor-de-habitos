# Análise do Projeto (Frontend) + Contratos Necessários no Backend

Data da análise: 31/05/2026

Este documento descreve:
1. O escopo do app e o que o frontend já implementa.
2. Como o backend está estruturado (SOLID + Factory) e o que já existe.
3. Os métodos/endpoints que faltam (ou precisam ser alinhados) para o backend atender o frontend.

## 1) Escopo do projeto

Aplicativo mobile (Expo/React Native) para gerenciamento de hábitos saudáveis, com:
- Autenticação (cadastro e login).
- Tela principal (lista de hábitos e criação/edição/exclusão via UI).
- Tela de hábitos (visão “Seus hábitos” com filtro por datas).
- Tela de progresso/metas (visões de “metas” e detalhes).
- Configurações/conta (perfil, logout, sobre).

Backend (Node.js/Express) serve como API, com JWT para proteger rotas de hábitos.

## 2) Mapa do Frontend (mobile/)

### 2.1. Navegação e telas

Arquivo: `mobile/App.js`
- Stack com as telas:
  - `Signup` (inicial no momento)
  - `Login`
  - `Home`
  - `AllHabits`
  - `Progress`
  - `GoalsProgress` (modal)
  - `GoalDetails` (modal)
  - `Configuracoes`
  - `Conta`
  - `SobreOApp`

### 2.2. Consumo de API

Arquivo: `mobile/src/services/api.js`
- Axios com `baseURL` baseado no IP do host via Expo (`http://<host>:3000`).
- Interceptors de log e tratamento básico de erro.

### 2.3. Estado/autenticação no app

Arquivo: `mobile/src/context/AuthContext.js`
- Guarda apenas `user` em memória:
  - `login(userData)`
  - `logout()`
  - `updateUser(dados)`

Ponto crítico para integração:
- O backend já retorna `token` no login, mas o frontend atualmente NÃO persiste token e NÃO injeta `Authorization: Bearer <token>` nas requisições.
- Além disso, depois do `Signup`, o frontend chama `login({ name, email })` sem token.

Conclusão: do jeito que está hoje, qualquer rota protegida (ex.: `/habits`) vai falhar com `401 Token não informado`.

### 2.4. O que está mockado (sem backend)

`Home.js`
- Usa `initialHabits` local no estado (hardcoded) e faz criação/edição/exclusão localmente.
- Cálculo de porcentagem concluída é local.

`AllHabits.js`
- Recebe `habits` via `route.params?.habits` (normalmente vindo do `Home`), e o toggle/exclusão são locais (sem API).

`Progress.js`, `GoalsProgress.js`, `GoalDetails.js`
- Usam `mobile/src/data/mockGoals.js` (metas/progresso totalmente mockado).

`Conta.js`
- Atualiza dados do usuário apenas no contexto (sem backend).

## 3) Backend: o que já foi feito (backend/)

### 3.1. Rotas e controllers

Arquivo: `backend/src/app.js`
- Rotas:
  - `GET /` (health/info)
  - `POST /auth/register`
  - `POST /auth/login`
  - Rotas de hábitos em `"/habits"` (protegidas por middleware)

Arquivos:
- `backend/src/routes/authRoutes.js`
  - `POST /auth/register`
  - `POST /auth/login`
- `backend/src/routes/habitRoutes.js` (com `authMiddleware`)
  - `GET /habits`
  - `POST /habits`
  - `PUT /habits/:id`
  - `DELETE /habits/:id`

Controllers:
- `authController.js` usa `makeAuthService()`
- `habitController.js` usa `makeHabitService()`

### 3.2. SOLID + Factory (como está aplicado)

Factories:
- `backend/src/factories/authFactory.js`
  - Constrói `AuthService` injetando `userModel` + `config`.
- `backend/src/factories/habitFactory.js`
  - Constrói `HabitService` injetando `habitModel`.

Isso é um bom começo de:
- SRP: controller “só” orquestra request/response; service contém regra.
- DIP: services dependem de abstrações (a “interface” do model), e o factory injeta a implementação.

Serviços:
- `AuthService`
  - `register({ name, email, password })` (hash com bcrypt)
  - `login({ email, password })` (retorna `{ token, user }`)
- `HabitService`
  - `list(userId)`
  - `create({ name, userId })`
  - `update(id, userId, data)`
  - `delete(id, userId)`

Middleware:
- `authMiddleware`
  - Lê `Authorization: Bearer <token>`
  - Valida JWT e popula `req.user = { id, name, email }`

Models (no momento em memória):
- `userModel`: `create`, `findByEmail`, `findById`
- `habitModel`: `findAllByUserId`, `create`, `update`, `remove`

## 4) Alinhamentos necessários (Frontend x Backend)

### 4.1. JWT no frontend (obrigatório para usar /habits)

O backend espera:
- Header `Authorization: Bearer <token>`

O frontend precisa implementar:
- Guardar `token` no `AuthContext` (e idealmente persistir com `AsyncStorage`).
- Interceptor do axios para anexar o header automaticamente.

Métodos que o frontend deveria ter (sugestão):
- `AuthContext.login({ user, token })`
- `AuthContext.logout()` limpando token
- `AuthContext.getToken()` (ou simplesmente expor `token` no contexto)

### 4.2. Modelo de “hábito” está diferente entre frontend e backend

Backend (`habitModel`):
- `{ id, name, completed, userId, createdAt }`

Frontend (ex.: `Home.js` / `AllHabits.js`):
- Usa `title`, `habitName`, `done`, `titulo`, `periodo`, `tipoHabito`, `percentual`, `status` (misto de “hábito” e “meta” no mesmo objeto)

Decisão de engenharia (recomendado):
- Separar conceitos:
  - Entidade `Habit` (o hábito em si)
  - Entidade `Goal`/`Meta` (alvo/planejamento do hábito, com período, frequência, progresso, status)
- Se o projeto quiser manter “tudo num objeto”, então o backend precisa suportar todos esses campos.

## 5) Métodos/endpoints que o backend precisa (para o app funcionar)

Aqui está uma lista objetiva do que o backend deve oferecer para o frontend “de verdade” (sem mocks):

### 5.1. Autenticação

Já existe:
1. `POST /auth/register`
   - Body: `{ name, email, password }`
   - Resposta (hoje): `{ message, user: { id, name, email } }`

2. `POST /auth/login`
   - Body: `{ email, password }`
   - Resposta (hoje): `{ message, token, user: { id, name, email } }`

Sugestões (não existem ainda, mas serão úteis):
3. `GET /auth/me`
   - Header: `Authorization: Bearer <token>`
   - Resposta: `{ user: { id, name, email } }`
   - Uso: reidratar sessão no app ao abrir.

4. `PUT /users/me`
   - Header: `Authorization: Bearer <token>`
   - Body: `{ name?, email?, password? }`
   - Uso: tela `Conta` deixar de ser apenas mock.

### 5.2. Hábitos (CRUD)

Já existe (rotas e services), mas precisa de integração no frontend:
1. `GET /habits`
   - Header: `Authorization: Bearer <token>`
   - Resposta: lista de hábitos do usuário

2. `POST /habits`
   - Header: `Authorization: Bearer <token>`
   - Body mínimo atual: `{ name }`

3. `PUT /habits/:id`
   - Header: `Authorization: Bearer <token>`
   - Body: campos atualizáveis (ex.: `{ name, completed }`)

4. `DELETE /habits/:id`
   - Header: `Authorization: Bearer <token>`

Alinhamento importante:
- Hoje o frontend trabalha com `done` e o backend com `completed`.
  - Opção A: backend padroniza como `done`.
  - Opção B (mais comum): backend mantém `completed` e o frontend adapta.

### 5.3. Metas/Progresso (atualmente mockado no frontend)

Hoje `Progress`/`GoalsProgress`/`GoalDetails` usam `mockGoals`.
Se vocês quiserem “backend real” para isso, o backend precisará de uma entidade nova (ex.: `goals` ou `habits/:id/goals`).

Endpoints sugeridos (um caminho possível):
1. `GET /goals`
2. `POST /goals`
3. `PUT /goals/:id`
4. `DELETE /goals/:id`
5. `GET /goals/:id` (detalhes)

E, se quiser marcar conclusão por dia (calendário do `GoalDetails`):
6. `POST /goals/:id/checkins` (marca o dia)
7. `DELETE /goals/:id/checkins/:date` (desmarca o dia)
8. `GET /goals/:id/checkins?from=YYYY-MM-DD&to=YYYY-MM-DD`

## 6) Lista de métodos (código) que vão precisar existir/ajustar

### 6.1. Backend (camada service/model)

Já existem:
- `AuthService.register()`, `AuthService.login()`
- `HabitService.list()`, `HabitService.create()`, `HabitService.update()`, `HabitService.delete()`
- `userModel.create/findByEmail/findById`
- `habitModel.findAllByUserId/create/update/remove`

Provavelmente vão precisar (para evoluir com SOLID e evitar “if gigante”):
- Um `UserService.updateMe(userId, data)` para a tela `Conta`.
- Um `GoalService` (ou `MetaService`) com:
  - `list(userId)`
  - `create(userId, data)`
  - `update(goalId, userId, data)`
  - `delete(goalId, userId)`
  - `getById(goalId, userId)`
  - (opcional) `addCheckin(goalId, userId, date)`, `removeCheckin(...)`, `listCheckins(...)`

E os respectivos:
- `goalModel.*` (persistência)
- `goalFactory.makeGoalService()`
- `goalRoutes` + `goalController`

### 6.2. Frontend (para consumir /habits e sair do mock)

Recomendado criar um “serviço” de hábitos (ex.: `mobile/src/services/habits.js`), com:
- `listHabits()`
- `createHabit(payload)`
- `updateHabit(id, payload)`
- `deleteHabit(id)`

E atualizar telas:
- `Home.js` e `AllHabits.js` para carregar/sincronizar com API em vez de usar somente estado local.
- Auth:
  - guardar `token` no contexto
  - usar token no axios (`Authorization`)

## 7) Observações de engenharia de software (pontos fortes + gaps)

Pontos fortes (backend):
- Controllers finos chamando services (boa separação).
- Factories centralizando a composição (injeção de dependências simples).
- Middleware de autenticação isolado.

Gaps atuais para “produção” (normal no estágio de desenvolvimento):
- Models são in-memory (dados somem ao reiniciar).
- Frontend ainda não integra com `/habits` e não usa JWT.
- Não há ainda entidade/rotas de metas/progresso (por enquanto é mock).
- Não existe atualização de perfil no backend (tela `Conta` é mock).

Próximo passo mais “barato” para integração real:
1. Ajustar AuthContext para guardar `token`.
2. Injetar `Authorization` no axios.
3. Trocar o mock de hábitos no `Home` por `GET /habits` + `POST/PUT/DELETE`.

