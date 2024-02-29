// Code generated by Slice Machine. DO NOT EDIT.

import { defineAsyncComponent } from 'vue'
import { defineSliceZoneComponents } from '@prismicio/vue'

export const blogComponents = defineSliceZoneComponents({
  text: defineAsyncComponent(() => import('../../PageBlocks/Text/Text.vue')),
  image_with_caption: defineAsyncComponent(() => import('../../PageBlocks/Image/CaptonBlog.vue')),
  table_slice: defineAsyncComponent(() => import('../../PageBlocks/Table/Blog.vue')),
  ordered_list: defineAsyncComponent(() => import('../../PageBlocks/OrderedList/Default.vue')),
  embed: defineAsyncComponent(() => import('../../PageBlocks/Embed/Blog.vue')),
  post_authors_slice: defineAsyncComponent(() => import('../../PageBlocks/Authors/Post.vue')),
  divider: defineAsyncComponent(() => import('../../PageBlocks/Divider/Blog.vue')),
  accordion_slice: defineAsyncComponent(() => import('../../PageBlocks/Accordion/ForPost.vue')),
  quote: defineAsyncComponent(() => import('../../PageBlocks/Quote/Blog.vue')),
  author: defineAsyncComponent(() => import('../../PageBlocks/Authors/PostOld.vue')),
  github_gist: defineAsyncComponent(() => import('../../PageBlocks/GithubGist/Default.vue')),
})
