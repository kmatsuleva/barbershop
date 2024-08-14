import { useReducer, useEffect, useCallback, useState } from "react";
import { collection, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../service/firebase";
import { useGetAllBarbers } from "./useBarbers";

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
  const { barbersList, refetchBarbers } = useGetAllBarbers();

  const fetchServicesByBarbers = useCallback(async () => {
    dispatch({ type: "REQUEST" });
    try {
      const servicesPromises = barbersList.map(async (barber) => {
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
  }, [barbersList]);

  useEffect(() => {
    refetchBarbers();
  }, [refetchBarbers]);

  useEffect(() => {
    if (barbersList.length > 0) {
      fetchServicesByBarbers();
    }
  }, [barbersList, fetchServicesByBarbers]);

  return {
    servicesList: state.data,
    loading: state.loading,
    error: state.error,
    refetchServices: fetchServicesByBarbers,
  };
}
