import { PhotographyBookingManagement, AdminLayout } from "@repo/ui";

const PhotographyWorkflowPage = () => {
  const breadcrumbs = [
    { label: "Workflow", href: "/workflow" },
    { label: "Photography", href: "/workflow/photography", isActive: true }
  ];

  return (
    <AdminLayout pageTitle="Photography Bookings" breadcrumbs={breadcrumbs}>
      <PhotographyBookingManagement />
    </AdminLayout>
  );
};

export default PhotographyWorkflowPage;
