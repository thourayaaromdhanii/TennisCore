let io ;
module.exports={
    init:httpserveur =>{
        io=require('socket.io')(httpserveur)
        return io;
    },
    getio:()=>{
if (!io) {
    throw new Error('socket err');
}
return io ;
    }
}