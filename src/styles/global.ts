import { createGlobalStyle } from 'styled-components';
import 'antd/dist/antd.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  :root {
    --white: #FFF;
    --black: #000;
    --gray-one: #FAFAFA;
    --gray-two: #EFF1F1;
    --gray-three: #E5E5E5;
    --blue-500: #007AAD;
    --orange-400: #FA992A;
    --danger: #C53030;
  }

  body {
    background: --neutral-gray-one;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body, input, button {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }
`;
