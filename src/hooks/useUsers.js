import { useEffect, useState } from "react";
import {
  collection,
  query,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../service/firebase";
import { useAuth } from "./useAuth";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const q = query(collection(db, "users"));
        const snapshot = await getDocs(q);

        const usersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);

        const uniqueRoles = Array.from(
          new Set(usersList.map((user) => user.role).filter(Boolean))
        );
        setRoles(uniqueRoles);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDelete = () => {};

  // const getUserRole = async () => {
  //   console.log('user:', user);

  //   const userDocRef = doc(db, "users", user);
  //   try {
  //     const userDoc = await getDoc(userDocRef);

  //     if (userDoc.exists()) {
  //       setUserRole(userDoc.data().role);
  //     } else {
  //       console.error("No such user!");
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user role:", error);
  //     return null;
  //   }
  // };

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user);
        try {
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserRole(userDoc.data().role);
          } else {
            console.error("No such user!");
            return null;
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          return null;
        }
      }
    };

    fetchUserRole();
  }, [user]);

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

  const fetchUserDetails = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setUserDetails(userDoc.data());
        return userDoc.data();
      } else {
        console.error("No such user!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

  console.log("userRole ==:", userRole);
  return {
    users,
    roles,
    loading,
    handleDelete,
    handleRoleChange,
    userDetails,
    fetchUserDetails,
    userRole,
  };
}
