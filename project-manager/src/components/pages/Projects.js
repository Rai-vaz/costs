import {useLocation} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Message from "../layout/Message"
import Container from '../layout/Container'
import Loading from '../layout/Loading'
import LinkButton from '../layout/LinkButton'
import styles from './Projects.module.css'
import ProjectCard from '../../project/ProjectCard'

function Projects() {
    //Use state para os projetos que vem do banco
    const [projects, setProjects] = useState([])
    //Começa como false para mostrar o loading
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')
    
    const location = useLocation()
    let message = ''
    if(location.state){
        //pegando message
        message = location.state.message
    }

    //com um array vazio ele executa apenas uma vez
    useEffect(() => {
       setTimeout(() => {
        fetch('http://localhost:5000/projects',{
            method:'GET',
            headers:{'content-type': 'application/json'}
            })
            .then((resp) => resp.json())
            .then((data) => {
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch((err) => console.log(err))
       }, 300);
  
    },[])

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => resp.json()).then((data) => {
            setProjects(projects.filter((project) => project.id !== id))
            //mensagem
            setProjectMessage('Projeto removido com sucesso')
        }).catch()
    }

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/novoprojeto' text='Criar Projeto'/>
            </div>
            
            {message && <Message msg={message} type='success'/>}
            {projectMessage && <Message msg={projectMessage} type='success'/>}
            <Container customClass='start'>
            {                
               projects.length > 0 && projects.map((project) => (     
                <ProjectCard 
                id={project.id}
                name={project.name}
                budget={project.budget}
                //? serve para verificar se a propiedade à sua esquerda existe
                category={project.category?.name}
                key={project.id}
                handleRemove={removeProject}/>)              
                )             
            }
           
            {
                //se removeLoading for false executar componente Loading    
                !removeLoading && <Loading/>
            }
            {
                removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )
            }
            </Container>

        </div>
    )
}

export default Projects