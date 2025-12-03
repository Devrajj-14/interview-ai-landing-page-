import React from "react";
import { EmployerVerification } from "@/lib/db";

interface AdminCardProps {
  employer: EmployerVerification;
}

export default function AdminCard({ employer }: AdminCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{employer.fullName}</h3>
          <p className="text-gray-600">{employer.companyName}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            employer.isVerified
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {employer.isVerified ? "Verified" : "Pending"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Email</p>
          <p className="text-gray-900">{employer.companyEmail}</p>
        </div>
        <div>
          <p className="text-gray-500">Role</p>
          <p className="text-gray-900">{employer.roleHiringFor}</p>
        </div>
        <div>
          <p className="text-gray-500">Location</p>
          <p className="text-gray-900">{employer.jobLocation}</p>
        </div>
        <div>
          <p className="text-gray-500">Salary Range</p>
          <p className="text-gray-900">{employer.salaryRange}</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-500">Address</p>
          <p className="text-gray-900">{employer.companyAddress}</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-500">Token</p>
          <p className="text-gray-900 font-mono text-xs break-all">{employer.token}</p>
        </div>
      </div>

      {employer.idProofUrl && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <a
            href={employer.idProofUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download ID Proof
          </a>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        Submitted: {new Date(employer.createdAt || "").toLocaleString()}
      </div>
    </div>
  );
}
