import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../service/firebase";

export function useGetAllBarbers() {
  const [loading, setLoading] = useState(true);
  const [barbersList, setBarbersList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);

    (async () => {
      try {
        setLoading(true);
        const q = query(collection(db, "barbers"));
        const snapshot = await getDocs(q);

        const barbers = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setBarbersList(barbers);
      } catch (error) {
        console.error("Failed to fetch barbers:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return {
    barbersList,
    loading,
    error,
  };
}

export function useGetOneBarber(barberId) {
  const [loading, setLoading] = useState(true);
  const [barber, setBarber] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);

    (async () => {
      try {
        setLoading(true);
        const docRef = doc(db, "barbers", barberId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBarber({
            id: docSnap.id,
            ...docSnap.data(),
          });
        } else {
          setError("No such barber exists");
        }
      } catch (error) {
        console.error("Failed to fetch barber info:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [barberId]);

  return {
    barber,
    loading,
    error,
  };
}

