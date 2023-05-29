import PanelDashboard from "../../components/Panel/PanelDashboard";
import { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PanelDashboard />
    </>
  );
}
