import { Box, Button, TextField } from "@mui/material";
import { FieldArray, Formik, Form } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";
import axios from "axios";
import { useContext, useState } from "react";
import PetForm from "./PetForm";

const FormTutor = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { tutor, pets } = useContext(AuthContext);

  const [idTutor, setIdTutor] = useState("");

  const handleFormSubmit = async (values) => {
    const tutorResponse = await tutor(values);
  };

  return (
    <Box m="20px">
      <Header
        title="Cadastro de Tutor e pets"
        subtitle="Cadastre um novo tutor e seus pets"
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

              <FieldArray
                name="pets"
                render={(arrayHelpers) =>
                  values.pets && values.pets.length > 0 ? (
                    values.pets.map((pet, index) => (
                      <Box key={index}>
                        <PetForm name={`pets.${index}`} />
                        <Box display="flex" justifyContent="start" mt="20px">
                          <Button
                            color="secondary"
                            variant="contained"
                            onClick={() =>
                              arrayHelpers.push({
                                nomePets: "",
                                apelido: "",
                                raca: "",
                                cor: "",
                                nascimento: "",
                              })
                            }
                          >
                            Adicionar pet
                          </Button>
                          <Button
                            color="secondary"
                            variant="contained"
                            onClick={() => arrayHelpers.remove(index)}
                            disabled={values.pets.length === 1}
                          >
                            Remover pet
                          </Button>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <p>Nenhum pet nessa lista</p>
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
        )}
      </Formik>
      {/* <Header title="Cadastro de Pets" subtitle="Cadastre um novo pet" /> */}

      {/*       <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          errors,
          touched,
          handleBlur,
          handleChange
        }) => (
          <form onSubmit={handlePetSubmit}>
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
                label="Nome Pets"
                value={nomePets}
                onChangeCapture={handleChange}
                onChange={(e) => setNomePets(e.target.value)}
                name="nomePets"
                error={!!touched.nomePets && !!errors.nomePets}
                helperText={touched.nomePets && errors.nomePets}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                onBlur={handleBlur}
                variant="filled"
                type="text"
                label="apelido"
                value={apelido}
                onChangeCapture={handleChange}
                onChange={(e) => setApelido(e.target.value)}
                name="apelido"
                error={!!touched.apelido && !!errors.apelido}
                helperText={touched.apelido && errors.apelido}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                onBlur={handleBlur}
                variant="filled"
                type="text"
                label="raca"
                value={raca}
                onChangeCapture={handleChange}
                onChange={(e) => setRaca(e.target.value)}
                name="raca"
                error={!!touched.raca && !!errors.raca}
                helperText={touched.raca && errors.raca}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                onBlur={handleBlur}
                variant="filled"
                type="text"
                label="cor"
                value={cor}
                name="cor"
                onChangeCapture={handleChange}
                onChange={(e) => setCor(e.target.value)}
                error={!!touched.cor && !!errors.cor}
                helperText={touched.cor && errors.cor}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                onBlur={handleBlur}
                variant="filled"
                type="text"
                label="nascimento"
                value={nascimento}
                name="nascimento"
                onChangeCapture={handleChange}
                onChange={(e) => setNascimento(e.target.value)}
                error={!!touched.nascimento && !!errors.nascimento}
                helperText={touched.nascimento && errors.nascimento}
                sx={{ gridColumn: "span 2" }}
              />

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Cadastrar Pets
              </Button>
            </Box>
          </form>
        )}
      </Formik> */}
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
  nome: "",
  cpf: "",
  email: "",
  instagram: "",
  contact: "",
  emergency: "",
  complemento: "",
  endereco: "",
  cidade: "",
  cep: "",
  pets: [
    {
      nomePets: "",
      apelido: "",
      raca: "",
      cor: "",
      nascimento: "",
    },
  ],
};

export default FormTutor;
