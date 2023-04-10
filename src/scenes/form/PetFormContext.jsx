import { createContext, useContext } from "react";

const PetFormContext = createContext(null);
export const PetFormProvider = PetFormContext.Provider;

export function usePetFormContext() {
    const context = useContext(PetFormContext);
    if (!context) {
        throw new Error("Must be used in scope of a PetFormProvider");
    }

    return context;
}