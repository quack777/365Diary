import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  ul, ol {
    list-style: none;
  }

  body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  }

  button {
    border-style: none;
    background: none;
  }

  code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
  }
`;

export default GlobalStyle;
