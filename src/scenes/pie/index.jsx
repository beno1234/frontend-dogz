import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  Typography,
  Checkbox,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { AuthContext } from "../../contexts/auth";
import {
  CreateSessionPets,
  ListPlanos,
  LisTutoresGrades,
} from "../../services/api";
import React, { useContext, useEffect, useState } from "react";
import Database from "../../data/mockDatabase";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link, useMatch, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Pie = () => {
  const [selectedOption, setSelectedOption] = useState();
  const [selectedPets, setSelectedPets] = useState([]);
  const theme = useTheme();
  const match = useMatch(`pie/:servico`);
  const servicos = match?.params?.servico;
  const match2 = useMatch(`pie/:nome`);
  const nome = match2?.params?.nome;
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "nome",
      headerName: "Nome do Tutor",
      flex: 1,
      cellClassName: "namo-column--cell",
    },
    {
      field: "email",
      headerName: "email",
      flex: 1,
    },
    {
      field: "instagram",
      headerName: "Insta",
      flex: 1,
    },
    {
      field: "Actions",
      headerName: "Actions",
      align: "left",
      flex: 1,
      renderCell: (params) => (
        <Checkbox
          onChange={(event) => handleChange(event, params.row)}
          checked={selectedPets.some((p) => p.id === params.row.id)}
        />
      ),
    },
  ];

  const { logout } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState([]);
  const [open, setOpen] = useState(false);
  const [netflix, setNetflix] = useState([]);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    (async () => {
      const response = await ListPlanos(nome);
      console.log(response.data);
      setNetflix(response.data);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await LisTutoresGrades(servicos);
      setUsers(response.data);
      setLoading(false);
    })();
  }, []);

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return <div className="loading">carregando dados</div>;
  }

  const handleActionsClick = () => {
    setOpen(true);
  };

  const handleChange = (event, pet) => {
    if (event.target.checked) {
      setSelectedPets([...selectedPets, pet]);
    } else {
      setSelectedPets(selectedPets.filter((p) => p.id !== pet.id));
    }
  };

  const handleSelectChange = (event, pet) => {
    const { value } = event.target;
    setSelectedPets((prevPets) =>
      prevPets.map((prevPet) =>
        prevPet.id === pet.id ? { ...prevPet, selectedOption: value } : prevPet
      )
    );
  };

  return (
    <Box m="20px">
      <Header title="Agendamento" subtitle="Agende Pets" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={users}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{
            style: {
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
              width: "100%",
              maxWidth: "1200px",
              maxHeight: "500px",
              height: "100%",
            },
          }}
        >
          <DialogTitle marginBottom={5}>Agendamento</DialogTitle>
          <DialogContent>
            {selectedPets.length > 0 ? (
              <List>
                {selectedPets.map((pet) => (
                  <ListItem key={pet.id}>
                    <ListItemText primary={pet.nome} />
                    <Select
                      value={pet.selectedOption}
                      onChange={(event) => handleSelectChange(event, pet)}
                    >
                      {netflix.map((net) => (
                        <MenuItem key={net.id} value={net.servicos}>
                          {net.servicos}
                        </MenuItem>
                      ))}
                    </Select>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography>Nenhum pet selecionado</Typography>
            )}
          </DialogContent>

          <DialogActions>
            <Button sx={{ color: "white" }} onClick={() => setOpen(false)}>
              <Link to="/calendar">Concluido</Link>
            </Button>
          </DialogActions>
        </Dialog>
        <Box
          display="flex"
          padding={1}
          justifyContent="end"
          mt="20px"
          onClick={handleActionsClick}
        >
          <Button color="secondary" variant="contained">
            Próximo
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Pie;
