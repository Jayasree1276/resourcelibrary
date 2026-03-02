import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// helper to read/write user list from localStorage
const getStoredUsers = () => {
  try {
    const raw = localStorage.getItem("users");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const setStoredUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

const normalizeEmail = (email = "") => email.trim().toLowerCase();
const normalizeRole = (role = "user") => role.trim().toLowerCase();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem("currentUser");
    return stored ? JSON.parse(stored) : null;
  });

  const login = ({ email, password, role }) => {
    const users = getStoredUsers();
    const normalizedEmail = normalizeEmail(email);
    const selectedRole = normalizeRole(role);
    const userByEmail = users.find((u) => normalizeEmail(u.email) === normalizedEmail);
    if (!userByEmail) {
      throw new Error("Account does not exist. Please register first.");
    }
    const storedRole = normalizeRole(userByEmail.role || "user");
    if (userByEmail.password !== password || storedRole !== selectedRole) {
      throw new Error("Invalid email/password or role combination.");
    }
    const normalizedUser = { ...userByEmail, email: normalizedEmail, role: storedRole };
    localStorage.setItem("currentUser", JSON.stringify(normalizedUser));
    setCurrentUser(normalizedUser);
    return normalizedUser;
  };

  const register = ({ name, email, password, role }) => {
    const users = getStoredUsers();
    const normalizedEmail = normalizeEmail(email);
    const normalizedRole = normalizeRole(role);
    const exists = users.some((u) => normalizeEmail(u.email) === normalizedEmail);
    if (exists) {
      throw new Error("Account with this email already exists");
    }
    const newUser = {
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: normalizedRole,
    };
    users.push(newUser);
    setStoredUsers(users);
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
