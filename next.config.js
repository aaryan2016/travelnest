/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.cntraveller.com'
            },
            {
                protocol: 'https',
                hostname: 'cdn.britannica.com'
            },
            {
                protocol: 'https',
                hostname: 'www.redfin.com'
            },
            {
                protocol: 'https',
                hostname: 'images.pexels.com'
            },
            {
                protocol: 'https',
                hostname: 'dynamic-media-cdn.tripadvisor.com'
            },
            {
                protocol: 'https',
                hostname: 'cms.interiorcompany.com'
            },
            {
                protocol: 'https',
                hostname: 'img.freepik.com'
            },
            {
                protocol: 'https',
                hostname: 'images.pexels.com'
            },
            {
                protocol: 'https',
                hostname: 'cdn-icons-png.flaticon.com'
            }
        ],
    },
};

export default config;
