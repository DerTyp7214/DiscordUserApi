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

export type SettingsType = {
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
    public_flags: number;
}

export type Friend = {
    id: string;
    type: number;
    nickname: string;
    user: User;
}

export type ConnectedAccount = {
    type: string;
    id: string;
    name: string;
    verified: boolean;
}

export type AccountIntegration = {
    id: string;
    type: string;
    account: { id: string; name: string; };
    guild: { id: string; icon: string; name: string; };
}

export type PrivateConnectedAccount = ConnectedAccount & {
    revoked: boolean;
    visibility: number;
    friend_sync: boolean;
    show_activity: boolean;
    inegrations: AccountIntegration[];
    access_token?: string;
}

export type GuildUser = {
    id: string;
    nick: string;
}

export type UserProfile = {
    connected_accounts: ConnectedAccount[];
    mutal_guilds: GuildUser[];
    premium_guild_since: string;
    premium_since: string;
    user: User
}

export type Subscription = {
    canceled_at?: string;
    created_at: string;
    currency: string;
    current_period_end: string;
    current_period_start: string;
    id: string;
    items: {
        id: string;
        plan_id: string;
        quantity: number;
    }[];
    payment_gateway?: string;
    payment_gateway_plan_id: string;
    payment_source_id: string;
    plan_id: string;
    status: number;
    type: number;
}

export type BillingAddress = {
    city: string;
    country: string;
    line_1?: string;
    line_2?: string;
    name: string;
    postal_code: string;
    state?: string;
}

export type PaymentSource = {
    billing_address: BillingAddress;
    country: string;
    default: boolean;
    email: string;
    id: string;
    invalid: boolean;
    type: number;
}

export type ApplicationStat = {
    application_id: string;
    last_played_at: string;
    total_discord_sku_duration: number;
    total_duration: number;
}

export type Application = {
    description: string;
    hook: boolean;
    icon?: string;
    id: string;
    name: string;
    summary: string;
    verify_key: string;
}

export type Sku = {
    access_type: number;
    application: Application;
    application_id: string;
    dependent_sku_id?: string;
    features: any[];
    flags: number;
    id: string;
    manifest_labels?: string;
    name: string;
    premium?: any;
    release_date?: string;
    show_age_gate: boolean;
    slug: string;
    type: number;
}

export type Payment = {
    amount: number;
    amount_refunded: number;
    created_at: string;
    currency: string;
    description: string;
    flags: number;
    id: string;
    payment_source: PaymentSource;
    sku: Sku;
    sku_id: string;
    sku_amount: number;
    sku_subscription_plan_id: string;
    status: number;
    subscription: Subscription;
    tax: number;
    tax_inclusive: boolean;
}

export type Attachment = {
    id: string;
    filename: string;
    size: number;
    url: string;
    proxy_url: string;
    width?: number;
    height?: number;
}

export type MessageReference = {
    channel_id: string;
    guild_id?: string;
    message_id: string;
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
    message_reference?: MessageReference;
    referenced_message?: Message;
    tts: boolean;
    timestamp: string;
    edited_timestamp?: string;
    flags: number;

    message?: string;
    code?: number;
}

export type SendMessage = {
    type?: number;
    content?: string;
    attachments?: Attachment[];
    embeds?: RichMessage[];
    mentions?: User[];
    mention_roles?: string[];
    pinned?: boolean;
    mention_everyone?: boolean;
    message_reference?: MessageReference;
    referenced_message?: Message;
    tts?: boolean;
    flags?: number;
}

export type Profile = {
    avatar: string;
    discriminator: string;
    email: string;
    flags: number;
    id: string;
    locale: string;
    mfa_enabled: boolean;
    nsfw_allowed: boolean;
    phone: string;
    premium_type: number;
    public_flags: number;
    token: string;
    username: string;
    verified: boolean;
}

export type Note = {
    note: string;
    note_user_id: string;
    user_id: string;
}

export type DiscordError = { message: string; code: number }

