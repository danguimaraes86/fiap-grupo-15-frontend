import { RecoilRoot } from "recoil";
import DashboardView from "./DashboardView";

export default function App() {
  return (
    <RecoilRoot>
      <DashboardView />;
    </RecoilRoot>
  );
}
