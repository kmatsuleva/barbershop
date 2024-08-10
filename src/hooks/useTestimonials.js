import { useEffect, useReducer, useCallback, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../service/firebase";

const testimonialReducer = (state, action) => {
  switch (action.type) {
    case "REQUEST":
      return { ...state, loading: true, error: null, success: false };
    case "SUCCESS":
      return { ...state, loading: false, success: true };
    case "FAILURE":
      return { ...state, loading: false, error: action.error, success: false };
    default:
      return state;
  }
};

export function useGetBarberTestimonials(barberId) {
  const [testimonials, setTestimonials] = useState([]);

  const fetchTestimonials = useCallback(async () => {
    try {
      const q = query(
        collection(db, "testimonials"),
        where("barberId", "==", doc(db, "barbers", barberId))
      );
      const snapshot = await getDocs(q);

      const testimonialsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTestimonials(testimonialsList);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    }
  }, [barberId]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  return {
    testimonials,
    refetchTestimonials: fetchTestimonials,
  };
}

export function useCreateTestimonial(barberId) {
  const [state, dispatch] = useReducer(testimonialReducer, {
    loading: false,
    error: null,
    success: false,
  });

  const createTestimonial = useCallback(
    async (authorId, testimonialData) => {
      dispatch({ type: "REQUEST" });

      try {
        await addDoc(collection(db, "testimonials"), {
          ...testimonialData,
          authorId: doc(db, "users", authorId),
          barberId: doc(db, "barbers", barberId),
        });

        dispatch({ type: "SUCCESS" });
      } catch (error) {
        dispatch({ type: "FAILURE", error });
        console.error("Failed to create testimonial:", error);
      }
    },
    [barberId]
  );

  return {
    createTestimonial,
    loading: state.loading,
    error: state.error,
    success: state.success,
  };
}

export function useGetUserTestimonials(userId) {
  const [state, dispatch] = useReducer(testimonialReducer, {
    loading: false,
    error: null,
    success: false,
  });

  const [userTestimonials, setUserTestimonials] = useState([]);

  const fetchUserTestimonials = useCallback(async () => {
    dispatch({ type: "REQUEST" });

    try {
      const q = query(
        collection(db, "testimonials"),
        where("authorId", "==", doc(db, "users", userId))
      );
      const snapshot = await getDocs(q);

      const fetchBarberDetails = async (barberRef) => {
        const barberDoc = await getDoc(barberRef);
        if (barberDoc.exists()) {
          const barberData = barberDoc.data();
          return {
            id: barberRef.id,
            name: `${barberData.firstName} ${barberData.lastName}` || "",
            photoUrl: barberData.photoUrl,
          };
        }
        return null;
      };

      const testimonialsList = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const testimonialData = doc.data();
          const barberDetails = await fetchBarberDetails(
            testimonialData.barberId
          );

          return {
            id: doc.id,
            ...testimonialData,
            barberId: barberDetails?.id || "",
            barberName: barberDetails?.name || "",
            barberPhoto: barberDetails?.photoUrl || "",
          };
        })
      );

      setUserTestimonials(testimonialsList);
      dispatch({ type: "SUCCESS" });
    } catch (error) {
      dispatch({ type: "FAILURE", error });
      console.error("Failed to fetch testimonials:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserTestimonials();
  }, [fetchUserTestimonials]);

  return {
    userTestimonials,
    loading: state.loading,
    error: state.error,
    success: state.success,
    refetchTestimonials: fetchUserTestimonials,
  };
}

export function useUpdateTestimonial() {
  const [state, dispatch] = useReducer(testimonialReducer, {
    loading: false,
    error: null,
    success: false,
  });

  const updateTestimonial = useCallback(
    async (testimonialId, updatedData) => {
      dispatch({ type: "REQUEST" });

      try {
        const testimonialRef = doc(db, "testimonials", testimonialId);
        await updateDoc(testimonialRef, updatedData);
        dispatch({ type: "SUCCESS" });
      } catch (error) {
        dispatch({ type: "FAILURE", error });
        console.error("Failed to update testimonial:", error);
      }
    },
    []
  );

  return {
    loading: state.loading,
    error: state.error,
    success: state.success,
    updateTestimonial,
  };
}

export function useDeleteTestimonial() {
  const [state, dispatch] = useReducer(testimonialReducer, {
    loading: false,
    error: null,
    success: false,
  });

  const handleDeleteTestimonial = async (testimonialId) => {
    dispatch({ type: "REQUEST" });

    try {
      const testimonialRef = doc(db, "testimonials", testimonialId);
      await deleteDoc(testimonialRef);
      dispatch({ type: "SUCCESS" });
    } catch (error) {
      dispatch({ type: "FAILURE", error });
      console.error("Failed to delete testimonial:", error);
    }
  };

  return {
    loading: state.loading,
    error: state.error,
    handleDeleteTestimonial,
  };
}