import { useEffect, useReducer, useCallback, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../service/firebase";

const testimonialReducer = (state, action) => {
  switch (action.type) {
    case 'REQUEST':
      return { ...state, loading: true, error: null, success: false };
    case 'SUCCESS':
      return { ...state, loading: false, success: true };
    case 'FAILURE':
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

export function useCreateTestimonial(barberId, refetchTestimonials) {
  const [state, dispatch] = useReducer(testimonialReducer, {
    loading: false,
    error: null,
    success: false,
  });

  const createTestimonial = useCallback(
    async (authorId, testimonialData) => {
      dispatch({ type: 'REQUEST' });

      try {
        await addDoc(collection(db, "testimonials"), {
          ...testimonialData,
          authorId: doc(db, "users", authorId),
          barberId: doc(db, "barbers", barberId),
        });
        await refetchTestimonials();
        
        dispatch({ type: 'SUCCESS' });
      } catch (error) {
        dispatch({ type: 'FAILURE', error });
        console.error("Failed to create testimonial:", error);
      }
    },
    [barberId, refetchTestimonials]
  );

  return {
    createTestimonial,
    loading: state.loading,
    error: state.error,
    success: state.success,
  };
}
