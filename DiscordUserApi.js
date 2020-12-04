const nodeFetch = require('node-fetch')

module.exports = class DiscordUserApi {
    guild
    token
    dev

    billing
    activities
    settings
    users
    messages

    constructor({ guild, token, dev = false }) {
        this.guild = guild
        this.token = token
        this.dev = dev

        this.billing = new Billing({ guild: this.guild, token: this.token, dev: this.dev })
        this.activities = new Activities({ guild: this.guild, token: this.token, dev: this.dev })
        this.settings = new Settings({ guild: this.guild, token: this.token, dev: this.dev })
        this.users = new Users({ guild: this.guild, token: this.token, dev: this.dev })
        this.messages = new Messages({ guild: this.guild, token: this.token, dev: this.dev })
    }
}

class Billing {
    guild
    token
    dev

    constructor({ guild, token, dev }) {
        this.guild = guild
        this.token = token
        this.dev = dev
    }

    async getSubscriptions() {
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

    async getPaymentSources() {
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

    async getPayments(limit = 20) {
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
    guild
    token
    dev

    constructor({ guild, token, dev }) {
        this.guild = guild
        this.token = token
        this.dev = dev
    }

    async getApplicationStats() {
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
    guild
    token
    dev

    constructor({ guild, token, dev }) {
        this.guild = guild
        this.token = token
        this.dev = dev
    }

    async changeCustomStatus(custom_status = {}) {
        return await this.changeSettings({
            custom_status
        })
    }

    async changeStatus(status = 'dnd') {
        return await this.changeSettings({
            status
        })
    }

    async changeSettings(settings = {}) {
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

    async getSettings() {
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

    async nick(nick) {
        return await nodeFetch(`https://canary.discord.com/api/v8/guilds/${this.guild}/members/@me/nick`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token,
                "content-type": "application/json"
            },
            "body": JSON.stringify({
                nick: nick
            }),
            "method": "PATCH",
            "mode": "cors"
        }).then(body => body.json()).catch(this.debug)
    }

    debug(message) {
        console.log(message)
    }
}

class Users {
    guild
    token
    dev

    constructor({ guild, token, dev }) {
        this.guild = guild
        this.token = token
        this.dev = dev
    }

    /**
     * @param {string} avatar - base64 image
     */
    async changeProfilePicture(avatar) {
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

    async getProfile() {
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

    async getFriends() {
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

    async getUserProfile(userId) {
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

    async getRelationships(userId) {
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

    async getNotes(userId) {
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

    async getConnections() {
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
    guild
    token
    dev

    constructor({ guild, token, dev }) {
        this.guild = guild
        this.token = token
        this.dev = dev
    }

    async sendRichMessage(embed = {}) {
        return await nodeFetch(`https://canary.discord.com/api/v8/channels/${this.guild}/messages`, {
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

    async editRichMessage(embed = {}) {
        return await nodeFetch(`https://canary.discord.com/api/v8/channels/${this.guild}/messages/${embed.messageId}`, {
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

    async getLastMessages({ limit = 50 }) {
        return await nodeFetch(`https://canary.discord.com/api/v8/channels/${this.guild}/messages?limit=${limit}`, {
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

    async deleteMessage({ messageId }) {
        return await nodeFetch(`https://canary.discord.com/api/v8/channels/${this.guild}/messages/${messageId}`, {
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
    async bulkDeleteMessages(messageIds) {
        if (messageIds.length === 1) return await this.deleteMessage({ messageId: messageIds[0] })
        return await nodeFetch(`https://canary.discord.com/api/v8/channels/${this.guild}/messages/bulk-delete`, {
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
    async getMessage({ messageId }) {
        return await nodeFetch(`https://canary.discord.com/api/v8/channels/${this.guild}/messages/${messageId}`, {
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

    async pinMessage({ messageId }) {
        return await nodeFetch(`https://canary.discord.com/api/v8/channels/${this.guild}/pins/${messageId}`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token,
            },
            "method": "PUT",
            "mode": "cors"
        }).catch(this.debug)
    }

    async addReaction({ messageId, emote: { name, snowflake, content } = {} }) {
        return await nodeFetch(`https://canary.discord.com/api/v8/channels/${this.guild}/messages/${messageId}/reactions/${content || `${name}:${snowflake}`}/@me`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token
            },
            "method": "PUT",
            "mode": "cors"
        }).then(body => body.json()).catch(this.debug)
    }

    async removeReaction({ messageId, emote: { name, snowflake, content } = {} }) {
        return await nodeFetch(`https://canary.discord.com/api/v8/channels/${this.guild}/messages/${messageId}/reactions/${content || `${name}:${snowflake}`}/@me`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token
            },
            "method": "DELETE",
            "mode": "cors"
        }).then(body => body.json()).catch(this.debug)
    }

    async addReactions({ messageId, emotes = [] }) {
        for (let emote of emotes) {
            await this.addReaction({ messageId, emote })
            await new Promise((res) => setTimeout(res, 50))
        }
    }

    async reply(body = {}) {
        return await nodeFetch(`https://canary.discord.com/api/v8/channels/${this.guild}/messages`, {
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
    async ack({ messageId, token }) {
        return await nodeFetch(`https://canary.discord.com/api/v8/channels/${this.guild}/messages/${messageId}/ack`, {
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

    async pins(channel) {
        return await nodeFetch(`https://canary.discord.com/api/v8/channels/${channel}/pins`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token,
            },
            "method": "GET",
            "mode": "cors"
        }).then(body => body.json()).catch(this.debug)
    }

    debug(message) {
        console.log(message)
    }
}