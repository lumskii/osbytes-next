/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    compiler: {
        removeConsole: process.env.NODE_ENV !== 'development',
        reactRemoveProperties: { properties: ['^data-new-gr-c-s-check-loaded$', '^data-gr-ext-installed$'] },
    },
    distDir: '.next',
    webpack: (config) => {
        config.externals = [...config.externals, { encoding: 'encoding' }];
        return config;
    },
    // Comment out or remove the experimental section
    // experimental: {
    //     optimizeCss: true,
    // },
};

export default nextConfig;
