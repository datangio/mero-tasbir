export interface Media {
  id: string;
  title: string;
  filename?: string;
  originalName?: string;
  mimeType?: string;
  size?: number;
  url: string;
  thumbnailUrl?: string;
  type?: string;
  category: string;
  clientName?: string;
  description?: string;
  tags: string[];
  price?: number;
  likes: number;
  views: number;
  sales: number;
  totalEarnings: number;
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
  title: string;
  filename?: string;
  originalName?: string;
  mimeType?: string;
  size?: number;
  url: string;
  thumbnailUrl?: string;
  type?: string;
  category: string;
  clientName?: string;
  description?: string;
  tags?: string[];
  price?: number;
  uploadedBy?: string;
}

export interface UpdateMediaData {
  title?: string;
  category?: string;
  clientName?: string;
  description?: string;
  tags?: string[];
  price?: number;
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






























