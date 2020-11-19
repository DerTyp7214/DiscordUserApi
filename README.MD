# LEL

look [here](https://discord.com/developers/docs/resources/channel#embed-object) for good docs

# Fr lol, this is for my code

### Setup

```javascript
const DiscordUserApi = require('./modules.js')

const api = new DiscordUserApi({ channel: <channelId> })
```

### Usage

use autocomplete and discord docs for `args`

```javascript
api.sendRichMessage({
    <args>
})
```

all functions are returning the response from discord