import { createContext, useEffect, useState, ReactNode, useContext } from "react"
import { api } from "../services/api";






export const TransactionsProvider = ({ children }) => {
    const [transactions, setTransactions] = useState < Transaction > ([]);

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput) {
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date(),
        });
        const { transaction } = response.data;
        setTransactions([
            ...transactions,
            transaction
        ]);
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
}

export const useTransactions = () => {
    const context = useContext(TransactionsContext);
    return context;
}
