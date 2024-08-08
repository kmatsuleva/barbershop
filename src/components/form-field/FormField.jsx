import styles from "./FormField.module.css";

export default function FormField({
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  rows,
  options, 
}) {
  return (
    <fieldset
      className={`${styles["form-group"]} ${error ? styles["has-error"] : ""}`}
    >
      {type === "textarea" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          className={styles["form-control"]}
          value={value}
          onChange={onChange}
          rows={rows}
        ></textarea>
      ) : type === "select" ? (
        <select
          name={name}
          className={styles["form-control"]}
          value={value}
          onChange={onChange}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={styles["form-control"]}
          value={value}
          onChange={onChange}
        />
      )}
      {error && <span className={styles["form-validation"]}>{error}</span>}
    </fieldset>
  );
}
