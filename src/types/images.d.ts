/// <reference types="astro/client" />

declare module '*.JPG' {
  const src: import('astro').ImageMetadata;
  export default src;
}

declare module '*.jpg' {
  const src: import('astro').ImageMetadata;
  export default src;
}

declare module '*.png' {
  const src: import('astro').ImageMetadata;
  export default src;
}

declare module '*.webp' {
  const src: import('astro').ImageMetadata;
  export default src;
}
