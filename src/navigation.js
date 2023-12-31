import { getPermalink } from './utils/permalinks'

export const headerData = {
  links: [
    {
      text: 'PRESS',
      href: getPermalink('/press'),
    },
    {
      text: 'DOCS',
      href: 'https://enqai.com/docs',
    },
    {
      text: 'LINKTREE',
      href: 'https://linktr.ee/noisegpt',
    },
    {
      text: 'ROADMAP',
      href: 'https://enqai.gitbook.io/enqai-documentation/project-overview/roadmap'.
        },
    {
      text: 'WHITEPAPER',
      href: 'https://enqai.com/wp',
    },
    {
      text: 'TRADE',
      href: 'https://app.uniswap.org/swap?exactField=input&exactAmount=10&inputCurrency=0x710287D1D39DCf62094A83EBB3e736e79400068a&outputCurrency=ETH',
    },
  ],
}
