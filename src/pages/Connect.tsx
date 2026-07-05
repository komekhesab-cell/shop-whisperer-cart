import { useState } from "react";
import { Link } from "react-router-dom";
import { Copy, Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const mcpUrl = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/mcp`;

export default function Connect() {
  const [copied, setCopied] = useState(false);

  const copyUrl = async () => {
    await navigator.clipboard.writeText(mcpUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to store
        </Link>

        <h1 className="mb-2 text-3xl font-bold tracking-tight">Connect an AI assistant</h1>
        <p className="mb-8 text-muted-foreground">
          Give ChatGPT or Claude access to browse the BrendSport catalog by adding this MCP server.
        </p>

        <Card className="mb-8 p-4">
          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            MCP server URL
          </div>
          <div className="flex items-center gap-2">
            <code className="flex-1 overflow-x-auto rounded-md bg-muted px-3 py-2 text-sm">
              {mcpUrl}
            </code>
            <Button size="sm" variant="outline" onClick={copyUrl}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span className="ml-2">{copied ? "Copied" : "Copy"}</span>
            </Button>
          </div>
        </Card>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">ChatGPT</h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed">
            <li>
              Open{" "}
              <a
                href="https://chatgpt.com/#settings/Connectors/Advanced"
                target="_blank"
                rel="noreferrer"
                className="text-primary underline"
              >
                ChatGPT Connectors → Advanced
              </a>{" "}
              and enable Developer mode (read the risk notice shown there).
            </li>
            <li>In the chat composer's "+" menu, turn on Developer mode.</li>
            <li>Click "Add sources", then "Connect more".</li>
            <li>Name the connector "BrendSport" and paste the MCP URL above.</li>
            <li>Ask ChatGPT to browse the store — for example, "Show me sport shoes under $100".</li>
          </ol>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Claude</h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed">
            <li>
              Open{" "}
              <a
                href="https://claude.ai/customize/connectors?modal=add-custom-connector"
                target="_blank"
                rel="noreferrer"
                className="text-primary underline"
              >
                Claude custom connectors
              </a>
              .
            </li>
            <li>Name the connector "BrendSport" and paste the MCP URL above.</li>
            <li>Enable the connector from the chat composer, then ask Claude to search the catalog.</li>
          </ol>
        </section>
      </div>
    </main>
  );
}
