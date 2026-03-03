import { createStore } from "@praxisjs/store";

const MOCK_USERS = [
  { email: "dev@praxisjs.io", password: "praxis123" },
  { email: "admin@praxisjs.io", password: "admin123" },
];

export const useAuthStore = createStore({
  email: "",
  password: "",
  remember: false,
  showPassword: false,
  loading: false,
  success: false,
  loggedUser: "",
  errors: {} as Record<string, string>,

  setEmail(value: string) {
    this.email = value;
    delete this.errors["email"];
    delete this.errors["global"];
  },

  setPassword(value: string) {
    this.password = value;
    delete this.errors["password"];
    delete this.errors["global"];
  },

  setRemember(value: boolean) {
    this.remember = value;
  },

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  },

  validate(): boolean {
    const errors: Record<string, string> = {};

    if (!this.email) {
      errors["email"] = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      errors["email"] = "Invalid email format.";
    }

    if (!this.password) {
      errors["password"] = "Password is required.";
    } else if (this.password.length < 6) {
      errors["password"] = "Password must be at least 6 characters.";
    }

    this.errors = errors;
    return Object.keys(errors).length === 0;
  },

  async login() {
    if (!this.validate()) return;

    this.loading = true;
    this.errors = {};

    await new Promise((resolve) => setTimeout(resolve, 1400));

    const match = MOCK_USERS.find(
      (u) => u.email === this.email && u.password === this.password,
    );

    if (!match) {
      this.errors = {
        global: "Invalid credentials. Try dev@praxisjs.io / praxis123",
      };
      this.loading = false;
      return;
    }

    this.loggedUser = this.email;
    this.loading = false;
    this.success = true;
  },

  logout() {
    this.success = false;
    this.loggedUser = "";
    this.email = "";
    this.password = "";
    this.errors = {};
  },
});
