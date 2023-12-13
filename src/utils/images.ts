import { getImage } from 'astro:assets'
import type { ImageMetadata } from 'astro'
import type { OpenGraph } from '@astrolib/seo'

const load = async function () {
  let images: Record<string, () => Promise<unknown>> | undefined = undefined
  try {
    images = import.meta.glob('~/assets/images/**/*.{jpeg,jpg,png,tiff,webp,gif,svg,JPEG,JPG,PNG,TIFF,WEBP,GIF,SVG}')
  } catch (e) {
    // continue regardless of error
  }
  return images
}

let _images: Record<string, () => Promise<unknown>> | undefined = undefined

const fetchLocalImages = async () => {
  _images = _images || (await load())
  return _images
}

const findImage = async (
  imagePath?: string | ImageMetadata | null
): Promise<string | ImageMetadata | undefined | null> => {
  // Not string
  if (typeof imagePath !== 'string') {
    return imagePath
  }

  // Absolute paths
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('/')) {
    return imagePath
  }

  // Relative paths or not "~/assets/"
  if (!imagePath.startsWith('~/assets/images')) {
    return imagePath
  }

  const images = await fetchLocalImages()
  const key = imagePath.replace('~/', '/src/')

  return images && typeof images[key] === 'function'
    ? ((await images[key]()) as { default: ImageMetadata })['default']
    : null
}

export const adaptOpenGraphImages = async (
  openGraph: OpenGraph = {},
  astroSite: URL | undefined = new URL('')
): Promise<OpenGraph> => {
  if (!openGraph?.images?.length) {
    return openGraph
  }

  const images = openGraph.images
  const defaultWidth = 1200
  const defaultHeight = 626

  const adaptedImages = await Promise.all(
    images.map(async (image) => {
      if (image?.url) {
        const resolvedImage = (await findImage(image.url)) as ImageMetadata | undefined
        if (!resolvedImage) {
          return {
            url: '',
          }
        }

        const _image = await getImage({
          src: resolvedImage,
          alt: 'Placeholder alt',
          width: image?.width || defaultWidth,
          height: image?.height || defaultHeight,
        })

        if (typeof _image === 'object') {
          return {
            url: typeof _image.src === 'string' ? String(new URL(_image.src, astroSite)) : 'pepe',
            width: typeof _image.options.width === 'number' ? _image.options.width : undefined,
            height: typeof _image.options.height === 'number' ? _image.options.height : undefined,
          }
        }
        return {
          url: '',
        }
      }

      return {
        url: '',
      }
    })
  )

  return { ...openGraph, ...(adaptedImages ? { images: adaptedImages } : {}) }
}
