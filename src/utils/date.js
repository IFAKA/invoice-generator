import { subMonths, lastDayOfMonth, format } from "date-fns";

function getLastMonthDate() {
  const today = new Date();
  const lastMonthDate = lastDayOfMonth(subMonths(today, 1));
  return format(lastMonthDate, "dd/MM/yyyy");
}

export default { getLastMonthDate };
