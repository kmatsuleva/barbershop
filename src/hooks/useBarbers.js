import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { useReducer, useEffect } from "react";
import { db } from "../service/firebase";

function barberReducer(state, action) {
  switch (action.type) {
    case "REQUEST":
      return { ...state, loading: true, error: null };
    case "SUCCESS":
      return { ...state, loading: false, data: action.data };
    case "FAILURE":
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

export function useGetAllBarbers() {
  const [state, dispatch] = useReducer(barberReducer, {
    loading: true,
    error: null,
    data: [],
  });

  useEffect(() => {
    const fetchBarbers = async () => {
      dispatch({ type: "REQUEST" });
      try {
        const q = query(collection(db, "barbers"));
        const snapshot = await getDocs(q);
        const barbers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch({ type: "SUCCESS", data: barbers });
      } catch (error) {
        console.error("Failed to fetch barbers:", error);
        dispatch({ type: "FAILURE", error });
      }
    };

    fetchBarbers();
  }, []);

  return {
    barbersList: state.data,
    loading: state.loading,
    error: state.error,
  };
}

export function useGetOneBarber(barberId) {
  const [state, dispatch] = useReducer(barberReducer, {
    loading: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    if (!barberId) return;

    const fetchBarber = async () => {
      dispatch({ type: "REQUEST" });
      try {
        const docRef = doc(db, "barbers", barberId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          dispatch({
            type: "SUCCESS",
            data: { id: docSnap.id, ...docSnap.data() },
          });
        } else {
          dispatch({ type: "FAILURE", error: "No such barber exists" });
        }
      } catch (error) {
        console.error("Failed to fetch barber info:", error);
        dispatch({ type: "FAILURE", error });
      }
    };

    fetchBarber();
  }, [barberId]);

  return {
    barber: state.data,
    loading: state.loading,
    error: state.error,
  };
}

export function useFavoriteBarbers(userId) {
  const [state, dispatch] = useReducer(barberReducer, {
    loading: true,
    error: null,
    data: [],
  });

  useEffect(() => {
    if (!userId) return;

    const fetchFavoriteBarbers = async () => {
      dispatch({ type: "REQUEST" });

      try {
        const userDocRef = doc(db, "users", userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (!userDocSnapshot.exists()) {
          throw new Error("No user found with this document ID.");
        }

        const userDoc = userDocSnapshot.data();
        const favoriteBarbersDoc = userDoc.favoriteBarbers;

        if (!Array.isArray(favoriteBarbersDoc)) {
          throw new Error("favoriteBarbersDoc is not an array or is undefined");
        }

        const barberDetailsPromises = favoriteBarbersDoc.map(
          async (barberRef) => {
            const barberDocSnapshot = await getDoc(barberRef);
            if (barberDocSnapshot.exists()) {
              return { id: barberRef.id, ...barberDocSnapshot.data() };
            } else {
              return { id: barberRef.id, error: "Barber not found" };
            }
          }
        );

        const favoriteBarbers = await Promise.all(barberDetailsPromises);

        dispatch({ type: "SUCCESS", data: favoriteBarbers });
      } catch (error) {
        dispatch({ type: "FAILURE", error: error.message });
      }
    };

    fetchFavoriteBarbers();
  }, [userId]);

  return {
    favoriteBarbers: state.data,
    loading: state.loading,
    error: state.error,
  };
}
