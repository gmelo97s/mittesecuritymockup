import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MitteLogo } from "@/components/MitteLogo";
import { NeonInput } from "@/components/NeonInput";
import { NeonButton } from "@/components/NeonButton";
import { NeonCard } from "@/components/NeonCard";
import { AlertTriangle, Search, UserPlus } from "lucide-react";

// Simulated database
const mockClients = [
  { cpf: "123.456.789-00", name: "João Silva", email: "joao@email.com", birthDate: "1995-05-15", isInside: false, lastVisit: "2024-01-20" },
  { cpf: "987.654.321-00", name: "Maria Santos", email: "maria@email.com", birthDate: "1998-08-22", isInside: true, lastVisit: "2024-01-25" },
  { cpf: "111.222.333-44", name: "Carlos Oliveira", email: "carlos@email.com", birthDate: "2000-12-01", isInside: false, lastVisit: "2024-01-18" },
];

const maskCPF = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export function SecuritySearch() {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState("");
  const [searchResult, setSearchResult] = useState<"found" | "not-found" | null>(null);
  const [foundClient, setFoundClient] = useState<typeof mockClients[0] | null>(null);

  const handleSearch = () => {
    const client = mockClients.find((c) => c.cpf === cpf);
    if (client) {
      setSearchResult("found");
      setFoundClient(client);
      // Navigate to action panel with client data
      setTimeout(() => {
        navigate("/seguranca/acao", { state: { client } });
      }, 500);
    } else {
      setSearchResult("not-found");
      setFoundClient(null);
    }
  };

  const handleNewRegistration = () => {
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pb-24 px-4 pt-8"
    >
      <div className="max-w-md mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-6"
        >
          <MitteLogo size="md" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg font-orbitron text-center text-muted-foreground mb-6"
        >
          Painel de Segurança
        </motion.h1>

        {/* Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <NeonCard>
            <div className="space-y-4">
              <NeonInput
                label="Buscar por CPF"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(e) => {
                  setCpf(maskCPF(e.target.value));
                  setSearchResult(null);
                }}
                inputMode="numeric"
              />

              <div className="grid grid-cols-2 gap-3">
                <NeonButton
                  variant="cyan"
                  size="lg"
                  onClick={handleSearch}
                  disabled={cpf.replace(/\D/g, "").length !== 11}
                  className="flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Procurar
                </NeonButton>
                <NeonButton
                  variant="outline"
                  size="lg"
                  onClick={handleNewRegistration}
                  className="flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-5 h-5" />
                  Novo
                </NeonButton>
              </div>
            </div>
          </NeonCard>
        </motion.div>

        {/* Search Result Feedback */}
        <AnimatePresence>
          {searchResult === "not-found" && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <NeonCard className="bg-destructive/10 border-destructive/50">
                <div className="flex items-center gap-4">
                  <AlertTriangle className="w-10 h-10 text-destructive flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-orbitron font-bold text-destructive mb-1">
                      Cadastro Não Encontrado
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      CPF não registrado no sistema.
                    </p>
                  </div>
                </div>
                <NeonButton
                  variant="outline"
                  size="md"
                  onClick={handleNewRegistration}
                  className="w-full mt-4"
                >
                  Cadastrar Nova Pessoa
                </NeonButton>
              </NeonCard>
            </motion.div>
          )}

          {searchResult === "found" && foundClient && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6"
            >
              <NeonCard glowColor="cyan" className="text-center">
                <p className="text-secondary font-orbitron">
                  Cliente encontrado! Redirecionando...
                </p>
              </NeonCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Access - Recent Entries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <h2 className="text-sm font-orbitron text-muted-foreground mb-3 uppercase tracking-wider">
            Últimas Entradas
          </h2>
          <div className="space-y-2">
            {mockClients.slice(0, 3).map((client, index) => (
              <motion.div
                key={client.cpf}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => {
                  setCpf(client.cpf);
                  setSearchResult("found");
                  setFoundClient(client);
                  setTimeout(() => {
                    navigate("/seguranca/acao", { state: { client } });
                  }, 300);
                }}
                className="bg-card/50 p-3 rounded-lg border border-border/30 flex items-center justify-between cursor-pointer hover:border-secondary/50 transition-all"
              >
                <div>
                  <p className="font-medium text-foreground">{client.name}</p>
                  <p className="text-xs text-muted-foreground">{client.cpf}</p>
                </div>
                <div className={client.isInside ? "status-inside" : "status-outside"}>
                  {client.isInside ? "Dentro" : "Fora"}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
