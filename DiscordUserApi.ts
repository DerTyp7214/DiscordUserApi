import nodeFetch from 'node-fetch'

export type Footer = { text: string; icon_url?: string; proxy_icon_url?: string }
export type Image = { url?: string; width?: number; height?: number; proxy_icon_url?: string }
export type Thumbnail = Image
export type Video = { url?: string; width?: number; height?: number }
export type Provider = { name?: string; url?: string }
export type Author = { name?: string; url?: string; icon_url?: string; proxy_icon_url?: string }
export type Field = { name: string; value: string; inline?: boolean }

export type Emote = { name?: string; snowflake?: string; content?: string }
export type Status = 'dnd' | 'online' | 'idle' | 'invisible'
export type CustomStatus = { text?: string; empji_id?: string, emoji_name?: string; expires_at?: string }

export type Settings = {
    afk_timeout?: number;
    allow_accessibility_detection?: boolean;
    animate_emoji?: boolean;
    animate_stickers?: number;
    contact_sync_enabled?: boolean;
    convert_emoticons?: boolean;
    custom_status?: CustomStatus;
    default_guilds_restricted?: boolean;
    detect_platform_accounts?: boolean;
    developer_mode?: boolean;
    disable_games_tab?: boolean;
    enable_tts_command?: boolean;
    explicit_content_filter?: number;
    friend_source_flags?: { mutal_friends?: boolean };
    gif_auto_play?: boolean;
    guild_folders?: {
        guild_ids: string[];
        id?: number;
        name?: string;
        color?: number;
    }[];
    guild_positions?: string[];
    inline_attachment_media?: boolean;
    inline_embed_media?: boolean;
    locale?: string;
    message_display_compact?: boolean;
    native_phone_integration_enabled?: boolean;
    render_embeds?: boolean;
    render_reactions?: boolean;
    restricted_guilds?: string[];
    show_current_game?: boolean;
    status?: Status;
    stream_notifications_enabled?: boolean;
    theme?: string;
    timezone_offset?: number;
}

export type RichMessage = {
    title?: string;
    type?: string;
    description?: string;
    url?: string;
    timestam?: any;
    color?: number;
    footer?: Footer;
    image?: Image;
    thumbnail?: Thumbnail;
    video?: Video;
    provider?: Provider;
    author?: Author;
    fields?: Field[];
}

export type EditRichMessage = {
    messageId?: string;
} & RichMessage

export type User = {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number

}
export type Attachment = {
    id: string;
    filename: string;
    size: number;
    url: string;
    proxy_url: string;
    width?: number;
    height?: number
}

export type Message = {
    id: string;
    type: number;
    content: string;
    channel_id: string;
    author: User;
    attachments: Attachment[];
    embeds: RichMessage[];
    mentions: User[];
    mention_roles: string[];
    pinned: boolean;
    mention_everyone: boolean;
    tts: boolean;
    timestamp: string;
    edited_timestamp?: string;
    flags: number;

    message?: string;
    code?: number;
}

export type MessageError = { message: string; code: number }

export default class DiscordUserApi {
    private channel: string
    private token: string
    private dev: boolean

    constructor({ channel, token, dev = false }: { channel: string; token: string; dev?: boolean }) {
        this.channel = channel
        this.token = token
        this.dev = dev
    }

    async sendRichMessage(embed: RichMessage = {}): Promise<Message> {
        return await nodeFetch(`https://canary.discord.com/api/v8/channels/${this.channel}/messages`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token,
                "content-type": "application/json"
            },
            "body": JSON.stringify({
                embed
            }),
            "method": "POST",
            "mode": "cors"
        }).then(body => body.json()).catch(this.debug)
    }

    async editRichMessage(embed: EditRichMessage = {}): Promise<Message> {
        return await nodeFetch(`https://canary.discord.com/api/v8/channels/${this.channel}/messages/${embed.messageId}`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token,
                "content-type": "application/json"
            },
            "body": JSON.stringify({
                embed
            }),
            "method": "PATCH",
            "mode": "cors"
        }).then(body => body.json()).catch(this.debug)
    }

    async getLastMessages({ limit = 50 }: { limit: number }): Promise<Message[]> {
        return await nodeFetch(`https://canary.discord.com/api/v8/channels/${this.channel}/messages?limit=${limit}`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token,
                "content-type": "application/json"
            },
            "method": "GET",
            "mode": "cors"
        }).then(body => body.json()).catch(this.debug)
    }

    async deleteMessage({ messageId }: { messageId: string }): Promise<any> {
        return await nodeFetch(`https://canary.discord.com/api/v8/channels/${this.channel}/messages/${messageId}`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token,
                "content-type": "application/json"
            },
            "method": "DELETE",
            "mode": "cors"
        }).catch(this.debug)
    }

    /**
     * 
     * It's a bit hacky... it tries to edit a message.
     * 
     * @param {string} messageId - id of the message
     */
    async getMessage({ messageId }: { messageId: string }): Promise<Message | MessageError> {
        return await nodeFetch(`https://canary.discord.com/api/v8/channels/${this.channel}/messages/${messageId}`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token,
                "content-type": "application/json"
            },
            "body": JSON.stringify({}),
            "method": "PATCH",
            "mode": "cors"
        }).then(body => body.json()).catch(this.debug)
    }

    async addReaction({ messageId, emote: { name, snowflake, content } = {} }: { messageId: string; emote?: Emote }): Promise<any> {
        return await nodeFetch(`https://canary.discord.com/api/v8/channels/${this.channel}/messages/${messageId}/reactions/${content || `${name}:${snowflake}`}/@me`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token
            },
            "method": "PUT",
            "mode": "cors"
        }).then(body => body.json()).catch(this.debug)
    }

    async removeReaction({ messageId, emote: { name, snowflake, content } = {} }: { messageId: string; emote?: Emote }): Promise<any> {
        return await nodeFetch(`https://canary.discord.com/api/v8/channels/${this.channel}/messages/${messageId}/reactions/${content || `${name}:${snowflake}`}/@me`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token
            },
            "method": "DELETE",
            "mode": "cors"
        }).then(body => body.json()).catch(this.debug)
    }

    async addReactions({ messageId, emotes = [] }: { messageId: string; emotes?: Emote[] }): Promise<any> {
        for (let emote of emotes) {
            await this.addReaction({ messageId, emote })
            await new Promise((res) => setTimeout(res, 50))
        }
    }

    async changeCustomStatus(custom_status: CustomStatus = {}): Promise<Settings> {
        return await this.changeSettings({
            custom_status
        })
    }

    async changeStatus(status: Status = 'dnd'): Promise<Settings> {
        return await this.changeSettings({
            status
        })
    }

    async changeSettings(settings: Settings = {}): Promise<Settings> {
        return await nodeFetch("https://canary.discord.com/api/v8/users/@me/settings", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token,
                "content-type": "application/json"
            },
            "body": JSON.stringify(settings),
            "method": 'PATCH',
            "mode": 'cors'
        }).then(body => body.json()).catch(this.debug)
    }

    debug(message) {
        console.log(message)
    }
}