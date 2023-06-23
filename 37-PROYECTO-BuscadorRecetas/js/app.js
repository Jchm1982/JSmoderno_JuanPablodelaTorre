function iniciarApp() {
   const resultado = document.querySelector('#resultado');

   const selectCategorias = document.querySelector('#categorias');
   if (selectCategorias) {
      selectCategorias.addEventListener('change',seleccionarCategoria);
      obtenerCategorias();
   }
   const favoritosDiv = document.querySelector('.favoritos');
   if(favoritosDiv){
      obtenerFavoritos();
   }

   
   const modal = new bootstrap.Modal('#modal',{});

   

   function obtenerCategorias() {
      const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
      fetch(url)
      /*
         .then(respuesta => {
            return respuesta.json();
         })
         .then(resultado => {
            console.log(resultado);
         })
         */
         .then(respuesta => respuesta.json())
         .then(resultado => mostrarCategorias(resultado.categories))
   }

   function mostrarCategorias(categorias = []) {
         categorias.forEach(categoria => {
            const { strCategory } = categoria;
            const option = document.createElement('OPTION');
            option.value = strCategory;
            option.textContent = strCategory;
            selectCategorias.appendChild(option);

            
         });
   }

   function seleccionarCategoria(e) {
      const categoria = e.target.value;
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;
      fetch(url)
         .then(respuesta => respuesta.json())
         .then(resultado => mostrarRecetas(resultado.meals))
   }

   function mostrarRecetas(recetas =[]) {
      limpiarHtml(resultado);

      const heading = document.createElement('H2');
      heading.classList.add('text-center','text-black','my-5');
      heading.textContent = recetas.length ? 'Resultados' +' '+recetas.length :'No hay Resultados';
      resultado.appendChild(heading);

      //Iterar los resultados
      recetas.forEach(receta => {
         const { idMeal,strMeal,strMealThumb } = receta;
         const recetaContenedor=document.createElement('DIV');
         recetaContenedor.classList.add('col-md-4');

         const recetaCard = document.createElement('DIV');
         recetaCard.classList.add('card','mb-4');

         const recetaImagen = document.createElement('IMG');
         recetaImagen.classList.add('card-img-top');
         recetaImagen.alt = `imagen de la receta ${strMeal ?? receta.titulo}`;
         recetaImagen.src = strMealThumb ?? receta.img;

         const recetaCardBody = document.createElement('DIV');
         recetaCardBody.classList.add('card-body');

         const recetaHeading = document.createElement('H3');
         recetaHeading.classList.add('card-title','mb-3');
         recetaHeading.textContent= strMeal ?? receta.titulo;

         const recetaButton = document.createElement('BUTTON');
         recetaButton.classList.add('btn','btn-danger','w-100');
         recetaButton.textContent='Ver Receta';
         //Asi es como se conectan
            // recetaButton.dataset.bsTarget = "#modal";
         //Toggle, manda a llamar las funciones que estan en el archivo JavaScript de bootstrap y se le dice que se qquiere usar el modal sin #
            // recetaButton.dataset.bsToggle = "modal";

         //Se utiliza onclick por que no existe el elemento en el archivo
         recetaButton.onclick = function () {   
            seleccionarReceta(idMeal ?? receta.id);
         }

         //Inyectar en el HTML
         recetaCardBody.appendChild(recetaHeading);
         recetaCardBody.appendChild(recetaButton);

         recetaCard.appendChild(recetaImagen);
         recetaCard.appendChild(recetaCardBody);
         recetaContenedor.appendChild(recetaCard);

         resultado.appendChild(recetaContenedor);
         
      });
   }

   function seleccionarReceta(id) {
      const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      fetch(url)
         .then(respuesta => respuesta.json() )
         .then(resultado => mostrarRecetamodal(resultado.meals[0]))
   }
   function mostrarRecetamodal(receta) {
      //console.log(receta);

      const { idMeal,strInstructions,strMeal,strMealThumb }= receta;
      
      //Añadir contenido al modal
      const modalTitle = document.querySelector('.modal .modal-title');
      const modalBody = document.querySelector('.modal .modal-body');

      modalTitle.textContent = strMeal;
      modalBody.innerHTML = `
         <img class="img-fluid" src="${strMealThumb}" alt="${strMeal}"/>
         <h3 class="my-3">Instrucciones</h3>
         <p>${strInstructions}</p>
         <h3 class="my-3">Ingredientes y Cantidades</h3>
      `;

      const listGroup = document.createElement('UL');
      listGroup.classList.add('list-group');
      //Mostrar cantidades e Ingredientes
      for( let i = 1; i<=20;i++){
         if(receta[`strIngredient${i}`]){
            const ingrediente = receta[`strIngredient${i}`];
            const cantidad = receta[`strMeasure${i}`];

            const ingredienteLi = document.createElement('LI');
            ingredienteLi.classList.add('list-group-item');
            ingredienteLi.textContent = `${ingrediente} - ${cantidad}`;
            listGroup.appendChild(ingredienteLi);
         }
      }
      modalBody.appendChild(listGroup);

      const modalFooter = document.querySelector('.modal-footer');

      limpiarHtml(modalFooter);

      //Botones de Cerra y favorito
      const btnFavorito =document.createElement('BUTTON');
      btnFavorito.classList.add('btn','btn-danger','col');
      btnFavorito.textContent = existeStorage(idMeal)?'Eliminar Favorito':'Guardar Favorito';

      //LOCALSTORAGE
      btnFavorito.onclick= function () {
         if(existeStorage(idMeal)){
            eliminarFavorito(idMeal);
            btnFavorito.textContent = 'Guardar Favorito';
            mostrarToast('Eliminado Correctamente');
            return
         }

         //vamos agregar un objeto
         agregarFavorito({
            id:idMeal,
            titulo:strMeal,
            img:strMealThumb
         });
         btnFavorito.textContent = 'Eliminar Favorito';
         mostrarToast('Agregado Correctamente');
      }
      
      const btnCerrarModal =document.createElement('BUTTON');
      btnCerrarModal.classList.add('btn','btn-secondary','col');
      btnCerrarModal.textContent = 'Cerrar';
      btnCerrarModal.onclick = function(){
         modal.hide();
      }

      modalFooter.appendChild(btnFavorito);
      modalFooter.appendChild(btnCerrarModal);

      //Muestra el modal
      modal.show();
   }
   
   function agregarFavorito(receta) {
      const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
      //se toma una copia de favoritos ...favoritos, y despues se pasa una receta
      localStorage.setItem('favoritos',JSON.stringify([...favoritos,receta]))
   }

   function eliminarFavorito(id) {
      const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
      //filter nos permite sacar elementos de un arreglo que cumplan o no una condicion
      const nuevosFavoritos = favoritos.filter(favorito => favorito.id!==id);
      localStorage.setItem('favoritos',JSON.stringify(nuevosFavoritos));
   }

   function existeStorage(id){
      //Se obtiene de localstorage, lo convierte en un arreglo y si no existe lo convierte a un arreglo vacio
      const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
      //.some itera sobre todos los elementos de un arreglo y regresa si con al menos 1 cumple con la condicion TRUE
      return favoritos.some(favorito => favorito.id === id);
   }

   function mostrarToast(mensaje){
      const toastDiv = document.querySelector('#toast');
      const toastBody = document.querySelector('.toast-body');
      const toast = new bootstrap.Toast(toastDiv);
      toastBody.textContent = mensaje;
      toast.show();

   }

   function obtenerFavoritos() {
      const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
      if(favoritos.length){
         mostrarRecetas(favoritos);
         return
      }
      const noFavoritos = document.createElement('P');
      noFavoritos.textContent='No se tienen favoritos';
      noFavoritos.classList.add('fs-4','text-center','font-bold','mt-5');
      favoritosDiv.appendChild(noFavoritos);
   }

   function limpiarHtml(selector) {
      while(selector.firstChild){
         selector.removeChild(selector.firstChild);
      }
   }
}

document.addEventListener('DOMContentLoaded',iniciarApp);