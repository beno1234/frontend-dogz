import { useContext, useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import FormTutor from "./scenes/form";
import Line from "./scenes/line";
import Calendar from "./scenes/calendar/calendar";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Home } from "./pages/Home";

import { AuthProvider, AuthContext } from "./contexts/auth";
import Lista from "./scenes/list";
import Planos from "./scenes/planning";
import Hotel from "./scenes/hotel";
import Edit from "./scenes/edit/edit";
import Grade from "./scenes/grade";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const Private = ({ children }) => {
    const { isLoggedIn, loading } = useContext(AuthContext);

    if (loading) {
      return <div className="loading">loading</div>;
    }

    if (!isLoggedIn) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <AuthProvider>
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route
                  path="/dashboard"
                  element={
                    <Private>
                      <Dashboard />
                    </Private>
                  }
                />
                <Route
                  exact
                  path="/team"
                  element={
                    <Private>
                      <Team />
                    </Private>
                  }
                />
                <Route
                  path="/contacts"
                  element={
                    <Private>
                      <Contacts />
                    </Private>
                  }
                />
                <Route
                  path="/invoices"
                  element={
                    <Private>
                      <Invoices />
                    </Private>
                  }
                />
                <Route
                  path="/form"
                  element={
                    <Private>
                      <FormTutor />
                    </Private>
                  }
                />
                <Route
                  path="/calendar"
                  element={
                    <Private>
                      <Calendar />
                    </Private>
                  }
                />
                <Route
                  path="/bar"
                  element={
                    <Private>
                      <Bar />
                    </Private>
                  }
                />
                <Route
                  path="/pie"
                  element={
                    <Private>
                      <Outlet />
                    </Private>
                  }
                >
                  <Route path="" element={<h1>Eroo</h1>} />
                  <Route path=":servico" element={<Pie />} />
                  <Route path=":nome" element={<Pie />} />
                </Route>
                <Route
                  path="/line"
                  element={
                    <Private>
                      <Line />
                    </Private>
                  }
                />
                <Route
                  path="/faq"
                  element={
                    <Private>
                      <FAQ />
                    </Private>
                  }
                />
                <Route
                  path="/geography"
                  element={
                    <Private>
                      <Geography />
                    </Private>
                  }
                />
                <Route
                  path="/list"
                  element={
                    <Private>
                      <Outlet />
                    </Private>
                  }
                >
                  <Route path="" element={<h1>Eroo</h1>} />
                  <Route path=":id" element={<Lista />} />
                </Route>
                {/*                 <Route
                  path="/avulsos"
                  element={
                    <Private>
                      <Planos />
                    </Private>
                  }
                /> */}
                <Route
                  path="/avulsos"
                  element={
                    <Private>
                      <Outlet />
                    </Private>
                  }
                >
                  <Route path="" element={<h1>Eroo</h1>} />
                  <Route path=":id" element={<Planos />} />
                </Route>
                <Route
                  path="/hotel"
                  element={
                    <Private>
                      <Hotel />
                    </Private>
                  }
                />
                <Route
                  path="/edit"
                  element={
                    <Private>
                      <Edit />
                    </Private>
                  }
                />
                <Route
                  path="/cadastro_grade"
                  element={
                    <Private>
                      <Grade />
                    </Private>
                  }
                />
              </Routes>
            </main>
          </AuthProvider>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
