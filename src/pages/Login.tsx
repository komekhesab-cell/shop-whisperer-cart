import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    toast.success("Logged in!");
    navigate("/admin");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm space-y-5 rounded-xl border bg-card p-8 shadow-sm"
      >
        <h1 className="font-display text-xl font-medium text-foreground text-center">
          Admin Login
        </h1>
        <div>
          <label className="mb-1 block font-sans text-xs font-medium text-muted-foreground">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2 font-sans text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            placeholder="admin@example.com"
          />
        </div>
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
