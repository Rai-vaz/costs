import styles from './ProjectCard.module.css'
import {BsPencil, BsFillTrashFill} from 'react-icons'


function ProjectCard({id, name, budget, category, handleRemove}) {
    return(
        <div>
            <p>{id}</p>
            <h4>{name}</h4>
            <p>
                <span>Orçamento:</span>R${budget}
            </p>
            <p>
                <span>{category}</span>
            </p>
            <div>
                <p>Editar</p>
                <p>Remover</p>
            </div>
        </div>
    )
}

export default ProjectCard