import { FirebaseError } from "firebase/app";
import {
  User,
  onAuthStateChanged,
  signInAnonymously,
  signOut,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";

type UserContextType = {
  user: User | null;
  isSigningIn: boolean;
  isSigningOut: boolean;
  signInAsGuest: () => Promise<void>;
  signOutAsGuest: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  isSigningIn: false,
  isSigningOut: false,
  signInAsGuest: async () => {},
  signOutAsGuest: async () => {},
});

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const signInAsGuest = async () => {
    setIsSigningIn(true);
    try {
      await signInAnonymously(auth);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const signOutAsGuest = async () => {
    setIsSigningOut(true);
    try {
      await signOut(auth);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      }
    } finally {
      setIsSigningOut(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider
      value={{ user, isSigningIn, isSigningOut, signInAsGuest, signOutAsGuest }}
    >
      {children}
    </UserContext.Provider>
  );
};
