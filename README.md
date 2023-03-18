# chat-embed

Create and manage chats easily

## How to use

### Svelte

```html
<script lang="ts">
    import Chat, * as chat from 'chat-embed/svelte';

    const handleMessage = async (event) => {
        const message = event.detail;
        if (message.fromUser) {
            chat.typing();

            setTimeout(() => {
                chat.send({
                    type: 'text',
                    content: cleanedText
                });
            }, 1000)
        }
    }
</script>

<Chat on:message={handleMessage} />
```

### Others

```js
import createChat from 'chat-embed';

const chat = createChat({ embed: document.body })
```

### IIFE

```html
<script src="https://www.unpkg.com/chat-embed/dist/index.iife.js"></script>
<script type="text/javascript">
    const chat = window.chatEmbed({ embed: document.body })
</script>
```

## API

### Create chat

On creating a chat, you can define the theme, the receiver and a widget, all three are optional.

```js
const chat = window.chatEmbed({
    embed: document.body,
    receiver: {
        image: 'https://i.imgur.com/RZQ8tQ9.png',
        name: 'Jupiter Apple',
        status: 'online',
        round: '100%'
    },
    theme: {
        primaryColor: '#f54242'
    },
    widget: {
        right: false,
        size: "60px",
        round: "50%",
        background: "#f54242",
        image: "https://i.imgur.com/RZQ8tQ9.png",
        animated: true,
        popupMessage: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit!',
        notification: {
            background: "#f54242",
            color: "#FFFFFF",
        }
    }
})
```

### Chat methods

```js
chat.addReceiver(receiver); // Add a function to handle chat messages
chat.typing(); // Starts typing animation
chat.toggle(); // Toggle chat opening
chat.clear(); // Clear all chat messages
chat.setInput(show); // Enable or disable input
chat.send(message); // Send a message on chat
```