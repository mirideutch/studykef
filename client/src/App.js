import logo from './logo.svg';
import p1 from './images/p1.jpg'
import './App.css';
//import Login from './login/login';
import 'bootstrap/dist/css/bootstrap.min.css';
//import FormExample from './form/form';
import Login from './components/login/login'
import Form from './components/form/form'
// import Letters from './components/letters/letters';
import Container from './container';
import Letters from './components/letters/letters';
// import Play from './components/letters/play';
import Continue from './components/continue/continue';

import { Provider } from 'react-redux';
import store from './redux/store';
import ChooseLebel from './components/chooseLebel/chooseLebel';

import {Outlet} from 'react-router-dom'
import {Graph} from './components/graph/graph'

function App() {
  return ( 
    <div className="App">
      {/* <Provider store={store}>
            <ChooseLebel></ChooseLebel>
            <Continue></Continue>
          </Provider>
      */}

    
       {/* <Container></Container> */}
      
       
       <Outlet></Outlet>
       {/* <Form></Form> */}
       {/* <Letters></Letters> */}
       {/* <FormExample /> */}
     
       {/* <Play letterLabel="i"></Play> */}

       {/* <Graph></Graph> */}
     </div>
  );
}

export default App;
