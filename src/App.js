import { useSelector } from 'react-redux';
import { HashRouter, Routes, Route } from 'react-router-dom'; 
import './App.css';
import IsLoading from './components/IsLoading';
import { Home, Products, Purchases, Shop } from './pages';
import './styles/navbar.css';
import  NavBar  from './components/NavBar.js';


function App() {

  
  //Show / hide loading style
  const isoading = useSelector( state => state.isLoading)



  return (
    <div className="App">
      
      <HashRouter >

        {isoading && <IsLoading /> }

        <NavBar /> 

        <Routes >

          <Route path='/' element={ <Home /> }/>
          <Route path='/product/:id' element={ <Products /> }/>
          <Route path='/shop/:id' element={ <Shop />}/>
          <Route path='/purchases' element={ <Purchases /> }/>

        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;


