import { lastDayOfMonth, format } from "date-fns";
import { es } from "date-fns/locale";

function getLastMonthDate() {
  const lastDate = lastDayOfMonth(new Date());

  return format(lastDate, "dd/MM/yyyy", { locale: es });
}

const capitalize = (string) => {
  return String(string[0]).toUpperCase() + String(string).slice(1);
};

export default { getLastMonthDate, capitalize };
