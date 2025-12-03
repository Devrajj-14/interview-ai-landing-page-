"use client";

import { useState } from "react";
import FormWrapper from "@/mail-components/FormWrapper";
import Input from "@/mail-components/Input";
import Button from "@/mail-components/Button";
import Toast from "@/mail-components/Toast";
import { submitEmployerForm } from "./actions";

export default function HirePage() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await submitEmployerForm(formData);

    setLoading(false);

    if (result.success) {
      setToast({
        message: "Verification link sent to company email! Please check your inbox.",
        type: "success",
      });
      (e.target as HTMLFormElement).reset();
    } else {
      setToast({
        message: result.error || "Failed to submit form",
        type: "error",
      });
    }
  }

  return (
    <>
      <FormWrapper
        title="Employer Verification"
        description="Submit your company details to start the verification process"
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            name="fullName"
            type="text"
            required
            placeholder="John Doe"
          />

          <Input
            label="Company Name"
            name="companyName"
            type="text"
            required
            placeholder="Acme Corporation"
          />

          <Input
            label="Company Email"
            name="companyEmail"
            type="email"
            required
            placeholder="hr@company.com"
          />

          <Input
            label="Company Address"
            name="companyAddress"
            type="text"
            required
            placeholder="123 Business St, City, State"
          />

          <Input
            label="Role Hiring For"
            name="roleHiringFor"
            type="text"
            required
            placeholder="Senior Software Engineer"
          />

          <Input
            label="Salary Range"
            name="salaryRange"
            type="text"
            required
            placeholder="$80,000 - $120,000"
          />

          <Input
            label="Job Location"
            name="jobLocation"
            type="text"
            required
            placeholder="Remote / New York, NY"
          />

          <Button type="submit" loading={loading} className="w-full mt-4">
            Submit & Send Verification Email
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
