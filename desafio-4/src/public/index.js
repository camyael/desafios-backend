const form = document.getElementById('form')

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    let data = new FormData(form);

    fetch('/api/productos',{
        method:'POST',
        body:data
    }).then(result=>result.json()).then(json=>console.log(json));
})