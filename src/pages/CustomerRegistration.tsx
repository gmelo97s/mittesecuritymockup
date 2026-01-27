import { useState } from "react";
import { motion } from "framer-motion";
import { MitteLogo } from "@/components/MitteLogo";
import { NeonInput } from "@/components/NeonInput";
import { NeonButton } from "@/components/NeonButton";
import { NeonCard } from "@/components/NeonCard";
import { CheckCircle2 } from "lucide-react";

// Mask functions
const maskCPF = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

const maskPhone = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");
};

export function CustomerRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    email: "",
    phone: "",
    birthDate: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    let maskedValue = value;
    if (field === "cpf") maskedValue = maskCPF(value);
    if (field === "phone") maskedValue = maskPhone(value);

    setFormData((prev) => ({ ...prev, [field]: maskedValue }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório";
    if (formData.cpf.replace(/\D/g, "").length !== 11) newErrors.cpf = "CPF inválido";
    if (!formData.email.includes("@")) newErrors.email = "E-mail inválido";
    if (formData.phone.replace(/\D/g, "").length < 10) newErrors.phone = "Telefone inválido";
    if (!formData.birthDate) newErrors.birthDate = "Data de nascimento é obrigatória";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", cpf: "", email: "", phone: "", birthDate: "" });
      }, 3000);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen flex items-center justify-center p-4"
      >
        <NeonCard glowColor="cyan" className="text-center max-w-md w-full">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <CheckCircle2 className="w-20 h-20 text-secondary mx-auto mb-4 drop-shadow-[0_0_20px_hsl(180_100%_41%_/_0.8)]" />
          </motion.div>
          <h2 className="text-2xl font-bold font-orbitron text-foreground mb-2">
            Cadastro Realizado!
          </h2>
          <p className="text-muted-foreground">
            Bem-vindo ao MITTE. Apresente seu CPF na entrada.
          </p>
        </NeonCard>
      </motion.div>
    );
  }

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
          className="flex justify-center mb-8"
        >
          <MitteLogo size="lg" />
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <NeonCard glowColor="pink">
            <h1 className="text-xl font-bold font-orbitron text-center mb-6 text-foreground">
              Faça seu Cadastro
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <NeonInput
                label="Nome Completo"
                placeholder="Digite seu nome"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                error={errors.name}
              />

              <NeonInput
                label="CPF"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={(e) => handleChange("cpf", e.target.value)}
                error={errors.cpf}
                inputMode="numeric"
              />

              <NeonInput
                label="E-mail"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                error={errors.email}
              />

              <NeonInput
                label="WhatsApp"
                placeholder="(00) 00000-0000"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                error={errors.phone}
                inputMode="tel"
              />

              <NeonInput
                label="Data de Nascimento"
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleChange("birthDate", e.target.value)}
                error={errors.birthDate}
              />

              <div className="pt-4">
                <NeonButton type="submit" variant="pink" size="xl">
                  CADASTRAR E ENTRAR
                </NeonButton>
              </div>
            </form>
          </NeonCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
