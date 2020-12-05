const nodeFetch = require('node-fetch')

module.exports = class DiscordUserApi {
    guild
    token
    dev

    billing
    activities
    settings
    users

    constructor({ guild, token, dev = false }) {
        this.guild = guild
        this.token = token
        this.dev = dev

        this.billing = new Billing({ guild: this.guild, token: this.token, dev: this.dev })
        this.activities = new Activities({ guild: this.guild, token: this.token, dev: this.dev })
        this.settings = new Settings({ guild: this.guild, token: this.token, dev: this.dev })
        this.users = new Users({ guild: this.guild, token: this.token, dev: this.dev })
    }

    getMessages(channelId) {
        return new Messages({ guild: this.guild, channel: channelId, token: this.token, dev: this.dev })
    }

    getChannel(channelId) {
        return new Channel({ guild: this.guild, channel: channelId, token: this.token, dev: this.dev })
    }

    async login(email, password, captcha_key) {
        return await nodeFetch(`https://canary.discord.com/api/v8/auth/login`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "content-type": "application/json",
                "authorization": this.token
            },
            "body": JSON.stringify({
                email,
                password,
                captcha_key,
                undelete: false
            }),
            "method": "POST",
            "mode": "cors"
        }).then(body => body.json()).catch(this.debug)
    }

    async getRecaptcha({ port = 18742, openUrl = false, openUrlCallback = () => { }, sitekey = '6Lef5iQTAAAAAKeIvIY-DeexoO3gj7ryl9rLMEnn' }) {
        return await nodeFetch(`https://recaptcha.net/recaptcha/api.js?render=explicit&onload=onload`).then(async body => {
            const html = `<script>${await body.text()}</script><div class="g-recaptcha"></div><script>var onload = function () {grecaptcha.render(document.getElementsByClassName('g-recaptcha')[0], { sitekey: '${sitekey}', theme: 'dark', callback: res => fetch(\`http://localhost:${port}/\${res}\`).then(window.close) }) } </script>`
            return new Promise((resolve) => {
                const http = require('http')
                let server
                let server2
                server = http.createServer((req, res) => {
                    res.writeHeader(200, { 'content-type': 'text/html', 'Access-Control-Allow-Origin': '*' })
                    resolve(req.url.substr(1))
                    res.end()
                    server2.close()
                    server.close()
                })
                server2 = http.createServer((req, res) => {
                    res.writeHeader(200, { 'content-type': 'text/html', 'Access-Control-Allow-Origin': '*' })
                    res.write(html)
                    res.end()
                })
                server2.listen(port - 1)
                server.listen(port)
                if (openUrl) require('openurl').open(`http://localhost:${port - 1}`)
                else openUrlCallback(`http://localhost:${port - 1}`)
            })
        }).catch(this.debug)
    }

    async mfa(code, ticket) {
        return await nodeFetch(`https://canary.discord.com/api/v8/auth/mfa/totp`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "content-type": "application/json"
            },
            "body": JSON.stringify({
                code,
                ticket
            }),
            "method": "POST",
            "mode": "cors"
        }).then(body => body.json()).catch(this.debug)
    }

    setToken(token) {
        this.token = token

        this.billing = new Billing({ guild: this.guild, token: this.token, dev: this.dev })
        this.activities = new Activities({ guild: this.guild, token: this.token, dev: this.dev })
        this.settings = new Settings({ guild: this.guild, token: this.token, dev: this.dev })
        this.users = new Users({ guild: this.guild, token: this.token, dev: this.dev })
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

    async getAuditLog(limit = 50) {
        return await nodeFetch(`https://canary.discord.com/api/v8/guilds/${this.guild}/audit-logs?limit=${limit}`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token
            },
            "body": null,
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

    async getNick() {
        return await nodeFetch(`https://canary.discord.com/api/v8/guilds/${this.guild}/members/@me/nick`, {
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

    async patchUser({ userId, channel_id, mute, deaf, roles, nick }) {
        return await nodeFetch(`https://canary.discord.com/api/v8/guilds/${this.guild}/members/${userId}`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token,
                "content-type": "application/json"
            },
            "body": JSON.stringify({
                channel_id,
                mute,
                deaf,
                roles,
                nick
            }),
            "method": "PATCH",
            "mode": "cors"
        }).then(body => body.json()).catch(this.debug)
    }

    async getUser(userId) {
        return await nodeFetch(`https://canary.discord.com/api/v8/guilds/${this.guild}/members/${userId}`, {
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

    async createDm(userId) {
        return await nodeFetch(`https://canary.discord.com/api/v8/users/@me/channels`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token,
                "content-type": "application/json"
            },
            "body": JSON.stringify({
                recipient_id: userId
            }),
            "method": "POST",
            "mode": "cors"
        }).then(body => body.json()).catch(this.debug)
    }

    debug(message) {
        console.log(message)
    }
}

class Messages {
    guild
    channel
    token
    dev

    constructor({ guild, channel, token, dev }) {
        this.guild = guild
        this.channel = channel
        this.token = token
        this.dev = dev
    }

    async sendMessage(message = {}) {
        return await nodeFetch(`https://canary.discord.com/api/v8/channels/${this.channel}/messages`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token,
                "content-type": "application/json"
            },
            "body": JSON.stringify(message),
            "method": "POST",
            "mode": "cors"
        }).then(body => body.json()).catch(this.debug)
    }

    async editMessage(message = {}) {
        return await nodeFetch(`https://canary.discord.com/api/v8/channels/${this.channel}/messages/${embed.messageId}`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token,
                "content-type": "application/json"
            },
            "body": JSON.stringify(message),
            "method": "PATCH",
            "mode": "cors"
        }).then(body => body.json()).catch(this.debug)
    }

    async getLastMessages({ limit = 50 } = {}) {
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

    async deleteMessage({ messageId }) {
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
    async bulkDeleteMessages(messageIds) {
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
    async getMessage({ messageId }) {
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

    async pinMessage({ messageId }) {
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

    async addReaction({ messageId, emote: { name, snowflake, content } = {} }) {
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

    async removeReaction({ messageId, emote: { name, snowflake, content } = {} }) {
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

    async addReactions({ messageId, emotes = [] }) {
        for (let emote of emotes) {
            await this.addReaction({ messageId, emote })
            await new Promise((res) => setTimeout(res, 50))
        }
    }

    async reply(body = {}) {
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
    async ack({ messageId, token }) {
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

class Channel {
    guild
    token
    channelId
    dev

    constructor({ guild, channel, token, dev }) {
        this.guild = guild
        this.token = token
        this.channelId = channel
        this.dev = dev
    }

    async patchChannelSettings(body) {
        return await nodeFetch(`https://canary.discord.com/api/v8/channels/${this.channelId}`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": this.token,
                "content-type": "application/json"
            },
            "body": JSON.stringify(body),
            "method": "PATCH",
            "mode": "cors"
        }).then(body => body.json()).catch(this.debug)
    }

    async getChannelSettings() {
        return await nodeFetch(`https://canary.discord.com/api/v8/channels/${this.channelId}`, {
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

    async pins() {
        return await nodeFetch(`https://canary.discord.com/api/v8/channels/${this.channelId}/pins`, {
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