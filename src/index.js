import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import reportWebVitals from './reportWebVitals';
import Form from './Forms/Form';
const root = ReactDOM.createRoot(document.getElementById('root'));
const FruitsArray=["A","B","C","D"]
root.render(
    <Form/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
