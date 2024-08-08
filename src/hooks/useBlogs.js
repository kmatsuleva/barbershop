import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../service/firebase";

export function useGetAllBlogs() {
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);

    (async () => {
      try {
        setLoading(true);
        const q = query(collection(db, "blogs"));
        const snapshot = await getDocs(q);

        const blogs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setBlogPosts(blogs);
        console.log('blogs:', blogs);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return {
    blogPosts,
    loading,
    error,
  };
}

export function useGetOneBlog(blogId) {
  const [loading, setLoading] = useState(true);
  const [blogPost, setBlogPost] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);

    (async () => {
      try {
        setLoading(true);
        const docRef = doc(db, "blogs", blogId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBlogPost({
            id: docSnap.id,
            ...docSnap.data(),
          });
        } else {
          setError("No such blog exists");
        }
      } catch (error) {
        console.error("Failed to fetch blog:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [blogId]);

  return {
    blogPost,
    loading,
    error,
  };
}

