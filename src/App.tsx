import { Outlet } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import Header from './Components/Header';
import { theme } from './theme';

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

const Layout = styled.div`
  height: 200vh;
`;

const Content = styled.div`
  margin-top: 100px;
`;

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          <Header />
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
