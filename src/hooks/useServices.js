import { useReducer, useEffect, useCallback, useState } from "react";
import { collection, getDoc, getDocs, query } from "firebase/firestore";
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

export function useGetServicesByBarbers() {
  const [state, dispatch] = useReducer(serviceReducer, {
    loading: true,
    error: null,
    data: [],
  });
  const [barbers, setBarbers] = useState([]);

  const fetchBarbers = useCallback(async () => {
    dispatch({ type: "REQUEST" });
    try {
      const q = query(collection(db, "barbers"));
      const snapshot = await getDocs(q);
      const barbersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBarbers(barbersData);
    } catch (error) {
      console.error("Failed to fetch barbers:", error);
      dispatch({ type: "FAILURE", error });
    }
  }, []);

  const fetchServicesByBarbers = useCallback(async () => {
    dispatch({ type: "REQUEST" });
    try {
      const servicesPromises = barbers.map(async (barber) => {
        if (barber.services) {
          const servicesPromises = barber.services.map(async (serviceRef) => {
            const serviceDoc = await getDoc(serviceRef);
            if (serviceDoc.exists()) {
              return { id: serviceDoc.id, ...serviceDoc.data() };
            }
          });
          return Promise.all(servicesPromises);
        }
        return [];
      });

      const services = await Promise.all(servicesPromises);
      const uniqueServices = Array.from(
        new Set(services.flat().map((service) => service.id))
      ).map((id) => services.flat().find((service) => service.id === id));

      dispatch({ type: "SUCCESS", data: uniqueServices });
    } catch (error) {
      dispatch({ type: "FAILURE", error });
      console.error("Failed to fetch services by barbers:", error);
    }
  }, [barbers]);

  useEffect(() => {
    fetchBarbers();
  }, [fetchBarbers]);

  useEffect(() => {
    if (barbers.length > 0) {
      fetchServicesByBarbers();
    }
  }, [barbers, fetchServicesByBarbers]);

  return {
    servicesList: state.data,
    loading: state.loading,
    error: state.error,
    refetchServices: fetchServicesByBarbers,
  };
}
