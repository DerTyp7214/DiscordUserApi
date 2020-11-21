export = DiscordUserApi

declare type Footer = {
    text: string;
    icon_url?: string;
    proxy_icon_url?: string
}

declare type Image = {
    url?: string;
    width?: number;
    height?: number;
    proxy_icon_url?: string
}

declare type Thumbnail = Image

declare type Video = {
    url?: string;
    width?: number;
    height?: number
}

declare type Provider = {
    name?: string;
    url?: string
}

declare type Author = {
    name?: string;
    url?: string;
    icon_url?: string;
    proxy_icon_url?: string
}

declare type Field = {
    name: string;
    value: string;
    inline?: boolean
}

declare type Emote = {
    name?: string;
    snowflake?: string;
    content?: string
}

declare type Status = 'dnd' | 'online' | 'idle' | 'invisible'

declare type CustomStatus = {
    text?: string;
    empji_id?: string, emoji_name?: string;
    expires_at?: string
}

declare type SettingsType = {
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

declare type RichMessage = {
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

declare type EditRichMessage = {
    messageId?: string;
} & RichMessage

declare type User = {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
}

declare type Friend = {
    id: string;
    type: number;
    nickname: string;
    user: User;
}

declare type ConnectedAccount = {
    type: string;
    id: string;
    name: string;
    verified: boolean;
}

declare type AccountIntegration = {
    id: string;
    type: string;
    account: { id: string; name: string; };
    guild: { id: string; icon: string; name: string; };
}

declare type PrivateConnectedAccount = ConnectedAccount & {
    revoked: boolean;
    visibility: number;
    friend_sync: boolean;
    show_activity: boolean;
    inegrations: AccountIntegration[];
    access_token?: string;
}

declare type GuildUser = {
    id: string;
    nick: string;
}

declare type UserProfile = {
    connected_accounts: ConnectedAccount[];
    mutal_guilds: GuildUser[];
    premium_guild_since: string;
    premium_since: string;
    user: User
}

declare type Subscription = {
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

declare type BillingAddress = {
    city: string;
    country: string;
    line_1?: string;
    line_2?: string;
    name: string;
    postal_code: string;
    state?: string;
}

declare type PaymentSource = {
    billing_address: BillingAddress;
    country: string;
    default: boolean;
    email: string;
    id: string;
    invalid: boolean;
    type: number;
}

declare type ApplicationStat = {
    application_id: string;
    last_played_at: string;
    total_discord_sku_duration: number;
    total_duration: number;
}

declare type Application = {
    description: string;
    hook: boolean;
    icon?: string;
    id: string;
    name: string;
    summary: string;
    verify_key: string;
}

declare type Sku = {
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

declare type Payment = {
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

declare type Attachment = {
    id: string;
    filename: string;
    size: number;
    url: string;
    proxy_url: string;
    width?: number;
    height?: number;
}

declare type MessageReference = {
    channel_id: string;
    guild_id?: string;
    message_id: string;
}

declare type Message = {
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

declare type SendMessage = {
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

declare type Profile = {
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

declare type Note = {
    note: string;
    note_user_id: string;
    user_id: string;
}

declare type DiscordError = {
    message: string;
    code: number
}

declare class DiscordUserApi {
    private channel: string
    private token: string
    private dev: boolean

    public billing: Billing
    public activities: Activities
    public settings: Settings
    public users: Users
    public messages: Messages

    constructor({ channel, token, dev }: { channel: string; token: string; dev?: boolean })
}

declare class Billing {
    private channel: string
    private token: string
    private dev: boolean

    constructor({ channel, token, dev })

    getSubscriptions(): Promise<Subscription[] & DiscordError>
    getPaymentSources(): Promise<PaymentSource[] & DiscordError>
    getPayments(limit: number): Promise<Payment[] & DiscordError>
}

declare class Activities {
    private channel: string
    private token: string
    private dev: boolean

    constructor({ channel, token, dev })

    getApplicationStats(): Promise<ApplicationStat[] & DiscordError>
}

declare class Settings {
    private channel: string
    private token: string
    private dev: boolean

    constructor({ channel, token, dev })

    changeCustomStatus(custom_status: CustomStatus): Promise<SettingsType & DiscordError>
    changeStatus(status: Status): Promise<SettingsType & DiscordError>
    changeSettings(settings: SettingsType): Promise<SettingsType & DiscordError>
    getSettings(): Promise<SettingsType & DiscordError>
}

declare class Users {
    private channel: string
    private token: string
    private dev: boolean

    constructor({ channel, token, dev })

    changeProfilePicture(avatar: string): Promise<Profile & DiscordError>
    getProfile(): Promise<Profile & DiscordError>
    getFriends(): Promise<Friend[] & DiscordError>
    getUserProfile(userId: string): Promise<UserProfile & DiscordError>
    getRelationships(userId: string): Promise<User[] & DiscordError>
    getNotes(userId: string): Promise<Note & DiscordError>
    getConnections(): Promise<PrivateConnectedAccount[] & DiscordError>
}

declare class Messages {
    private channel: string
    private token: string
    private dev: boolean

    constructor({ channel, token, dev })

    sendRichMessage(embed: RichMessage): Promise<Message & DiscordError>
    editRichMessage(embed: EditRichMessage): Promise<Message & DiscordError>
    getLastMessages({ limit }: { limit: number }): Promise<Message[] & DiscordError>
    deleteMessage({ messageId }: { messageId: string }): Promise<any>
    bulkDeleteMessages(messageIds: string[]): Promise<any>
    getMessage({ messageId }: { messageId: string }): Promise<Message & DiscordError>
    pinMessage({ messageId }: { messageId: string }): Promise<any & DiscordError>
    addReaction({ messageId, emote: { name, snowflake, content } }: { messageId: string; emote?: Emote }): Promise<any>
    removeReaction({ messageId, emote: { name, snowflake, content } }: { messageId: string; emote?: Emote }): Promise<any>
    addReactions({ messageId, emotes }: { messageId: string; emotes?: Emote[] }): Promise<any>
    reply(body: SendMessage): Promise<Message & DiscordError>
    ack({ messageId, token }: { messageId: string; token?: string }): Promise<{ token: string } & DiscordError>
}