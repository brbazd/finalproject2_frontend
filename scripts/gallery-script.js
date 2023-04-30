const featured = axios({
    method: 'get',
    url: `http://localhost:8081/api/gallery`,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
})
.then(function(response){
    return response.data
})
.then(function(res){

    res.forEach(function(album){
        if (album.image == null){
            return;
        }
        let albumBox = document.createElement('div')
        albumBox.classList.add('albumBox')
        albumBox.innerHTML = `
        <a href="./album.html?tag=${album.id}">
        <div class="albumTitle">
            <span>${album.name}</span>
        </div>
        <img src="http://localhost:8081/${album.image}" alt="">
        </a>`
        document.querySelector('#imgGrid').append(albumBox)
    })
})
.then(function(){
    let featuredImages = document.querySelectorAll('.albumBox img')

    for(let i = 0, len = featuredImages.length; i < len; i++) {
        featuredImages[i].addEventListener('load', function() { 
        this.className += (this.width > this.height) ? ' landscape' : ' portrait';
    });
}
})
.catch(function(e){
    console.error(e)
})