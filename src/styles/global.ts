import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :focus{
        outline: 0;
        box-shadow: 0 0 0 2px ${props => props.theme['green-300']};
    }

    body{
        background-color: ${props => props.theme['gray-900']};
        color: ${props => props.theme['gray-100']};
        -webkit-font-smoothing: antialiased;
        ::-webkit-scrollbar{
            width: 10px;
        }

        ::-webkit-scrollbar-track{
            background: #e0e0e0;
        }

        ::-webkit-scrollbar-thumb{
            background: #888;
        }

        ::-webkit-scro:hover{
            background: #555;
        }

        width: 100%;
        height: 100%;
    }

    body, input, textarea, button {
        font: 400 1rem Roboto, sans-serif;
    }
`;