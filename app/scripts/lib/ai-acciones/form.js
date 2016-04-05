define(['jquery', 'lib/ai-acciones/validarnif'], function($, validarNIF) {
  'use strict';

  var suscripcion_spainId = window.suscripcion_spainId || 'ESP';

  function show_form_completo() {
    $('.ai-accion-firma__formrapido').hide();
    $('.ai-accion-firma__formcompleto').show();
  }

  function show_form_rapido() {
    $('.ai-accion-firma__formrapido').show();
    $('.ai-accion-firma__formcompleto').hide();
  }

  function on_hash_formcompleto() {
    if (location.hash === '#formcompleto') {
      show_form_completo();
    } else {
      show_form_rapido();
    }
  }

  function has_both_forms() {
    return (
      $('.ai-accion-firma__formrapido').length > 0 && $('.ai-accion-firma__formcompleto').length > 0
    );
  }

  if (has_both_forms()) {
    on_hash_formcompleto();

    $(window).on('hashchange', function() {
      on_hash_formcompleto();
    });
  }

  $('.ai-accion-firma__button-primera').on('click', function() {
    location.hash = '#formcompleto';
  });


  function _form_completo() {

    var form = $('.ai-accion-firma__formcompleto'),
      nombre = form.find('.ai-accion-firma__input--nombre'),
      apellido1 = form.find('.ai-accion-firma__input--apellido1'),
      email = form.find('.ai-accion-firma__input--email'),
      telefono = form.find('.ai-accion-firma__input--telefono'),
      pais = form.find('.ai-accion-firma__input--pais'),
      provincia = form.find('.ai-accion-firma__input--provincia'),
      dni = form.find('.ai-accion-firma__input--dni');

    form.submit(function(event){

      var mensaje = '';

      if(nombre.val().trim() === ''){
        mensaje += '* El Nombre\n';
      }

      if(nombre.val().trim() !== '' && /^[\s\-a-zA-ZáéíóúñçàèìòùäëïöüÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÑ']+$/.test(nombre.val().trim()) === false){
        mensaje += '* El formato del nombre (sólo se permiten letras, apóstrofes y guiones)\n';
      }

      if(apellido1.val().trim() === ''){
        mensaje += '* Los apellidos\n';
      }

      if(apellido1.val().trim() !== '' && /^[\s\-a-zA-ZáéíóúñçàèìòùäëïöüÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÑ']+$/.test(apellido1.val().trim()) === false){
        mensaje += '* El formato de los apellidos (sólo se permiten letras, apóstrofes y guiones)\n';
      }

      if(email.val().trim() === ''){
        mensaje += '* El correo electrónico\n';
      }

      if(email.val().trim() !== '' && /^[a-zA-Z0-9._+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,4}$/.test(email.val().trim()) === false){
        mensaje += '* El formato del correo electrónico\n';
      }

      if( telefono.val().trim() !== '' && /^[6987]{1}[0-9]{8}$/.test(telefono.val().trim()) === false ){
        mensaje += '* El formato del teléfono\n';
      }

      if(pais.val() === '0'){
        mensaje += '* El país de residencia\n';
      }

      if ( pais.val() === suscripcion_spainId && provincia.val() === '0' ) {
        mensaje += '* La provincia\n';
      }

      if ( dni.val().trim() !== "" && !validarNIF(dni.val().trim()) ){
        mensaje += '* Debe introducir un NIF válido\n';
      }


      if (mensaje !== ''){
        alert('La siguiente información está incompleta o contiene errores:\t\t\t\t\t\n\n' + mensaje);
        event.stopImmediatePropagation();
        return false;
      }

    });


    pais.change( function(){
      if (pais.val() !== suscripcion_spainId){
        telefono.val("");
        telefono.attr('disabled', 'true');
        dni.val("");
        dni.attr('disabled', 'true');
        provincia.attr('disabled', 'true');
        provincia.val('0');
      } else {
        provincia.removeAttr("disabled");
        telefono.removeAttr("disabled");
        dni.removeAttr("disabled");
      }
    });

    pais.change();

  }


  function _form_rapido() {
    var form = $('.ai-accion-firma__formrapido'),
      email = form.find('.ai-accion-firma__input--email');

    form.submit(function(event){

      var mensaje = '';

      if(email.val().trim()===''){
        mensaje += '* El correo electrónico\n';
      }

      if(email.val().trim()!=='' && /^[a-zA-Z0-9._+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,4}$/.test(email.val().trim())===false){
        mensaje += '* El formato del correo electrónico\n';
      }

      if (mensaje!==''){
        alert('La siguiente información está incompleta o contiene errores:\t\t\t\t\t\n\n' + mensaje);
        event.stopImmediatePropagation();
        return false;
      }

    });
  }

//   $$('#accionForm #nombre').ictiLimitInputKeys(/[\s\-a-záéíóúñçàèìòùäëïöü]/i);
//   $$('#accionForm #apellido1').ictiLimitInputKeys(/[\s\-a-záéíóúñçàèìòùäëïöü]/i);
//   $$('#accionForm #emailAccion').ictiLimitInputKeys(/[\-0-9A-Za-z@._]/);
//   $$('#accionForm #telefono').ictiLimitInputKeys(/[0-9]/);
//   $$('#accionForm #dni').ictiLimitInputKeys(/[0-9a-z]/i);
//   $$('#emailAccionRapida').ictiLimitInputKeys(/[\-0-9A-Za-z@._]/);

  $(document).ready( function() {
    _form_completo();
    _form_rapido();
  });


});

