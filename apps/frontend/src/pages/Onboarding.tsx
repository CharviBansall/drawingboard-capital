import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";

export default function Onboarding() {
  const { user, session } = useAuth();
  const navigate = useNavigate();
  if (!user || !session) {
    navigate("/signin");
  }
  return <div>Onboarding</div>;
}
