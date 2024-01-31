import * as prismicH from '@prismicio/helpers'

export const tableHtmlSerializer = (type, element, content, children) => {
  try {
    const Element = prismicH.Element
    let text = children

    if (type === Element.preformatted) {
      text = element.text
      text = convertTagsToText(text, ['br'])
    } else {
      text = text.replace(/`(.*?)`/g, (_, inlineCode) => {
        const formattedCode = convertTagsToText(inlineCode, ['strong', 'em', 'a'])
        return `<code class="inline-code">${ formattedCode }</code>`
      })
    }

    switch (type) {
    case Element.heading1: return `<h1>${ text }</h1>`
    case Element.heading2: return `<h2>${ text }</h2>`
    case Element.heading3: return `<h3>${ text }</h3>`
    case Element.heading4: return `<h4>${ text }</h4>`
    case Element.heading5: return `<h5>${ text }</h5>`
    case Element.heading6: return `<h6>${ text }</h6>`
    case Element.paragraph: return `${ text }`
    case Element.preformatted: return `<pre>${ text }</pre>`
    case Element.strong: return `<strong>${ text }</strong>`
    case Element.em: return `<em>${ text }</em>`
    case Element.listItem: return `<li>${ text }</li>`
    case Element.oListItem: return `<li>${ text }</li>`
    case Element.list: return `<ul>${ text }</ul>`
    case Element.oList: return `<ol>${ text }</ol>`
    case Element.image:
      // eslint-disable-next-line
        const linkUrl = element.linkTo ? prismicH.asLink(element.linkTo, linkResolver) : null
      // eslint-disable-next-line
        const linkTarget = element.linkTo && element.linkTo.target ? `target="${element.linkTo.target}" rel="noopener nofollow"` : ''
      // eslint-disable-next-line
        const wrapperClassList = [element.label || '', 'block-img']
      // eslint-disable-next-line
        const img = `<img src="${element.url}" alt="${element.alt || 'Image'}">`
      return (`
            <p class="${ wrapperClassList.join(' ') }">
              ${ linkUrl ? `<a ${ linkTarget } href="${ linkUrl }">${ img }</a>` : img }
            </p>
          `)
    case Element.embed:
      return (`
            <div data-oembed="${ element.oembed.embed_url }"
              data-oembed-type="${ element.oembed.type }"
              data-oembed-provider="${ element.oembed.provider_name }"
            >
              ${ element.oembed.html }
            </div>
          `)
    case Element.hyperlink:
      /* eslint-disable */
        const url = prismicH.asLink(element.data, linkResolver)
        const targetType = setTargetForLinks(url)
        const setRelAttributes = `rel="noopener"`
        const target = `target="${targetType}" ${targetType === '_blank' ? setRelAttributes : ''}`
        const textContent = text.replace('remove-attributes', '')
        const isOurDomain = checkAndExtractDomain(url).ourDomain
        return `<a ${target} href="${url}" ${isOurDomain ? 'data-nuxt-link' : ''}>${textContent}</a>`
      /* eslint-enable */
    case Element.label:
      // eslint-disable-next-line
        const label = element.data.label ? ` class="${element.data.label}"` : ''
      return `<span ${ label }>${ text }</span>`
    case Element.span: return content ? content.replace(/\n/g, '<br />') : ''
    default: return null
    }
  } catch (e) {
    // eslint-disable-next-line
    console.error('Error in table html serializer: ', e)
  }
}
