import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    toast.success("Account created! Redirecting...");
    navigate("/admin");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-sm space-y-5 rounded-xl border bg-card p-8 shadow-sm"
      >
        <h1 className="font-display text-xl font-medium text-foreground text-center">
          Create Admin Account
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
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-full bg-foreground py-3 font-sans text-sm font-medium text-background transition-transform active:scale-[0.97] disabled:opacity-50"
        >
          {loading ? "Creating…" : "Create Account"}
        </button>
        <p className="text-center font-sans text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary underline underline-offset-2">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
