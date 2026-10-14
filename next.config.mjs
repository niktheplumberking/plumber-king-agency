/** Static export: the build output in out/ is plain HTML/CSS/JS that runs on Hostinger shared hosting. */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};
export default nextConfig;
