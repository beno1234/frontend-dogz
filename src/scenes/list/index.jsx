import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { FieldArray, Formik, Form, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import PetForm from "../form/PetForm";
import { CreatePlan, getTutorEx, ListTutor } from "../../services/api";
import { NumericFormat } from "react-number-format";
import ListForm from "./ListForm";
import { useLocation } from "react-router-dom";
import { useMatch } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Datepicker from "react-tailwindcss-datepicker";
import "react-toastify/dist/ReactToastify.css";

const Lista = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { tutor, pets, service } = useContext(AuthContext);
  const location = useLocation();
  const match = useMatch(`/list/:id`);
  const id = match?.params?.id;
  const [value, setValue] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");

  const [idTutor, setIdTutor] = useState("");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState([]);
  const [dataInsercao, setDataInsercao] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    (async () => {
      const response = await ListTutor(id);
      console.log(response.data);
      setUsers(response.data);
      setLoading(false);
    })();
  }, [id]);

  const handleFormSubmit = async (values) => {
    if (values.id_tutor == "") {
      setRequiredFields((prevState) => ({
        ...prevState,
        id_tutor: true,
      }));
      toast.error("Por favor preencha o tutor.");
    } else if (values.valor == "") {
      setRequiredFields((prevState) => ({
        ...prevState,
        valor: true,
      }));
      toast.error("Por favor preencha o valor.");
    } else {
      values.data = value.startDate;
      console.log(value.startDate);
      try {
        const ServiceResponse = await CreatePlan(values);
        console.log(values);
        toast.success("Plano criado com sucesso!");
      } catch (error) {
        console.error(error);
        toast.error("Erro ao criar plano!");
      }
    }

    if (Object.keys(errors).length > 0) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
    }
  };

  const [forms, setForms] = useState([{ recorrencia: "", valor: 0 }]);

  const addNewForm = () => {
    setForms([...forms, { recorrencia: "", valor: 0 }]);
  };

  const initialValues = {
    list: [
      {
        servicos: "",
        recorrencia: "",
        vezes_recorrencia: "",
      },
    ],
    id_tutor: id,
    valor: "",
    data: "",
  };

  useEffect(() => {
    if (value instanceof Date && !isNaN(value)) {
      const dateString = value.toISOString().slice(0, 10);
      console.log(dateString);
    }
  }, [value]);

  const handleValueChange = (date) => {
    setValue(date);
    initialValues.data = value;
  };

  let names = {
    servicos: null,
    recorrencia: null,
  };

  const handleField = (fieldName, value) => {
    names[fieldName] = value;
    handler(fieldName, value);
  };

  return (
    <Box m="20px">
      <Header
        title="Cadastro de Planos"
        subtitle="Cadastre serviços e planos necessarios."
      />

      <ToastContainer />

      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ values, errors, touched, handleBlur, handleChange }) => {
          console.log("erros forms", errors);
          return (
            <Form>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <Field
                  component="select"
                  name="id_tutor"
                  value={values.id_tutor}
                  onChange={handleChange}
                  className={`custom-select ${
                    touched.id_tutor && errors.id_tutor ? "error-field" : ""
                  }`}
                >
                  {users.map((user, index) => (
                    <option key={index} value={user.id}>
                      {user.nome}
                    </option>
                  ))}
                </Field>

                <Datepicker
                  asSingle={true}
                  useRange={false}
                  value={value}
                  onChange={handleValueChange}
                  dateFormat={"YYYY/MM/DD"}
                  placeholder="Data do Plano"
                />

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
                  sx={{ gridColumn: "span 1" }}
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
                      helperText={touched.valor && errors.valor}
                    />
                  )}
                />

                {/*                 <NumericFormat
                  onChange={handler}
                  type="number"
                  placeholder="Recorrencia do plano"
                  value={values[`${name}.vezes_recorrencia`]}
                  name={`${name}.vezes_recorrencia`} // adiciona a prop "name" a este campo
                  className={`custom-select-1 ${
                    touched.id_tutor && errors.id_tutor ? "error-field" : ""
                  }`}
                /> */}

                <FieldArray
                  name="list"
                  render={(arrayHelpers) =>
                    values.list ? (
                      values.list.length > 0 ? (
                        values.list.map((list, index) => (
                          <Box key={index}>
                            <ListForm
                              name={`list.${index}`}
                              handler={handleChange}
                              values={values}
                            />
                            <Box
                              display="flex"
                              justifyContent="start"
                              mt="20px"
                            >
                              <Button
                                color="secondary"
                                sx={{ margin: "1rem" }}
                                variant="contained"
                                onClick={() =>
                                  arrayHelpers.push({
                                    servicos: "",
                                    recorrencia: "",
                                    valor: "",
                                  })
                                }
                              >
                                Adicionar item
                              </Button>
                              <Button
                                color="secondary"
                                variant="contained"
                                onClick={() => arrayHelpers.remove(index)}
                                disabled={values.list.length === 1}
                                sx={{ margin: "1rem" }}
                              >
                                Remover item
                              </Button>
                            </Box>
                          </Box>
                        ))
                      ) : (
                        <p>Nenhuma item nessa lista</p>
                      )
                    ) : (
                      <p>Lista não está definida</p>
                    )
                  }
                />
              </Box>

              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Cadastrar
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

const currencyRegExp = /^\d+(.\d{1,2})?$/;

const checkoutSchema = yup.object().shape({
  valor: yup.number().required("required"),
  id_tutor: yup.number().required("Selecione um tutor"),
  list: yup.array().of(
    yup.object().shape({
      servicos: yup.string().required("required"),
      recorrencia: yup.string().required("required"),
      vezes_recorrencia: yup.number().required("required"),
    })
  ),
});

export default Lista;
