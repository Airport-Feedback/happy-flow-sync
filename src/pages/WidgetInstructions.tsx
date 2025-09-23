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
  src="${currentUrl}/widget?position=${position}&color=${encodeURIComponent(color)}&company=${encodeURIComponent(companyName)}" 
  style="position: fixed; ${position.includes('bottom') ? 'bottom: 0;' : 'top: 0;'} ${position.includes('right') ? 'right: 0;' : 'left: 0;'} width: 100%; height: 100%; border: none; z-index: 999999; pointer-events: none; background: transparent;" 
  onload="this.style.pointerEvents='auto'">
</iframe>`;

  const reactComponent = `import { useEffect } from 'react';

const FeedbackWidget = () => {
  useEffect(() => {
    // Configure the widget
    window.FeedbackWidgetConfig = {
      position: '${position}',
      primaryColor: '${color}',
      companyName: '${companyName}',
      baseUrl: '${currentUrl}'
    };

    // Load the embed script
    const script = document.createElement('script');
    script.src = '${currentUrl}/embed.js';
    document.body.appendChild(script);

    return () => {
      // Cleanup
      const iframe = document.querySelector('iframe[src*="widget"]');
      if (iframe) iframe.remove();
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

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

        {/* Live Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Widget Configuration
            </CardTitle>
            <CardDescription>
              Customize your widget and see the preview in real-time
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

        {/* Integration Methods */}
        <Tabs defaultValue="script" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="script">Script Tag</TabsTrigger>
            <TabsTrigger value="iframe">iFrame</TabsTrigger>
            <TabsTrigger value="react">React Component</TabsTrigger>
            <TabsTrigger value="snippets">Code Snippets</TabsTrigger>
          </TabsList>

          <TabsContent value="script" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Script Tag Integration
                </CardTitle>
                <CardDescription>
                  The easiest way to add the feedback widget to any website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Copy this code before the closing &lt;/body&gt; tag:</Label>
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

                <div className="space-y-2">
                  <h4 className="font-semibold">Features:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Automatic widget positioning and styling</li>
                    <li>Responsive design that works on all devices</li>
                    <li>Offline support with automatic sync when online</li>
                    <li>No external dependencies required</li>
                    <li>Minimal performance impact</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="iframe" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  iFrame Integration
                </CardTitle>
                <CardDescription>
                  Direct iframe embed for more control over styling and positioning
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Copy this iframe code:</Label>
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="react" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  React Component
                </CardTitle>
                <CardDescription>
                  For React applications, use this component approach
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>React Component Code:</Label>
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto max-h-64">
                      <code>{reactComponent}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(reactComponent, 'react')}
                    >
                      {copied === 'react' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Usage in your app:</Label>
                  <pre className="bg-muted p-4 rounded-lg text-sm">
                    <code>{`import FeedbackWidget from './FeedbackWidget';

function App() {
  return (
    <div>
      {/* Your app content */}
      <FeedbackWidget />
    </div>
  );
}`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="snippets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Platform-Specific Code Snippets
                </CardTitle>
                <CardDescription>
                  Ready-to-use code snippets for different frontend platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Static HTML Website */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg">Static HTML Website</h4>
                  <p className="text-sm text-muted-foreground">Add this to your HTML file before the closing &lt;/body&gt; tag</p>
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{`<!DOCTYPE html>
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
</html>`}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(`<!DOCTYPE html>
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
</html>`, 'html')}
                    >
                      {copied === 'html' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Vanilla JavaScript */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg">Vanilla JavaScript</h4>
                  <p className="text-sm text-muted-foreground">Dynamically load the widget using JavaScript</p>
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{`// Initialize Feedback Widget
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
}`}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(`// Initialize Feedback Widget
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
}`, 'vanilla')}
                    >
                      {copied === 'vanilla' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* React/Next.js */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg">React / Next.js</h4>
                  <p className="text-sm text-muted-foreground">React hook for feedback widget integration</p>
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto max-h-80">
                      <code>{`// hooks/useFeedbackWidget.js
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
      const iframe = document.querySelector('iframe[src*="widget"]');
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

// Usage in your React component:
// import { useFeedbackWidget } from './hooks/useFeedbackWidget';
//
// function App() {
//   useFeedbackWidget();
//   return <div>Your App Content</div>;
// }`}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(`// hooks/useFeedbackWidget.js
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
      const iframe = document.querySelector('iframe[src*="widget"]');
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

// Usage in your React component:
// import { useFeedbackWidget } from './hooks/useFeedbackWidget';
//
// function App() {
//   useFeedbackWidget();
//   return <div>Your App Content</div>;
// }`, 'react-hook')}
                    >
                      {copied === 'react-hook' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* TypeScript */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg">TypeScript</h4>
                  <p className="text-sm text-muted-foreground">TypeScript implementation with proper typing</p>
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto max-h-80">
                      <code>{`// types/feedback-widget.d.ts
declare global {
  interface Window {
    FeedbackWidgetConfig?: FeedbackWidgetConfig;
  }
}

interface FeedbackWidgetConfig {
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  primaryColor: string;
  companyName: string;
  baseUrl: string;
}

// utils/feedbackWidget.ts
export class FeedbackWidget {
  private script: HTMLScriptElement | null = null;
  private config: FeedbackWidgetConfig;

  constructor(config: Partial<FeedbackWidgetConfig> = {}) {
    this.config = {
      position: '${position}',
      primaryColor: '${color}',
      companyName: '${companyName}',
      baseUrl: '${currentUrl}',
      ...config
    };
  }

  public initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Set global configuration
      window.FeedbackWidgetConfig = this.config;

      // Create script element
      this.script = document.createElement('script');
      this.script.src = \`\${this.config.baseUrl}/embed.js\`;
      this.script.async = true;
      
      this.script.onload = () => resolve();
      this.script.onerror = () => reject(new Error('Failed to load feedback widget'));
      
      document.body.appendChild(this.script);
    });
  }

  public destroy(): void {
    // Remove iframe
    const iframe = document.querySelector('iframe[src*="widget"]');
    if (iframe) iframe.remove();
    
    // Remove script
    if (this.script?.parentNode) {
      this.script.parentNode.removeChild(this.script);
    }
    
    // Clean up global config
    delete window.FeedbackWidgetConfig;
    this.script = null;
  }
}

// Usage:
// const widget = new FeedbackWidget();
// widget.initialize().catch(console.error);`}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(`// types/feedback-widget.d.ts
declare global {
  interface Window {
    FeedbackWidgetConfig?: FeedbackWidgetConfig;
  }
}

interface FeedbackWidgetConfig {
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  primaryColor: string;
  companyName: string;
  baseUrl: string;
}

// utils/feedbackWidget.ts
export class FeedbackWidget {
  private script: HTMLScriptElement | null = null;
  private config: FeedbackWidgetConfig;

  constructor(config: Partial<FeedbackWidgetConfig> = {}) {
    this.config = {
      position: '${position}',
      primaryColor: '${color}',
      companyName: '${companyName}',
      baseUrl: '${currentUrl}',
      ...config
    };
  }

  public initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Set global configuration
      window.FeedbackWidgetConfig = this.config;

      // Create script element
      this.script = document.createElement('script');
      this.script.src = \`\${this.config.baseUrl}/embed.js\`;
      this.script.async = true;
      
      this.script.onload = () => resolve();
      this.script.onerror = () => reject(new Error('Failed to load feedback widget'));
      
      document.body.appendChild(this.script);
    });
  }

  public destroy(): void {
    // Remove iframe
    const iframe = document.querySelector('iframe[src*="widget"]');
    if (iframe) iframe.remove();
    
    // Remove script
    if (this.script?.parentNode) {
      this.script.parentNode.removeChild(this.script);
    }
    
    // Clean up global config
    delete window.FeedbackWidgetConfig;
    this.script = null;
  }
}

// Usage:
// const widget = new FeedbackWidget();
// widget.initialize().catch(console.error);`, 'typescript')}
                    >
                      {copied === 'typescript' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Configuration Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Configuration Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Position Options</h4>
                <div className="space-y-2">
                  <Badge variant="outline">bottom-right</Badge>
                  <Badge variant="outline">bottom-left</Badge>
                  <Badge variant="outline">top-right</Badge>
                  <Badge variant="outline">top-left</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Customization</h4>
                <ul className="text-sm space-y-1">
                  <li><strong>primaryColor:</strong> Any valid CSS color (hex, rgb, hsl)</li>
                  <li><strong>companyName:</strong> Displayed in widget header</li>
                  <li><strong>position:</strong> Widget placement on screen</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Collection */}
        <Card>
          <CardHeader>
            <CardTitle>Data Collection & Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">What We Collect:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Emoji rating (1-5 scale)</li>
                  <li>• Optional feedback comment</li>
                  <li>• Optional email address</li>
                  <li>• Timestamp of submission</li>
                  <li>• Source information (embedded widget)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Privacy Features:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• No tracking cookies</li>
                  <li>• No personal data without consent</li>
                  <li>• Offline-first storage</li>
                  <li>• Data synced securely when online</li>
                  <li>• GDPR compliant</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Support */}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Need Help?</h3>
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