import fs from 'fs'
import yaml from 'js-yaml'
import merge from 'lodash.merge'

import type { MetaData } from '~/types'

export interface SiteConfig {
  name: string
  site?: string
  base?: string
  trailingSlash?: boolean
  googleSiteVerificationId?: string
}

export interface MetaDataConfig extends Omit<MetaData, 'title'> {
  title?: {
    default: string
    template: string
  }
}

export interface AnalyticsConfig {
  vendors: {
    googleAnalytics: {
      id?: string
      partytown?: boolean
    }
  }
}

const config = yaml.load(fs.readFileSync('src/config.yaml', 'utf8')) as {
  site?: SiteConfig
  metadata?: MetaDataConfig
  ui?: unknown
  analytics?: unknown
}

const DEFAULT_SITE_NAME = 'Website'

const getSite = () => {
  const _default = {
    name: DEFAULT_SITE_NAME,
    site: undefined,
    base: '/',
    trailingSlash: false,
    googleSiteVerificationId: '',
  }

  return merge({}, _default, config?.site ?? {}) as SiteConfig
}

const getMetadata = () => {
  const siteConfig = getSite()

  const _default = {
    title: {
      default: siteConfig?.name || DEFAULT_SITE_NAME,
      template: '%s',
    },
    description: '',
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      type: 'website',
    },
  }

  return merge({}, _default, config?.metadata ?? {}) as MetaDataConfig
}

const getUI = () => {
  const _default = {
    theme: 'system',
    classes: {},
    tokens: {},
  }

  return merge({}, _default, config?.ui ?? {})
}

const getAnalytics = () => {
  const _default = {
    vendors: {
      googleAnalytics: {
        id: undefined,
        partytown: true,
      },
    },
  }

  return merge({}, _default, config?.analytics ?? {}) as AnalyticsConfig
}

export const SITE = getSite()
export const METADATA = getMetadata()
export const UI = getUI()
export const ANALYTICS = getAnalytics()
