import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  api,
  CreatePlan,
  CreateService,
  createSession,
  CreateSessionPets,
  CreateTutorPets,
  getTutor,
  getUser,
} from "../services/api";
import { useSelectedEffect } from "../scenes/global/Sidebar";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const recoveredIsLoggedIn = localStorage.getItem("isLoggedIn");

    if (recoveredUser && token) {
      setUser(JSON.parse(recoveredUser));
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }

    if (recoveredIsLoggedIn) {
      setIsLoggedIn(JSON.parse(recoveredIsLoggedIn));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      useSelectedEffect;
      navigate(useSelectedEffect);
    }
  }, [isLoggedIn, navigate, useSelectedEffect]);

  const login = async (email, password) => {
    const response = await createSession(email, password);

    const loggedUser = await getUser();

    const token = response.data?.token;
    localStorage.setItem("user", JSON.stringify(loggedUser));
    localStorage.setItem("token", token);
    localStorage.setItem("isLoggedIn", true);

    setUser(loggedUser);
    setIsLoggedIn(true);
    navigate("/dashboard");
  };

  const logout = () => {
    console.log("logout");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    api.defaults.headers.Authorization = null;
    setUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  const tutor = async (values) => {
    const Tutor = await CreateTutorPets(values);

    navigate("/form");
  };

  const service = async (values) => {
    const service = await CreateService(values);
  };

  const pets = async (values) => {
    const pets = await CreateSessionPets(values);
  };

  const plan = async (values) => {
    const pets = await CreatePlan(values);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        loading,
        login,
        logout,
        isLoggedIn,
        tutor,
        service,
        pets,
        plan,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
