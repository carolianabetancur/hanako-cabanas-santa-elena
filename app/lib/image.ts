export function optimizeImage(url: string, width: number, quality = 80): string {
    if (!url) return url;
    const u = new URL(url);
    u.searchParams.set("w", String(width));
    u.searchParams.set("q", String(quality));
    u.searchParams.set("auto", "format");
    u.searchParams.set("fit", "crop");
    return u.toString();
  }