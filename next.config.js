const { withSentryConfig } = require("@sentry/nextjs");
const withPWA = require("next-pwa");
// const runtimeCaching = require("next-pwa/cache");

const development = process.env.NODE_ENV === "development";
/** @type {import('next').NextConfig} */
const moduleExports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["imagedelivery.net", "localhost", "95.217.169.100"],
  },
  sentry: {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
    disable: development,
  },
  pwa: {
    dest: "public",
    // runtimeCaching,
    disable: development,
  },
});

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
