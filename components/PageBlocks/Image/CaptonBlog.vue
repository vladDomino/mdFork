<script setup lang="ts">
import type { PropType } from 'vue'
import type { ImageCaptionBlogProps } from '~/components/PageBlocks/Image/interfaces/IImageCaptionBlog'
import { ImageCaptionBlog } from '~/components/PageBlocks/Image/classes/ImageCaptionBlog'

const { slice, containerSize } = defineProps({
  slice: {
    type: Object as PropType<ImageCaptionBlogProps>,
    default: () => ({}),
  },
  containerSize: {
    type: [String, Number],
    default: 680,
  },
})

const {
  zoom,
  isEnableZoom,
  image,
  imageDimensions,
  openModal,
  getCaption,
} = new ImageCaptionBlog({ primary: slice.primary, containerSize })
const $prismic = usePrismic()
</script>
<template>
  <div>
    <div class="post-part single">
      <div
        class="block-img"
      >
        <NuxtImg
          provider="prismic"
          loading="lazy"
          :class="{ 'block-img-zoom': isEnableZoom }"
          :src="`${image.url}&dpr=3`"
          :alt="image.alt || 'Image'"
          :width="imageDimensions.imageWidth"
          :height="imageDimensions.imageHeight"
          @click="openModal"
        />
        <ClientOnly>
          <Teleport to="body">
            <LazyWidgetsModalZoomImage
              v-if="isEnableZoom"
              ref="zoom"
              class="image-zoom"
            >
              <img
                loading="lazy"
                :src="image.url"
                :alt="image.alt || 'Image'"
              >
            </LazyWidgetsModalZoomImage>
          </Teleport>
        </ClientOnly>
      </div>
      <p
        v-if="getCaption($prismic)"
        data-testid="test-image-label"
        class="image-label"
      >
        {{ getCaption($prismic) }}
      </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.block-img {
  margin-top: -1px;
  padding-bottom: 10px;
  text-align: center;

  &-zoom {
    cursor: pointer;
  }
}

.image-label {
  @include font('Inter', 14px, 400);
  display: block;
  text-align: center;
  line-height: 129%;
  letter-spacing: -0.02em;
  color: $text-color--grey;
  padding-bottom: 12px;
}

.image-zoom {
  :deep(img) {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
}
</style>
