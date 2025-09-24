"use client";

import React from "react";
import { AdminLayout } from "@repo/ui";
import { BookingManagement } from "@repo/ui";

export default function BookingPage() {
  return (
    <AdminLayout pageTitle="Booking Management">
      <BookingManagement />
    </AdminLayout>
  );
}

