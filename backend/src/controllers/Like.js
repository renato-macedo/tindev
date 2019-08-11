const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        console.log("Like like", req.io, req.connectedUsers);

        const { user } = req.headers;
        const { devId } = req.params;

        try {
            const loggedDev = await Dev.findById(user);
            const targetDev = await Dev.findById(devId);

            if (!targetDev) {
                return res.status(400).json({ error: 'Dev does not exists' });
            }
            
            if(targetDev.likes.includes(loggedDev._id)) {
                console.log(`I's a Match!!`);
                const loggedSocket = req.connectedUsers[user];
                const targetSocket = req.connectedUsers[devId];

                if (loggedSocket) {
                    req.io.to(loggedSocket).emit('match', targetDev);
                }
                if (targetSocket) {
                    req.io.to(targetSocket).emit('match', loggedDev);
                }
            }

            loggedDev.likes.push(targetDev._id);

            await loggedDev.save();

            return res.json(loggedDev); 


        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }
}