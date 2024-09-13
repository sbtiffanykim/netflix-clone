import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Tv from './Routes/Tv';
import Search from './Routes/Search';
import Home from './Routes/Home';
import Movies from './Routes/Movies';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'tv',
        element: <Tv />,
      },
      {
        path: 'movies',
        element: <Movies />,
      },
      {
        path: 'search',
        element: <Search />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes, { basename: '/netflix-clone' });
