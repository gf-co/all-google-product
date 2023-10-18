import { collection, doc, onSnapshot } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/config";
import { useUser } from "./UserProvider";

export type Note = {
  id: string;
  title: string;
  content: string;
  coverImageUrl?: string;
};

type NotesContextType = {
  notes: Note[];
  originalList: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  isFetching: boolean;
};

const NotesContext = createContext<NotesContextType>({
  notes: [],
  originalList: [],
  setNotes: () => {},
  isFetching: true,
});

export const useNotes = () => {
  const context = useContext(NotesContext);
  // @todo - why is not throwing error when not wrapped in NotesProvider?
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};

type NotesProviderProps = {
  children: React.ReactNode;
};

export const NotesProvider = ({ children }: NotesProviderProps) => {
  const { user } = useUser();
  const [notes, setNotes] = useState<Note[]>([]);
  const [originalList, setOriginalList] = useState<Note[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsFetching(false);
      setNotes([]);
      return;
    }

    const notesCollection = collection(doc(db, "users", user.uid), "notes");

    // @note - Listen for realtime changes in notes collection of the currently logged in user. Automatically updates the global context like UserProvider.
    const unsubscribe = onSnapshot(notesCollection, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Note[];

      setNotes(data);
      setOriginalList(data);
      setIsFetching(false);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <NotesContext.Provider
      value={{ notes, originalList, setNotes, isFetching }}
    >
      {children}
    </NotesContext.Provider>
  );
};
