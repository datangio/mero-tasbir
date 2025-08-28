import { AdminDashboardMain } from "./dashboard.main";
import { AdminDashboardSidebar } from "./dashboard.sidebar";
import { SplitScreenAdmin } from "./splitscree.admin";

export const AdminDashboard = () => {
  return (
    <div>
      <SplitScreenAdmin>
        <AdminDashboardSidebar />
        <AdminDashboardMain />
      </SplitScreenAdmin>
    </div>
  );
};
