import {Link} from 'react-router-dom'
import Container from './Container'
import logo from '../../img/costs_logo.png'
import styles from './Menu.module.css'

function Menu(params) {
    return(
        <nav className={styles.navBar}>
            <Container>
                <Link to='/'>
                    <img src={logo} alt='Costs'/>
                </Link>
                <ul className={styles.list}>
                    <li className={styles.item}><Link to='/'>Home</Link></li>
                    <li className={styles.item}><Link to='/projetos'>Projetos</Link></li>
                    <li className={styles.item}><Link to='/empresa'>Empresa</Link></li>
                    <li className={styles.item}><Link to='/contato'>Contato</Link></li>
                    <li className={styles.item}><Link to='/novoprojeto'>Novo Projeto</Link></li>
                </ul>
            </Container>
        </nav>
       
    )
}

export default Menu