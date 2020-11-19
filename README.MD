# LEL

look [here](https://discord.com/developers/docs/resources/channel#embed-object) for good docs

### Setup

create a file called: `index.ts`

```typescript
import DiscordUserApi from './DiscordUserApi.ts'

const api = new DiscordUserApi({ channel: <channelId> })
```

### Usage

use autocomplete and discord docs for `args`

```typescript
api.sendRichMessage({
    <args>
})
```

all functions are returning the response from discord

## To run, just type `yarn start`