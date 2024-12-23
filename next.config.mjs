/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "127.0.0.1",
      "localhost:8000",
      "www.google.com",
      "via.placeholder.com",
      "www.freepik.com",
      "img.freepik.com",
      "randomuser.me",
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
