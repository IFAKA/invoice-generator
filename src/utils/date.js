import { subMonths, lastDayOfMonth, format } from "date-fns";
import { es } from "date-fns/locale";

function getLastMonthDate() {
  const today = new Date();
  const lastMonthDate = lastDayOfMonth(subMonths(today, 1));

  return format(lastMonthDate, "dd/MM/yyyy", { locale: es });
}

const capitalize = (string) => {
  return String(string[0]).toUpperCase() + String(string).slice(1);
};

export default { getLastMonthDate, capitalize };
