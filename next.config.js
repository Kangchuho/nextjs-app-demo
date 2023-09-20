/** @type {import('next').NextConfig} */
const MS_PER_SECOND = 1000
const SECONDS_PER_HOUR = 3600
const PAGES_BUFFER_LENGTH = 20

const nextConfig = {
  onDemandEntries: {
    maxInactiveAge: SECONDS_PER_HOUR * MS_PER_SECOND,
    pagesBufferLength: PAGES_BUFFER_LENGTH,
  },
}

module.exports = nextConfig
