import styles from './Project.module.css'
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Loding from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../../project/ProjectForm'
import Message from '../layout/Message'


function Project() {
    //pega o valor do id que está vindo pela a url
    const {id} = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        setTimeout(()=>{
            fetch(`http://localhost:5000/projects/${id}`,{
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            }
            }).then((resp) => resp.json()).then((data) => {
                setProject(data)
            }).catch(erro => console.log(erro))
        }, 3000)
    },[id])

    function editPost(project) {
        setMessage('')
        //mensagem
        if (project.budget < project.cost ) {
            setMessage(`Custo maior que orçamento`)
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            //PATCH só atualiza no banco o que mudou
            method: 'PATCH',
            headers:{
                'Content-type':'application/json'
            },
            //mandando para o banco os novos dados
            body: JSON.stringify(project)
        }).then((resp) => resp.json()).then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto atualizado!')
            setType('success')
            
        }).catch((erro) => console.log(erro))
    }

    function toggleProjectForm() {
        /*! significa setar alcontrário do valor se falso set true se true set false */
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        /*! significa setar alcontrário do valor se falso set true se true set false */
        setShowServiceForm(!showServiceForm)
    }


    return(
        <>
            {project.name?(
                <div  className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message}/>}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.bnt} onClick={toggleProjectForm}>{!showProjectForm ? 'Editar projeto': 'Fechar'}</button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria: </span>{project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de orçamento: </span>{`${Number(project.budget).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`}
                                    </p>
                                    <p>
                                        <span>Total utilizado: </span>{project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm
                                        handleSubmit={editPost}
                                        btnText={'Concluir Edição'}
                                        projectData={project}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.sevice_form_container}>
                            <h2>Adicionar serviço:</h2>
                            <button className={styles.bnt} onClick={toggleServiceForm}>{!showServiceForm ? 'Adicionar serviço': 'Fechar'}</button>
                            <div className={styles.project_info}>
                                {showServiceForm && <div>Formulário do serviço</div>}
                            </div>
                        </div>
                        <h2>Serviço</h2>
                        <Container customClass='start'>
                            <p>Item de serviços</p>
                        </Container>
                    </Container>
                </div>           
            ):<Loding/>}
        </> 
    )
}

export default Project