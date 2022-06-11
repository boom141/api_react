import React, {useState, useEffect} from 'react';
import $ from 'jquery'
import './App.css';


function App() {
const [Display, setDisplay] = useState(false)

function Search(){
  $('#coverImg').remove()
  setNullDisplay(false)

  const settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://deezerdevs-deezer.p.rapidapi.com/search?q=${$('#Artist').val()}`,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      "x-rapidapi-key": "dc442761d8msh1fcd90e778bfcc9p151123jsn1bf7d6b7dfaf"
    }
  }

   $('.MusicChart').load(window.location.href + ' .MusicChart' ) 
   setDisplay(true) 
     $.ajax(settings).done(res =>{
     try {
      $('.MusicChart').css({'grid-template-rows': `repeat(${Math.floor(res.data.length/3)+1}, 15rem)`})
      MakeSong(res.data)    
     }catch (error) {       
     }finally{
      setDisplay(false)
          console.log("Success")
     }    
  })
}
  
 
  function MakeSong(response){   
    if(response.length === 0){
      alert("can't find track")
    }

    console.log(response.length) 
    response.forEach(element=>{  
      var container = document.createElement('div')
          container.classList.add('MusicCon')
      var songCover = document.createElement('img')
          songCover.classList.add('img')
          songCover.setAttribute('src', element.album.cover)

      var preView = document.createElement('AUDIO')
          preView.classList.add('preview')
          preView.controls = 'controls'
          preView.type = 'audi0/mpeg'
          preView.src = element.preview   

      var  mtitle = document.createElement('h1')
           mtitle.classList.add('title')
           mtitle.innerText = element.album.title

      var  ArtistName = document.createElement('h1')
           ArtistName.classList.add('Artist_name')
           ArtistName.innerText = element.artist.name

           container.appendChild(songCover)
           container.appendChild(mtitle)
           container.appendChild(ArtistName)
           container.appendChild(preView)
           $('.MusicChart').append(container)

   })
  }


 return(
   <div className='main'>
      <div className='header'>Music Application
      <div className='search-con'><input type="text" placeholder='Search artist...' id="Artist" />
      <button onClick={Search} id="btn-search">SEARCH</button></div>
      </div>
      <div className="MusicChart">
         <img className={Display ? "loadSplash" : "unloadSplash"} src={require('./spinning-loading.gif')} alt="" /> 
      </div>
       <img id="coverImg" src={require('./Group 1.png')} alt="" />
   </div>
 )
}

export default App;
