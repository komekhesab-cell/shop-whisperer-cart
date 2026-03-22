import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ADMIN_EMAIL = "developer.ramin@gmail.com";

export default function Login() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      toast.error("Please enter the password");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password,
    });
    if (error) {
      toast.error("Wrong password");
      setLoading(false);
      return;
    }
    toast.success("Welcome, Admin!");
    navigate("/admin");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm space-y-5 rounded-xl border bg-card p-8 shadow-sm"
      >
        <h1 className="font-display text-xl font-medium text-foreground text-center">
          Admin Access
        </h1>
        <div>
          <label className="mb-1 block font-sans text-xs font-medium text-muted-foreground">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2 font-sans text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-full bg-foreground py-3 font-sans text-sm font-medium text-background transition-transform active:scale-[0.97] disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
