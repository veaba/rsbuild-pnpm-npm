import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import App from './App';

const Span = styled.span`
  border: 1px solid red;
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App>
      <Span>rsbuild + styled-components , it no working</Span>
    </App>
  </React.StrictMode>
);