export default class DiscordUserApi {
    private channel: string
    private token: string
    private dev: boolean

    public billing: Billing
    public activities: Activities
    public settings: Settings
    public users: Users
    public messages: Messages

    constructor({ channel, token, dev = false }: { channel: string; token: string; dev?: boolean }) {
        this.channel = channel
        this.token = token
        this.dev = dev

        this.billing = new Billing({ channel: this.channel, token: this.token, dev: this.dev })
        this.activities = new Activities({ channel: this.channel, token: this.token, dev: this.dev })
        this.settings = new Settings({ channel: this.channel, token: this.token, dev: this.dev })
        this.messages = new Messages({ channel: this.channel, token: this.token, dev: this.dev })
    }
}

class Billing {
    private channel: string
    private token: string
    private dev: boolean

    constructor({ channel, token, dev }) {
        this.channel = channel
        this.token = token
        this.dev = dev
    }

    async getSubscriptions(): Promise<Subscription[] & DiscordError> {
        return await nodeFetch(`https://canary.discord.com/api/v8/users/@me/billing/subscriptions`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token
            },
            "method": "GET",
            "mode": "cors"
        }).then(body => body.json()).catch(this.debug)
    }

    async getPaymentSources(): Promise<PaymentSource[] & DiscordError> {
        return await nodeFetch(`https://canary.discord.com/api/v8/users/@me/billing/payment-sources`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token
            },
            "method": "GET",
            "mode": "cors"
        }).then(body => body.json()).catch(this.debug)
    }

    async getPayments(limit: number = 20): Promise<Payment[] & DiscordError> {
        return await nodeFetch(`https://canary.discord.com/api/v8/users/@me/billing/payments?limit=${limit}`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token
            },
            "method": "GET",
            "mode": "cors"
        }).then(body => body.json()).catch(this.debug)
    }

    debug(message) {
        console.log(message)
    }
}

class Activities {
    private channel: string
    private token: string
    private dev: boolean

    constructor({ channel, token, dev }) {
        this.channel = channel
        this.token = token
        this.dev = dev
    }

    async getApplicationStats(): Promise<ApplicationStat[] & DiscordError> {
        return await nodeFetch(`https://canary.discord.com/api/v8/users/@me/activities/statistics/applications`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token
            },
            "method": "GET",
            "mode": "cors"
        }).then(body => body.json()).catch(this.debug)
    }

    debug(message) {
        console.log(message)
    }
}

class Settings {
    private channel: string
    private token: string
    private dev: boolean

    constructor({ channel, token, dev }) {
        this.channel = channel
        this.token = token
        this.dev = dev
    }

    async changeCustomStatus(custom_status: CustomStatus = {}): Promise<SettingsType & DiscordError> {
        return await this.changeSettings({
            custom_status
        })
    }

    async changeStatus(status: Status = 'dnd'): Promise<SettingsType & DiscordError> {
        return await this.changeSettings({
            status
        })
    }

    async changeSettings(settings: SettingsType = {}): Promise<SettingsType & DiscordError> {
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

    async getSettings(): Promise<SettingsType & DiscordError> {
        return await nodeFetch("https://canary.discord.com/api/v8/users/@me/settings", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token,
                "content-type": "application/json"
            },
            "method": 'GET',
            "mode": 'cors'
        }).then(body => body.json()).catch(this.debug)
    }

    debug(message) {
        console.log(message)
    }
}

class Users {
    private channel: string
    private token: string
    private dev: boolean

    constructor({ channel, token, dev }) {
        this.channel = channel
        this.token = token
        this.dev = dev
    }

