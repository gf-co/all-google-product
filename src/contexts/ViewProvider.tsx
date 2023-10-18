import React, { createContext, useContext, useState } from "react";

export type View = "grid" | "stack";

const defaultView: View = "grid";

type ViewContextType = {
  view: View;
  setView: (view: View) => void;
};

const ViewContext = createContext<ViewContextType>({
  view: defaultView,
  setView: () => {},
});

export const useView = () => {
  const context = useContext(ViewContext);
  // @todo - why is not throwing error when not wrapped in ViewProvider?
  if (!context) {
    throw new Error("useView must be used within a ViewProvider");
    
  }
  return context;
};

type ViewProviderProps = {
  children: React.ReactNode;
};

export const ViewProvider = ({ children }: ViewProviderProps) => {
  const [view, setView] = useState<View>(defaultView);

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
};
