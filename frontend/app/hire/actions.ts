"use server";

import { createEmployerVerification } from "@/lib/db";
import { generateToken } from "@/lib/tokens";
import { resend } from "@/lib/resend";

export async function submitEmployerForm(formData: FormData) {
  try {
    const fullName = formData.get("fullName") as string;
    const companyName = formData.get("companyName") as string;
    const companyEmail = formData.get("companyEmail") as string;
    const companyAddress = formData.get("companyAddress") as string;
    const roleHiringFor = formData.get("roleHiringFor") as string;
    const salaryRange = formData.get("salaryRange") as string;
    const jobLocation = formData.get("jobLocation") as string;

    if (!fullName || !companyName || !companyEmail || !companyAddress || !roleHiringFor || !salaryRange || !jobLocation) {
      return { success: false, error: "All fields are required" };
    }

    const token = generateToken();

    await createEmployerVerification({
      fullName,
      companyName,
      companyEmail,
      companyAddress,
      roleHiringFor,
      salaryRange,
      jobLocation,
      token,
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : "http://localhost:3001";
    const verificationLink = `${baseUrl}/verify?token=${token}`;

    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    console.log("Attempting to send email to:", companyEmail);
    console.log("Using base URL:", baseUrl);
    console.log("From email:", fromEmail);
    
    const emailResult = await resend.emails.send({
      from: fromEmail,
      to: companyEmail,
      subject: "Verify Your Employer Identity",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Employer Verification</h1>
              </div>
              <div class="content">
                <p>Hello <strong>${fullName}</strong>,</p>
                
                <p>Thanks for sharing your hiring details for <strong>${roleHiringFor}</strong> at <strong>${companyName}</strong>.</p>
                
                <p>To complete identity verification, please upload your company ID using the secure link below:</p>
                
                <div style="text-align: center;">
                  <a href="${verificationLink}" class="button">Verify Identity</a>
                </div>
                
                <p>Or copy and paste this link into your browser:</p>
                <p style="word-break: break-all; background: #fff; padding: 10px; border-radius: 5px;">${verificationLink}</p>
                
                <p>This link is unique to your submission and should not be shared.</p>
                
                <p>Best regards,<br>Employer Verification Team</p>
              </div>
              <div class="footer">
                <p>This is an automated email. Please do not reply.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResult);

    return { success: true };
  } catch (error: any) {
    console.error("Error submitting form:", error);
    return { success: false, error: error.message || "Failed to submit form" };
  }
}
