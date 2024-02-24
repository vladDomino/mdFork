import type { ImageField } from '@prismicio/types'
import type { RichTextField } from '@prismicio/client'

export interface IntersectionObserverInstance {
  observe: (target: Element) => void
  unobserve: (target: Element) => void
  disconnect: () => void
}

export interface ISwiperOptions {
  speed: number
  slidesPerView: number
  slidesPerGroup: number
  loop: boolean
  grabCursor: boolean
  allowTouchMove: boolean
  spaceBetween: number
  navigation: {
    nextEl: string
    prevEl: string
    disabledClass: string
  },

  breakpoints: {
    550?: {
      spaceBetween: number
      slidesPerView: number
      slidesPerGroup: number
    },

    900?: {
      spaceBetween: number
      slidesPerView: number
      slidesPerGroup: number
    },

    960?: {
      spaceBetween: number
      slidesPerView: number
      slidesPerGroup: number
    },

    1150?: {
      spaceBetween: number
      slidesPerView: number
      slidesPerGroup: number
    },
  },
}

interface Embed {
  embed?: {
    type?: string
    html?: string
    thumbnail_url?: string
  }
}

interface TechAndTools {
  title?: string
  description?: string
}

interface OrderedList {
  list_item?: {
    text?: string | RichTextField
  }
}

interface Repeatable extends Embed, TechAndTools, OrderedList {}

export interface SchemaOrgSnippet {
  singleSnippet: {
    text: string
  }[]
  single_snippet: {
    text: string
  }[]
}

export interface AuthorSocialNetwork {
  network: string
  link: {
    url: string
  }
}

export interface Author {
  id: string
  type: string
  uid: string
  data: {
    firstName: string
    lastName: string
    phoneNumber: string
    company: string
    email: string
    location: string
    name: string
    position: string
    thumbnail_image: ImageField
    image: ImageField & {
      header: ImageField
    }
    meta_title: string
    meta_description: string
    noindex: boolean
    schema_org_snippets: SchemaOrgSnippet[]
    social_networks: AuthorSocialNetwork[]
    header_plate_text: string
    header_plate_button_text: string
    header_plate_link: {
      url: string
    }
    header_plate_background_color: string
  }
}

export interface BlogPost {
  data?: {
    body?: {
      slice_type?: string
      slice_variation?: string
      primary: {
        text?: RichTextField
        quote?: RichTextField
        tableRich?: RichTextField
      }
      items?: Repeatable[]
    }[]
    featured_image?: ImageField
    title?: RichTextField
    date?: string
    header_plate_background_color?: string
    header_plate_button_text?: string
    header_plate_link?: string
    header_plate_text?: string
    introduction_paragraph?: RichTextField
    meta_description?: RichTextField
    meta_title?: RichTextField
    post_author?: Author
    post_coauthor?: Author
    post_with_form?: boolean
    schema_org_snippets?: SchemaOrgSnippet[]
    subtitle?: RichTextField
    updated_date?: string
  }
  uid?: string
  first_publication_date?: string
  last_publication_date?: string
  id?: string
  tags?: string[]
  type?: string
  isBroken?: boolean | undefined
  description?: string
  formattedDate?: string
  readTime?: string
}
