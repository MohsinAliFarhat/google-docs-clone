const DocumentModel = require('@models/Document.model');

exports.realTimeDocumentCollaboration = async function (server) {
    const io = require("socket.io")(server, {
        cors: {
            origin: "*"
        },
        methods:['GET','POST']
    });

    io.on('connection', socket => {
                
        socket.on('get-document',async documentId => {
            
            const document = await DocumentModel.findOne({_id:documentId});            
            
            socket.join(documentId);
            
            socket.emit('load-document', document.content);
            
            socket.on('send-changes', delta => {
                socket.broadcast.to(documentId).emit('recieve-changes',delta);
            })
            
            socket.on('save-document',async data => {
                console.log(`${new Date()} -> ${JSON.stringify(data)}`)
                await DocumentModel.findOneAndUpdate({_id:documentId}, {content:data})
            })
        })

    })
}