function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};



var tagId = getUrlParameter('tag');

function getImagesAndAppendThem(arr){
    arr.forEach((img, key)=>{
        let imgDiv = document.createElement('div')
        imgDiv.classList.add('imgContainer')
        let imgClip = document.createElement('div')
        imgClip.classList.add('imgClip')
        let imgEl = document.createElement('img')
        imgEl.setAttribute('src','http://localhost:8081/'+img.url)
        let imgTitle = document.createElement('div')
        imgTitle.classList.add('imgTitle')
        imgTitle.innerHTML = `<span>${img.title}</span>`
        imgClip.append(imgEl,imgTitle)
        imgDiv.append(imgClip)

        switch(key % 3){
            case(0):
                document.querySelector(".column1").append(imgDiv)
                break
            case(1):
                document.querySelector(".column2").append(imgDiv)
                break
            case(2):
                document.querySelector(".column3").append(imgDiv)
                break
            default:
                break
            
        }

        if(document.querySelectorAll('.imgContainer').length % 12 == 0){
            let loadMoreBtn = document.createElement('button')
            loadMoreBtn.setAttribute('id','loadMoreBtn')
            loadMoreBtn.innerText = "Load more"
            let imgBox = document.querySelector('#imgGallery')
            imgBox.append(loadMoreBtn)
            loadMoreBtn = document.querySelector('#loadMoreBtn')
            loadMoreBtn.addEventListener('click', loadMore)
        }

        imgDiv.addEventListener('click',function(){
            let imgLightbox = document.createElement('div')
            imgLightbox.setAttribute('id','imgLightbox')
            let imgLightboxCloseBtn = document.createElement('div')
            imgLightboxCloseBtn.setAttribute('id','imgLightboxCloseBtn')
            let imgFullSize = document.createElement('img')
            imgFullSize.classList.add('imgFullRes')
            imgFullSize.setAttribute('src',imgEl.getAttribute('src'))
            let imgTitleFullLabel = document.createElement('span')
            imgTitleFullLabel.innerText = 'Title: ' 
            let imgTitleFull = document.createElement('span')
            imgTitleFull.classList.add('imgTitleFull')
            imgTitleFull.innerText = img.title
            let imgDescriptionLabel = document.createElement('span')
            imgDescriptionLabel.innerText = 'Description: ' 
            let imgDescription = document.createElement('span')
            imgDescription.classList.add('imgDescription')
            imgDescription.innerText = img.description
            let imgTagsDiv = document.createElement('div')
            imgTagsDiv.classList.add('imgTagsDiv')
            let imgTagsLabel = document.createElement('span')
            imgTagsLabel.innerText = "Tags: "
            let imgTags = document.createElement('div')
            img.tags.forEach(function(tag, key){
                let imgTagLink = document.createElement('a')
                imgTagLink.setAttribute('href',`./album.html?tag=${tag.id}`)
                imgTagLink.innerText = tag.name
                let imgLinkSeparator = document.createElement('span')
                imgLinkSeparator.innerText = ','
                imgTags.append(imgTagLink,imgLinkSeparator)
            })
            if(imgTags.lastChild.innerText == ','){
                imgTags.lastChild.remove()
            }
            imgTagsDiv.append(imgTagsLabel,imgTags)
            document.querySelector('.blackOverlay').classList.toggle('hidden')
            imgLightbox.append(imgLightboxCloseBtn,imgFullSize,imgTitleFull,imgDescription,imgTagsDiv)
            document.querySelector('.blackOverlay').append(imgLightbox)


        })

        
    })

}




const images = axios({
    method: 'get',
    url: `http://localhost:8081/api/images?tag=${tagId}`,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
})
.then(function(response){
    return response.data
})
.then(function(res){
    getImagesAndAppendThem(res)

    res[0].tags.forEach(function(tag){
        if(tag.id == tagId){
            var tagTitle = tag.name
            document.querySelector('h2').innerText = tagTitle
        }
    })

    /* document.querySelectorAll('.imgContainer img').forEach(function(imgBox){
        imgBox.addEventListener('click',function(){
            imgLightbox = document.createElement('div')
            imgLightbox.setAttribute('id','imgLightbox')
            imgFullSize = document.createElement('img')
            imgFullSize.classList.add('imgFullRes')
            imgFullSize.setAttribute('src',imgBox.getAttribute('src'))

            

        })
    }) */
})
/* .then(function(){
    
    var height = document.getElementById('imgGrid').clientHeight;
    console.log(height)
    document.getElementById('imgGallery').style.height = height
}) */
.catch(function(e){
    console.error(e)
})





  



  
  
  function loadMore(){
  this.remove()
  let loadingText = document.createElement('span')
  loadingText.innerText = "Loading..."
  loadingText.setAttribute('id','loadingText')
  document.querySelector('#imgGallery').append(loadingText)

  let amountOfImagesPresent = document.querySelectorAll('.imgContainer').length

  const images = axios({
      method: 'get',
      url: `http://localhost:8081/api/images?tag=${tagId}&offset=${amountOfImagesPresent}`,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    })
    .then(function(response){
      document.querySelector('#loadingText').remove()
      return response.data
    })
    .then(function(res){
        getImagesAndAppendThem(res)
    })

  
      
    .then(function(){
        if(document.querySelectorAll('.imgContainer').length % 12 == 0){
            let loadMoreBtn = document.createElement('button')
            loadMoreBtn.setAttribute('id','loadMoreBtn')
            loadMoreBtn.innerText = "Load more"
            let imgBox = document.querySelector('#imgGallery')
            imgBox.append(loadMoreBtn)
            loadMoreBtn = document.querySelector('#loadMoreBtn')
            loadMoreBtn.addEventListener('click', loadMore)
        }
    })
    .catch(function(e){
      console.error(e)
    })


}

document.querySelector('.blackOverlay').addEventListener('click',function(event){
    if(event.target.classList.contains("blackOverlay") || event.target.getAttribute('id') == 'imgLightboxCloseBtn'){
        document.querySelector('#imgLightbox').remove()
        document.querySelector('.blackOverlay').classList.toggle('hidden')
     }

})





