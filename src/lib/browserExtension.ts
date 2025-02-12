import { trackWebActivity } from "./activity";

type BrowserType = "chrome" | "firefox" | "unknown";

interface ExtensionMessage {
  type: "ACTIVITY_UPDATE";
  data: {
    appName: string;
    windowTitle: string;
    duration: number;
    isProductive: boolean;
    url?: string;
  };
}

class BrowserExtensionManager {
  private static instance: BrowserExtensionManager;
  private extensionId: string | null = null;
  private browserType: BrowserType = "unknown";
  private isConnected: boolean = false;

  private constructor() {
    this.detectBrowser();
    this.setupMessageListeners();
  }

  public static getInstance(): BrowserExtensionManager {
    if (!BrowserExtensionManager.instance) {
      BrowserExtensionManager.instance = new BrowserExtensionManager();
    }
    return BrowserExtensionManager.instance;
  }

  private detectBrowser(): void {
    if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.id) {
      this.browserType = "chrome";
    } else if (
      typeof browser !== "undefined" &&
      browser.runtime &&
      browser.runtime.id
    ) {
      this.browserType = "firefox";
    }
  }

  private setupMessageListeners(): void {
    window.addEventListener("message", async (event) => {
      if (event.data.type === "ACTIVITY_UPDATE") {
        const message = event.data as ExtensionMessage;
        await this.handleActivityUpdate(message.data);
      }
    });
  }

  private async handleActivityUpdate(
    data: ExtensionMessage["data"],
  ): Promise<void> {
    try {
      await trackWebActivity(
        data.appName,
        data.windowTitle,
        data.duration,
        data.isProductive,
      );
    } catch (error) {
      console.error("Error tracking web activity:", error);
    }
  }

  public async connectToExtension(): Promise<boolean> {
    try {
      // Try to connect to the extension
      if (this.browserType === "chrome") {
        await this.connectChromeExtension();
      } else if (this.browserType === "firefox") {
        await this.connectFirefoxExtension();
      }

      this.isConnected = true;
      return true;
    } catch (error) {
      console.error("Failed to connect to browser extension:", error);
      this.isConnected = false;
      return false;
    }
  }

  private async connectChromeExtension(): Promise<void> {
    if (chrome?.runtime?.sendMessage) {
      try {
        await chrome.runtime.sendMessage({ type: "CONNECT" });
      } catch (error) {
        throw new Error("Chrome extension not found or not responding");
      }
    }
  }

  private async connectFirefoxExtension(): Promise<void> {
    if (typeof browser !== "undefined" && browser?.runtime?.sendMessage) {
      try {
        await browser.runtime.sendMessage({ type: "CONNECT" });
      } catch (error) {
        throw new Error("Firefox extension not found or not responding");
      }
    }
  }

  public isExtensionConnected(): boolean {
    return this.isConnected;
  }

  public getBrowserType(): BrowserType {
    return this.browserType;
  }
}

export const browserExtension = BrowserExtensionManager.getInstance();
