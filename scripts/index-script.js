const featured = axios({
    method: 'get',
    url: `http://localhost:8081/api/featured`,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
})
.then(function(response){
    return response.data
})
.then(function(res){

    res.forEach(function(album){
        let featuredBox = document.createElement('div')
        featuredBox.classList.add('featuredImgBox')
        featuredBox.innerHTML = `
        <a href="./album.html?tag=${album.id}">
        <div class="featuredImgTitle">
            <span>${album.name}</span>
        </div>
        <img src="http://localhost:8081/${album.image}" alt="">
        </a>`
        document.querySelector('#featuredImgFlex').append(featuredBox)
    })
})
.then(function(){
    let featuredImages = document.querySelectorAll('.featuredImgBox img')

    
    for(let i = 0, len = featuredImages.length; i < len; i++) {
        featuredImages[i].addEventListener('load', function() { 
        this.className += (this.width > this.height) ? ' landscape' : ' portrait';
    });
}
})
.catch(function(e){
    console.error(e)
})

