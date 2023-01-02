export type PlainText = string
export type QuickReply = {
    text: string
    options: string[]
}

export type MessageTypes = {
    text: PlainText
    quick: QuickReply
}

export type Message = {
    id?: string
    type: keyof MessageTypes
    content: MessageTypes[keyof MessageTypes]
    fromUser?: boolean
}

export type Receiver = {
    image: string
    name: string
    status: string
    round: string
    preventShrink: boolean
}

export type Theme = {
    primaryColor: string
}

export type Widget = {
    chatOpened?: boolean
    right: boolean
    size: string
    round: string
    background: string
    image: string
    animated: boolean
    popupMessage?: string
    notification?: {
        background: string
        color: string
    }
}

export type ChatEmbedConfig = {
    embed: Element
    receiver: Receiver
    theme: Theme
    widget?: Widget
}