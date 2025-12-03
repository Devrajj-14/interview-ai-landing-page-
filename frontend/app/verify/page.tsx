"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FormWrapper from "@/mail-components/FormWrapper";
import Button from "@/mail-components/Button";
import Toast from "@/mail-components/Toast";
import { EmployerVerification } from "@/lib/db";

function VerifyContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [employer, setEmployer] = useState<EmployerVerification | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`/api/verify?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEmployer(data.employer);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [token]);

  async function handleFileUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!selectedFile || !token) {
      setToast({ message: "Please select a file", type: "error" });
      return;
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];
    if (!allowedTypes.includes(selectedFile.type)) {
      setToast({
        message: "Only PNG, JPG, and PDF files are allowed",
        type: "error",
      });
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setToast({ message: "File size must be less than 10MB", type: "error" });
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("token", token);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setToast({
          message: "ID proof uploaded successfully! Verification complete.",
          type: "success",
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        setToast({
          message: result.error || "Upload failed",
          type: "error",
        });
      }
    } catch (error) {
      setToast({ message: "Upload failed. Please try again.", type: "error" });
    } finally {
      setUploading(false);
    }
  }

  if (loading) {
    return (
      <FormWrapper title="Loading..." description="Please wait">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </FormWrapper>
    );
  }

  if (!token || !employer) {
    return (
      <FormWrapper
        title="Invalid Link"
        description="The verification link is invalid or has expired"
      >
        <div className="text-center py-8">
          <p className="text-gray-600 mb-6">
            Please check your email for the correct verification link.
          </p>
          <a
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Go Home
          </a>
        </div>
      </FormWrapper>
    );
  }

  if (employer.isVerified) {
    return (
      <FormWrapper
        title="Already Verified"
        description="This employer has already been verified"
      >
        <div className="text-center py-8">
          <div className="text-6xl mb-4">✅</div>
          <p className="text-gray-600 mb-6">
            Your verification is complete. Thank you!
          </p>
          <a
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Go Home
          </a>
        </div>
      </FormWrapper>
    );
  }

  return (
    <>
      <FormWrapper
        title="Upload Company ID Proof"
        description="Complete your verification by uploading your company ID"
      >
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">Company Details</h3>
          <div className="text-sm text-blue-800 space-y-1">
            <p><strong>Name:</strong> {employer.fullName}</p>
            <p><strong>Company:</strong> {employer.companyName}</p>
            <p><strong>Role:</strong> {employer.roleHiringFor}</p>
            <p><strong>Location:</strong> {employer.jobLocation}</p>
          </div>
        </div>

        <form onSubmit={handleFileUpload}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Company ID Proof (PNG, JPG, or PDF)
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.pdf"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
            {selectedFile && (
              <p className="text-sm text-gray-600 mt-2">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          <Button type="submit" loading={uploading} className="w-full">
            Upload & Complete Verification
          </Button>
        </form>
      </FormWrapper>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <FormWrapper title="Loading..." description="Please wait">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </FormWrapper>
    }>
      <VerifyContent />
    </Suspense>
  );
}
