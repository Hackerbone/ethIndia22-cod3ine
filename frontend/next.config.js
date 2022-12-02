// error - ./node_modules/@biconomy/web3-auth/dist/src/style.css

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        // crypto: require.resolve("crypto-browserify"),
      };
    }

    config.plugins = config.plugins || [];
    config.ignoreWarnings = [/Failed to parse source map/];

    return config;
  },
};

module.exports = nextConfig;
