import moment from "moment";

export class CustomLogger {
  private withTime: boolean;

  constructor(withTime: boolean = false) {
    this.withTime = withTime;
  }

  private getCallerDetail(): string {
    const stack = new Error().stack!;
    const stackLines = stack.split("\n");

    // The line with the caller function should be the 3rd one (index 2)
    const callerLine = stackLines[3];

    // Match the file path and line number (with regex)
    const regex =
      /([\\\/]([^\\/]+)[\\\/])([^\\/]+)\.([a-zA-Z0-9]+):(\d+):(\d+)/;
    const match = callerLine.match(regex);

    var time = moment().format("YYYY-MM-DD HH:mm:ss");
    var callerDetails = undefined;

    if (match) {
      const directoryPath = match[2]; // Parent directory path
      const fileName = match[3] + "." + match[4]; // Filename and extension (e.g., test.ts)
      const lineNumber = match[5]; // Line number
      const columnNumber = match[6]; // Column number
      return `${directoryPath}/${fileName}:${lineNumber}`; // Full path with filename
    }

    if (callerDetails && this.withTime) {
      return `${time} ${callerDetails}`;
    } else if (callerDetails) {
      return callerDetails;
    }

    return "unknown"; // Fallback if no match found
  }

  // Function to safely stringify an object or leave other types untouched
  private stringifyMessage(message: any): string {
    if (message && typeof message === "object") {
      try {
        return JSON.stringify(message, null, 2); // Beautify JSON output with indentation
      } catch (e: any) {
        return `[Error stringifying object: ${e.message}]`;
      }
    }
    return String(message); // Convert other types to string (including primitives)
  }

  log(...message: (any | undefined)[]) {
    const callerName = this.getCallerDetail();
    const formattedMessages = message.map(this.stringifyMessage);
    console.log(`[${callerName}] ${formattedMessages.join(" ")}`);
  }

  error(...message: (any | undefined)[]) {
    const callerName = this.getCallerDetail();
    const formattedMessages = message.map(this.stringifyMessage);
    console.error(`[${callerName}] ${formattedMessages.join(" ")}`);
  }

  warn(...message: (any | undefined)[]) {
    const callerName = this.getCallerDetail();
    const formattedMessages = message.map(this.stringifyMessage);
    console.warn(`[${callerName}] ${formattedMessages.join(" ")}`);
  }

  info(...message: (any | undefined)[]) {
    const callerName = this.getCallerDetail();
    const formattedMessages = message.map(this.stringifyMessage);
    console.info(`[${callerName}] ${formattedMessages.join(" ")}`);
  }
}
