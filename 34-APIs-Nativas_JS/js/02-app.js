document.addEventListener('DOMContentLoaded',() =>{

   const observer = new IntersectionObserver( entries=>{
      //console.log(entries[0]);
      if(entries[0].isIntersecting){
         console.log('Ya esta visible');
      }
   });
   //Revisar si se esta visible una seccion HTML
   observer.observe(document.querySelector('.premium'))





});