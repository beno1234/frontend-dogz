import { Box, Button, TextField } from "@mui/material";
import { FieldArray, Formik, Form, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import PetForm from "../form/PetForm";
import { CreateHotel, ListPetsTutor } from "../../services/api";
import { NumericFormat } from "react-number-format";
import Datepicker from "react-tailwindcss-datepicker";

const Hotel = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { tutor, pets, service } = useContext(AuthContext);
  const [value, setValue] = useState(new Date());

  const [idTutor, setIdTutor] = useState("");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await ListPetsTutor();
      setUsers(response.data);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (value instanceof Date && !isNaN(value)) {
      const dateString = value.toISOString().slice(0, 10);
      console.log(dateString);
    }
  }, [value]);

  const handleFormSubmit = async (values) => {
    values.data_entrada = value.startDate;
    values.data_saida = value.endDate;
    console.log(values);
    const ServiceResponse = CreateHotel(values);
  };

  const initialValues = {
    id_tutor: "",
    valor: "",
    data_entrada: "",
    data_saida: "",
  };

  const handleValueChange = (newValue) => {
    setValue(newValue);
    initialValues.data_entrada = value.startDate;
    initialValues.data_saida = value.endDate;
  };
  return (
    <Box m="20px">
      <Header
        title="Hotel do Pets"
        subtitle="Agende ou cadastre os periodos dos pets."
      />

      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        onSubmit={handleFormSubmit}
      >
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
              <Field
                component="select"
                name="id_tutor"
                value={values.id_tutor}
                className={`custom-select ${
                  touched.id_tutor && errors.id_tutor ? "error-field" : ""
                }`}
                error={
                  errors.id_tutor &&
                  touched.id_tutor && (
                    <div className="error-message">{errors.id_tutor}</div>
                  )
                }
              >
                <option value="">Selecione um tutor</option>
                {users.map((user) => (
                  <option key={user.id_tutor} value={user.id_tutor}>
                    {user.nome} - {user.pets}
                  </option>
                ))}
              </Field>

              <NumericFormat
                label="Valor"
                value={values.valor}
                onValueChange={(values) => {
                  handleChange({
                    target: {
                      name: "valor",
                      value: values.floatValue,
                    },
                  });
                }}
                displayType={"input"}
                customInput={TextField}
                variant="filled"
                thousandSeparator={true}
                prefix={"R$ "}
                onChange={handleChange}
                sx={{ gridColumn: "span 3" }}
                error={!!(errors.valor && touched.valor)}
                helperText={touched.valor && errors.valor}
                decimalScale={2}
                fixedDecimalScale={true}
                renderText={(values) => (
                  <TextField
                    fullWidth
                    onBlur={handleBlur}
                    variant="filled"
                    type="number"
                    label="valor"
                    onChange={handleChange}
                    value={values.valor}
                    name="valor"
                    error={!!(errors.valor && touched.valor)}
                    helperText={touched.valor && errors.valor}
                  />
                )}
              />
            </Box>
            <div className="text-center mt-10  w-56 justify-center mx-auto">
              <Datepicker
                value={value}
                onChange={handleValueChange}
                showShortcuts={true}
                name="data"
                displayFormat={"DD/MM/YYYY"}
                placeholder={"Agendamento dos pets"}
              />
            </div>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Cadastrar
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

const currencyRegExp = /^\d+(.\d{1,2})?$/;

const checkoutSchema = yup.object().shape({
  id_tutor: yup.string().nullable().required("Selecione um tutor"),
  valor: yup.string().required("required"),
});

export default Hotel;
