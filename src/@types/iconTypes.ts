import { 
  IconProps, 
  CreditCard, 
  ForkKnife, 
  Heartbeat, 
  Car, 
  House, 
  ShoppingCart, 
  BeerBottle,
  Bank, 
  FileText 
} from "phosphor-react";

export type ExpenseType = 
  | "card" 
  | "food" 
  | "health" 
  | "transport" 
  | "rent" 
  | "shopping" 
  | "leisure" 
  | "bills"
  | "investment";

// Mapeamento dos ícones
export const iconMap: Record<ExpenseType, React.FC<IconProps>> = {
  card: CreditCard,           // Cartões de crédito
  food: ForkKnife,            // Alimentação
  health: Heartbeat,          // Saúde
  transport: Car,             // Transporte
  rent: House,                // Aluguel / Moradia
  shopping: ShoppingCart,     // Compras
  leisure: BeerBottle,        // Lazer / Entretenimento
  bills: FileText,            // Contas (água, luz, internet)
  investment: Bank,      // Investimentos / Poupança
};
