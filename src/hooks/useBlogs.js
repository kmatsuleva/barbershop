import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { useReducer, useEffect } from "react";
import { db } from "../service/firebase";

function blogReducer(state, action) {
  switch (action.type) {
    case 'REQUEST':
      return { ...state, loading: true, error: null };
    case 'SUCCESS':
      return { ...state, loading: false, data: action.data };
    case 'FAILURE':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

export function useGetAllBlogs() {
  const [state, dispatch] = useReducer(blogReducer, {
    loading: true,
    error: null,
    data: [],
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      dispatch({ type: 'REQUEST' });
      try {
        const q = query(collection(db, "blogs"));
        const snapshot = await getDocs(q);
        const blogs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch({ type: 'SUCCESS', data: blogs });
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        dispatch({ type: 'FAILURE', error });
      }
    };

    fetchBlogs();
  }, []);

  return {
    blogPosts: state.data,
    loading: state.loading,
    error: state.error,
  };
}

export function useGetOneBlog(blogId) {
  const [state, dispatch] = useReducer(blogReducer, {
    loading: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    const fetchBlog = async () => {
      dispatch({ type: 'REQUEST' });
      try {
        const docRef = doc(db, "blogs", blogId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          dispatch({ type: 'SUCCESS', data: { id: docSnap.id, ...docSnap.data() } });
        } else {
          dispatch({ type: 'FAILURE', error: "No such blog exists" });
        }
      } catch (error) {
        console.error("Failed to fetch blog:", error);
        dispatch({ type: 'FAILURE', error });
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  return {
    blogPost: state.data,
    loading: state.loading,
    error: state.error,
  };
}
