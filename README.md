# PraxisJS Login

Interface de autenticação mockada construída com **PraxisJS**, seguindo a identidade visual do framework.

![PraxisJS Login Preview](/public/preview.png)

---

## Tecnologias

- [PraxisJS](https://praxisjs.io) — framework reativo com suporte a decorators, store e DI
- `@praxisjs/core` — base de componentes
- `@praxisjs/decorators` — decorator `@Component()`
- `@praxisjs/store` — gerenciamento de estado reativo
- `@praxisjs/runtime` — renderização
- Vite — bundler e dev server

---

## Estrutura

```
src/
├── pages/
│   └── login.tsx       # Componente principal da tela de login
├── store/
│   └── auth.ts         # Store de autenticação com createStore
├── main.tsx            # Entry point — renderiza <Login /> direto
├── style.css           # Estilos globais + estilos da tela de login
└── vite-env.d.ts
```

---

## Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

---

## Credenciais de teste

| Email                  | Senha       |
|------------------------|-------------|
| dev@praxisjs.io        | praxis123   |
| admin@praxisjs.io      | admin123    |

---

## Funcionalidades

- Login mockado com validação de campos
- Feedback de erro inline por campo e global
- Toggle de visibilidade da senha
- Estado de loading durante autenticação
- Tela de sucesso após login
- Botões OAuth (GitHub e Google) — mockados
- Layout split-screen responsivo
- Dark theme com identidade visual do PraxisJS

---

## Store de autenticação

O estado é gerenciado via `createStore` do `@praxisjs/store`. Os métodos disponíveis são:

```ts
store.setEmail(value)        // atualiza o campo e limpa erros
store.setPassword(value)     // atualiza o campo e limpa erros
store.setRemember(value)     // toggle "remember me"
store.toggleShowPassword()   // alterna visibilidade da senha
store.login()                // valida e executa autenticação (async)
store.logout()               // reseta o estado
```

---

## Integração com backend real

Para conectar a um backend real, substitua a lógica mockada no método `login()` em `store/auth.ts`:

```ts
async login() {
  if (!this.validate()) return;
  this.loading = true;

  // Substitua pelo seu endpoint:
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: this.email, password: this.password }),
  });

  if (!res.ok) {
    this.errors = { global: "Credenciais inválidas." };
    this.loading = false;
    return;
  }

  const { token } = await res.json();
  localStorage.setItem("token", token);
  this.loggedUser = this.email;
  this.loading = false;
  this.success = true;
}
```
