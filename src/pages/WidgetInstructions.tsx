import { useState } from "react";
import { Copy, Check, Code, Settings, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const WidgetInstructions = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [position, setPosition] = useState("bottom-right");
  const [color, setColor] = useState("#365fb8");
  const [companyName, setCompanyName] = useState("Your Company");
  const [integrationTab, setIntegrationTab] = useState("typescript");
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const currentUrl = window.location.origin + '/happy-flow-sync';

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
  src="${currentUrl}/widget-export?position=${position}&color=${encodeURIComponent(color)}&company=${encodeURIComponent(companyName)}" 
  style="position: fixed; ${position.includes('bottom') ? 'bottom: 16px;' : 'top: 16px;'} ${position.includes('right') ? 'right: 16px;' : 'left: 16px;'} width: 100%; height: 100%; border: none; z-index: 999999; pointer-events: none; background: transparent;" 
  onload="this.style.pointerEvents='auto'">
</iframe>`;

  const htmlSnippet = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Website</title>
</head>
<body>
    <!-- Your website content -->
    
    <!-- Feedback Widget Integration -->
    ${embedScript}
</body>
</html>`;

  const javascriptSnippet = `// Initialize Feedback Widget
function initFeedbackWidget() {
  // Set configuration
  window.FeedbackWidgetConfig = {
    position: '${position}',
    primaryColor: '${color}',
    companyName: '${companyName}',
    baseUrl: '${currentUrl}'
  };

  // Create and load script
  const script = document.createElement('script');
  script.src = '${currentUrl}/embed.js';
  script.onload = function() {
    console.log('Feedback widget loaded successfully');
  };
  script.onerror = function() {
    console.error('Failed to load feedback widget');
  };
  
  document.body.appendChild(script);
}

// Load widget when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFeedbackWidget);
} else {
  initFeedbackWidget();
}`;

  const reactSnippet = `// hooks/useFeedbackWidget.js
import { useEffect } from 'react';

export const useFeedbackWidget = (config = {}) => {
  useEffect(() => {
    // Set global configuration
    window.FeedbackWidgetConfig = {
      position: '${position}',
      primaryColor: '${color}',
      companyName: '${companyName}',
      baseUrl: '${currentUrl}',
      ...config // Allow overriding default config
    };

    // Load script
    const script = document.createElement('script');
    script.src = '${currentUrl}/embed.js';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      // Remove widget iframe if exists
      const iframe = document.querySelector('iframe[src*="widget-export"]');
      if (iframe) iframe.remove();
      
      // Remove script
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      
      // Clean up global config
      delete window.FeedbackWidgetConfig;
    };
  }, [config]);
};

// components/FeedbackWidget.jsx
import { useFeedbackWidget } from '../hooks/useFeedbackWidget';

const FeedbackWidget = ({ config }) => {
  useFeedbackWidget(config);
  return null; // This component doesn't render anything
};

export default FeedbackWidget;

// Usage in your app:
// import FeedbackWidget from './components/FeedbackWidget';
// 
// function App() {
//   return (
//     <div>
//       {/* Your app content */}
//       <FeedbackWidget />
//     </div>
//   );
// }`;

  const typescriptSnippet = `// types/feedback-widget.d.ts
declare global {
  interface Window {
    FeedbackWidgetConfig?: {
      position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
      primaryColor?: string;
      companyName?: string;
      baseUrl?: string;
    };
  }
}

export {};

// hooks/useFeedbackWidget.ts
import { useEffect } from 'react';

interface FeedbackWidgetConfig {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  primaryColor?: string;
  companyName?: string;
  baseUrl?: string;
}

export const useFeedbackWidget = (config: FeedbackWidgetConfig = {}) => {
  useEffect(() => {
    // Set global configuration with type safety
    window.FeedbackWidgetConfig = {
      position: '${position}',
      primaryColor: '${color}',
      companyName: '${companyName}',
      baseUrl: '${currentUrl}',
      ...config
    };

    // Load script with error handling
    const script = document.createElement('script');
    script.src = '${currentUrl}/embed.js';
    script.async = true;
    
    const handleLoad = () => {
      console.log('Feedback widget loaded successfully');
    };
    
    const handleError = () => {
      console.error('Failed to load feedback widget');
    };
    
    script.addEventListener('load', handleLoad);
    script.addEventListener('error', handleError);
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
      
      const iframe = document.querySelector('iframe[src*="widget-export"]') as HTMLIFrameElement;
      if (iframe) iframe.remove();
      
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      
      delete window.FeedbackWidgetConfig;
    };
  }, [config]);
};

// components/FeedbackWidget.tsx
import React from 'react';
import { useFeedbackWidget } from '../hooks/useFeedbackWidget';

interface Props {
  config?: FeedbackWidgetConfig;
}

const FeedbackWidget: React.FC<Props> = ({ config }) => {
  useFeedbackWidget(config);
  return null;
};

export default FeedbackWidget;`;

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

        {/* Main Tabs */}
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

          <TabsContent value="configuration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Widget Configuration
                </CardTitle>
                <CardDescription>
                  Customize your widget settings and see the live preview
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Select value={position} onValueChange={setPosition}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bottom-right">Bottom Right</SelectItem>
                        <SelectItem value="bottom-left">Bottom Left</SelectItem>
                        <SelectItem value="top-right">Top Right</SelectItem>
                        <SelectItem value="top-left">Top Left</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="color">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-12 h-10 p-1 border rounded"
                      />
                      <Input
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        placeholder="#365fb8"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="font-semibold mb-2">Live Preview:</h4>
                  <div className="relative bg-gray-100 rounded-lg h-64 overflow-hidden">
                    <iframe
                      src={`${currentUrl}/widget?position=${position}&color=${encodeURIComponent(color)}&company=${encodeURIComponent(companyName)}`}
                      className="w-full h-full border-none"
                      title="Widget Preview"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integration" className="space-y-6">
            {/* Quick Start */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Start - Script Tag (Recommended)</CardTitle>
                <CardDescription>
                  The easiest way to add the feedback widget to any website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Add this code before the closing &lt;/body&gt; tag:</Label>
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{embedScript}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(embedScript, 'script')}
                    >
                      {copied === 'script' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Platform-Specific Integration */}
            <Tabs defaultValue={integrationTab} onValueChange={(v) => { console.log("inner tab changed:", v); setIntegrationTab(v); console.log("Integration tab changed:", integrationTab); }} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="html">HTML</TabsTrigger>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="react">React</TabsTrigger>
                <TabsTrigger value="typescript">TypeScript</TabsTrigger>
                <TabsTrigger value="iframe">iFrame</TabsTrigger>
              </TabsList>

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
                          onClick={() => copyToClipboard(htmlSnippet, 'html')}
                        >
                          {copied === 'html' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

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
                          onClick={() => copyToClipboard(javascriptSnippet, 'javascript')}
                        >
                          {copied === 'javascript' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

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
                          onClick={() => copyToClipboard(reactSnippet, 'react')}
                        >
                          {copied === 'react' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

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
                          onClick={() => copyToClipboard(typescriptSnippet, 'typescript')}
                        >
                          {copied === 'typescript' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

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
                            onClick={() => copyToClipboard(iframeCode, 'iframe')}
                          >
                            {copied === 'iframe' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
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
          </TabsContent>
        </Tabs>

        {/* Documentation */}
        <Card>
          <CardHeader>
            <CardTitle>Configuration Options</CardTitle>
            <CardDescription>Available configuration parameters for the widget</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Position Options</h4>
                <div className="space-y-2">
                  <Badge variant="outline">bottom-right</Badge> (default)
                  <Badge variant="outline">bottom-left</Badge>
                  <Badge variant="outline">top-right</Badge>
                  <Badge variant="outline">top-left</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Customization</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong>primaryColor:</strong> Widget primary color (hex)</li>
                  <li>• <strong>companyName:</strong> Your company name</li>
                  <li>• <strong>position:</strong> Widget position on screen</li>
                  <li>• <strong>baseUrl:</strong> API endpoint (auto-configured)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Collection */}
        <Card>
          <CardHeader>
            <CardTitle>Data Collection & Privacy</CardTitle>
            <CardDescription>What data is collected and how it's handled</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-4">
                <h4 className="font-semibold">Collected Data:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• User feedback rating (1-5 stars or emoji)</li>
                  <li>• Optional text comments</li>
                  <li>• Timestamp of submission</li>
                  <li>• Page URL where feedback was given</li>
                  <li>• Basic browser information (user agent)</li>
                  <li>• Source information (embedded widget)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Privacy Features:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• No personal information collected without consent</li>
                  <li>• Data stored securely with encryption</li>
                  <li>• GDPR compliant data handling</li>
                  <li>• Option to delete collected data</li>
                  <li>• Offline support with local storage fallback</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <div className="text-center space-y-4 p-6 bg-muted/50 rounded-lg">
          <h3 className="text-xl font-semibold">Need Help?</h3>
          <p className="text-muted-foreground">
            If you encounter any issues or need customization, please contact our support team.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" asChild>
              <a href={`${currentUrl}/dashboard`}>View Dashboard</a>
            </Button>
            <Button asChild>
              <a href={`${currentUrl}/widget?position=bottom-right&color=%23365fb8&company=Demo%20Company`}>Try Demo</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetInstructions;