export interface Media {
  id: string;
  title: string;
  description: string;
  author: string;
  source: string;
  type: 'image' | 'video';
  filename: string;
  originalFilename: string;
  uploadDate: string;
  tags: string[];
  status: 'pending' | 'approved' | 'rejected';
}
