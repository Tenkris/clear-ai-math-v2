"use client";

import type React from "react";

import { useState } from "react";
import { Upload, ImageIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface UploadResponse {
  success: boolean;
  message: string;
  question_id: string;
  response_time: number;
}

export function UploadArea() {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "http://localhost:8000/api/v1/upload/upload?language=english",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data: UploadResponse = await response.json();

      if (data.success && data.question_id) {
        // Navigate to solution page with question_id
        router.push(`/solution/${data.question_id}`);
      } else {
        throw new Error(data.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Please try again.");
      setIsUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  if (isUploading) {
    return (
      <div className="mt-6 border-2 border-dashed border-emerald-300 bg-emerald-50 rounded-xl p-12 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-emerald-100 p-6 rounded-full mb-6">
            <Loader2 className="h-12 w-12 text-emerald-600 animate-spin" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Processing Your Math Problem
          </h3>
          <p className="text-gray-700">
            Our AI is analyzing your image and preparing the solution...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`mt-6 border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
        isDragging ? "border-emerald-500 bg-emerald-50" : "border-gray-300"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="bg-emerald-100 p-6 rounded-full mb-6">
          <ImageIcon className="h-12 w-12 text-emerald-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Upload Your Math Problem
        </h3>
        <p className="text-gray-700 mb-2">
          Upload an image of your math problem to get instant solutions
        </p>
        <p className="text-gray-500 text-sm mb-6">
          Supported formats: JPG, PNG, GIF
        </p>

        <label className="px-8 py-3 bg-emerald-600 text-white rounded-md font-medium hover:bg-emerald-700 cursor-pointer flex items-center justify-center gap-2 transition-colors">
          <Upload className="h-5 w-5" />
          Upload Image
          <input
            type="file"
            className="sr-only"
            accept="image/*"
            onChange={handleFileSelect}
          />
        </label>
      </div>
    </div>
  );
}
