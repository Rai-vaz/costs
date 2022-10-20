import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Home from '../pages/Home'
import Company from '../pages/Company'
import Contact from '../pages/Contact'
import NewProject from '../pages/NewProject'
import Container from './Container'
import styles from './Menu.module.css'
import logo from '../../img/costs_logo.png'

function Menu(params) {
    return(
        <div>
            <Router>
                <nav>
                    <ul>
                        <li><Link to='/'><img src={logo} alt='Costs'/></Link></li>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/empresa'>Empresa</Link></li>
                        <li><Link to='/contato'>Contato</Link></li>
                        <li><Link to='/novoprojeto'>Novo Projeto</Link></li>
                    </ul>
                </nav>
                <Container customClass="min-height">
                    <Routes>
                        <Route exact path='/' element={<Home/>}/>
                        <Route path='/empresa' element={<Company/>}/>
                        <Route path='/contato' element={<Contact/>}/>
                        <Route path='/novoprojeto' element={<NewProject/>}/>
                    </Routes>
                </Container>
            </Router>
        </div>
    )
}

export default Menu