import React, { createContext, useContext, useState } from "react";
import { Note } from "./NotesProvider";

type IsEditingNoteContextType = {
  isEditingNote: Note | null;
  setIsEditingNote: React.Dispatch<React.SetStateAction<Note | null>>;
};

const isEditingNoteContext = createContext<IsEditingNoteContextType>({
  isEditingNote: null,
  setIsEditingNote: () => {},
});

export const useIsEditingNote = () => {
  const context = useContext(isEditingNoteContext);

  // @todo - why is not throwing error when not wrapped in IsEditingNoteProvider?
  if (!context) {
    throw new Error(
      "useIsEditingNote must be used within a IsEditingNoteProvider"
    );
  }
  return context;
};

type IsEditingNoteProviderProps = {
  children: React.ReactNode;
};

export const IsEditingNoteProvider = ({
  children,
}: IsEditingNoteProviderProps) => {
  const [isEditingNote, setIsEditingNote] = useState<Note | null>(null);

  return (
    <isEditingNoteContext.Provider value={{ isEditingNote, setIsEditingNote }}>
      {children}
    </isEditingNoteContext.Provider>
  );
};
