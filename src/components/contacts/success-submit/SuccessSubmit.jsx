import styles from "./SuccessSubmit.module.css";

export default function SuccessSubmit({ height }) {
  return (
    <div className={styles["thank-you-message"]} style={{ minHeight: height }}>
      <h4>Thank You!</h4>
      <p>We appreciate you reaching out to us.</p>
      <p>
        Your message has been successfully sent, and our team will review it
        shortly. We aim to get back to you within 24-48 hours. In the meantime,
        feel free to browse our website or contact us through our other
        communication channels if you need immediate assistance.
      </p>
    </div>
  );
}
