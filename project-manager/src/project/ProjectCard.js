import {Link} from 'react-router-dom'
import styles from './ProjectCard.module.css'
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'


function ProjectCard({id, name, budget, category, handleRemove}) {
    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }
    return(
        <div className={styles.project_card}>           
            <h4>{name.toUpperCase()}</h4>
            <div className={styles.project_card_content}>
                <p>
                    <span>Orçamento:</span>R${`${Number(budget).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`}
                </p>
                <p className={styles.category_text}>
                    <span className={`${styles[category.toLowerCase()]}`}></span>{category}
                </p>
                <div className={styles.project_card_actions}>
                    <Link to='/'>
                        <BsPencil/> Editar
                    </Link>
                    <button onClick={remove}>
                        <BsFillTrashFill/> Excluir
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard