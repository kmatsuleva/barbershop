import styles from "./NoImage.module.css"

export default function NoImage() {
  return <img src="/images/missing-img.png" className={styles["no-image"]} />;
}
