import { useState, useEffect } from 'react'
import styles from './Message.module.css'

function Message({type, msg}) {
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        //verificando se há msg se tiver será mostrada por 3 segundos
        if (!msg) {
            setVisible(false)
            return
        } else {
            setVisible(true)
            const timer = setTimeout(() => {
                setVisible(false)
            },3000)

            return () => clearTimeout(timer)
        }
    },[msg])
    
    return(<>
        {visible && (
        //Adicionando class dinamicamente
        <div className={`${styles.message} ${styles[type]}`}>{msg}</div>)}
  
    </>)
}

export default Message