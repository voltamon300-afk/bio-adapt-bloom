// BioAdapt Mobile App - Bio-mimetic Rehabilitation Solution

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to onboarding on first load
    navigate("/");
  }, [navigate]);

  return null;
};

export default Index;
