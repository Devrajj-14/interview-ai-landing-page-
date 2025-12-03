-- Create the EmployerVerification table
CREATE TABLE IF NOT EXISTS "EmployerVerification" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "fullName" TEXT NOT NULL,
  "companyName" TEXT NOT NULL,
  "companyEmail" TEXT NOT NULL,
  "companyAddress" TEXT NOT NULL,
  "roleHiringFor" TEXT NOT NULL,
  "salaryRange" TEXT NOT NULL,
  "jobLocation" TEXT NOT NULL,
  "token" TEXT NOT NULL UNIQUE,
  "isVerified" BOOLEAN DEFAULT false,
  "idProofUrl" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Create index on token for faster lookups
CREATE INDEX IF NOT EXISTS idx_employer_token ON "EmployerVerification"("token");

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_employer_email ON "EmployerVerification"("companyEmail");
