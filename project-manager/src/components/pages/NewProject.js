import { useNavigate } from 'react-router-dom'
import styles from './NewProject.module.css'
import ProjectForm from '../../project/ProjectForm'

function NewProject() {
    //Redirecionando
    const navigate =  useNavigate()

    function createPost(project) {
        //criando projeto vazio
        project.cost = 0
        project.services = []

        //mandando os dados para o banco
        fetch('http://localhost:5000/projects',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project),
        }).then((resp) => resp.json())
        .then((data) => {
            //redirect
            navigate('/projetos', { state: {message: 'Projeto criado com sucesso!'} })
        }).catch((err) => console.log(err))
    }

    return(
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText='Criar Projeto'/>

        </div>
    )   
}

export default NewProject