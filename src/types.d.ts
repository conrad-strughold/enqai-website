import type { AstroComponentFactory } from 'astro/runtime/server/index.js'
import type { HTMLAttributes, ImageMetadata } from 'astro/types'

export interface MetaData {
  title?: string
  canonical?: string
  robots?: MetaDataRobots
  description?: string
  openGraph?: MetaDataOpenGraph
  twitter?: MetaDataTwitter
}

export interface MetaDataRobots {
  index?: boolean
  follow?: boolean
}

export interface MetaDataImage {
  url: string
  width?: number
  height?: number
}

export interface MetaDataOpenGraph {
  url?: string
  siteName?: string
  images?: Array<MetaDataImage>
  locale?: string
  type?: string
}

export interface MetaDataTwitter {
  handle?: string
  site?: string
  cardType?: string
}

export interface Image {
  src: string
  alt?: string
}

export interface Video {
  src: string
  type?: string
}

export interface Widget {
  id?: string
  isDark?: boolean
  bg?: string
  classes?: Record<string, string>
}

export interface CallToAction extends HTMLAttributes<a> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link'
  text?: string
  icon?: string
  classes?: Record<string, string>
  type?: 'button' | 'submit' | 'reset'
}
