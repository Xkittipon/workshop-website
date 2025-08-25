import React, { useState, useEffect } from "react";
import useEcomStore from "../store/ecom-store";
import { currentAdmin } from "../api/auth";
import LoadingToRedirect from "./LoadingToRedirect";

const ProtectRouteAdmin = ({ element }) => {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = useEcomStore((state) => state.user);
  const token = useEcomStore((state) => state.token);

  useEffect(() => {
    if (user && token) {
      currentAdmin(token)
        .then(() => {
          setOk(true);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Admin check failed:", err);
          setOk(false);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user, token]);

  if (loading) return <div>Loading...</div>;
  return ok ? element : <LoadingToRedirect />;
};

export default ProtectRouteAdmin;
