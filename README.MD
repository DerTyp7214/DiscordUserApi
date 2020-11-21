# LEL

look [here](https://discord.com/developers/docs/resources/channel#embed-object) for good docs

### Setup

simple setup, `types.d.ts` included

to get your discord token, just simply open discord and press ctrl+shift+i. Then go to the network tab and search for your token in the requests

```typescript
import DiscordUserApi from 'discorduserapi'

const api = new DiscordUserApi({ channel: <channelId>, token: <your discord token> })
```

```javascript
const DiscordUserApi = require('discorduserapi')

const api = new DiscordUserApi({ channel: <channelId>, token: <your discord token> })
```