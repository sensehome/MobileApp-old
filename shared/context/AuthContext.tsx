import React from "react";
import { LoginDto } from "../models/LoginDto";

interface IAuthContext {
  isLoggedIn?: boolean;
  isLogging?: boolean;
  onLogin: (data: LoginDto) => void;
  onLogout: () => void;
}

export const AuthContext = React.createContext<IAuthContext>({
  onLogin: (data: LoginDto) => {},
  onLogout: () => {},
});

export const AuthConsumer = AuthContext.Consumer;
export const AuthProvider = AuthContext.Provider;
