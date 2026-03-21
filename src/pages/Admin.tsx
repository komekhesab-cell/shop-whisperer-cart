import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, X, Upload, ArrowLeft, ImageIcon, LogOut } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import type { Product } from "@/data/products";
import { toast } from "sonner";

interface ProductForm {
  name: string;
  price: string;
  description: string;
  details: string;
  category: string;
  image: string;
}

const emptyForm: ProductForm = {
  name: "",
  price: "",
  description: "",
  details: "",
  category: "",
  image: "",
};

export default function Admin() {
  const { user, loading: authLoading, signOut } = useAuth();
  const { data: products = [], isLoading } = useProducts();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isOpen = creating || !!editing;

  const openCreate = () => {
    setForm(emptyForm);
    setEditing(null);
    setCreating(true);
  };

  const openEdit = (p: Product) => {
    setForm({
      name: p.name,
      price: String(p.price),
      description: p.description,
      details: p.details.join("\n"),
      category: p.category,
      image: p.image,
    });
    setEditing(p);
    setCreating(false);
  };

  const close = () => {
    setCreating(false);
    setEditing(null);
    setForm(emptyForm);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage
      .from("product-images")
      .upload(path, file, { upsert: true });
    if (error) {
      toast.error("Upload failed: " + error.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    setForm((f) => ({ ...f, image: data.publicUrl }));
    setUploading(false);
    toast.success("Image uploaded");
  };

  const handleSave = async () => {
    if (!form.name || !form.price) {
      toast.error("Name and price are required");
      return;
    }
    setSaving(true);
    const payload = {
      name: form.name,
      price: parseFloat(form.price),
      description: form.description,
      details: form.details.split("\n").filter(Boolean),
      category: form.category,
      image: form.image,
    };

    if (editing) {
      const { error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", editing.id);
      if (error) {
        toast.error("Failed to update: " + error.message);
        setSaving(false);
        return;
      }
      toast.success("Product updated");
    } else {
      const { error } = await supabase.from("products").insert(payload);
      if (error) {
        toast.error("Failed to create: " + error.message);
        setSaving(false);
        return;
      }
      toast.success("Product created");
    }
    queryClient.invalidateQueries({ queryKey: ["products"] });
    close();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete: " + error.message);
      return;
    }
    toast.success("Product deleted");
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  const setField = (key: keyof ProductForm, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex h-8 w-8 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:bg-muted active:scale-[0.95]"
              aria-label="Back to store"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="font-display text-xl font-medium text-foreground">
              Manage Products
            </h1>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 rounded-full bg-foreground px-4 py-2 font-sans text-sm font-medium text-background transition-transform active:scale-[0.97]"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </button>
        </div>
      </header>

      {/* Product list */}
      <main className="container mx-auto px-4 py-8 sm:px-8">
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <ImageIcon className="mb-3 h-12 w-12 text-muted-foreground/30" />
            <p className="font-sans text-muted-foreground">No products yet</p>
            <button
              onClick={openCreate}
              className="mt-4 font-sans text-sm font-medium text-primary underline underline-offset-4"
            >
              Add your first product
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md"
              >
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-48 items-center justify-center bg-muted">
                    <ImageIcon className="h-10 w-10 text-muted-foreground/30" />
                  </div>
                )}
                <div className="p-4">
                  <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
                    {p.category}
                  </span>
                  <h3 className="mt-1 font-sans text-sm font-medium text-foreground">
                    {p.name}
                  </h3>
                  <p className="font-sans text-sm tabular-nums text-muted-foreground">
                    ${p.price}
                  </p>
                </div>
                <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => openEdit(p)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-background shadow-md transition-transform active:scale-[0.95]"
                    aria-label="Edit"
                  >
                    <Pencil className="h-3.5 w-3.5 text-foreground" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-background shadow-md transition-transform active:scale-[0.95]"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-foreground/40 animate-fade-in" onClick={close} />
          <div className="relative z-10 mx-4 w-full max-w-lg rounded-xl bg-card p-6 shadow-2xl animate-reveal-up sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-lg font-medium text-foreground">
                {editing ? "Edit Product" : "New Product"}
              </h2>
              <button
                onClick={close}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-muted active:scale-[0.95]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block font-sans text-xs font-medium text-muted-foreground">
                  Name *
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  className="w-full rounded-lg border bg-background px-3 py-2 font-sans text-sm text-foreground outline-none transition-colors focus:ring-2 focus:ring-ring"
                  placeholder="Product name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block font-sans text-xs font-medium text-muted-foreground">
                    Price *
                  </label>
                  <input
                    value={form.price}
                    onChange={(e) => setField("price", e.target.value)}
                    type="number"
                    step="0.01"
                    className="w-full rounded-lg border bg-background px-3 py-2 font-sans text-sm text-foreground outline-none transition-colors focus:ring-2 focus:ring-ring"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-sans text-xs font-medium text-muted-foreground">
                    Category
                  </label>
                  <input
                    value={form.category}
                    onChange={(e) => setField("category", e.target.value)}
                    className="w-full rounded-lg border bg-background px-3 py-2 font-sans text-sm text-foreground outline-none transition-colors focus:ring-2 focus:ring-ring"
                    placeholder="e.g. Tops"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-sans text-xs font-medium text-muted-foreground">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setField("description", e.target.value)}
                  rows={2}
                  className="w-full rounded-lg border bg-background px-3 py-2 font-sans text-sm text-foreground outline-none transition-colors focus:ring-2 focus:ring-ring"
                  placeholder="Short description"
                />
              </div>

              <div>
                <label className="mb-1 block font-sans text-xs font-medium text-muted-foreground">
                  Details (one per line)
                </label>
                <textarea
                  value={form.details}
                  onChange={(e) => setField("details", e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border bg-background px-3 py-2 font-sans text-sm text-foreground outline-none transition-colors focus:ring-2 focus:ring-ring"
                  placeholder={"100% cotton\nMachine washable"}
                />
              </div>

              <div>
                <label className="mb-1 block font-sans text-xs font-medium text-muted-foreground">
                  Image
                </label>
                <div className="flex items-center gap-3">
                  {form.image ? (
                    <img
                      src={form.image}
                      alt="Preview"
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
                      <ImageIcon className="h-6 w-6 text-muted-foreground/30" />
                    </div>
                  )}
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 font-sans text-sm text-muted-foreground transition-colors hover:bg-muted active:scale-[0.97]">
                    <Upload className="h-4 w-4" />
                    {uploading ? "Uploading…" : "Upload photo"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
                <input
                  value={form.image}
                  onChange={(e) => setField("image", e.target.value)}
                  className="mt-2 w-full rounded-lg border bg-background px-3 py-2 font-sans text-xs text-muted-foreground outline-none transition-colors focus:ring-2 focus:ring-ring"
                  placeholder="Or paste an image URL"
                />
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="mt-6 flex w-full items-center justify-center rounded-full bg-foreground py-3 font-sans text-sm font-medium text-background transition-transform active:scale-[0.97] disabled:opacity-50"
            >
              {saving ? "Saving…" : editing ? "Update Product" : "Create Product"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
