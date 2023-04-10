import axios from "axios";

export const api = axios.create({
  baseURL: "https://node-dogz.onrender.com",
});

export const createSession = async (email, password) => {
  return await api.post("/login", { email, password });
};

export const getUser = async () => {
  return await api.get("/list-users");
};

/* export const CreateSessionTutor = async (nome, cpf, email, instagram, emergency, endereco, complemento, cidade, cep, contact) => {
    return await api.post('/tutor', { nome, cpf, email, instagram, emergency, endereco, complemento, cidade, cep, contact })
} */

export const getTutorEx = async (
  nome,
  cpf,
  email,
  instagram,
  emergency,
  endereco,
  complemento,
  cidade,
  cep,
  contact
) => {
  return await api.get("/tutor", {
    nome,
    cpf,
    email,
    instagram,
    emergency,
    endereco,
    complemento,
    cidade,
    cep,
    contact,
  });
};

export const getTutor = async (tutor_id) => {
  return await api.get(`/tutor/${tutor_id}`);
};

export const CreateTutorPets = async (values) => {
  return await api.post("/tutor", values);
};

export const CreateService = async (values) => {
  return await api.post("/planos_avulso", values);
};

export const CreatePlan = async (values) => {
  return await api.post("/planos-tutor", values);
};

export const CreatePlans = async (values) => {
  return await api.get("/planos-teste", values);
};

export const ListPlanos = async (nome_grade) => {
  return await api.get(`/planos-avulsos/${nome_grade}`);
};

export const LisTutoresGrades = async (servico) => {
  return await api.get(`/tutores/${servico}`);
};

export const ListService = async (values) => {
  return await api.get("/planos", values);
};

export const ListGrades = async (values) => {
  return await api.get("/grades", values);
};

export const CreatePlanoGrades = async (values) => {
  return await api.post("/grade-plano", values);
};

export const ListPlans = async (values) => {
  return await api.get("/planos_avulso", values);
};

export const ListPetsTutor = async (values) => {
  return await api.get("/tutors", values);
};

export const ListTutor = async (values) => {
  return await api.get(`/tutors/${values}`);
};

export const ListGrade = async (values) => {
  return await api.get("/planos-avulso/servicos", values);
};

export const ListFatura = async (values) => {
  return await api.get(`/tutorpetplans/${values}`);
};

export const BulkUpdateTutorStatus = async (values) => {
  return await api.post("/bulk-atualizar-status-tutor", values);
};

export const CreateHotel = async (values) => {
  return await api.post("/hotel", values);
};

export const Contat = async (values) => {
  return await api.get("/contacts", values);
};

export const CreateSessionPets = async (
  nomePets,
  apelido,
  raca,
  cor,
  nascimento,
  id_tutor
) => {
  return await api.get("/pets", {
    nomePets,
    apelido,
    raca,
    cor,
    nascimento,
    id_tutor,
  });
};
