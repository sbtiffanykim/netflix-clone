import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import { RecoilRoot } from 'recoil';
import App from './App.tsx';
import { theme } from './theme.ts';

const GlobalStyle = createGlobalStyle`
${reset}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Poppins', sans-serif;
  color:black;
  line-height: 1.2;
  
}
a {
  text-decoration:none;
  color:inherit;
}
`;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </StrictMode>
);
