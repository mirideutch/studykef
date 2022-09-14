import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import 'semantic-ui-css/semantic.min.css'
// import 'semantic-ui-css/semantic.min.css'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LearnLetter from "./components/learnLetter/learnLetter"
// components
import Form from './components/form/form'
import Entry from './components/entry/entry'
import Login from './components/login/login'
import LetterGame from './components/letters/letterGame'
import ChooseLebel from './components/chooseLebel/chooseLebel'
import Game from './components/game/game'
import LetterNameGame from './components/letterNameGame/letterNameGame'
import LowerLettersGame from './components/LowerLettersGame/LowerLettersGame'
import SoundwordsGame from './components/SoundwordsGame/SoundwordsGame'
import {Graph} from './components/graph/graph'
import Instruction from './components/instruction/instruction'
// import chooseLebel from './components/chooseLebel/chooseLebel';

import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <React.StrictMode>

    <BrowserRouter>
    <Provider store={store}>

      <Routes>
        <Route path="/" element={<App />}>
          <Route path="Form" element={<Form />}></Route>
          <Route path="Entry" element={<Entry />}></Route>          
          <Route path="" element={<Login />}></Route>
          <Route path="ChooseLebel" element={< ChooseLebel/>}></Route>          
          <Route path="Game" element={< Game/>}></Route> 
          <Route path="LearnLetter" element={< LearnLetter />}></Route> 
          <Route path="LetterGame" element={<LetterGame />}></Route>
          <Route path="LetterNameGame" element={<LetterNameGame />}></Route>
          <Route path="LowerLettersGame" element={<LowerLettersGame />}></Route>
          <Route path="SoundwordsGame" element={<SoundwordsGame />}></Route>
          <Route path="Graph" element={<Graph />}></Route>
          <Route path="Instruction" element={<Instruction />}></Route>
        </Route>
      </Routes>
    </Provider>
    </BrowserRouter>


    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
