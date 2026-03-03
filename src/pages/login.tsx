import { BaseComponent } from "@praxisjs/core";
import { Component } from "@praxisjs/decorators";
import { useAuthStore } from "../store/auth";

@Component()
export class Login extends BaseComponent {
  private store = useAuthStore();

  private handleSubmit(e: Event) {
    e.preventDefault();
    this.store.login();
  }

  render() {
    const store = this.store;

    return (
      <div class="login-root">
        {/* ── Left panel ── */}
        <div class="login-left">
          <div class="left-bg-glow">
            <div class="glow-1" />
            <div class="glow-2" />
            <div class="grid-overlay" />
          </div>

          <div class="left-brand">
            <div class="brand-logo">
              <img
                src="/logo.svg"
                alt="PraxisJS"
                width="22"
                height="22"
                style="filter: brightness(0) invert(1);"
              />
            </div>
            <span class="brand-name">PraxisJS</span>
          </div>

          <div class="left-hero">
            <div class="left-hero-badge">
              <div class="badge-dot" />
              @praxisjs/auth
            </div>
            <h1>
              Build with
              <br />
              confidence.
            </h1>
            <p>
              PraxisJS gives you reactive state, composable logic, and a
              powerful DI system — all in one framework.
            </p>
          </div>

          <div class="left-features">
            <div class="left-feature">
              <div class="left-feature-icon">⚡</div>
              <div class="left-feature-text">
                <strong>Reactive Store</strong>
                <span>@praxisjs/store — zero-boilerplate state</span>
              </div>
            </div>
            <div class="left-feature">
              <div class="left-feature-icon">🧩</div>
              <div class="left-feature-text">
                <strong>Composables</strong>
                <span>@praxisjs/composables — reusable logic</span>
              </div>
            </div>
            <div class="left-feature">
              <div class="left-feature-icon">🔀</div>
              <div class="left-feature-text">
                <strong>Concurrent DI</strong>
                <span>@praxisjs/concurrent — async-first DI</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div class="login-right">
          <div class="right-bg-glow" />

          <div class="login-card">
            {/* Success state */}
            {store.success && (
              <div class="login-success">
                <div class="success-icon">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div class="success-title">Welcome back!</div>
                <div class="success-user">{store.loggedUser}</div>
                <p class="success-sub">
                  You're now signed in to your PraxisJS account.
                </p>
                <button class="btn-back" onClick={() => store.logout()}>
                  Sign out
                </button>
              </div>
            )}

            {/* Form state */}
            {!store.success && (
              <div class="login-form-wrap">
                <div class="login-card-header">
                  <h2>Sign in</h2>
                  <p>
                    Don't have an account? <a href="#">Create one</a>
                  </p>
                </div>

                <form
                  class="login-form"
                  onSubmit={(e: Event) => this.handleSubmit(e)}
                  noValidate
                >
                  {store.errors["global"] && (
                    <div class="alert-error">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      {store.errors["global"]}
                    </div>
                  )}

                  {/* Email */}
                  <div class="form-group">
                    <label class="form-label">Email</label>
                    <div class="input-wrap">
                      <span class="input-icon">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </span>
                      <input
                        type="email"
                        placeholder="dev@praxisjs.io"
                        value={store.email}
                        class={store.errors["email"] ? "input-error" : ""}
                        onInput={(e: InputEvent) =>
                          store.setEmail((e.target as HTMLInputElement).value)
                        }
                      />
                    </div>
                    {store.errors["email"] && (
                      <span class="form-error">{store.errors["email"]}</span>
                    )}
                  </div>

                  {/* Password */}
                  <div class="form-group">
                    <label class="form-label">
                      Password
                      <span class="form-label-hint">Forgot password?</span>
                    </label>
                    <div class="input-wrap">
                      <span class="input-icon">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <rect
                            x="3"
                            y="11"
                            width="18"
                            height="11"
                            rx="2"
                            ry="2"
                          />
                          <path d="M7 11V7a5 5 0 0110 0v4" />
                        </svg>
                      </span>
                      <input
                        type={store.showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={store.password}
                        class={store.errors["password"] ? "input-error" : ""}
                        onInput={(e: InputEvent) =>
                          store.setPassword(
                            (e.target as HTMLInputElement).value,
                          )
                        }
                      />
                      <button
                        type="button"
                        class="input-toggle"
                        onClick={() => store.toggleShowPassword()}
                      >
                        {store.showPassword ? (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        ) : (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                            <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {store.errors["password"] && (
                      <span class="form-error">{store.errors["password"]}</span>
                    )}
                  </div>

                  {/* Remember me */}
                  <div class="form-row">
                    <label class="checkbox-label">
                      <input
                        type="checkbox"
                        checked={store.remember}
                        onChange={(e: Event) =>
                          store.setRemember(
                            (e.target as HTMLInputElement).checked,
                          )
                        }
                      />
                      Remember me
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    class="btn-submit"
                    disabled={store.loading}
                  >
                    {store.loading ? (
                      <div class="btn-loading">
                        <div class="btn-spinner" />
                        Signing in…
                      </div>
                    ) : (
                      <span>Sign in</span>
                    )}
                  </button>

                  <div class="divider">or continue with</div>

                  <div class="oauth-group">
                    <button type="button" class="btn-oauth">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      GitHub
                    </button>
                    <button type="button" class="btn-oauth">
                      <svg width="16" height="16" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Google
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          <footer class="login-footer">
            powered by <span>@praxisjs/auth</span> · v2.4.0
          </footer>
        </div>
      </div>
    );
  }
}
