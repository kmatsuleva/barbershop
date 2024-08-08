import { useEffect, useState } from "react";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../service/firebase";

export function useGetBarberTestimonials(barberId) {
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);

    (async () => {
      try {
        setLoading(true);

        const barberRef = doc(db, "barbers", barberId);
        const q = query(collection(db, "testimonials"), where("barberId", "==", barberRef));
        const snapshot = await getDocs(q);

        const testimonialsList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        setTestimonials(testimonialsList);
      } catch (error) {
        console.error("Failed to fetch barbers:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [barberId]);

  return {
    testimonials,
    loading,
    error,
  };
}