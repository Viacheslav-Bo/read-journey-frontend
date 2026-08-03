import { ReactNode } from "react";
import css from "./Dashboard.module.css";

interface DashboardProps {
  children: ReactNode;
}

export default function Dashboard({ children }: DashboardProps) {
  return <section className={css.dashboard}>{children}</section>;
}
