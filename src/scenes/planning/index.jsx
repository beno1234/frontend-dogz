import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { AuthContext } from "../../contexts/auth";
import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Header from "../../components/Header";
import "./style.css";
import PersonIcon from "@mui/icons-material/Person";
import PetsIcon from "@mui/icons-material/Pets";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useMatch } from "react-router-dom";
import { ListFatura } from "../../services/api";

const Planos = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const match = useMatch(`/avulsos/:id`);
  const id = match?.params?.id;

  const { logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [pets, setPets] = useState([]);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await ListFatura(id);
      const animal = response.data.map((item) => ({
        nome: item.nomePets,
        descricao: `${item.raca}, ${item.cor}`,
      }));
      const planos = response.data.map((index) => ({
        nome: index.servicos,
        desc: `${index.recorrencia} (${index.vezes_recorrencia}x)`,
      }));
      setPlans(planos);
      setPets(animal);
      setUsers(response.data);
      console.log(response.data);
      console.log(planos);
      setLoading(false);
    })();
  }, []);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return <div className="loading">carregando dados</div>;
  }

  const invoiceSubtotal = 40.0;
  const TAX_RATE = 0.1;
  const invoiceTaxes = invoiceSubtotal * TAX_RATE;
  const invoiceTotal = invoiceSubtotal + invoiceTaxes;

  return (
    <Box m="20px">
      <div className="flex justify-around m-5">
        <div className="card pet-card p-5">
          <div className="container items-center">
            <h4>
              <b>Cliente: {users[0]?.nome}</b>
            </h4>
            <h4>
              {" "}
              <b>Endereço: {users[1]?.endereco}</b>
            </h4>
            <h4>
              <b>Cidade: {users[0]?.cidade}</b>
            </h4>
            <p className="pet-card__contact">
              <b>Telefone: {users[0]?.contact}</b>
            </p>
            <br />
            <br />
            <p className="pet-card__pets">Pets:</p>
            <ul className="pet-card__pet-list">
              {pets.map((pet, index) => (
                <li key={index} className="pet-card__pet-item">
                  {pet.nome} - {pet.descricao}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="container text-right">
            <h4>
              {plans.map((planos, index) => (
                <b key={index}>
                  {" "}
                  {planos.nome} - ({planos.desc}){""}{" "}
                </b>
              ))}
            </h4>
            {/*             <p>
              {" "}
              {plans.map((planos, index) => (
                <b key={index}>
                  {" "}
                  {planos.desc}
                  {""}{" "}
                </b>
              ))}
            </p> */}
          </div>
        </div>
      </div>

      <TableContainer
        component={Paper}
        sx={{ marginTop: "10rem", padding: "2rem 0", background: "none" }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={3}>Detalhes</TableCell>
              <TableCell align="right">Preço</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Desc</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Valor Unit.</TableCell>
              <TableCell align="right">Tot</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Escola - Plano</TableCell>
              <TableCell align="right">25/02/2023</TableCell>
              <TableCell align="right">R$10.00</TableCell>
              <TableCell align="right">R$20.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Banho - Plano</TableCell>
              <TableCell align="right">25/02/2023</TableCell>
              <TableCell align="right">R$20.00</TableCell>
              <TableCell align="right">R$20.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <input
                  type="text"
                  style={{ background: "none", width: "100%" }}
                  placeholder="Avulsos"
                />
              </TableCell>
              <TableCell align="right">
                <input
                  type="date"
                  className="date-input"
                  style={{
                    background: "none",
                    color: "white",
                    textAlign: "right",
                  }}
                />
              </TableCell>
              <TableCell align="right">
                <input
                  type="text"
                  placeholder="R$0.00"
                  style={{ background: "none", textAlign: "right" }}
                />
              </TableCell>
              <TableCell align="right">
                <input
                  type="text"
                  placeholder="R$0.00"
                  style={{ background: "none", textAlign: "right" }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">R$40.00</TableCell>
            </TableRow>
          </TableBody>

          <TableHead>
            <TableRow>
              <TableCell rowSpan={3} />

              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">${invoiceTotal.toFixed(2)}</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Planos;
