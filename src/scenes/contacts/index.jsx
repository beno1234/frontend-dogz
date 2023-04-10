import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { AuthContext } from "../../contexts/auth";
import { Contat, getTutorEx, getUser, ListPetsTutor } from "../../services/api";
import React, { useContext, useEffect, useState } from "react";
import Database from "../../data/mockDatabase";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import { useNavigate } from "react-router-dom";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const history = useNavigate();

  const columns = [
    { field: "id", headerName: "id", flex: 1 },
    {
      field: "nome",
      headerName: "Nome",
      flex: 1,
      cellClassName: "namo-column--cell",
    },
    { field: "pets", headerName: "Pets" },
    {
      field: "contact",
      headerName: "Contato",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "endereco",
      headerName: "Endereço",
      flex: 1,
    },
    {
      field: "cidade",
      headerName: "Cidade",
      flex: 1,
    },
    {
      field: "planos",
      headerName: "Planos",
      align: "left",
      flex: 1,
      renderCell: (params) => (
        <Button
          sx={{ color: `${colors.grey[100]}` }}
          onClick={() => handleTest(params)}
        >
          <ReceiptOutlinedIcon sx={{ fontSize: 20 }} />
        </Button>
      ),
    },
  ];

  const { logout } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await Contat();
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

  const handleTest = (params) => {
    history(`/list/${params.id}`);
  };

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
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
      </Box>
    </Box>
  );
};

export default Contacts;
