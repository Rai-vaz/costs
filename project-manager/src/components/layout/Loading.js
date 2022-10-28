import styles from './Loading.module.css'
import img_loading from '../../img/loading.svg'

function Loading() {
    return(
        <div className={styles.loader_container}>
            <img className={styles.loader} src={img_loading} alt="Imagem de Loading"/>
        </div>
    )
}
export default Loading