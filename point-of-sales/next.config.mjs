/** @type {import('next').NextConfig} */

export default{
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/auth/signin",
        permanent: true,
      },
    ];
  },
};
