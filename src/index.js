import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const ORIGINAL_KEY = "34460508-cc58cb9444491fbdacc392544";
const BASE_URL = "https://pixabay.com"
const showGallery = document.querySelector('.gallery');
const searchInput = document.querySelector('input[name="searchQuery"]');
const submitBtn = document.querySelector('.search-form button[type="submit"]');
const loadBtn = document.querySelector('.load-more');

submitBtn.addEventListener('click', (e) => {
  try {
    e.preventDefault()
    showGallery.innerHTML = '';
    let page = 1;
    const request = searchInput.value;
    // console.log(searchInput.value);
    // getPictures(request)
    getPictures(request, page)




    
    loadBtn.addEventListener('click', () => {
      getPictures(request, page += 1)
    });
  }
  catch (error) { 
    // Notify.failure("error", error);
  }
})




function getPictures(request, page) {
  fetch(`${BASE_URL}/api/?key=${ORIGINAL_KEY}&q=${request}&page=${page}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`)
    .then(response => {
      if (!response.ok) {
        throw new Error(
          response.status);
      }
      return response.json();
    })
    .then(data => {
      // console.log(data)
      if (data.total === 0) {
        return Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      } else {
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
       
        // showGallery.innerHTML = data.hits.map(showCard).join('');
        showGallery.insertAdjacentHTML('beforeend', data.hits.map(showCard).join(''));
           if (data.totalHits > 40) {
            loadBtn.hidden = false;
          }
        }
      
    })
  .catch( error => { console.log("WOW!!!!", error);})
}

// ------------------------

function showCard(element) {
  // showGallery.innerHTML = '';
    return `<div class="photo-card grid__item">
  <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy" height="auto" width="100%"/>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${element.likes}
    </p>
    <p class="info-item">
      <b>Views</b>${element.views}
    </p>
    <p class="info-item">
      <b>Comments</b>${element.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${element.downloads}
    </p>
  </div>
</div>`
};
