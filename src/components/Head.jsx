import NextHead from "next/head";

export default function Head({ title, description }) {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#080f1e" />
      <meta name="robots" content="noindex, nofollow" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="vi_VN" />
      <meta property="og:site_name" content="Đại tiệc Khai Hoa · Consumer" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="color-scheme" content="dark" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="preload" href="/fonts/Manrope-Regular.woff" as="font" type="font/woff" crossOrigin="anonymous" />
      <link rel="preload" href="/fonts/BeVietnamPro-Regular.woff" as="font" type="font/woff" crossOrigin="anonymous" />
    </NextHead>
  );
}
