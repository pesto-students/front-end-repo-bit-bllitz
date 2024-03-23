/** @type {import('next').NextConfig} */
const isLoggedIn = true;

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
},
  async redirects() {
    // define the destination based on the user's login status
    const destination = isLoggedIn ? "/dashboard" : "/auth/signup";
    return [
      {
        source: "/",
        destination,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
