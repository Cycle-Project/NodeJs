const FriendRequest = require('../models/friend_request.js')

// all client.ids & user.ids will be placed in a set
const sockets = {}

module.exports = async (io, client) => {
    console.log(`Socket connected: ${client.id}`)
    /**
     * @description Client sends friend request to recipient
     * @param id user's id
     * 
     * If user joins succesfully
     * Then 
     *    -> server sends all friend requests as 'take-friend-request' to recipient
     */
    try {
        sockets[id] = client.id

        console.log('Socket Joined Network');

        const friendRequests = await FriendRequest.find({ recipient: id })
            .filter(e => e.status === 'pending')

        io.to(sockets[id])
            .emit(
                'take-friend-request',
                {
                    count: friendRequests.length,
                    senders: [...friendRequests.map(e => e.sender)],
                },
            )
    } catch (err) {
        console.error(err);
    }
    client.on('disconnect', () => {
        const index = Object.values(sockets).findIndex(e => e === client.id)
        const id = Object.keys(sockets).at(index)
        if (id) {
            delete sockets[id];
            console.log(`Socket disconnected: ${client.id}`);
        }
    })
    /**
     * @description Client sends friend request to recipient
     * @param senderId sender user's id
     * @param recipientId recipient user's id
     * 
     * If FirendRequest created successfully
     * Then server sends message as 'take-friend-request' to recipient
     */
    client.on('send-friend-request', async (senderId, recipientId) => {
        try {
            await FriendRequest.create({
                sender: senderId,
                recipient: recipientId,
                status: 'pending'
            });
            console.log('Friend request created');

            if (!sockets[recipientId]) {
                throw new Error('Recipient user is not active')
            }

            io.to(sockets[recipientId])
                .emit(
                    'take-friend-request',
                    {
                        count: 1,
                        senders: [senderId],
                    },
                )
            console.log('Friend request sended');

        } catch (err) {
            console.error(err);
        }
    });
    client.on('respond-friend-request', async (recipientId, senderId, response) => {
        try {
            await FriendRequest.deleteOne(
                { sender: senderId, recipient: recipientId },
            );

            io.to(senderId).emit('friend-request-response', { sender: senderId, response: response })

            console.log(`Friend request state is ${response}`);
        } catch (err) {
            console.error(err);
        }
    });
}