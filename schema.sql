-- NPS 2026 Registration Table Schema for Supabase

-- Create the registrations table
CREATE TABLE IF NOT EXISTS registrations (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    full_name TEXT NOT NULL,
    place_of_work TEXT,
    department TEXT,
    designation TEXT,
    phone_number TEXT,
    email TEXT NOT NULL UNIQUE,
    years_to_retirement TEXT,
    retirement_policies TEXT,
    investment_advisory TEXT,
    digital_skillset TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert (for public registration)
CREATE POLICY "Allow public inserts" ON registrations
    FOR INSERT
    WITH CHECK (true);

-- Create a policy that allows authenticated users to view their own records
CREATE POLICY "Allow users to view own records" ON registrations
    FOR SELECT
    USING (auth.uid()::text = email OR auth.role() = 'service_role');

-- Optional: Create a policy for admins to view all records (uncomment if needed)
-- CREATE POLICY "Allow admins to view all" ON registrations
--     FOR ALL
--     USING (auth.jwt() ->> 'role' = 'admin');

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to call the function on update
CREATE TRIGGER update_registrations_updated_at
    BEFORE UPDATE ON registrations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
