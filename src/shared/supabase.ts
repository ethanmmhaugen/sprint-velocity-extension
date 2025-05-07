import { createClient } from "@supabase/supabase-js";

// These should be set in your environment variables
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
	console.error(
		"Missing Supabase configuration. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables."
	);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
