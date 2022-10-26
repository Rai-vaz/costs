import {useLocation} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Message from "../layout/Message"
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import styles from './Projects.module.css'
import ProjectCard from '../../project/ProjectCard'

function Projects() {
    //Use state para os projetos que vem do banco
    const [projects, setProjects] = useState([])

    const location = useLocation()
    let message = ''
    if(location.state){
        //pegando message
        message = location.state.message
    }

    //com um array vazio ele executa apenas uma vez
    useEffect(() => {
        fetch('http://localhost:5000/projects',{
        method:'GET',
        headers:{'content-type': 'application/json'}
        }).then((resp) => resp.json()).then((data) => setProjects(data)).catch((err) => console.log(err))
  
    },[])

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/novoprojeto' text='Criar Projeto'/>
            </div>
            {console.table(projects.category.name)}
            {message && <Message msg={message} type='success'/>}
            <Container customClass='start'>
            {
               projects.length > 0 && projects.map((project) => (  
                <ProjectCard 
                name={project.name}
                budget={project.budget}
                

                key={project.id}
                
               />)              
                )
                
             }
            </Container>

        </div>
    )
}

export default Projects