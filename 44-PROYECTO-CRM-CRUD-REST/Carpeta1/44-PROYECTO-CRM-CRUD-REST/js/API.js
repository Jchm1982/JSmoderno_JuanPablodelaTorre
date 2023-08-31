const url = 'http://localhost:4000/clientes';

//Cuando se crea un nuevo cliente
export const nuevoCliente = async (cliente)=>{
   try {
      //Con los principios de rest se crea un objeto de configuración
      await fetch(url,{
         //siempre que se vaya a crear un nvo. registro el metodo de post
         method:'POST',
         //en el body se coloca el contenido de esta peticion POST, y se encia de 2 formas STRING o como objeto, en este caso convertimo el objeto a string
         body:JSON.stringify(cliente),
         //headers-> Es la información de que tipo de datos estamos enviando. El header varia deacuerdo a lo que envias al servidor.Este no sube archivos
         headers:{
            //esto solo envia la información al servidor
            'Content-type':'application/json'
         }
      });
      window.location.href = 'index.html';
   } catch (error) {
      console.log(error);
   }

}
//Se obtienen todos los clientes
export const obtenerClientes = async () =>{
   try { 
      const resultado = await fetch(url);
      const clientes = await resultado.json();
      return clientes;
   } catch (error) {
      console.log(error);
   }
}

//Elimina un cliente
export const eliminarCliente = async ( id ) =>{
   try {
      await fetch(`${url}/${id}`,{
         method:'DELETE',

      });
   } catch (error) {
      console.log(error);
   }

}

//obtiene un cliente por su ID
export const obtenerCliente = async (id) => {
   try {
      const resultado = await fetch(`${url}/${id}`);
      const cliente =  await resultado.json();
      return cliente;
   } catch (error) {
      console.log(error);
   }
}

//actualiza un registro
export const editarCliente = async (cliente) =>{
   
   try {
      await fetch(`${url}/${cliente.id}`,{
         //put sirve para actualizar el registo completo y patch de forma parcial
         method:'PUT',
         body:JSON.stringify(cliente),
         headers:{
            'Content-type': 'application/json'
         }
      });
      window.location.href = 'index.html';
   } catch (error) {
      console.log(error);
   }
}