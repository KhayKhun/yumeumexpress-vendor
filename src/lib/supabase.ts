import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://cuwgzhmuoktlapqmmspk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1d2d6aG11b2t0bGFwcW1tc3BrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5NDY3MzEsImV4cCI6MjAwOTUyMjczMX0.mZw55QbxiPja6tKhrMu0rpEEyVGSkr99j8amQist6vE";
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;