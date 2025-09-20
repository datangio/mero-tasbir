import { AdminLayout, WeddingManagement } from "@repo/ui/index";

const WeddingPage = () => {
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Wedding Management", isActive: true },
  ];

  return (
    <AdminLayout pageTitle="Wedding Management" breadcrumbs={breadcrumbs}>
      <WeddingManagement />
    </AdminLayout>
  );
};

export default WeddingPage;
