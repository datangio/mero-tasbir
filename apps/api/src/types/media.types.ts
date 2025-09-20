export interface Media {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  category: MediaCategory;
  clientName?: string;
  description?: string;
  tags: string[];
  isActive: boolean;
  uploadedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum MediaCategory {
  HOW_IT_WORKS = 'HOW_IT_WORKS',
  CLIENT_PORTFOLIO = 'CLIENT_PORTFOLIO',
  GALLERY = 'GALLERY'
}

export interface CreateMediaData {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  category: MediaCategory;
  clientName?: string;
  description?: string;
  tags?: string[];
  uploadedBy?: string;
}

export interface UpdateMediaData {
  category?: MediaCategory;
  clientName?: string;
  description?: string;
  tags?: string[];
  isActive?: boolean;
}

export interface MediaUploadRequest {
  files: File[];
  category: string;
  clientName?: string;
  description?: string;
  tags?: string[];
}

export interface MediaResponse {
  success: boolean;
  message: string;
  data?: Media | Media[];
  error?: string;
}




