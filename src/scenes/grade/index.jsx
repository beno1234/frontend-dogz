import { Box, Button, TextField } from "@mui/material";
import { FieldArray, Formik, Form, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import PetForm from "../form/PetForm";
import {
  CreatePlanoGrades,
  getTutorEx,
  ListGrade,
  ListGrades,
} from "../../services/api";
import { mockDataContacts } from "../../data/mockData";
import { NumericFormat } from "react-number-format";

const Grade = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { tutor, pets, service } = useContext(AuthContext);

  const [idTutor, setIdTutor] = useState("");

  const [planos, setPlanos] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await ListGrade();
      setPlanos(response.data);
      setLoading(false);
    })();
  }, []);

  console.log(planos);

  useEffect(() => {
    (async () => {
      const response = await ListGrades();
      setGrades(response.data);
      setLoading(false);
    })();
  }, []);

  const handleFormSubmit = async (values) => {
    const ServiceResponse = await CreatePlanoGrades(values);
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header
        title="Cadastro de Planos / Serviços"
        subtitle="Cadastre serviços e planos necessarios."
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
                name="plano_avulso_id"
                value={values.plano_avulso_id}
                className={`custom-select ${
                  touched.plano_avulso_id && errors.plano_avulso_id
                    ? "error-field"
                    : ""
                }`}
                error={
                  errors.id &&
                  touched.id && <div className="error-message">{errors.id}</div>
                }
              >
                <option value="">Selecione um Plano</option>
                {planos.map((plano) => (
                  <option key={plano.id} value={plano.id}>
                    {plano.servicos}
                  </option>
                ))}
              </Field>
              <Field
                component="select"
                name="grade_id"
                value={values.grade_id}
                className={`custom-select ${
                  touched.grade_id && errors.grade_id ? "error-field" : ""
                }`}
                error={
                  errors.grade_id &&
                  touched.grade_id && (
                    <div className="error-message">{errors.grade_id}</div>
                  )
                }
              >
                <option value="">Selecione uma grade</option>
                {grades.map((grade) => (
                  <option key={grade.id} value={grade.id}>
                    {grade.nome}
                  </option>
                ))}
              </Field>
            </Box>

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
  plano_avulso_id: yup.string().required("required"),
  grade_id: yup.string().required("required"),
});
const initialValues = {
  plano_avulso_id: "",
  grade_id: "",
};

export default Grade;
