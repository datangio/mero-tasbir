"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@repo/ui";
import { MediaUploadModal } from "@repo/ui";
import { motion } from "framer-motion";
import {
  Upload,
  Image,
  Video,
  FileText,
  Search,
  Grid,
  List,
  Plus,
  Eye,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  category: string;
  clientName?: string;
  description?: string;
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const DashboardMediaPage: React.FC = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = [
    { value: "", label: "All Categories" },
    { value: "HOW_IT_WORKS", label: "How it works" },
    { value: "CLIENT_PORTFOLIO", label: "Client Portfolio" },
    { value: "GALLERY", label: "Gallery" },
  ];

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "12",
        ...(searchTerm && { search: searchTerm }),
        ...(selectedCategory && { category: selectedCategory }),
      });

      const response = await fetch(
        `http://localhost:5000/api/v1/media?${params}`
      );
      if (response.ok) {
        const data = await response.json();
        setMediaItems(data.data || []);
        setTotalPages(data.pages || 1);
      } else {
        toast.error("Failed to fetch media items");
      }
    } catch (error) {
      console.error("Error fetching media:", error);
      toast.error("Error fetching media items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [currentPage, searchTerm, selectedCategory]);

  const handleUploadSuccess = () => {
    toast.success("Media uploaded successfully!");
    setShowUploadModal(false);
    setCurrentPage(1);
    fetchMedia();
  };

  const handleDeleteMedia = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this media item?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/media/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          toast.success("Media deleted successfully");
          fetchMedia();
        } else {
          toast.error("Failed to delete media");
        }
      } catch (error) {
        console.error("Error deleting media:", error);
        toast.error("Error deleting media");
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) return <Image className="h-5 w-5" />;
    if (mimeType.startsWith("video/")) return <Video className="h-5 w-5" />;
    return <FileText className="h-5 w-5" />;
  };

  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.label : category;
  };

  return (
    <AdminLayout
      pageTitle="Media Management"
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Media", href: "/dashboard/media" },
      ]}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Media Management
            </h1>
            <p className="text-gray-600">Upload and manage your media files</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Plus className="mr-2 h-4 w-4" />
            Upload Media
          </button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <input
                type="text"
                placeholder="Search media files..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <div className="flex overflow-hidden rounded-md border border-gray-300">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-indigo-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-indigo-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Media Content */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-indigo-600"></div>
          </div>
        ) : mediaItems.length === 0 ? (
          <div className="py-12 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No media files
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by uploading your first media file.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowUploadModal(true)}
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <Plus className="mr-2 h-4 w-4" />
                Upload Media
              </button>
            </div>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mediaItems.map(item => (
              <motion.div
                key={item.id}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex aspect-square items-center justify-center bg-gray-100">
                  {item.mimeType.startsWith("image/") ? (
                    <img
                      src={item.url}
                      alt={item.originalName}
                      className="h-full w-full object-cover"
                    />
                  ) : item.mimeType.startsWith("video/") ? (
                    <video
                      src={item.url}
                      className="h-full w-full object-cover"
                      controls
                    />
                  ) : (
                    <div className="flex flex-col items-center text-gray-400">
                      {getFileIcon(item.mimeType)}
                      <span className="mt-1 text-xs">File</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3
                    className="truncate text-sm font-medium text-gray-900"
                    title={item.originalName}
                  >
                    {item.originalName}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {formatFileSize(item.size)} •{" "}
                    {getCategoryLabel(item.category)}
                  </p>
                  {item.clientName && (
                    <p className="mt-1 text-xs text-gray-500">
                      Client: {item.clientName}
                    </p>
                  )}
                  <div className="mt-3 flex items-center justify-between">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        item.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => window.open(item.url, "_blank")}
                        className="p-1 text-gray-400 transition-colors hover:text-indigo-600"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteMedia(item.id)}
                        className="p-1 text-gray-400 transition-colors hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Preview
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {mediaItems.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-100">
                          {item.mimeType.startsWith("image/") ? (
                            <img
                              src={item.url}
                              alt={item.originalName}
                              className="h-full w-full rounded object-cover"
                            />
                          ) : (
                            getFileIcon(item.mimeType)
                          )}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div
                          className="max-w-xs truncate text-sm font-medium text-gray-900"
                          title={item.originalName}
                        >
                          {item.originalName}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {formatFileSize(item.size)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {getCategoryLabel(item.category)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {item.clientName || "-"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            item.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => window.open(item.url, "_blank")}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDeleteMedia(item.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing page {currentPage} of {totalPages}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage(prev => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Upload Modal */}
        <MediaUploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onSuccess={handleUploadSuccess}
        />
      </div>
    </AdminLayout>
  );
};

export default DashboardMediaPage;
