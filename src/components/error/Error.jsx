import styles from "./Error.module.css";

export default function Error({ message }) {
  return <p className={styles["error-msg"]}>{message}</p>;
}
