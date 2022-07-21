module.exports = async (channel, msg) => {
    try {
        const me = await channel.send(msg);
        return {ok: true, m: me, error: null};
    } catch (e) {
        return {ok: false, error: e, m: 'Message failed to send.'};
    };
};