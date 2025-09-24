"use client";

import React from "react";
import { AdminLayout } from "@repo/ui";
import { EventManagement } from "@repo/ui";

export default function EventsPage() {
  return (
    <AdminLayout pageTitle="Event Management">
      <EventManagement />
    </AdminLayout>
  );
}
