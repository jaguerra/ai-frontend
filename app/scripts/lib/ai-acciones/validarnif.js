define([], function() {
  'use strict';

  //validacion NIF
  function validarNIF(nif)
  {
    var ext, dni, cadena, posicion, letra;
    ext=nif.charAt(0);
    if (ext == 'X') {
      dni=nif.substring(1,nif.length-1);
    }
    else if(ext == 'Y'){
      dni='1' + nif.substring(1,nif.length-1);
    }
    else if(ext == 'Z'){
      dni='2' + nif.substring(1,nif.length-1);
    }
    else {
      dni=nif.substring(0,nif.length-1);
    }
    var letraInput = nif.charAt(nif.length-1);
    if (!isNaN(letraInput)) return false;

    cadena="TRWAGMYFPDXBNJZSQVHLCKET";
    posicion = dni % 23;
    letra = cadena.substring(posicion,posicion+1);
    if (letra!=letraInput.toUpperCase()) return false;
    return true;
  }

  return validarNIF;

});
