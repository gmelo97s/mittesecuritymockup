import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { MitteLogo } from "@/components/MitteLogo";
import { NeonButton } from "@/components/NeonButton";
import { NeonCard } from "@/components/NeonCard";
import { ArrowLeft, User, Calendar, Clock, LogIn, LogOut } from "lucide-react";

interface Client {
  cpf: string;
  name: string;
  email: string;
  birthDate: string;
  isInside: boolean;
  lastVisit: string;
}

function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
}

export function SecurityPanel() {
  const location = useLocation();
  const navigate = useNavigate();
  const client = location.state?.client as Client;

  const [isInside, setIsInside] = useState(client?.isInside || false);
  const [isToggling, setIsToggling] = useState(false);

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <NeonCard className="text-center">
          <p className="text-muted-foreground mb-4">Nenhum cliente selecionado</p>
          <NeonButton variant="outline" onClick={() => navigate("/seguranca")}>
            Voltar para Busca
          </NeonButton>
        </NeonCard>
      </div>
    );
  }

  const age = calculateAge(client.birthDate);
  const isOfAge = age >= 18;

  const handleToggleEntry = () => {
    setIsToggling(true);
    setTimeout(() => {
      setIsInside(!isInside);
      setIsToggling(false);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pb-24 px-4 pt-6"
    >
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/seguranca")}
            className="p-2 rounded-lg hover:bg-card transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-muted-foreground" />
          </button>
          <MitteLogo size="sm" />
          <div className="w-10" />
        </div>

        {/* Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl mb-6 text-center ${
            isInside
              ? "bg-success/20 border border-success/50"
              : "bg-muted border border-border"
          }`}
        >
          <span
            className={`font-orbitron font-bold text-lg ${
              isInside ? "text-green-400" : "text-muted-foreground"
            }`}
          >
            {isInside ? "✓ DENTRO DO ESTABELECIMENTO" : "FORA DO ESTABELECIMENTO"}
          </span>
        </motion.div>

        {/* Client Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <NeonCard glowColor={isOfAge ? "cyan" : "pink"}>
            {/* Avatar & Name */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <User className="w-8 h-8 text-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold font-orbitron text-foreground">
                  {client.name}
                </h2>
                <p className="text-muted-foreground text-sm">{client.cpf}</p>
              </div>
            </div>

            {/* Age Verification */}
            <div
              className={`p-3 rounded-lg mb-4 flex items-center gap-3 ${
                isOfAge
                  ? "bg-success/10 border border-success/30"
                  : "bg-destructive/10 border border-destructive/30"
              }`}
            >
              <Calendar className={`w-5 h-5 ${isOfAge ? "text-green-400" : "text-destructive"}`} />
              <div>
                <p className={`font-bold ${isOfAge ? "text-green-400" : "text-destructive"}`}>
                  {age} anos
                </p>
                <p className="text-xs text-muted-foreground">
                  {isOfAge ? "Maior de idade ✓" : "MENOR DE IDADE - ENTRADA PROIBIDA"}
                </p>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  E-mail
                </p>
                <p className="text-sm text-foreground truncate">{client.email}</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Última Visita
                </p>
                <p className="text-sm text-foreground">{formatDate(client.lastVisit)}</p>
              </div>
            </div>

            {/* Action Button */}
            {isOfAge ? (
              <motion.div
                whileTap={{ scale: 0.98 }}
              >
                <NeonButton
                  variant={isInside ? "danger" : "success"}
                  size="xl"
                  onClick={handleToggleEntry}
                  disabled={isToggling}
                  className="flex items-center justify-center gap-3"
                >
                  {isToggling ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-foreground/30 border-t-foreground rounded-full"
                    />
                  ) : isInside ? (
                    <>
                      <LogOut className="w-6 h-6" />
                      MARCAR SAÍDA
                    </>
                  ) : (
                    <>
                      <LogIn className="w-6 h-6" />
                      MARCAR ENTRADA
                    </>
                  )}
                </NeonButton>
              </motion.div>
            ) : (
              <div className="bg-destructive/20 p-4 rounded-lg text-center">
                <p className="text-destructive font-orbitron font-bold">
                  ENTRADA NÃO PERMITIDA
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Cliente menor de 18 anos
                </p>
              </div>
            )}
          </NeonCard>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <NeonCard className="bg-card/50">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Histórico de Visitas
                </p>
                <p className="text-foreground font-orbitron">12 visitas registradas</p>
              </div>
            </div>
          </NeonCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
