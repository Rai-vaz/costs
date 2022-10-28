import styles from './Project.module.css'
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'


function Project() {
    //pega o valor do id que está vindo pela a url
    const {id} = useParams()
    const [project, setProject] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`,{
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            }
        }).then((resp) => resp.json()).then((data) => {
            setProject(data)
        }).catch(erro => console.log(erro))
    })

    return(
        <div>
            <p>{project.name}</p>
        </div>
    )
}

export default Project