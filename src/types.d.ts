type PlainText = string
type QuickReply = string[]

type MessageTypes = {
    text: PlainText
    quick: QuickReply
}

type Message = {
    id?: string
    type: keyof MessageTypes
    content: MessageTypes[keyof MessageTypes]
    fromUser?: boolean
}

type Receiver = {
    image: string
    name: string
    status: string
    round: string
    preventShrink: boolean
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
    popupMessage: string
    notification: {
        background: string
        color: string
    }
}

type ChatEmbedConfig = {
    embed: Element
    receiver: Receiver
    theme: Theme
    widget: Widget
}