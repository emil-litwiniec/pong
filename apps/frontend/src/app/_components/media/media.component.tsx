import Image, { ImageProps } from 'next/image';

type CornerPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

type DefaultAsset = {
  service: 'none';
};

type SanityAsset = {
  service: 'sanity';
  sanityProp: string;
};

type ShopifyAsset = {
  service: 'shopify';
  shopifyProp: string;
};

type CommonAssetProps = {
  src: string;

  // Next Image props that can be applied by video element
  width?: number;
  height?: number;
  objectFit?: string;
  objectPosition?: string;
  priority?: boolean;

  // Next Image props that can be adapted by video element
  fill?: boolean;
  sizes?: string;
  quality?: number;
  blurDataUrl?: string;
};

type VideoAsset = {
  type: 'video';
  controlsPosition?: CornerPosition;
  playWhenVisible?: boolean; // Determines whether intersection observer should be engaged
} & Partial<HTMLVideoElement>;

type ImageAsset = {
  type: 'image';
} & Omit<ImageProps, keyof CommonAssetProps>;

type MediaAsset = CommonAssetProps &
  (VideoAsset | ImageAsset) &
  (DefaultAsset | SanityAsset | ShopifyAsset);

type MediaProps = {
  asset:
    | MediaAsset // Single asset
    | { desktop: MediaAsset; mobile: MediaAsset }; // Responsive
  className?: string;
};

export const Media = ({ asset, className }: MediaProps) => {
  const isResponsive = (
    src: any
  ): src is { desktop: MediaAsset; mobile: MediaAsset } =>
    'desktop' in src && 'mobile' in src;

  const resolvedAsset = isResponsive(asset)
    ? typeof window !== 'undefined' && window.innerWidth > 768
      ? asset.desktop
      : asset.mobile
    : asset;
  return resolvedAsset.type === 'video'
    ? renderVideo(resolvedAsset)
    : renderImage(resolvedAsset);
};

const renderImage = (asset: ImageAsset & CommonAssetProps) => (
  <Image src="" alt={asset.alt} width={asset.width} height={asset.height} />
);

const renderVideo = (asset: VideoAsset) => <video />;

const Usage = () => {
  // Valid usage
  return (
    <>
      {/* Valid usages  */}
      {/* Image - default  */}
      <Media
        asset={{
          src: 'path/to/image',
          type: 'image',
          service: 'none',
          alt: '',
          width: 500,
          height: 300,
        }}
      />

      {/* Image - Sanity  */}
      <Media
        asset={{
          src: 'path/to/image',
          service: 'sanity',
          sanityProp: 'sanityProp',
          type: 'image',
          alt: 'Sanity Image',
          width: 500,
          height: 300,
        }}
      />

      {/* Video - default  */}
      <Media
        asset={{
          src: 'path/to/video',
          type: 'video',
          service: 'none',
          width: 500,
          height: 300,
        }}
      />

      {/* Responsive - default / different asset types  */}
      <Media
        asset={{
          mobile: {
            src: 'path/to/image',
            type: 'image',
            alt: 'Mobile image',
            service: 'none',
            width: 500,
            height: 300,
          },
          desktop: {
            src: 'path/to/video',
            type: 'video',
            service: 'none',
            width: 900,
            height: 550,
          },
        }}
      />

      {/* Invalid usages */}
      {/* Passing prop to wrong service */}
      <Media
        asset={{
          src: 'path/to/image',
          type: 'image',
          service: 'sanity',
          shopifyProp: 'shopifyProp', // ERROR  Expects sanityProp
          alt: 'Sanity image',
          width: 500,
          height: 300,
        }}
      />

      {/* Image - missing alt prop */}
      <Media
        asset={{
          // ERROR Missing alt property
          src: 'path/to/image',
          type: 'image',
          service: 'none',
          width: 500,
          height: 300,
        }}
      />

      {/* Video - redundant alt prop */}
      <Media
        asset={{
          src: 'path/to/video',
          type: 'video',
          alt: 'Default video', // ERROR Video doesn't support alt prop
          service: 'none',
          width: 500,
          height: 300,
        }}
      />

      {/* Responsive - desktop asset not provided*/}
      <Media
        asset={{
          // ERROR desktop asset should be provided
          mobile: {
            src: 'path/to/image',
            type: 'image',
            alt: 'Mobile image',
            service: 'none',
            width: 500,
            height: 300,
          },
        }}
      />
    </>
  );
};
