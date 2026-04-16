export default function manifest() {
  return {
    name: "Homélia",
    short_name: "Homélia",
    description: "Commentaires catholiques sur les lectures et évangiles du jour",
    start_url: "/",
    display: "standalone",
    background_color: "#F5EFE6",
    theme_color: "#8B1A1A",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
