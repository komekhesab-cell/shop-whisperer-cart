import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async () => {
  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Check if admin already exists
  const { data: users } = await supabaseAdmin.auth.admin.listUsers();
  const exists = users?.users?.some(u => u.email === "developer.ramin@gmail.com");
  
  if (exists) {
    return new Response(JSON.stringify({ message: "Admin already exists" }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const { error } = await supabaseAdmin.auth.admin.createUser({
    email: "developer.ramin@gmail.com",
    password: "ARlonix9",
    email_confirm: true,
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }

  return new Response(JSON.stringify({ message: "Admin created" }), {
    headers: { "Content-Type": "application/json" },
  });
});
