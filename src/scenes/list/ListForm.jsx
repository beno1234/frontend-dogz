import { TextField } from "@mui/material";
import { Field, useField, useFormikContext } from "formik";
import { NumericFormat } from "react-number-format";
import Header from "../../components/Header";

export default function ListForm({ name, handler, values }) {
  const [field, meta, helpers] = useField(name);
  const { touched, errors } = useFormikContext();
  /*
    {
      a, b, c
    }

    {
      a, b, c
    }
    */

  /* const handler = () => {}; */

  let names = {
    servicos: null,
    recorrencia: null,
  };
  const handleField = (fieldName, value) => {
    names[fieldName] = value;
    handler(fieldName, value);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Field
          onChange={handler}
          component="select"
          name={`${name}.servicos`} // adiciona a prop "name" a este campo
          value={values[`${name}.servicos`]}
          className={`custom-select-1 ${
            touched.id_tutor && errors.id_tutor ? "error-field" : ""
          }`}
        >
          <option value="">Selecione o plano/serviço</option>

          <option value="Banho">Banho</option>
          <option value="Tosa">Tosa</option>
          <option value="TaxiDog">TaxiDog</option>
          <option value="Transporte">Transporte</option>
          <option value="Escola">Escola</option>
        </Field>
        <Field
          onChange={handler}
          component="select"
          name={`${name}.recorrencia`} // adiciona a prop "name" a este campo
          value={values[`${name}.recorrencia`]}
          className={`custom-select-1 ${
            touched.id_tutor && errors.id_tutor ? "error-field" : ""
          }`}
        >
          <option value="">Selecione a recorrência</option>
          <option value="semanal">Semanal</option>
          <option value="mensal">Mensal</option>
          <option value="anual">Anual</option>
        </Field>
        <NumericFormat
          onChange={handler}
          type="number"
          value={values[`${name}.vezes_recorrencia`]}
          name={`${name}.vezes_recorrencia`} // adiciona a prop "name" a este campo
          className={`custom-select-1 ${
            touched.id_tutor && errors.id_tutor ? "error-field" : ""
          }`}
        />
      </div>
    </>
  );
}
