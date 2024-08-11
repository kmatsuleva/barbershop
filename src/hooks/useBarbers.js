import { useReducer, useEffect, useCallback } from "react";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
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

  const fetchBarbers = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchBarbers();
  }, [fetchBarbers]);

  return {
    barbersList: state.data,
    loading: state.loading,
    error: state.error,
    refetchBarbers: fetchBarbers,
  };
}

export function useGetOneBarber(barberId) {
  const [state, dispatch] = useReducer(barberReducer, {
    loading: true,
    error: null,
    data: null,
  });

  const fetchBarber = useCallback(async () => {
    if (!barberId) return;
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
  }, [barberId]);

  useEffect(() => {
    fetchBarber();
  }, [barberId, fetchBarber]);

  return {
    barber: state.data,
    loading: state.loading,
    error: state.error,
    fetchBarber,
  };
}

export function useGetFavoriteBarbers(userId, barberId) {
  const [state, dispatch] = useReducer(barberReducer, {
    loading: true,
    error: null,
    data: [],
  });

  const fetchFavoriteBarbers = useCallback(async () => {
    if (!userId) return;
    dispatch({ type: "REQUEST" });

    try {
      const userDocRef = doc(db, "users", userId);
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        throw new Error("No user found with this document ID.");
      }

      const userDoc = userDocSnapshot.data();
      const favoriteBarbersDoc = userDoc.favoriteBarbers || [];

      if (!Array.isArray(favoriteBarbersDoc)) {
        throw new Error("favoriteBarbersDoc is not an array or is undefined");
      }

      if (favoriteBarbersDoc.length === 0) {
        dispatch({ type: "SUCCESS", data: [] });
        return;
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
  }, [userId]);

  useEffect(() => {
    fetchFavoriteBarbers();
  }, [userId, fetchFavoriteBarbers]);

  const isBarberLiked = state.data.some(
    (favBarber) => favBarber.id === barberId
  );

  return {
    favoriteBarbers: state.data,
    loading: state.loading,
    error: state.error,
    refreshFavoriteBarbers: fetchFavoriteBarbers,
    isBarberLiked,
  };
}

export function useToggleFavoriteBarbers(
  userId,
  refreshFavoriteBarbers,
  fetchBarber
) {
  const [state, dispatch] = useReducer(barberReducer, {
    loading: true,
    error: null,
    data: [],
  });

  const handleLikeToggle = useCallback(
    async (barberId) => {
      try {
        const userDocRef = doc(db, "users", userId);
        const barberDocRef = doc(db, "barbers", barberId);

        const userDocSnapshot = await getDoc(userDocRef);
        if (!userDocSnapshot.exists()) {
          throw new Error("User document does not exist.");
        }

        const userData = userDocSnapshot.data();
        const isLiked = userData.favoriteBarbers.some(
          (favBarber) => favBarber.id === barberId
        );

        const userFavoriteBarbersUpdate = isLiked
          ? { favoriteBarbers: arrayRemove(barberDocRef) }
          : { favoriteBarbers: arrayUnion(barberDocRef) };

        const barberLikesUpdate = isLiked
          ? { likes: arrayRemove(userDocRef) }
          : { likes: arrayUnion(userDocRef) };

        await updateDoc(userDocRef, userFavoriteBarbersUpdate);
        await updateDoc(barberDocRef, barberLikesUpdate);

        await refreshFavoriteBarbers();
        await fetchBarber();

        dispatch({
          type: "SUCCESS",
          data: state.data.map((barber) =>
            barber.id === barberId
              ? {
                  ...barber,
                  likes: isLiked
                    ? barber.likes.filter((id) => id !== userId)
                    : [...barber.likes, userId],
                }
              : barber
          ),
        });
      } catch (error) {
        console.error("Error toggling like:", error);
        dispatch({ type: "FAILURE", error: error.message });
      }
    },
    [userId, refreshFavoriteBarbers, fetchBarber, state.data]
  );

  return {
    favoriteBarbers: state.data,
    loading: state.loading,
    error: state.error,
    handleLikeToggle,
  };
}

export function useDeleteBarber() {
  const [state, dispatch] = useReducer(barberReducer, {
    loading: false,
    error: null,
    success: false,
  });

  const handleDeleteBarber = async (barberId) => {
    dispatch({ type: "REQUEST" });

    try {
      const barberRef = doc(db, "barbers", barberId);
      await deleteDoc(barberRef);
      dispatch({ type: "SUCCESS" });
    } catch (error) {
      dispatch({ type: "FAILURE", error });
      console.error("Failed to delete barber:", error);
    }
  };

  return {
    loading: state.loading,
    error: state.error,
    handleDeleteBarber,
  };
}
