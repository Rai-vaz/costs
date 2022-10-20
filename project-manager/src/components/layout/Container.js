import styles from './Container.module.css'

function Container(props) {
    return(
        /*informando que tudo o que estiver entre a tag Container fique dentro dessa div com a classe */
                        /*adicionando classes dinâmicas */
        <div className={`${styles.container} ${styles[props.customClass]}`}>{props.children}</div>
    )
}

export default Container