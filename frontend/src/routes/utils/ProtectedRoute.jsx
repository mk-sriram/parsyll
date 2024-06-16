import React from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const session = useSession();
  

  if (!session) {
    navigate("/login");
  }

  return element;
};

export default ProtectedRoute;
