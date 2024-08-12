import { useReducer, useEffect, useCallback } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../service/firebase";

function serviceReducer(state, action) {
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

export function useGetAllServices() {
  const [state, dispatch] = useReducer(serviceReducer, {
    loading: true,
    error: null,
    data: [],
  });

  const fetchServices = useCallback(async () => {
    dispatch({ type: "REQUEST" });
    try {
      const q = query(collection(db, "services"));
      const snapshot = await getDocs(q);
      const services = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch({ type: "SUCCESS", data: services });
    } catch (error) {
      console.error("Failed to fetch services:", error);
      dispatch({ type: "FAILURE", error });
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return {
    servicesList: state.data,
    loading: state.loading,
    error: state.error,
    refetchServices: fetchServices,
  };
}
