import styled from "styled-components";

export const HomeContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  h1 {
    font-size: 60px;
    font-family: "Courier New", Courier, monospace;
  }
`;

export const FormLogin = styled.form`
  width: 480px;
  margin: 0 auto;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 3rem;

  button {
    height: 50px;
    border: 0;
    background: ${(props) => props.theme["green-500"]};
    color: ${(props) => props.theme.white};
    font-weight: bold;
    padding: 0 1.25rem;
    border-radius: 6px;
    cursor: pointer;
    margin: 1rem;

    &:hover {
      background: ${(props) => props.theme["green-700"]};
      transition: background-color 0.2s;
    }
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  text-align: left;
  font-family: "Roboto", sans-serif;
  padding-top: 1.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: black;
`;
