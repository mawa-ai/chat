type PlainText = string
type QuickReply = {
    text: PlainText,
    options: string[]
}

type Message = {
    id?: string
    type: string
    content: QuickReply | PlainText
    fromUser: boolean
}

type Receiver = {
    image: string
    name: string
    status: string
}

type Theme = {
    primaryColor: string
}

type ChatEmbedConfig = {
    embed: Element
    receiver: Receiver
    theme: Theme
}