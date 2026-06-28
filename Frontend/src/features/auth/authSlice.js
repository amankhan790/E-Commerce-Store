import { createSlice } from "@reduxjs/toolkit";

const getInitialAuth = () => {
  try {
    const raw = localStorage.getItem("auth");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const initialState = {
  auth: getInitialAuth(),
  isDemo: getInitialAuth()?.user?.role === "demo",
  isDashboardUser: getInitialAuth()?.user?.role === "demo",
};

const DEMO_EMAILS = new Set(["demo@ayashtech.com"]);
const DEMO_PASSWORDS = new Set(["demo1234"]);
const DEMO_NAME = "Aman";

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      const { email, password } = action.payload;
      const normalizedEmail = String(email || "").trim().toLowerCase();
      const normalizedPassword = String(password || "");

      const isDemoLogin =
        DEMO_EMAILS.has(normalizedEmail) &&
        DEMO_PASSWORDS.has(normalizedPassword);

      const user = {
        email: normalizedEmail,
        name: isDemoLogin ? DEMO_NAME : "Guest",
        role: isDemoLogin ? "demo" : "user",
      };

      state.auth = { user };
      state.isDemo = isDemoLogin;
      state.isDashboardUser = isDemoLogin;

      try {
        localStorage.setItem("auth", JSON.stringify({ user }));
      } catch (err) {
        console.error("Failed to save auth state to localStorage", err);
      }
    },
    signUp: (state, action) => {
      // Mock registration - logs the user in immediately
      const { email, name } = action.payload;
      const normalizedEmail = String(email || "").trim().toLowerCase();
      
      const user = {
        email: normalizedEmail,
        name: name || "Guest",
        role: "user",
      };

      state.auth = { user };
      state.isDemo = false;
      state.isDashboardUser = false;

      try {
        localStorage.setItem("auth", JSON.stringify({ user }));
      } catch (err) {
        console.error("Failed to save auth state to localStorage", err);
      }
    },
    signOut: (state) => {
      state.auth = null;
      state.isDemo = false;
      state.isDashboardUser = false;
      try {
        localStorage.removeItem("auth");
      } catch (err) {
        console.error("Failed to remove auth state from localStorage", err);
      }
    },
  },
});

export const { signIn, signUp, signOut } = authSlice.actions;
export default authSlice.reducer;
