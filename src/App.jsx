import './App.css';
import About from '@/pages/About';
import User from '@/pages/User';
import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom';

const ErrorPage = () => <strong style={{ color: 'blue' }}>ErrorPage</strong>;
const router = createBrowserRouter(
  [
    {
      path: '/',
      errorElement: <ErrorPage />,
      children: [
        {
          path: 'dynamic',
          element: <h1>dynamic page</h1>,
        },
        {
          path: 'user',
          element: <User />,
        },
        {
          path: 'about',
          element: <About />,
        },
      ],
    },
  ],
  {
    basename: '/rsbuild',
  }
);

const stylsA = { padding: '10px', color: 'chartreuse', display: 'inline-block' };

const App = ({ children }) => {
  return (
    <div className='content'>
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      {children}

      {/* Links  */}
      <div style={{ border: '1px solid green', width: 700, margin: '20px auto 0' }}>
        <a href='user' style={stylsA}>
          user
        </a>

        <a href='about' style={stylsA}>
          About
        </a>

        <a href='/rsbuild/user' style={stylsA}>
          /rsbuild/user
        </a>
        <a href='/rsbuild/about' style={stylsA}>
          /rsbuild/about
        </a>

        <a href='/dynamic/rsbuild/user' style={stylsA}>
          ❌/dynamic/rsbuild/user
        </a>
        <a href='/dynamic/rsbuild/about' style={stylsA}>
          ❌/dynamic/rsbuild/about
        </a>
      </div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
