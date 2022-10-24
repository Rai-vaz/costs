import {useState, useEffect} from 'react'
import styles from './ProjectForm.module.css'
import Input from '../components/form/Input'
import Select from '../components/form/Select'
import SubmitButton from '../components/form/SubmitButton'

function ProjectForm({handleSubmit, btnText, projectData}) {
    const [categories, setCategories] = useState([])
    //buscando projetos que já estão no banco
    const [project, setProject] = useState(projectData || {})
    useEffect(()=> {
           //Buscando categorias no banco
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        }).then((resp) => resp.json().then((data) => {
            setCategories(data)
        } )).catch((err) => console.log(err))
    },[])

    //metodo
    const submit = (e) => {
        e.preventDefault()
        //console.log(project)
        handleSubmit(project)
    }

    //metodo
    function handleChange(e) {
        //adicionando valor do capo ao nome do projeto
        setProject({...project, [e.target.name]: e.target.value})
        
    }

      //metodo
    function handleSelect(e) {
        //adicionando valor do capo ao nome do projeto
        setProject({...project, category:{
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        }})
        
    }


    return(
        <form onSubmit={submit}>
            <Input 
            type='text'
            text='Nome do Projeto'
            name='name'
            placeholder='Insira o nome do projeto'
            handleOnChange={handleChange}
            value={project.name ? project.name : ''}
            
            />
            <Input 
            type='number'
            text='Orçamento'
            name='budget'
            placeholder='Insira o orçamento total'
            handleOnChange={handleChange}
            value={project.budget ? project.budget : ''}
            
            />
            <Select 
            name='category_id'
            text='Selecione uma categoria'
            options={categories}
            handleOnChange={handleSelect}
            value={project.category ? project.category.id : ''}

            />

            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ProjectForm