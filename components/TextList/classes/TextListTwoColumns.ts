import type { ITextListTwoColumns, TextListTwoColumnsProps } from '~/components/TextList/interfaces/ITextListTwoColumns'
import type { ITextItem } from '~/components/TextList/interfaces/ITextListDefault'

export class TextListTwoColumns implements ITextListTwoColumns {
  title: string
  items: ITextItem[]

  constructor(props: TextListTwoColumnsProps) {
    this.title = props.primary.title
    this.items = props.items
  }
}
