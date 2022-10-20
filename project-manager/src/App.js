import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/pages/Home'
import Company from './components/pages/Company'
import Contact from './components/pages/Contact'
import NewProject from './components/pages/NewProject'
import Projects from './components/pages/Projects'
import Container from './components/layout/Container'
import Menu from './components/layout/Menu'
import Footer from './components/layout/Footer';



function App() {
  return (
    <div className="App">
      <Router>
        <Menu/>
        <Container customClass="min-height">
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route path='/empresa' element={<Company/>}/>
                <Route path='/contato' element={<Contact/>}/>
                <Route path='/novoprojeto' element={<NewProject/>}/>
                <Route path='/projetos' element={<Projects/>}/>
            </Routes>
        </Container>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
