import styles from "./Loader.module.css"

const Loader = () => {
  return (
    <div className={styles.lds_roller}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};


export default Loader