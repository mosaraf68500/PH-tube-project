// create LoadCatagories
const LoadCatagories=()=>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res =>res.json())
    .then(data =>DisplayCatagories(data.categories))
    .catch(err => console.error(err));
};
// removeActiveClass

const removeActiveClass=()=>{
    const buttons=document.getElementsByClassName('btn_category');
    for(let i=0; i<buttons.length; i++){
        buttons[i].classList.remove('active');
    }
}
// loadCatagoryVideos function

const loadCatagoryVideos=(id)=>{
    // alert(id);

    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res =>res.json())
    .then(data =>{
        const active=document.getElementById(`btn-${id}`);

        removeActiveClass();
        // console.log(active);
        active.classList.add("active")
        displayVideo(data.category)
    })
    .catch(err => console.error(err));
};

// DisplayCatagories


const DisplayCatagories=(categories)=>{
    const categoryContainer=document.getElementById('categories');

    categories.forEach(item => {
        const buttonContainer=document.createElement('div');
        buttonContainer.innerHTML=
        `
        <button id="btn-${item.category_id}" onclick="loadCatagoryVideos(${item.category_id})" class=' btn btn_category'>

        ${item.category}

        </button>
        
        `
       
        categoryContainer.append(buttonContainer);

    });

};

// timing functions
const getTime=(time)=>{

    const hours=parseInt(time/3600);
    const remains=hours%3600;
    const minutes=parseInt(remains/60);
    const seconds=remains%60;
    return `${hours} hours, ${minutes} mins ${seconds} seconds`;
}
// video lodaer

const loadVideo=(searchText=" a")=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title= ${'searchText'}`)
    .then(res =>res.json())
    .then(data =>displayVideo(data.videos))
    .catch(err => console.error(err));

};


// details function

const details= async (videoId)=>{
    console.log(videoId);
    const uri=`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const response= await fetch(uri);
    const videoData= await response.json();
    // console.log(videoData);
    displayDetails(videoData)


}


// displayDetails function

const displayDetails=(video)=>
{
    // console.log(video);
    const modalContainer=document.getElementById("modal-content");
    modalContainer.innerHTML= `
    <img src= ${video.thumbnail} />
    <p>${video.description}</p>
    `;


    // document.getElementById('showModal').click();
    document.getElementById('custtom').showModal();
}

const displayVideo=(videos)=>{
    const videoContainer=document.getElementById('videos');
    videoContainer.innerHTML="";

    if(videos.length===0){
        videoContainer.classList.remove('grid')
        videoContainer.innerHTML=`<div class="min-h-[300px] text-center flex flex-col space-y-3 justify-center items-center ">
    <img src="./image/Icon.png" alt="">
    <h1 class="text-xl font-bold">Oops!! Sorry, There is no <br> content here...</h1>
   </div>`;
   return;
    }

    else{
        videoContainer.classList.add("grid");
    }

    videos.forEach(videos=>{
        const card=document.createElement('div');
        card.classList='card  shadow-xl';
        card.innerHTML=
        `
        <figure class="h-[200px] relative">
    <img class="w-full h-full object-cover"
      src=${videos.thumbnail}
      alt="Shoes" />

      ${videos.others.posted_date.length==0?"":`
            <span class="absolute right-1 bg-black text-white p-2 rounded bottom-3 text-xs ">${getTime(videos.others.posted_date)}</span>

      `}
  </figure>
   <div class="flex gap-3 py-3 pl-1 ">
    
        <div><img  class="w-[40px] h-[40px] rounded-full object-cover"  src=${videos.authors[0].profile_picture} alt=""></div>
       <div>
         <h3 class="font-bold text-lg">${videos.title}</h3>
         <div class='flex gap-5 items-center'>
            <p class="gray-400">${videos.authors[0].profile_name}</p>
            ${videos.authors[0].verified === true? `<img class='w-7' src='https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png' />
`: ''}


         </div>

         <div>
         <button onclick="details('${videos.video_id}')" class= "btn btn-xs  btn-error text-white"> details</button>
         </div>
       
    </div>
    

   </div>
        `
        videoContainer.append(card);

    });
}

document.getElementById('search-btn').addEventListener("keyup" ,(e)=>{

    // document.getElementById('search-btn').classList.remove("hidden");
    loadVideo(e.target.value);
})

LoadCatagories();
loadVideo();