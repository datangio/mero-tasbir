'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import MDEditor to avoid SSR issues
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] border border-gray-300 rounded-md flex items-center justify-center text-gray-500">
      Loading rich text editor...
    </div>
  )
});

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder = 'Enter text...' }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[300px] border border-gray-300 rounded-md flex items-center justify-center text-gray-500">
        Loading rich text editor...
      </div>
    );
  }

  return (
    <div className="border border-gray-300 rounded-md md-editor-container">
      <style jsx global>{`
        .md-editor-container .w-md-editor {
          border: none !important;
          border-radius: 0.375rem !important;
        }
        .md-editor-container .w-md-editor-toolbar {
          border: none !important;
          border-bottom: 1px solid #e5e7eb !important;
          border-radius: 0.375rem 0.375rem 0 0 !important;
          background-color: #f9fafb !important;
        }
        .md-editor-container .w-md-editor-text {
          min-height: 300px !important;
          font-size: 14px !important;
        }
        .md-editor-container .w-md-editor-text-textarea {
          padding: 12px !important;
          text-align: left !important;
          direction: ltr !important;
        }
        .md-editor-container .w-md-editor-text-textarea::placeholder {
          color: #9ca3af;
          font-style: italic;
        }
        .md-editor-container .w-md-editor-preview {
          padding: 12px !important;
          text-align: left !important;
          direction: ltr !important;
        }
      `}</style>
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || '')}
        placeholder={placeholder}
        height={300}
        data-color-mode="light"
        hideToolbar={false}
        visibleDragBar={false}
        preview="edit"
      />
    </div>
  );
};

export default RichTextEditor;
