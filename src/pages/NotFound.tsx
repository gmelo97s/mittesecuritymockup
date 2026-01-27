import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MitteLogo } from "@/components/MitteLogo";
import { NeonButton } from "@/components/NeonButton";
import { NeonCard } from "@/components/NeonCard";
import { Home } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center p-4 pb-24"
    >
      <NeonCard glowColor="pink" className="text-center max-w-md">
        <MitteLogo size="md" className="mx-auto mb-6" />
        <h1 className="text-6xl font-bold font-orbitron gradient-text mb-4">404</h1>
        <p className="text-muted-foreground mb-6">
          Página não encontrada. Parece que você se perdeu na pista!
        </p>
        <NeonButton
          variant="pink"
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2"
        >
          <Home className="w-5 h-5" />
          Voltar ao Início
        </NeonButton>
      </NeonCard>
    </motion.div>
  );
};

export default NotFound;
