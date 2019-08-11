const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const { user } = req.headers;
        const { devId } = req.params;


        try {
            const loggedDev = await Dev.findById(user);
            const targetDev = await Dev.findById(devId);

            if (!targetDev) {
                return res.status(400).json({ error: 'Dev does not exists' });
            }

            loggedDev.dislikes.push(targetDev._id);

            await loggedDev.save();

            return res.json(loggedDev); 


        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }
}