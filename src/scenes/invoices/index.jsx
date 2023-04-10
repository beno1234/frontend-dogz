import { Box, Button, Checkbox, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { ListService, BulkUpdateTutorStatus } from "../../services/api";
import { useNavigate } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import EditIcon from "@mui/icons-material/Edit";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();

  const columns = [
    {
      field: "pago",
      headerName: "Pago",
      align: "center",
      headerAlign: "center",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <Checkbox
          color="primary"
          checked={Boolean(
            selectedRows.find((id) => id === params.row.id_tutor)
          )}
          onChange={() => {
            const itemId = params.row.id_tutor;
            const find = selectedRows.find((id) => id === itemId);

            if (find) {
              setSelectedRows((state) =>
                state.filter((item) => item !== itemId)
              );
            } else {
              setSelectedRows((state) => [...state, itemId]);
            }
          }}
        />
      ),
    },
    { field: "id_tutor", headerName: "ID" },
    {
      field: "nome",
      headerName: "Nome",
      flex: 1,
      cellClassName: (params) =>
        `${params.row.status === 0 ? "fatura-atrasada" : "green"}`,
    },
    {
      field: "servicos",
      headerName: "Serviços",
      flex: 1,
      renderCell: (params) => (params.row.servicos ? "ok" : ""),
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      cellClassName: (params) =>
        `${params.value === 0 ? "fatura-atrasada" : "green"}`,
    },

    {
      field: "valor_total",
      headerName: "Valor",
      flex: 1,
      cellClassName: (params) =>
        `${params.row.status === 0 ? "fatura-atrasada" : "green"}`,
      renderCell: (params) => (
        <Typography>R$ {params.row.valor_total}</Typography>
      ),
    },
    {
      field: "recorrencia",
      headerName: "Recorrência",
      flex: 1,
    },
    {
      field: "Editar",
      headerName: "Editar",
      align: "left",
      flex: 1,
      renderCell: (params) => (
        <Button sx={{ color: `${colors.grey[100]}` }} onClick={handleEdit}>
          <EditIcon sx={{ fontSize: 20 }} />
        </Button>
      ),
    },
    {
      field: "fatura",
      headerName: "Fatura",
      align: "left",
      flex: 1,
      renderCell: (params) => (
        <Button
          sx={{ color: `${colors.grey[100]}` }}
          onClick={() => handleTest(params)}
        >
          <ArrowRightAltIcon sx={{ fontSize: 35 }} />
        </Button>
      ),
    },
  ];

  useEffect(() => {
    async function LoadServices() {
      const { data } = await ListService();

      if (data) {
        const formatUsers = data.map((user) => {
          const isInvoiceLate =
            Date.now() >
            new Date(user.dataFatura).getTime() + 30 * 24 * 60 * 60 * 1000;
          return {
            ...user,
            isInvoiceLate: isInvoiceLate,
            pago: false,
          };
        });

        await Promise.all(formatUsers);

        setUsers(formatUsers);

        setLoading(false);
      }
    }

    LoadServices();
  }, []);

  const handleTest = (params) => {
    navigate(`/avulsos/${params.id}`);
  };

  const handleEdit = () => {
    navigate("/edit");
  };

  const [status, setStatus] = useState({});

  const handlePaid = async () => {
    setUsers((state) =>
      state.map((row) => {
        if (selectedRows.includes(row.id_tutor)) {
          const now = new Date();
          const dataFim = new Date(row.data_fim);

          if (dataFim <= now) {
            return { ...row, status: 0 };
          } else {
            return { ...row, status: 1 };
          }
        }
        return row;
      })
    );

    setSelectedRows([]);

    // Send request to update the invoices in the backend
    await BulkUpdateTutorStatus({ ids: selectedRows })
      .then(() => {
        console.log("Invoices updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating invoices: ", error);
      });
  };

  return (
    <Box m="20px">
      <Header title="Lista de Planos / Serviços" subtitle="Lista de clientes" />
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
          "& .fatura-atrasada": {
            color: "#eead2d",
            fontWeight: "bold",
          },
          "& .green": {
            color: colors.greenAccent[500],
          },
        }}
      >
        <DataGrid
          rows={users.map((user) => ({
            ...user,
            pago: status[user.id_tutor] || false,
          }))}
          columns={columns}
          getRowId={(row) => row.id_tutor}
        />
        <Button
          onClick={handlePaid}
          className="text-white"
          color="secondary"
          variant="contained"
        >
          Marcar como pago
        </Button>
      </Box>
    </Box>
  );
};

export default Invoices;
