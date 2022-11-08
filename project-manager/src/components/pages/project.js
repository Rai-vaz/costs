import {parse, v4 as uuidv4} from 'uuid'
import styles from './Project.module.css'
import {json, useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Loding from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'


function Project() {
    //pega o valor do id que está vindo pela a url
    const {id} = useParams()
    const [project, setProject] = useState([])
    const [service, setService] = useState([])
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
                setService(data.services)
            }).catch(erro => console.log(erro))
        }, 2000)
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

    function createService(project) {
        setMessage('')
        //last service
        const lastService = project.services[project.services.length - 1]
        //adicionando id
        lastService.id = uuidv4()
        //Novo valor do projeto
        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        //maximum value validation
        if (newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }

        //add service cost to project total cost
        project.cost = newCost

        //update project
        fetch(`http://localhost:5000/projects/${project.id}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'Application/json'
            },
            body: JSON.stringify(project)
        }).then((resp) => resp.json()).then(
            (data) => {
                setShowServiceForm(false)
            }
        ).catch((erro) => {console.log(erro)})

    }

    function removeService(id, cost) {
        setMessage('')
        //Retornando todos o serviços com exeção do excluido
        const serviceUpdated = project.services.filter((services) => services.id !== id)
        const projectUpdated = project
        projectUpdated.services = serviceUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)
        fetch(`http://localhost:5000/projects/${projectUpdated.id}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(projectUpdated)
        }).then((resp) => resp.json()).then(
            (data) => {
                setProject(projectUpdated)
                setService(serviceUpdated)
                setType('success')
                setMessage('Serviço removido com sucesso')
            }
        ).catch((erro) => console.log(erro))
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
                                {showServiceForm && (
                                    <ServiceForm
                                        handleSubmit={createService}
                                        btnText='Adicionar Serviço'
                                        projectData={project}
                                    />
                                )}
                            </div>
                        </div>
                        <h2>Serviço</h2>
                        <Container customClass='start'>
                            {service.length > 0 &&
                                service.map((servi) => (
                                    <ServiceCard
                                        id={servi.id}
                                        name={servi.name}
                                        cost={servi.cost}
                                        description={servi.description}
                                        key={servi.id}
                                        handleRemove={removeService}
                                    />
                                ))
                            
                            }
                            {service.length == 0 && <p>Não há serviços cadastrados</p>}
                        </Container>
                    </Container>
                </div>           
            ):<Loding/>}
        </> 
    )
}

export default Project