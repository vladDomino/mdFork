import type {
  IStartScreenDefault,
  StartScreenDefaultProps,
} from '~/components/PageBlocks/StartScreen/interfaces/IStartScreenDefault'

export interface StartScreenWithButtonProps extends StartScreenDefaultProps {
  primary: StartScreenDefaultProps['primary'] & {
    btnText: string
  }
}

export interface IStartScreenWithButton extends IStartScreenDefault {
  btnText: string
}
