import { Box, Button, TextField } from "@mui/material";
import { FieldArray, Formik, Form, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import PetForm from "../form/PetForm";
import { getTutorEx } from "../../services/api";
import "./style.css";
import { NumericFormat } from "react-number-format";

const FormTutor = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { tutor, pets, service } = useContext(AuthContext);

  // const [nome, setNome] = useState('');
  /*   const [cpf, setCpf] = useState('');
    const [instagram, setInstagram] = useState('');
    const [emergency, setEmergency] = useState('');
    const [endereco, setEndereco] = useState('');
    const [complemento, setComplemento] = useState('');
    const [email, setEmail] = useState('');
    const [cidade, setCidade] = useState('');
    const [cep, setCep] = useState('');
    const [contact, setContact] = useState('');
  
    const [nomePets, setNomePets] = useState('')
    const [apelido, setApelido] = useState('')
    const [raca, setRaca] = useState('')
    const [cor, setCor] = useState('')
    const [nascimento, setNascimento] = useState('') */

  /*
  
  
  submit values.

  Tutor
    id {pk}

  Pets
    totor => Tutor.id {fk}


  /tutor
    { ... }


  /pets
    { ..., tutor_id }
  */

  const [idTutor, setIdTutor] = useState("");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState([]);

  /*   useEffect(() => {
    (async () => {
      const response = await getTutorEx();
      setUsers(response.data);
      setLoading(false);
    })();
  }, []); */

  const handleFormSubmit = async (values) => {
    const ServiceResponse = await service(values);
    console.log(values);
  };

  // const handlePetSubmit = async (e) => {
  //   e.preventDefault();
  //   pets(nomePets, apelido, raca, cor, nascimento, idTutor);
  // }

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
              <TextField
                fullWidth
                onBlur={handleBlur}
                variant="filled"
                type="text"
                label="Serviço / Plano"
                value={values.servicos}
                // onChangeCapture={handleChange}
                onChange={handleChange}
                name="servicos"
                error={!!touched.servicos && !!errors.servicos}
                helperText={touched.servicos && errors.servicos}
                sx={{ gridColumn: "span 2" }}
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
                sx={{ gridColumn: "span 2" }}
                error={
                  errors.valor &&
                  touched.valor && (
                    <div className="error-message">{errors.valor}</div>
                  )
                }
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
                    error={touched.valor && !!errors.valor}
                    helperText={touched.valor && errors.valor}
                  />
                )}
              />
              {/* 
              <TextField
                fullWidth
                onBlur={handleBlur}
                variant="filled"
                type="text"
                label="recorrencia"
                value={values.recorrencia}
                onChange={handleChange}
                name="recorrencia"
                error={!!touched.recorrencia && !!errors.recorrencia}
                helperText={touched.recorrencia && errors.recorrencia}
                sx={{ gridColumn: "span 4" }}
              /> */}
              {/*               <TextField
                fullWidth
                onBlur={handleBlur}
                variant="filled"
                type="text"
                label="Valor Mensal (opcional)"
                value={values.valor_mensal}
                onChange={handleChange}
                //onChange={(e) => setvalor_mensal(e.target.value)}
                name="valor_mensal"
                error={!!touched.valor_mensal && !!errors.valor_mensal}
                helperText={touched.valor_mensal && errors.valor_mensal}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                onBlur={handleBlur}
                variant="filled"
                type="text"
                label="Serviços Avulsos (opcional)"
                value={values.servicos_avulsos}
                onChange={handleChange}
                name="servicos_avulsos"
                error={!!touched.servicos_avulsos && !!errors.servicos_avulsos}
                helperText={touched.servicos_avulsos && errors.servicos_avulsos}
                sx={{ gridColumn: "span 2" }}
              />  */}
              {/*               <Field
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
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.nome}
                  </option>
                ))}
              </Field> */}
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
  valor: yup.string().required("required"),
  servicos: yup.string().required("required"),
});
const initialValues = {
  valor: "",
  servicos: "",
};

export default FormTutor;
