import { useEffect, useState } from "react";
import {
  collection,
  query,
  getDocs,
  doc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../service/firebase";

export function useUsers() {
  const roles = ["admin", "client"];
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const q = query(collection(db, "users"), where("role", "==", "client"));
        const snapshot = await getDocs(q);

        const usersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    try {
      await updateDoc(doc(db, "users", id), { role: newRole });
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return { users, roles, loading, handleRoleChange };
}
