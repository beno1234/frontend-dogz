import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./pages/Home"
import Dashboard from "./pages/dashboard";

import { AuthProvider, AuthContext } from "./contexts/auth";
import { useContext } from "react";

const AppRoutes = () => {

    const Private = ({ children }) => {
        const { isLoggedIn, loading } = useContext(AuthContext);

        if (loading) {
            return <div className="loading">loading </div>
        }


        if (!isLoggedIn) {
            return <Navigate to="/" />
        }

        return children;
    }


    return (
        <Router>
            <AuthProvider>

                <Route exact path="/" element={<Home />} />
            </AuthProvider>

            <Routes>
                <Route exact path="/dashboard" element={<Private><Dashboard /></Private>} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes;