import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const useGuest = () => {
  const [guestId, setGuestId] = useState<string>(uuidv4());

  useEffect(() => {
    const currentId = localStorage.getItem("guestId") ?? guestId;
    setGuestId(currentId);
    localStorage.setItem("guestId", currentId);
  }, []);

  return {
    guestId,
  };
};
