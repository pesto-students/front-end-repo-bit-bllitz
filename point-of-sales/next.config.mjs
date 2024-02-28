/** @type {import('next').NextConfig} */
const isLoggedIn = true;

const nextConfig = {
  async redirects() {
    // define the destination based on the user's login status
    const destination = isLoggedIn ? "/menu/categories" : "/auth/signup";
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
