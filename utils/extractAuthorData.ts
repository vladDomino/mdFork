import { extractSchemaOrg } from '~/SEO/extractSchemaOrg'
import type { Author, TransformedAuthor } from '~/interfaces/common/commonInterfaces'

export const extractAuthorData = (author: Author): TransformedAuthor | {} => {
  if (!author.data) { return {} }

  const socialNetworks = author.data.social_networks
    .filter(item => item.network && item.link.url)
    .map(item => ({
      key: item.network?.toLowerCase(),
      title: item.network,
      link: item.link,
    }))

  return {
    type: author.type,
    id: author.id,
    uid: author.uid,
    name: author.data.name,
    position: author.data.position,
    description: author.data?.description,
    thumbnailImage: author.data.thumbnail_image,
    image: author.data.image,
    metaTitle: author.data.meta_title,
    metaDescription: author.data.meta_description,
    noindex: author.data.noindex,
    schemaOrgSnippet: extractSchemaOrg(author.data.schema_org_snippets),
    personalPageLink: linkResolver({ type: 'author', uid: author.uid }),
    socialNetworks,
  }
}
