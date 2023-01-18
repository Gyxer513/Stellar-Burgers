/* cSpell:disable; */
import styles from "./pageNotFound.module.css";


export const PageNotFound = () => {
    return (
        <section className={styles.pageNotFound}>
        <h1 className={styles.pageNotFound__title}>404</h1>
        <p className={styles.pageNotFound__text}>Такой страницы нет</p>
        </section>
    )
}