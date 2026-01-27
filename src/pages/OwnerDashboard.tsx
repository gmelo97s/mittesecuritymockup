import { useState } from "react";
import { motion } from "framer-motion";
import { MitteLogo } from "@/components/MitteLogo";
import { NeonCard } from "@/components/NeonCard";
import { NeonButton } from "@/components/NeonButton";
import { NeonInput } from "@/components/NeonInput";
import { 
  Users, 
  UserCheck, 
  Clock, 
  Download, 
  TrendingUp,
  Calendar,
  Search,
  MessageCircle
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

// Mock data
const hourlyData = [
  { hour: "18h", entries: 5 },
  { hour: "19h", entries: 12 },
  { hour: "20h", entries: 28 },
  { hour: "21h", entries: 45 },
  { hour: "22h", entries: 62 },
  { hour: "23h", entries: 78 },
  { hour: "00h", entries: 85 },
  { hour: "01h", entries: 70 },
  { hour: "02h", entries: 45 },
  { hour: "03h", entries: 20 },
];

// Mock data de clientes com todos os campos para busca
const allClients = [
  { name: "João Silva", cpf: "123.456.789-00", email: "joao@email.com", whatsapp: "11937654207", birthDate: "1994-05-15", entry: "23:45", exit: "-", visits: 12 },
  { name: "Maria Santos", cpf: "987.654.321-00", email: "maria@email.com", whatsapp: "11937654207", birthDate: "1996-08-22", entry: "23:30", exit: "-", visits: 8 },
  { name: "Carlos Oliveira", cpf: "456.789.123-00", email: "carlos@email.com", whatsapp: "11937654207", birthDate: "1990-12-10", entry: "23:15", exit: "-", visits: 24 },
  { name: "Ana Costa", cpf: "321.654.987-00", email: "ana@email.com", whatsapp: "11937654207", birthDate: "1998-03-28", entry: "22:50", exit: "00:30", visits: 5 },
  { name: "Pedro Lima", cpf: "789.123.456-00", email: "pedro@email.com", whatsapp: "11937654207", birthDate: "1995-07-03", entry: "22:30", exit: "01:15", visits: 15 },
];

const recentClients = allClients;

const kpis = [
  { label: "Visitas Hoje", value: "247", icon: Users, color: "primary" },
  { label: "Clientes Únicos", value: "189", icon: UserCheck, color: "secondary" },
  { label: "Média de Idade", value: "26", icon: Calendar, color: "primary" },
  { label: "Dentro Agora", value: "142", icon: TrendingUp, color: "secondary" },
];

export function OwnerDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Função para filtrar clientes baseado na busca
  const filteredClients = allClients.filter((client) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      client.name.toLowerCase().includes(term) ||
      client.cpf.includes(term) ||
      client.email.toLowerCase().includes(term) ||
      client.whatsapp.includes(term) ||
      client.birthDate.includes(term)
    );
  });

  // Função para abrir WhatsApp com mensagem pré-formatada
  const openWhatsApp = (clientName: string, whatsapp: string) => {
    const message = encodeURIComponent(`Olá, ${clientName}, aqui é o Lucas, tudo bem?`);
    const phone = whatsapp.replace(/\D/g, "");
    window.open(`https://wa.me/55${phone}?text=${message}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pb-24 lg:pb-8 px-4 pt-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="flex items-center gap-4 mb-4 lg:mb-0">
            <MitteLogo size="md" />
            <div>
              <h1 className="text-xl lg:text-2xl font-bold font-orbitron text-foreground">
                Dashboard
              </h1>
              <p className="text-sm text-muted-foreground capitalize">{today}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg border border-border">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <input
                type="date"
                className="bg-transparent text-foreground text-sm outline-none"
                defaultValue={new Date().toISOString().split("T")[0]}
              />
            </div>
            <NeonButton variant="cyan" size="md" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Exportar CSV</span>
            </NeonButton>
          </div>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nome, CPF, WhatsApp, e-mail ou data de nascimento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary focus:shadow-[0_0_15px_hsl(180_100%_40%_/_0.3)] transition-all font-inter"
            />
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NeonCard
                className="relative overflow-hidden"
                glowColor={kpi.color === "primary" ? "pink" : "cyan"}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-muted-foreground uppercase tracking-wider mb-1">
                      {kpi.label}
                    </p>
                    <p className="text-2xl lg:text-4xl font-bold font-orbitron text-foreground">
                      {kpi.value}
                    </p>
                  </div>
                  <kpi.icon
                    className={`w-8 h-8 ${
                      kpi.color === "primary" ? "text-primary" : "text-secondary"
                    } opacity-50`}
                  />
                </div>
              </NeonCard>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <NeonCard>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-orbitron font-bold text-foreground flex items-center gap-2">
                <Clock className="w-5 h-5 text-secondary" />
                Fluxo de Entrada por Hora
              </h2>
            </div>
            <div className="h-64 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyData}>
                  <defs>
                    <linearGradient id="colorEntries" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(330, 100%, 50%)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(330, 100%, 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 20%)" />
                  <XAxis
                    dataKey="hour"
                    stroke="hsl(0, 0%, 50%)"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="hsl(0, 0%, 50%)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 7%)",
                      border: "1px solid hsl(330, 100%, 50%, 0.3)",
                      borderRadius: "8px",
                      color: "white",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="entries"
                    stroke="hsl(330, 100%, 50%)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorEntries)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </NeonCard>
        </motion.div>

        {/* Recent Clients Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <NeonCard>
            <h2 className="font-orbitron font-bold text-foreground mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Clientes Recentes
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-xs text-muted-foreground uppercase tracking-wider font-orbitron">
                      Nome
                    </th>
                    <th className="text-left py-3 px-2 text-xs text-muted-foreground uppercase tracking-wider font-orbitron">
                      Entrada
                    </th>
                    <th className="text-left py-3 px-2 text-xs text-muted-foreground uppercase tracking-wider font-orbitron">
                      Saída
                    </th>
                    <th className="text-left py-3 px-2 text-xs text-muted-foreground uppercase tracking-wider font-orbitron">
                      Visitas
                    </th>
                    <th className="text-left py-3 px-2 text-xs text-muted-foreground uppercase tracking-wider font-orbitron">
                      Ação
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="border-b border-border/30 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-3 px-2 text-foreground font-medium">
                        {client.name}
                      </td>
                      <td className="py-3 px-2 text-secondary font-mono">
                        {client.entry}
                      </td>
                      <td className="py-3 px-2 text-muted-foreground font-mono">
                        {client.exit}
                      </td>
                      <td className="py-3 px-2">
                        <span className="bg-primary/20 text-primary px-2 py-1 rounded text-sm font-orbitron">
                          {client.visits}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <button
                          onClick={() => openWhatsApp(client.name, client.whatsapp)}
                          className="p-2 rounded-lg bg-success/20 border border-success/30 hover:bg-success/30 transition-colors group"
                          title="Abrir WhatsApp"
                        >
                          <MessageCircle className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </NeonCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
