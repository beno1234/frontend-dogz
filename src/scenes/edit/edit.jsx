import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
} from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { AuthContext } from "../../contexts/auth";
import React, { useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import Header from "../../components/Header";
import { Formik, Form } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

const Edit = () => {
  const theme = useTheme();

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { tutor, pets } = useContext(AuthContext);

  return (
    <Box m="20px">
      <Header
        title="Editar informações do cliente"
        subtitle="Edite as informações do cliente"
      />

      <Formik initialValues={initialValues} validationSchema={checkoutSchema}>
        {({ values, errors, touched, handleBlur, handleChange }) => (
          <Form>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                onBlur={handleBlur}
                variant="filled"
                type="text"
                label="Nome Completo"
                value={values.nome}
                // onChangeCapture={handleChange}
                onChange={handleChange}
                name="nome"
                error={!!touched.nome && !!errors.nome}
                helperText={touched.nome && errors.nome}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                onBlur={handleBlur}
                variant="filled"
                type="text"
                label="CPF"
                value={values.cpf}
                //onChange={handleChange}
                // onChange={(e) => setCpf(e.target.value)}
                onChange={handleChange}
                name="cpf"
                error={!!touched.cpf && !!errors.cpf}
                helperText={touched.cpf && errors.cpf}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                onBlur={handleBlur}
                variant="filled"
                type="text"
                label="Instagram"
                value={values.instagram}
                onChange={handleChange}
                //onChange={(e) => setInstagram(e.target.value)}
                name="instagram"
                error={!!touched.instagram && !!errors.instagram}
                helperText={touched.instagram && errors.instagram}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                onBlur={handleBlur}
                variant="filled"
                type="text"
                label="Email"
                value={values.email}
                name="email"
                onChange={handleChange}
                //onChange={(e) => setEmail(e.target.value)}
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                onBlur={handleBlur}
                variant="filled"
                type="text"
                label="Número de contato para emergencia"
                value={values.emergency}
                name="emergency"
                onChange={handleChange}
                //onChange={(e) => setEmergency(e.target.value)}
                error={!!touched.emergency && !!errors.emergency}
                helperText={touched.emergency && errors.emergency}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                onBlur={handleBlur}
                variant="filled"
                type="text"
                label="Endereço"
                value={values.endereco}
                onChange={handleChange}
                //onChange={(e) => setEndereco(e.target.value)}
                name="endereco"
                error={!!touched.endereco && !!errors.endereco}
                helperText={touched.endereco && errors.endereco}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                onBlur={handleBlur}
                variant="filled"
                type="text"
                label="Complemento"
                value={values.complemento}
                onChange={handleChange}
                //onChange={(e) => setComplemento(e.target.value)}
                name="complemento"
                error={!!touched.complemento && !!errors.complemento}
                helperText={touched.complemento && errors.complemento}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                onBlur={handleBlur}
                variant="filled"
                type="text"
                label="Cidade"
                value={values.cidade}
                onChange={handleChange}
                //onChange={(e) => setCidade(e.target.value)}
                name="cidade"
                error={!!touched.cidade && !!errors.cidade}
                helperText={touched.cidade && errors.cidade}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                onBlur={handleBlur}
                variant="filled"
                type="text"
                label="CEP"
                value={values.cep}
                onChange={handleChange}
                //onChange={(e) => setCep(e.target.value)}
                name="cep"
                error={!!touched.cep && !!errors.cep}
                helperText={touched.cep && errors.cep}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                onBlur={handleBlur}
                variant="filled"
                type="text"
                label="Número de contato"
                // onChange={(e) => setContact(e.target.value)}
                value={values.contact}
                onChange={handleChange}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Atualizar
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  nome: yup.string().required("required"),
  cpf: yup.string().required("required"),
  instagram: yup.string(),
  emergency: yup.string(),
  complemento: yup.string(),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  endereco: yup.string().required("required"),
  cidade: yup.string().required("required"),
  cep: yup.string().required("required"),
});
const initialValues = {
  nome: "João Pedro",
  cpf: "1112222333444",
  email: "jao@teste.com",
  instagram: "@joao",
  contact: "119123456",
  emergency: "123456789",
  complemento: "Apto 00",
  endereco: "rua teste",
  cidade: "Sao Paulo",
  cep: "03090912",
};

export default Edit;
