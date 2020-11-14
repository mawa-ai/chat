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

type Widget = {
    chatOpened?: boolean
    right: boolean
    size: string
    round: string
    background: string
    image: string
    animated: boolean
    notification: {
        background: string
        color: string
    }
}

type ChatEmbedConfig = {
    embed: Element
    receiver: Receiver
    theme: Theme,
    widget: Widget
}