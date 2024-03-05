// Code generated by Slice Machine. DO NOT EDIT.

import { defineAsyncComponent } from 'vue'
import { defineSliceZoneComponents } from '@prismicio/vue'

export const digestComponents = defineSliceZoneComponents({
  text: defineAsyncComponent(() => import('../../PageBlocks/Text/Text.vue')),
  spacer_slice: defineAsyncComponent(() => import('../../PageBlocks/Spacer/Spacer.vue')),
  digest_project_card: defineAsyncComponent(() => import('../../../prismicSlices/DigestProjectCard/index.vue')),
  digest_post_card: defineAsyncComponent(() => import('../../../prismicSlices/DigestPostCard/index.vue')),
})
