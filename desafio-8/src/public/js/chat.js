const chat = document.getElementById('chat')
const chatInput = document.getElementById('chatInput')

const socket = io({
    autoConnect:false
})

let mail

Swal.fire({
    title:"Identifícate",
    input:'text',
    text:"Ingresa el email que tendrás en el chat",
    inputPlaceholder: 'Enter your email addres',
    inputValidator: (value) =>{
        return !value && "¡Necesitas colocar un mail válido para proseguir!"
    },
    allowOutsideClick:false,
    allowEscapeKey : false
}).then(result =>{
    mail = result.value;
    socket.connect()
    socket.emit('authenticated', mail)
})

chatInput.addEventListener('keyup',evt=>{
    let fecha = new Date().toLocaleString()
    if(evt.key==="Enter"){
        if(chatInput.value.trim().length>0){
            socket.emit('message',{mail,fecha:fecha, message:chatInput.value.trim()})
        }
    }
})

socket.on('logs', data => {
    let message = ''
    data.forEach(e => {
        message += `
        <p><span class="span-email">${e.mail}</span> <span class="span-fecha">[${e.fecha}]</span> : <span class="span-mensaje">${e.message}</span></p>
        `
       
    });
    chat.innerHTML = message
})

socket.on('newUserConnected', data => {
    if(!mail) return;
    Swal.fire({
        toast:true,
        position:'top-end',
        showConfirmButton:false,
        timer:2000,
        title:`${data} se ha unido al chat`,
        icon:'success'
    })
})