import { Box, Button } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import { mockDataContacts } from "../../data/mockData";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { AuthContext } from "../../contexts/auth";
import { getTutorEx, getUser, ListGrades } from "../../services/api";
import React, { useContext, useEffect, useState } from "react";
import Database from "../../data/mockDatabase";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useNavigate } from "react-router-dom";

const Line = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "nome",
      headerName: "Plano",
      flex: 1,
    },
    {
      field: "Actions",
      headerName: "Actions",
      align: "left",
      flex: 1,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => handleTest(params)}
            sx={{ color: `${colors.grey[100]}` }}
          >
            <ArrowRightAltIcon sx={{ fontSize: 35 }} />
          </Button>
        );
      },
    },
  ];

  const [grades, setGrades] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await ListGrades();
      setGrades(response.data);
      setLoading(false);
    })();
  }, []);

  const handleTest = (params) => {
    navigate(`/pie/${params.row.nome}`);
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
          rows={grades}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Line;