    /**
     * @param {string} avatar - base64 image
     */
    async changeProfilePicture(avatar: string): Promise<Profile & DiscordError> {
        return await nodeFetch("https://canary.discord.com/api/v8/users/@me", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token,
                "content-type": "application/json"
            },
            "body": JSON.stringify({
                avatar
            }),
            "method": "PATCH",
            "mode": "cors"
        }).then(body => body.json()).catch(this.debug)
    }

    async getProfile(): Promise<Profile & DiscordError> {
        return await nodeFetch("https://canary.discord.com/api/v8/users/@me", {
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

    async getFriends(): Promise<Friend[] & DiscordError> {
        return await nodeFetch("https://canary.discord.com/api/v8/users/@me/relationships", {
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

    async getUserProfile(userId: string): Promise<UserProfile & DiscordError> {
        return await nodeFetch(`https://canary.discord.com/api/v8/users/${userId}/profile`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token
            },
            "method": "GET",
            "mode": "cors"
        }).then(body => body.json()).catch(this.debug)
    }

    async getRelationships(userId: string): Promise<User[] & DiscordError> {
        return await nodeFetch(`https://canary.discord.com/api/v8/users/${userId}/relationships`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token
            },
            "method": "GET",
            "mode": "cors"
        }).then(body => body.json()).catch(this.debug)
    }

    async getNotes(userId: string): Promise<Note & DiscordError> {
        return await nodeFetch(`https://canary.discord.com/api/v8/users/@me/notes/${userId}`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token
            },
            "method": "GET",
            "mode": "cors"
        }).then(body => body.json()).catch(this.debug)
    }

    async getConnections(): Promise<PrivateConnectedAccount[] & DiscordError> {
        return await nodeFetch(`https://canary.discord.com/api/v8/users/@me/connections`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token
            },
            "method": "GET",
            "mode": "cors"
        }).then(body => body.json()).catch(this.debug)
    }

    debug(message) {
        console.log(message)
    }
}

class Messages {
    private channel: string
    private token: string
    private dev: boolean

    constructor({ channel, token, dev }) {
        this.channel = channel
        this.token = token
        this.dev = dev
    }

    async sendRichMessage(embed: RichMessage = {}): Promise<Message & DiscordError> {
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

    async editRichMessage(embed: EditRichMessage = {}): Promise<Message & DiscordError> {
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

    async getLastMessages({ limit = 50 }: { limit: number }): Promise<Message[] & DiscordError> {
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
     * @warning not working currently
     */
    async bulkDeleteMessages(messageIds: string[]): Promise<any> {
        if (messageIds.length === 1) return await this.deleteMessage({ messageId: messageIds[0] })
        return await nodeFetch(`https://canary.discord.com/api/v8/channels/${this.channel}/messages/bulk-delete`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token,
                "content-type": "application/json"
            },
            "body": JSON.stringify({ messages: messageIds }),
            "method": "POST",
            "mode": "cors"
        }).catch(this.debug)
    }

    /**
     * 
     * It's a bit hacky... it tries to edit a message.
     * 
     * @param {string} messageId - id of the message
     */
    async getMessage({ messageId }: { messageId: string }): Promise<Message & DiscordError> {
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

    async pinMessage({ messageId }: { messageId: string }): Promise<any & DiscordError> {
        return await nodeFetch(`https://canary.discord.com/api/v8/channels/${this.channel}/pins/${messageId}`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token,
            },
            "method": "PUT",
            "mode": "cors"
        }).catch(this.debug)
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

    async reply(body: SendMessage = {}): Promise<Message & DiscordError> {
        return await nodeFetch(`https://canary.discord.com/api/v8/channels/${this.channel}/messages`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token,
                "content-type": "application/json"
            },
            "body": JSON.stringify(body),
            "method": "POST",
            "mode": "cors"
        }).then(body => body.json()).catch(this.debug)
    }

    /**
     * @param {string} token - this is the token the function returned last time. Can be null
     */
    async ack({ messageId, token }: { messageId: string; token?: string }): Promise<{ token: string } & DiscordError> {
        return await nodeFetch(`https://canary.discord.com/api/v8/channels/${this.channel}/messages/${messageId}/ack`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token,
                "content-type": "application/json"
            },
            "body": JSON.stringify({
                token
            }),
            "method": "POST",
            "mode": "cors"
        }).then(body => body.json()).catch(this.debug)
    }

    debug(message) {
        console.log(message)
    }
}