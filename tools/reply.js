module.exports = async (m, rep) => {
    try {
        const me = await m.reply(rep);
        return {ok: true, m: me, error: null};
    } catch (e) {
        return {ok: false, error: e, m: 'Reply failed.'};
    };
};