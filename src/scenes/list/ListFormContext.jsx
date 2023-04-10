import { createContext, useContext } from "react";

const ListFormContext = createContext(null);
export const ListFormProvider = ListFormContext.Provider;

export function useListFormContext() {
    const context = useContext(ListFormContext);
    if (!context) {
        throw new Error("Must be used in scope of a ListFormProvider");
    }

    return context;
}