const form = document.getElementById('form')

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    let data = new FormData(form);
    let title = data.get('title')
    let price = data.get('price')
    
    let obj = {
        title,
        price
    };
    // data.forEach((value,key)=>obj[key]=value)

    fetch('/api/productos',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(result=>result.json()).then(json=>console.log(json));
})