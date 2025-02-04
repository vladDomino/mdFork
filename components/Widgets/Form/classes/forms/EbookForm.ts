import axios from 'axios'
import { BaseForm } from '~/components/Widgets/Form/classes/forms/BaseForm'
import {
  type EbookFormProps, type IEbookForm,
} from '~/components/Widgets/Form/interfaces/forms/IEbookForm'
import type { FormBuilderReturnProps } from '~/components/Widgets/Form/interfaces/IFormBuilder'
import type { OnSubmitFromProps } from '~/components/Widgets/Form/interfaces/forms/IContactMeForm'
import type { SendEmailPayload } from '~/components/Widgets/Form/interfaces/forms/FormTypes'
import { addUserType } from '~/analytics/Event'
import { submitNewsletterSubscription } from '~/analytics/events'
import { smartlookSubmitNewsletter } from '~/analytics/smartlookEvents'
import { sendEbookSubmitToAnalytics } from '~/components/Widgets/Form/helpers/sendEbookSubmitToAnalytics'

export class EbookForm extends BaseForm implements IEbookForm {
  sendPulseTemplateId: number
  formTitle: string
  buttons: FormBuilderReturnProps['buttons']
  formLocation: string
  ebookPath: string
  ebookName: string

  type = 'ebook-form'
  subject = 'Request a PDF file from the Ebook page'

  constructor({
    formTitle = '',
    formBuilder,
    formLocation,
    sendPulseTemplateId,
    ebookPath,
    ebookName,
  }: EbookFormProps) {
    super({ emailTitle: 'Request a PDF file from the Ebook page' })
    this.templateId = 624246
    this.sendPulseTemplateId = sendPulseTemplateId
    this.baseEmailTitle = 'Ebook downloads from MD website'
    this.formID = ebookName
    this.formTitle = formTitle
    this.fields = formBuilder.fields
    this.buttons = formBuilder.buttons
    this.checkBoxes = formBuilder.checkBoxes
    this.formLocation = formLocation
    this.ebookPath = ebookPath
    this.ebookName = ebookName
    this.successMessage = {
      ...this.successMessage,
      title: 'Thank you!',
      description: 'The letter with the PDF file was successfully sent to mail.<br><br>Please check your email.',
      showSuccessfulMessage: true,
      showImage: true,
      imagePath: 'images/core/forms/success-message-hand.svg',
      imageAlt: 'Hand',
    }

    this.onSubmitVerifiedForm = this.onSubmitVerifiedForm.bind(this)
    this.submitEbookEventToAnalytics = this.submitEbookEventToAnalytics.bind(this)
  }

  async sendEmail(payload: SendEmailPayload) {
    try {
      await axios.post('/api/send-email', payload)
    } catch (error: any) {
      this.error.value = error
    }
  }

  async onSubmitVerifiedForm({
    token,
    route,
    $eventBus,
  }: OnSubmitFromProps) {
    if (!this.validationBeforeSend(token)) { return }
    const location = this.formLocation

    const emailForSuccessMessage = this.fields!.email.fieldValue.value
    this.successMessage.description = `The letter with the PDF file was successfully sent to mail ${emailForSuccessMessage}.<br><br>Please check your email.` // eslint-disable-line

    try {
      await this.sendEmail({
        body: {
          email: {
            templateId: Number(this.sendPulseTemplateId),
            variables: {
              modalTitle: 'Mad Devs Team',
              subject: `Your ${ this.ebookName } Ebook by Mad Devs`,
              emailTo: this.fields!.email.fieldValue.value,
              bookName: this.ebookName,
              ebook: this.ebookPath,
            },
          },
        },
      })

      await this.submitLead({
        templateId: this.templateId,
        title: this.emailTitle,
        subject: this.subject,
        formLocation: this.formLocation,
        variables: {
          ...this.collectData(),
          type: this.type,
        },
      })

      this.submitEbookEventToAnalytics(location, route)
      $eventBus.$emit('ebook-send', this.sendPulseTemplateId)
    } catch (e: any) {
      this.error.value = e
    }
  }

  submitEbookEventToAnalytics = (location: string, route: any) => {
    addUserType('download_ebook')
    sendEbookSubmitToAnalytics(this.sendPulseTemplateId, location)()
    if (this.checkBoxes && this.checkBoxes.newsLetter.checkboxValue.value) {
      submitNewsletterSubscription.send(`Ebook Form: Form from ${ route.path } page`)
      smartlookSubmitNewsletter.send({ location })
    }
  }
}
