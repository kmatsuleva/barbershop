import { useState, useEffect } from "react";

import barbersAPI from "../../api/barbers-api";

export const useGetOneBarber = (barberId) => {
  const [isRequestPending, setRequestPending] = useState(false);
  const [barber, setBarber] = useState({});

  useEffect(() => {
    (async () => {
      try {
        setRequestPending(true);
        const result = await barbersAPI.getBarber(barberId);
        setBarber(result);
      } catch (error) {
        console.error("Failed to fetch barber:", error);
      } finally {
        setRequestPending(false);
      }
    })();
  }, [barberId]);

  return {
    barber,
    isRequestPending,
  };
}
