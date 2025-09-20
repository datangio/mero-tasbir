"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout, MediaUploadModal } from "@repo/ui";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  Camera,
  Video,
  Upload,
  Plus,
  Search,
  Grid,
  List,
  Eye,
  Trash2,
} from "lucide-react";

const ANIMATION_VARIANTS = {
  container: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
  item: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  },
};

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
}

export default function BookingMediaManagementPage() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory] = useState("all");
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "12",
        ...(selectedCategory !== "all" && { category: selectedCategory }),
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await fetch(
        `http://localhost:5000/api/v1/media?${params}`
      );
      if (response.ok) {
        const result = await response.json();
        setMediaItems(result.data);
        setTotalPages(result.pagination.pages);
      } else {
        toast.error("Failed to fetch media");
      }
    } catch (error) {
      console.error("Error fetching media:", error);
      toast.error("Error fetching media");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [currentPage, selectedCategory, searchTerm]);

  const handleUploadSuccess = (mediaData: unknown) => {
    console.log("Media uploaded successfully:", mediaData);
    fetchMedia(); // Refresh media list
    setCurrentPage(1); // Reset to first page
  };

  const handleDeleteMedia = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/v1/media/${id}`, {
        method: "DELETE",
      });

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
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith("video/")) {
      return <Video className="h-8 w-8 text-blue-500" />;
    }
    return <Camera className="h-8 w-8 text-green-500" />;
  };

  return (
    <AdminLayout pageTitle="Booking Media Management">
      <motion.div
        className="space-y-6 p-6"
        variants={ANIMATION_VARIANTS.container}
        initial="initial"
        animate="animate"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Booking Media Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Upload and manage media assets for your photography bookings
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <Plus className="mr-2 h-4 w-4" />
              Upload Media
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="rounded-lg bg-white p-4 shadow">
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="text"
                  placeholder="Search media..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex rounded-md border border-gray-300">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 ${viewMode === "grid" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 ${viewMode === "list" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Media Grid/List */}
        <div className="rounded-lg bg-white shadow">
          {loading ? (
            <div className="py-12 text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-indigo-600"></div>
              <p className="mt-2 text-sm text-gray-500">Loading media...</p>
            </div>
          ) : mediaItems.length === 0 ? (
            <div className="py-12 text-center">
              <Camera className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No media uploaded
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by uploading your first photo or video for your
                bookings.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Media
                </button>
              </div>
            </div>
          ) : (
            <>
              <div
                className={`p-6 ${viewMode === "grid" ? "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "space-y-4"}`}
              >
                {mediaItems.map(item => (
                  <motion.div
                    key={item.id}
                    className={`${viewMode === "grid" ? "rounded-lg bg-gray-50 p-4" : "flex items-center space-x-4 border-b border-gray-200 p-4"}`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {viewMode === "grid" ? (
                      <div className="space-y-3">
                        <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-200">
                          {item.mimeType.startsWith("video/") ? (
                            <video
                              src={`http://localhost:5000${item.url}`}
                              className="h-full w-full rounded-lg object-cover"
                              controls
                            />
                          ) : (
                            <img
                              src={`http://localhost:5000${item.url}`}
                              alt={item.originalName}
                              className="h-full w-full rounded-lg object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <h3 className="truncate text-sm font-medium text-gray-900">
                            {item.originalName}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(item.size)} • {item.category}
                          </p>
                          {item.clientName && (
                            <p className="text-xs text-blue-600">
                              Client: {item.clientName}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteMedia(item.id)}
                              className="p-1 text-gray-400 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex-shrink-0">
                          {getFileIcon(item.mimeType)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-sm font-medium text-gray-900">
                            {item.originalName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {formatFileSize(item.size)} • {item.category}
                            {item.clientName && ` • Client: ${item.clientName}`}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteMedia(item.id)}
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                  <div className="flex flex-1 justify-between sm:hidden">
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing page{" "}
                        <span className="font-medium">{currentPage}</span> of{" "}
                        <span className="font-medium">{totalPages}</span>
                      </p>
                    </div>
                    <div>
                      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                        <button
                          onClick={() =>
                            setCurrentPage(Math.max(1, currentPage - 1))
                          }
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
                        >
                          Previous
                        </button>
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map(page => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                              page === currentPage
                                ? "z-10 bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                        <button
                          onClick={() =>
                            setCurrentPage(
                              Math.min(totalPages, currentPage + 1)
                            )
                          }
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
                        >
                          Next
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Upload Modal */}
        <MediaUploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onSuccess={handleUploadSuccess}
        />
      </motion.div>
    </AdminLayout>
  );
}
