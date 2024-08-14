import { useCallback, useEffect, useReducer, useState } from "react";
import {
  collection,
  query,
  getDocs,
  doc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../service/firebase";

function clientReducer(state, action) {
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

export function useGetAllClients() {
  const roles = ["admin", "client"];
  const [state, dispatch] = useReducer(clientReducer, {
    loading: true,
    error: null,
    data: [],
  });

  const fetchClients = useCallback(async () => {
    dispatch({ type: "REQUEST" });
    try {
      const q = query(collection(db, "users"), where("role", "==", "client"));
      const snapshot = await getDocs(q);

      const clientsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch({ type: "SUCCESS", data: clientsList });
    } catch (error) {
      console.error("Error fetching clients:", error);
      dispatch({ type: "FAILURE", error });
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  return {
    roles,
    clients: state.data,
    loading: state.loading,
    error: state.error,
    refetchClients: fetchClients,
  };
}

export function useClientRoleChange() {
  const [state, dispatch] = useReducer(clientReducer, {
    loading: true,
    error: null,
    data: [],
  });

  const handleRoleChange = async (id, newRole) => {
    dispatch({ type: "REQUEST" });
    try {
      await updateDoc(doc(db, "users", id), { role: newRole });
      dispatch({
        type: "SUCCESS",
        data: state.data.map((client) =>
          client.id === id ? { ...client, role: newRole } : client
        ),
      });
    } catch (error) {
      console.error("Error updating role:", error);
      dispatch({ type: "FAILURE", error });
    }
  };

  return { handleRoleChange };
}
