import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import 'antd/dist/antd.min.css';
import "@reach/dialog/styles.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './context/UserContext'
import { CartProvider } from './context/CartContext'


ReactDOM.render(
  <BrowserRouter>
    <CartProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </CartProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
