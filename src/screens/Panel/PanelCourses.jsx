import PanelList from "../../components/Panel/PanelList";
import { useEffect } from "react";

export default function PanelCourse() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PanelList />
    </>
  );
}
