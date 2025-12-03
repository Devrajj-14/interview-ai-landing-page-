import React from "react";

interface FormWrapperProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export default function FormWrapper({ children, title, description }: FormWrapperProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          {description && (
            <p className="text-gray-600 mb-6">{description}</p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
