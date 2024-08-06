import { useState, useEffect } from "react";

import barbersAPI from "../../api/barbers-api";

export function useGetAllBarbers() {
  const [isRequestPending, setRequestPending] = useState(false);
  const [barbersList, setBarbersList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setRequestPending(true);
        const result = await barbersAPI.getAllBarbers();
        setBarbersList(result);
      } catch (error) {
        console.error("Failed to fetch barbers:", error);
      } finally {
        setRequestPending(false);
      }
    })();
  }, []);

  return {
    barbersList,
    isRequestPending,
  };
}

