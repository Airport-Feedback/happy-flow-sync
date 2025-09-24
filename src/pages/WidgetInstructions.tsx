import { useState } from "react";
import { Copy, Check, Code, Settings, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

//
// Extracted IntegrationTabs component
//
function IntegrationTabs({
  htmlSnippet,
  javascriptSnippet,
  reactSnippet,
  typescriptSnippet,
  iframeCode,
  copyToClipboard,
  copied,
}: {
  htmlSnippet: string;
  javascriptSnippet: string;
  reactSnippet: string;
  typescriptSnippet: string;
  iframeCode: string;
  copyToClipboard: (text: string, type: string) => void;
  copied: string | null;
}) {
  const [tab, setTab] = useState("html");

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="html">HTML</TabsTrigger>
        <TabsTrigger value="javascript">JavaScript</TabsTrigger>
        <TabsTrigger value="react">React</TabsTrigger>
        <TabsTrigger value="typescript">TypeScript</TabsTrigger>
        <TabsTrigger value="iframe">iFrame</TabsTrigger>
      </TabsList>

      {/* HTML */}
      <TabsContent value="html" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Static HTML Website</CardTitle>
            <CardDescription>For traditional HTML websites</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>Complete HTML example with widget integration:</Label>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto max-h-80">
                  <code>{htmlSnippet}</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(htmlSnippet, "html")}
                >
                  {copied === "html" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* JavaScript */}
      <TabsContent value="javascript" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Vanilla JavaScript</CardTitle>
            <CardDescription>Dynamic loading with pure JavaScript</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>JavaScript function to dynamically load the widget:</Label>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto max-h-80">
                  <code>{javascriptSnippet}</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(javascriptSnippet, "javascript")}
                >
                  {copied === "javascript" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* React */}
      <TabsContent value="react" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>React / Next.js</CardTitle>
            <CardDescription>React hook and component implementation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>React hook and component for widget integration:</Label>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto max-h-80">
                  <code>{reactSnippet}</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(reactSnippet, "react")}
                >
                  {copied === "react" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* TypeScript */}
      <TabsContent value="typescript" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>TypeScript</CardTitle>
            <CardDescription>TypeScript implementation with type safety</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>TypeScript types and implementation:</Label>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto max-h-80">
                  <code>{typescriptSnippet}</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(typescriptSnippet, "typescript")}
                >
                  {copied === "typescript" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* iFrame */}
      <TabsContent value="iframe" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>iFrame Integration</CardTitle>
            <CardDescription>Direct iframe embed for maximum control</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>iFrame embed code:</Label>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{iframeCode}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(iframeCode, "iframe")}
                  >
                    {copied === "iframe" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800">Note:</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  The iframe approach gives you direct control but requires manual positioning.
                  The script tag method is recommended for most use cases.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

//
// Main WidgetInstructions component
//
const WidgetInstructions = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [position, setPosition] = useState("bottom-right");
  const [color, setColor] = useState("#365fb8");
  const [companyName, setCompanyName] = useState("Your Company");

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const currentUrl = window.location.origin + "/happy-flow-sync";

  const embedScript = `<script>
  window.FeedbackWidgetConfig = {
    position: '${position}',
    primaryColor: '${encodeURIComponent(color)}',
    companyName: '${companyName}',
    baseUrl: '${currentUrl}'
  };
</script>
<script src="${currentUrl}/embed.js"></script>`;

  const iframeCode = `<iframe 
  src="${currentUrl}/widget-export?position=${position}&color=${encodeURIComponent(color)}&company=${encodeURIComponent(
    companyName
  )}" 
  style="position: fixed; ${position.includes("bottom") ? "bottom: 16px;" : "top: 16px;"
    } ${position.includes("right") ? "right: 16px;" : "left: 16px;"} width: 100%; height: 100%; border: none; z-index: 999999; pointer-events: none; background: transparent;" 
  onload="this.style.pointerEvents='auto'">
</iframe>`;

  // full snippets
  const htmlSnippet = `<!DOCTYPE html>
<html>
  <head>
    <title>Feedback Widget Example</title>
  </head>
  <body>
    <h1>My Website</h1>
    <script>
      window.FeedbackWidgetConfig = {
        position: '${position}',
        primaryColor: '${color}',
        companyName: '${companyName}',
        baseUrl: '${currentUrl}'
      };
    </script>
    <script src="${currentUrl}/embed.js"></script>
  </body>
</html>`;

  const javascriptSnippet = `// Initialize Feedback Widget
(function() {
  const script = document.createElement('script');
  script.src = '${currentUrl}/embed.js';
  script.async = true;
  script.onload = function() {
    window.FeedbackWidgetConfig = {
      position: '${position}',
      primaryColor: '${color}',
      companyName: '${companyName}',
      baseUrl: '${currentUrl}'
    };
  };
  document.head.appendChild(script);
})();`;

  const reactSnippet = `// hooks/useFeedbackWidget.js
import { useEffect } from 'react';

export function useFeedbackWidget({ position = '${position}', color = '${color}', companyName = '${companyName}' }) {
  useEffect(() => {
    window.FeedbackWidgetConfig = {
      position,
      primaryColor: color,
      companyName,
      baseUrl: '${currentUrl}'
    };

    const script = document.createElement('script');
    script.src = '${currentUrl}/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [position, color, companyName]);
}

// usage in component
function MyApp() {
  useFeedbackWidget({});
  return <div>My App</div>;
}`;

  const typescriptSnippet = `// types/feedback-widget.d.ts
declare global {
  interface Window {
    FeedbackWidgetConfig?: {
      position: string;
      primaryColor: string;
      companyName: string;
      baseUrl: string;
    };
  }
}

// hooks/useFeedbackWidget.ts
import { useEffect } from 'react';

interface WidgetOptions {
  position?: string;
  color?: string;
  companyName?: string;
}

export function useFeedbackWidget({ 
  position = '${position}', 
  color = '${color}', 
  companyName = '${companyName}' 
}: WidgetOptions) {
  useEffect(() => {
    window.FeedbackWidgetConfig = {
      position,
      primaryColor: color,
      companyName,
      baseUrl: '${currentUrl}'
    };

    const script = document.createElement('script');
    script.src = '${currentUrl}/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [position, color, companyName]);
}`;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Feedback Widget Integration</h1>
          <p className="text-muted-foreground">
            Embed our feedback widget on your website to collect customer feedback seamlessly
          </p>
        </div>

        {/* Outer Tabs */}
        <Tabs defaultValue="configuration" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="configuration" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configuration & Preview
            </TabsTrigger>
            <TabsTrigger value="integration" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Integration Code
            </TabsTrigger>
          </TabsList>

          {/* Config Tab */}
          <TabsContent value="configuration">
            <Card>
              <CardHeader>
                <CardTitle>Widget Configuration</CardTitle>
                <CardDescription>Customize your widget settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>Position</Label>
                  <Select value={position} onValueChange={setPosition}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bottom-right">Bottom Right</SelectItem>
                      <SelectItem value="bottom-left">Bottom Left</SelectItem>
                      <SelectItem value="top-right">Top Right</SelectItem>
                      <SelectItem value="top-left">Top Left</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label>Primary Color</Label>
                  <div className="flex items-center gap-2">
                    <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-12 h-12 p-1" />
                    <Input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Company Name</Label>
                  <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integration Tab */}
          <TabsContent value="integration" className="space-y-6">
            {/* Quick Start */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Start - Script Tag (Recommended)</CardTitle>
                <CardDescription>The easiest way to add the widget</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{embedScript}</code>
                </pre>
              </CardContent>
            </Card>

            {/* Platform-Specific Integration */}
            <IntegrationTabs
              htmlSnippet={htmlSnippet}
              javascriptSnippet={javascriptSnippet}
              reactSnippet={reactSnippet}
              typescriptSnippet={typescriptSnippet}
              iframeCode={iframeCode}
              copyToClipboard={copyToClipboard}
              copied={copied}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WidgetInstructions;
