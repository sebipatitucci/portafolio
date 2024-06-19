document.addEventListener("DOMContentLoaded", function() {
    var pagina = document.getElementById("pagina");
  
    pagina.addEventListener("mousemove", function(event) {
      var radio = 100; // Define el radio en píxeles
      var mouseX = event.pageX;
      var mouseY = event.pageY;
      var paginaRect = pagina.getBoundingClientRect();
      var paginaX = paginaRect.left;
      var paginaY = paginaRect.top;
      var offsetX = mouseX - paginaX;
      var offsetY = mouseY - paginaY;
      var distanciaX = offsetX - pagina.offsetWidth / 2;
      var distanciaY = offsetY - pagina.offsetHeight / 2;
      var distancia = Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);
      
      if (distancia <= radio) {
        pagina.style.backgroundColor = "#abcdef"; // Cambia el color de fondo dentro del radio
      } else {
        pagina.style.backgroundColor = "#f0f0f0"; // Color de fondo inicial fuera del radio
      }
    });
  });