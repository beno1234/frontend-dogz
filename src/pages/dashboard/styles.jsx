import styled from "styled-components";

export const SideMenu = styled.section`
    padding: 0 1.5rem;
    height: 60px;
    width: 280px;
    display: flex;
    align-items: center;
    transition: width 0.2s;
    background-image: linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%) !important;
    position: fixed;
    width: 100%;
    top: 0;

    header{
        max-width: 200px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    div{
        cursor: pointer;
    }

    h1{
        font-size: 40px;
        font-family: Georgia, 'Times New Roman', Times, serif;
    }
`


