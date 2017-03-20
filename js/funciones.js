/*
 * Google Maps documentation: http://code.google.com/apis/maps/documentation/javascript/basics.html
 * Geolocation documentation: http://dev.w3.org/geo/api/spec-source.html
 */
// $( document ).on( "pageinit", "#map-page", function() {
//     var defaultLatLng = new google.maps.LatLng(34.0983425, -118.3267434);  // Default to Hollywood, CA when no geolocation support
//     if ( navigator.geolocation ) {
//         function success(pos) {
//             // Location found, show map with these coordinates
//             drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
//         }
//         function fail(error) {
//             drawMap(defaultLatLng);  // Failed to find location, show default map
//         }
//         // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
//         navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
//     } else {
//         drawMap(defaultLatLng);  // No geolocation support, show default map
//     }
//     function drawMap(latlng) {
//         var myOptions = {
//             zoom: 10,
//             center: latlng,
//             mapTypeId: google.maps.MapTypeId.ROADMAP
//         };
//         var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
//         // Add an overlay to the map of current lat/lng
//         var marker = new google.maps.Marker({
//             position: latlng,
//             map: map,
//             title: "Greetings!"
//         });
//     }
// });


var dep="";
var estado="";
var urlweb="http://distrienvios.dgestiona.com:9090/gestiondocumental/";
// var urlweb="http://192.168.0.3:8080/gestiondocumental/";


// $(document).on("ajaxStart", function() {
//   // this hace referencia a la div con la imagen. 
//   $.mobile.loading( 'show', {
//             text: "",
//             textVisible: true,
//             theme: 'b',
//             html: ""
//   });
// }).on("ajaxStop", function() {
//   $.mobile.loading( 'hide' );
// });

$(document).ready(function(){
  $('.tabcontent').hide();
  $('.tabcontent.active').show();
  $("#tabheader a").click(function(){
    $('.tabcontent').hide();
    // alert("#"+$(this).parent().parent().parent().html());
    $("#"+$(this).parent().parent().parent().attr('for')+" "+$(this).attr('href')).show();
  });
  // $("#menuprincipal a").click(function(e){
  //  $("#contenido").load($(this).attr('href'));
  //  e.preventDefault();
  // });
  $('#radicado_form').submit(function(e){

    
    $.ajax({
      type : "GET",
      url : urlweb+"Consulta",
      data : $('#radicado_form').serialize(),
      // crossDomain: false,
      // headers: {'X-Requested-With': 'XMLHttpRequest'},
      dataType: 'json',
      contentType: 'application/json',
      xhrFields: {
        withCredentials: false
      },
      headers: {
        "Access-Control-Allow-Headers": "XMLHttpRequest",
        "X-Requested-With": "XMLHttpRequest"       
      },
      beforeSend : function() {
        $.mobile.loading( 'show', {
            text: "",
            theme: 'b',
            html: ""
        });
      },   
      complete : function() {
        $.mobile.loading( 'hide' );
      },
      success : function(json) {

        var html="";
        var nombre_ant="";
        var identificacion_ant="";
        var cont=0;
        $( "#padre" ).html( "" ).collapsibleset( "refresh" );
        
        for (var i = 0; i < json.length; i++) {
          html="";                

          html+='<div data-role="collapsible" id="padrec'+(i+1)+'" data-collapsed="true">';
          html+='<h3>'+json[i].nombre_per+' '+json[i].pri_apellido+' '+json[i].seg_apellido+' '+json[i].tipo_ide_nombre+'. '+json[i].identificacion+'</h3>';

          html+='<div data-role="collapsibleset" data-content-theme="a" data-iconpos="right" id="hijo'+(i+1)+'">';
          html+='<div data-role="collapsible" id="hijocontent'+(i+1)+'" data-collapsed="true">';
          html+='<h3>'+json[i].codigo+': '+json[i].asunto+'</h3>';
          html+='<p>'+'<strong>Fecha de radicado: </strong>'+json[i].fecha_rad+'</p>';
          html+='<p>'+'<strong>Dependencia:</strong> '+json[i].ndependencia+'</p>';
          html+='<p>'+'<strong>Fecha del documento:</strong> '+json[i].fecha_documento+'</p>';
          html+='<p>'+'<strong>Serie del documento: </strong>'+json[i].serie+'</p>';
          html+='<p>'+'<strong>Signatario: </strong>'+json[i].dignatario+'</p>';
          html+='<p>'+'<strong>Asunto:</strong> '+json[i].asunto+'</p>';
          html+='<p><strong>Correo electronico: </  strong>'+json[i].email+'</p>';
          // if (json[i].url!="null") {
          //   html+='<a href="#popupPdf" onclick="mostrarpdf('+json[i].url+')" data-rel="popup">Ver documento</a>';
          // }
          html+='</div>';
          html+='</div>';
//8692 adenguer alexander de jesus i = o meno igual que jei.leng
          nombre_ant=json[i].nombre_per;
          identificacion_ant=json[i].identificacion;
          var cn=i;
          for (var j = cn+1; j < json.length; j++) {
            i=j;
            if (json[j].nombre_per==nombre_ant && json[j].identificacion==identificacion_ant) {
                html+='<div data-role="collapsibleset" data-content-theme="a" data-iconpos="right" id="hijo'+(j+1)+'">';
                html+='<div data-role="collapsible" id="hijocontent'+(j+1)+'" data-collapsed="true">';
                html+='<h3>'+json[j].codigo+': '+json[j].asunto+'</h3>';
                html+='<p>'+'<strong>Fecha de radicado: </strong>'+json[j].fecha_rad+'</p>';
                html+='<p>'+'<strong>Dependencia:</strong> '+json[j].ndependencia+'</p>';
                html+='<p>'+'<strong>Fecha del documento:</strong> '+json[j].fecha_documento+'</p>';
                html+='<p>'+'<strong>Serie del documento: </strong>'+json[j].serie+'</p>';
                html+='<p>'+'<strong>Signatario: </strong>'+json[j].dignatario+'</p>';
                html+='<p>'+'<strong>Asunto:</strong> '+json[j].asunto+'</p>';
                html+='<p><strong>Correo electronico: </  strong>'+json[j].email+'</p>';
                // if (json[j].url!="null") {
                //   html+='<a href="#popupPdf" onclick="mostrarpdf('+json[j].url+')" data-rel="popup">Ver documento</a>';
                // }
                html+='</div>';
                html+='</div>';
                html+='';
                html+='';
              }else{
                i=j-1;
                j=json.length;
              }
          }

          html+='</div>';

          $( "#padre" ).append( html ).collapsibleset( "refresh" );
          // $( "#padre" ).find( "#hijo"+(i+1)).collapsibleset( "refresh" );  
          cont=i;
          // alert("fin else");
          // } 5790  8764 2443

          // json[i];
          // nombre_ant=json[i].nombre_per;
          // identificacion_ant=json[i].identificacion;
          // alert("fin para");
          
        }
      },
      error : function(e,ex) {
        window.alert('#radicado... ERROR '+ex+"Datos: "+JSON.stringify(e));
      }
    });
     e.preventDefault();
  });

  
   

});

// $(document).on("pagecreate", "#consultaR", function() {
  
// });



$(document).on("pagecreate", "#asignados", function() {


 $.ajax({
        type : "GET",
        url : urlweb+"Consulta",
        data : {consulta:"A"},
        // crossDomain: false,
        // headers: {'X-Requested-With': 'XMLHttpRequest'},
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
          withCredentials: false
        },
        headers: {
          "Access-Control-Allow-Headers": "XMLHttpRequest",
          "X-Requested-With": "XMLHttpRequest"       
        },
               
        success : function(json) {
          alert(JSON.stringify(json));
            var html="";
          for (var i = 0; i < json.length; i++) {
               html+='<tr >';  
               html+='<th>'+json[i].codigo+' </th>';  
               html+='<td>'+json[i].estado+'</td>';   
               html+='<td>'+json[i].asunto+'</td>';   
               html+='<td>'+json[i].fecha_rad+'</td>';   
               html+='</tr>';  
          }
          $("#tblAsignados tbody").html(html);
          $("#tblAsignados").table('refresh');
        },
        error : function(e,ex) {
          window.alert('#medioenvrep_det ERROR '+JSON.stringify(e)+ex);
        }
      });
  
});
$(document).on("pagecreate", "#devueltos", function() {


 $.ajax({
        type : "GET",
        url : urlweb+"Consulta",
        data : {consulta:"D"},
        // crossDomain: false,
        // headers: {'X-Requested-With': 'XMLHttpRequest'},
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
          withCredentials: false
        },
        headers: {
          "Access-Control-Allow-Headers": "XMLHttpRequest",
          "X-Requested-With": "XMLHttpRequest"       
        },
               
        success : function(json) {
          alert(JSON.stringify(json));
            var html="";
          for (var i = 0; i < json.length; i++) {
               html+='<tr >';  
               html+='<th>'+json[i].codigo+' </th>';  
               html+='<td>'+json[i].estado+'</td>';   
               html+='<td>'+json[i].asunto+'</td>';   
               html+='<td>'+json[i].fecha_rad+'</td>';   
               html+='</tr>';  
          }
          $("#tblDevueltos tbody").html(html);
          $("#tblDevueltos").table('refresh');
        },
        error : function(e,ex) {
          window.alert('#Devuelltos ERROR '+JSON.stringify(e)+ex);
        }
      });
  
});

$(document).on("pagecreate", "#radicadoS", function() {
  $(this).on("ajaxStart", function() {
    // this hace referencia a la div con la imagen. 
    $.mobile.loading( 'show', {
              text: "",
              textVisible: true,
              theme: 'b',
              html: ""
    });
  }).on("ajaxStop", function() {
    $.mobile.loading( 'hide' );
  });

  $("#dependencia_dep_s").html(dep).selectmenu('refresh');
  $("#dependenciaauxiliar_dep_s").html(dep).selectmenu('refresh');

$("#BuscarPer_s").click(function(e){
      
      $.ajax({
        type : "GET",
        url : urlweb+"ConsultarPersona",
        data : {tipo_per:$("#tipo_per_s").val(), tipo_documento_per:$("#tipo_documento_per_s").val(), documento_per:$("#documento_per_s").val()},
        // crossDomain: false,
        // headers: {'X-Requested-With': 'XMLHttpRequest'},
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
        withCredentials: false
        },
        headers: {
          "Access-Control-Allow-Headers": "XMLHttpRequest",
          "X-Requested-With": "XMLHttpRequest"       
        },
        beforeSend : function() {
          $.mobile.loading( 'show', {
              text: "",
              theme: 'b',
              html: ""
          });
        },   
        complete : function() {
          $.mobile.loading( 'hide' );
        },       
        success : function(json) {
          $("#nombre_per_s").val(json.nombre_per);
          $("#priapellido_per_s").val(json.priapellido_per);
          $("#segapellido_per_s").val(json.segapellido_per);
          $("#celular_per_s").val(json.celular_per);
          $("#telefono_per_s").val(json.telefono_per);
          $("#email_per_s").val(json.email_per);
          $("#paginaweb_per_s").val(json.paginaweb_per);
          $("#pais_per_s").val(json.pais_per).change();
          $("#estado_per_s").val(json.estado_per).change();
          $("#direccion_per_s").val(json.direccion_per).change();
          alert(JSON.stringify(json));
          $("#municipio_per_s").val(json.municipio_per).change();
          $("#direccion_per_s").val(json.direccion_per).change();
        },
        error : function(e,ex) {
          window.alert('#BuscarPer_s ERROR '+JSON.stringify(e)+ex);
        }
      });
      e.preventDefault();
    });



// SALIDA guardar persona
    $("#guardarPersona_s").click(function(e){
      
      $.ajax({
        type : "GET",
        url : urlweb+"GuardarPersona",
        data : $("#persona_form_s").serialize(),
        // crossDomain: false,
        // headers: {'X-Requested-With': 'XMLHttpRequest'},
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
        withCredentials: false
        },
        headers: {
          "Access-Control-Allow-Headers": "XMLHttpRequest",
          "X-Requested-With": "XMLHttpRequest"       
        },
        beforeSend : function() {
          $.mobile.loading( 'show', {
              text: "",
              theme: 'b',
              html: ""
          });
        },   
        complete : function() {
          $.mobile.loading( 'hide' );
        },       
        success : function(json) {
          if(json.res=="1"){
                      alert("Guardado con exito!!");

          }else{
            
          }
        },
        error : function(e,ex) {
          window.alert('#GuardarPersona_s ERROR '+JSON.stringify(e)+ex);
        }
      });
      e.preventDefault();
    });




  $("#guardarRadicado_s").click(function(e){
      alert(JSON.stringify($("#persona_form_s,#datos_form_s").serialize()));
      $.ajax({
        type : "GET",
        url : urlweb+"GuardarRadicado",
        data : $("#persona_form_s,#datos_form_s").serialize(),
        // crossDomain: false,
        // headers: {'X-Requested-With': 'XMLHttpRequest'},
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
        withCredentials: false
        },
        headers: {
          "Access-Control-Allow-Headers": "XMLHttpRequest",
          "X-Requested-With": "XMLHttpRequest"       
        },
        beforeSend : function() {
          $.mobile.loading( 'show', {
              text: "",
              theme: 'b',
              html: ""
          });
        },   
        complete : function() {
          $.mobile.loading( 'hide' );
        },       
        success : function(json) {
          if(json.res=="1"){
                      alert("Guardado con exito!!");

          }else{
            alert(json.res);
          }
        },
        error : function(e,ex) {
          window.alert('#GuardarRadicado_s ERROR '+JSON.stringify(e)+ex);
        }
      });
      e.preventDefault();
    });



  //select dinamicos radicado SALIDA
    $("#pais_per_s").change(function(){
      $.ajax({
        async:false,
        cache:false,
        type : "GET",
        url : urlweb+"SelectDinamico",
        data : {tipo:"departamento",dato:$("#pais_per_s").val()},
        // crossDomain: false,
        // headers: {'X-Requested-With': 'XMLHttpRequest'},
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
          withCredentials: false
        },
        headers: {
          "Access-Control-Allow-Headers": "XMLHttpRequest",
          "X-Requested-With": "XMLHttpRequest"       
        },
               
        success : function(json) {
          
            html='<option value="">Seleccione...</option>';                
          for (var i = 0; i < json.length; i++) {

            html+='<option value="'+json[i].id+'">'+json[i].nombre+'</option>';
          }
          $("#estado_per_s").html(html).selectmenu('refresh');
        },
        error : function(e,ex) {
          window.alert('#medioenvrep_det ERROR '+JSON.stringify(e)+ex);
        }
      });
    });

    $("#estado_per_s").change(function(){

      $.ajax({
        async:false,
        cache:false,
        type : "GET",
        url : urlweb+"SelectDinamico",
        data : {tipo:"municipio",dato:$("#estado_per_s").val()},
        // crossDomain: false,
        // headers: {'X-Requested-With': 'XMLHttpRequest'},
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
          withCredentials: false
        },
        headers: {
          "Access-Control-Allow-Headers": "XMLHttpRequest",
          "X-Requested-With": "XMLHttpRequest"       
        },
               
        success : function(json) {
          
            html='<option value="">Seleccione...</option>';                
          for (var i = 0; i < json.length; i++) {

            html+='<option value="'+json[i].id+'">'+json[i].nombre+'</option>';
          }
          $("#municipio_per_s").html(html).selectmenu('refresh');
        },
        error : function(e,ex) {
          window.alert('#municipio ERROR '+JSON.stringify(e)+ex);
        }
      });
    });
      $("#dependencia_dep_s").change(function(){

      $.ajax({
        type : "GET",
        url : urlweb+"SelectDinamico",
        data : {tipo:"serie",dato:$("#dependencia_dep_s").val()},
        // crossDomain: false,
        // headers: {'X-Requested-With': 'XMLHttpRequest'},
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
          withCredentials: false
        },
        headers: {
          "Access-Control-Allow-Headers": "XMLHttpRequest",
          "X-Requested-With": "XMLHttpRequest"       
        },
               
        success : function(json) {
          
            html='<option value="">Seleccione...</option>';                
          for (var i = 0; i < json.length; i++) {

            html+='<option value="'+json[i].id+'">'+json[i].nombre+'</option>';
          }
          $("#serie_ser_s").html(html).selectmenu('refresh');
        },
        error : function(e,ex) {
          window.alert('#serie_s ERROR '+JSON.stringify(e)+ex);
        }
      });
    });

    $("#serie_ser_s").change(function(){
      $.ajax({
        type : "GET",
        url : urlweb+"SelectDinamico",
        data : {tipo:"subserie",dato1:$("#dependencia_dep_s").val(), dato2:$("#serie_ser_s").val()},
        // crossDomain: false,
        // headers: {'X-Requested-With': 'XMLHttpRequest'},
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
          withCredentials: false
        },
        headers: {
          "Access-Control-Allow-Headers": "XMLHttpRequest",
          "X-Requested-With": "XMLHttpRequest"       
        },
               
        success : function(json) {
              //  alert(JSON.stringify(json));

            html='<option value="">Seleccione...</option>';                
          for (var i = 0; i < json.length; i++) {

            html+='<option value="'+json[i].id+'">'+json[i].nombre+'</option>';
          }
          $("#subserie_sub_s").html(html).selectmenu('refresh');
        },
        error : function(e,ex) {
          window.alert('#serie_s ERROR '+JSON.stringify(e)+ex);
        }
      });
    });

   $("#subserie_sub_s").change(function(){
      $.ajax({
        type : "GET",
        url : urlweb+"SelectDinamico",
        data : {tipo:"tipodocumental",dato:$("#subserie_sub_s").val()},
        // crossDomain: false,
        // headers: {'X-Requested-With': 'XMLHttpRequest'},
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
          withCredentials: false
        },
        headers: {
          "Access-Control-Allow-Headers": "XMLHttpRequest",
          "X-Requested-With": "XMLHttpRequest"       
        },
               
        success : function(json) {
              //  alert(JSON.stringify(json));
/////////////
            html='<option value="">Seleccione...</option>';                
          for (var i = 0; i < json.length; i++) {

            html+='<option value="'+json[i].id+'">'+json[i].nombre+'</option>';
          }
          $("#tipodocumental_tip_s").html(html).selectmenu('refresh');
        },
        error : function(e,ex) {
          window.alert('#serie_s ERROR '+JSON.stringify(e)+ex);
        }
      });
    });
   $("#dependenciaauxiliar_dep_s").change(function(){
      $.ajax({
        type : "GET",
        url : urlweb+"SelectDinamico",
        data : {tipo:"usuarioaux",dato:$("#dependenciaauxiliar_dep_s").val()},
        // crossDomain: false,
        // headers: {'X-Requested-With': 'XMLHttpRequest'},
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
          withCredentials: false
        },
        headers: {
          "Access-Control-Allow-Headers": "XMLHttpRequest",
          "X-Requested-With": "XMLHttpRequest"       
        },
               
        success : function(json) {
              //  alert(JSON.stringify(json));
/////////////
            html='<option value="">Seleccione...</option>';                
          for (var i = 0; i < json.length; i++) {

            html+='<option value="'+json[i].id+'">'+json[i].nombre+'</option>';
          }
          $("#usuarioauxiliar_usu_s").html(html).selectmenu('refresh');
        },
        error : function(e,ex) {
          window.alert('#usuarioauxiliar ERROR '+JSON.stringify(e)+ex);
        }
      });
    });

});

//radicadoE
$(document).on("pagecreate", "#radicadoE", function() {

  // Carga el combo de pais
  $.ajax({
    type : "GET",
    url : urlweb+"SelectPais",
    dataType: 'json',
    contentType: 'application/json',
    xhrFields: {
      withCredentials: false
    },
    headers: {
      "Access-Control-Allow-Headers": "XMLHttpRequest",
      "X-Requested-With": "XMLHttpRequest"       
    },
           
    success : function(json) {
      
        html='<option value="">Pais</option>';                
      for (var i = 0; i < json.length; i++) {

        html+='<option value="'+json[i].id+'">'+json[i].nombre+'</option>';
      }
      $("#pais_per").html(html).selectmenu('refresh');
      $("#pais_per_s").html(html).selectmenu('refresh');
    },
    error : function(e,ex) {
      window.alert('#radicado ERROR '+JSON.stringify(e)+ex);
    }
  });

  $.ajax({
      type : "GET",
      url : urlweb+"SelectDependencia",
      dataType: 'json',
      contentType: 'application/json',
      xhrFields: {
        withCredentials: false
      },
      headers: {
        "Access-Control-Allow-Headers": "XMLHttpRequest",
        "X-Requested-With": "XMLHttpRequest"       
      },
             
      success : function(json) {
        
          html='<option value="">Dependencia...</option>';                
        for (var i = 0; i < json.length; i++) {

          html+='<option value="'+json[i].id+'">'+json[i].nombre+'</option>';
        }
        $("#dependencia_dep").html(html).selectmenu('refresh');
        $("#dependenciaauxiliar_dep").html(html).selectmenu('refresh');
        dep=html;
      },
      error : function(e,ex) {
        window.alert('#Dependencia ERROR '+JSON.stringify(e)+ex);
      }
  });

  $.ajax({
      type : "GET",
      url : urlweb+"SelectTipoPersona",
      dataType: 'json',
      contentType: 'application/json',
      xhrFields: {
        withCredentials: false
      },
      headers: {
        "Access-Control-Allow-Headers": "XMLHttpRequest",
        "X-Requested-With": "XMLHttpRequest"       
      },
             
      success : function(json) {
        
          html='<option value="">Tipo persona...</option>';                
        for (var i = 0; i < json.length; i++) {

          html+='<option value="'+json[i].id+'">'+json[i].nombre+'</option>';
        }
        $("#tipo_per").html(html).selectmenu('refresh');
        $("#tipo_per_s").html(html).selectmenu('refresh');
      },
      error : function(e,ex) {
        window.alert('#Tipo persona ERROR '+JSON.stringify(e)+ex);
      }
  });

  $.ajax({
      type : "GET",
      url : urlweb+"SelectTipoIdentificacion",
      dataType: 'json',
      contentType: 'application/json',
      xhrFields: {
        withCredentials: false
      },
      headers: {
        "Access-Control-Allow-Headers": "XMLHttpRequest",
        "X-Requested-With": "XMLHttpRequest"       
      },
             
      success : function(json) {
        
          html='<option value="">Tipo identificacion...</option>';                
        for (var i = 0; i < json.length; i++) {

          html+='<option value="'+json[i].id+'">'+json[i].nombre+'</option>';
        }
        $("#tipo_documento_per").html(html).selectmenu('refresh');
        $("#tipo_documento_per_s").html(html).selectmenu('refresh');
      },
      error : function(e,ex) {
        window.alert('#tipo_documento_per ERROR '+JSON.stringify(e)+ex);
      }
  });

    $.ajax({
      type : "GET",
      url : urlweb+"SelectMedioRecepcion",
      dataType: 'json',
      contentType: 'application/json',
      xhrFields: {
        withCredentials: false
      },
      headers: {
        "Access-Control-Allow-Headers": "XMLHttpRequest",
        "X-Requested-With": "XMLHttpRequest"       
      },
             
      success : function(json) {
        
          html='<option value="">Medio recepcion...</option>';                
        for (var i = 0; i < json.length; i++) {

          html+='<option value="'+json[i].id+'">'+json[i].nombre+'</option>';
        }
        $("#medioenvrep_det").html(html).selectmenu('refresh');
        $("#medioenvrep_det_s").html(html).selectmenu('refresh');
      },
      error : function(e,ex) {
        window.alert('#medioenvrep_det ERROR '+JSON.stringify(e)+ex);
      }
    });


//select dinamicos radicado ENTRADA//////////////
    $("#pais_per").change(function(){
      $.ajax({
        async:false,
        cache:false,
        type : "GET",
        url : urlweb+"SelectDinamico",
        data : {tipo:"departamento",dato:$("#pais_per").val()},
        // crossDomain: false,
        // headers: {'X-Requested-With': 'XMLHttpRequest'},
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
          withCredentials: false
        },
        headers: {
          "Access-Control-Allow-Headers": "XMLHttpRequest",
          "X-Requested-With": "XMLHttpRequest"       
        },
               
        success : function(json) {
          
            html='<option value="">Seleccione...</option>';                
          for (var i = 0; i < json.length; i++) {

            html+='<option value="'+json[i].id+'">'+json[i].nombre+'</option>';
          }
          $("#estado_per").html(html).selectmenu('refresh');
        },
        error : function(e,ex) {
          window.alert('#medioenvrep_det ERROR '+JSON.stringify(e)+ex);
        }
      });
    });

    $("#estado_per").change(function(){

      $.ajax({
        async:false,
        cache:false,
        type : "GET",
        url : urlweb+"SelectDinamico",
        data : {tipo:"municipio",dato:$("#estado_per").val()},
        // crossDomain: false,
        // headers: {'X-Requested-With': 'XMLHttpRequest'},
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
          withCredentials: false
        },
        headers: {
          "Access-Control-Allow-Headers": "XMLHttpRequest",
          "X-Requested-With": "XMLHttpRequest"       
        },
               
        success : function(json) {
          
            html='<option value="">Seleccione...</option>';                
          for (var i = 0; i < json.length; i++) {
            html+='<option value="'+json[i].id+'">'+json[i].nombre+'</option>';
          }
          $("#municipio_per").html(html).selectmenu('refresh');
        },
        error : function(e,ex) {
          window.alert('#municipio ERROR '+JSON.stringify(e)+ex);
        }
      });
    });

    
    $("#dependencia_dep").change(function(){

      $.ajax({
        type : "GET",
        url : urlweb+"SelectDinamico",
        data : {tipo:"serie",dato:$("#dependencia_dep").val()},
        // crossDomain: false,
        // headers: {'X-Requested-With': 'XMLHttpRequest'},
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
          withCredentials: false
        },
        headers: {
          "Access-Control-Allow-Headers": "XMLHttpRequest",
          "X-Requested-With": "XMLHttpRequest"       
        },
               
        success : function(json) {
          
            html='<option value="">Seleccione...</option>';                
          for (var i = 0; i < json.length; i++) {

            html+='<option value="'+json[i].id+'">'+json[i].nombre+'</option>';
          }
          $("#serie_ser").html(html).selectmenu('refresh');
        },
        error : function(e,ex) {
          window.alert('#serie ERROR '+JSON.stringify(e)+ex);
        }
      });
    });
        $("#serie_ser").change(function(){

      $.ajax({
        type : "GET",
        url : urlweb+"SelectDinamico",
        data : {tipo:"subserie",dato1:$("#dependencia_dep").val(), dato2:$("#serie_ser").val()},
        // crossDomain: false,
        // headers: {'X-Requested-With': 'XMLHttpRequest'},
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
          withCredentials: false
        },
        headers: {
          "Access-Control-Allow-Headers": "XMLHttpRequest",
          "X-Requested-With": "XMLHttpRequest"       
        },
               
        success : function(json) {
          
            html='<option value="">Seleccione...</option>';                
          for (var i = 0; i < json.length; i++) {

            html+='<option value="'+json[i].id+'">'+json[i].nombre+'</option>';
          }
          $("#subserie_sub").html(html).selectmenu('refresh');
        },
        error : function(e,ex) {
          window.alert('#subserie ERROR '+JSON.stringify(e)+ex);
        }
      });
    });
    $("#subserie_sub").change(function(){

      $.ajax({
        type : "GET",
        url : urlweb+"SelectDinamico",
        data : {tipo:"tipodocumental",dato:$("#subserie_sub").val()},
        // crossDomain: false,
        // headers: {'X-Requested-With': 'XMLHttpRequest'},
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
          withCredentials: false
        },
        headers: {
          "Access-Control-Allow-Headers": "XMLHttpRequest",
          "X-Requested-With": "XMLHttpRequest"       
        },
               
        success : function(json) {
          
            html='<option value="">Seleccione...</option>';                
          for (var i = 0; i < json.length; i++) {

            html+='<option value="'+json[i].id+'">'+json[i].nombre+'</option>';
          }
          $("#tipodocumental_tip").html(html).selectmenu('refresh');
        },
        error : function(e,ex) {
          window.alert('#tipodocumental ERROR '+JSON.stringify(e)+ex);
        }
      });
    });
      $("#dependenciaauxiliar_dep").change(function(){
      $.ajax({
        type : "GET",
        url : urlweb+"SelectDinamico",
        data : {tipo:"usuarioaux",dato:$("#dependenciaauxiliar_dep").val()},
        // crossDomain: false,
        // headers: {'X-Requested-With': 'XMLHttpRequest'},
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
          withCredentials: false
        },
        headers: {
          "Access-Control-Allow-Headers": "XMLHttpRequest",
          "X-Requested-With": "XMLHttpRequest"       
        },
               
        success : function(json) {
          
            html='<option value="">Seleccione...</option>';                
          for (var i = 0; i < json.length; i++) {

            html+='<option value="'+json[i].id+'">'+json[i].nombre+'</option>';
          }
          $("#usuarioauxiliar_usu").html(html).selectmenu('refresh');
        },
        error : function(e,ex) {
          window.alert('#serie ERROR '+JSON.stringify(e)+ex);
        }
      });
    });

      
    $("#BuscarPer").click(function(e){
      
      $.ajax({
        type : "GET",
        url : urlweb+"ConsultarPersona",
        data : {tipo_per:$("#tipo_per").val(), tipo_documento_per:$("#tipo_documento_per").val(), documento_per:$("#documento_per").val()},
        // crossDomain: false,
        // headers: {'X-Requested-With': 'XMLHttpRequest'},
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
        withCredentials: false
        },
        headers: {
          "Access-Control-Allow-Headers": "XMLHttpRequest",
          "X-Requested-With": "XMLHttpRequest"       
        },
        beforeSend : function() {
          $.mobile.loading( 'show', {
              text: "",
              theme: 'b',
              html: ""
          });
        },   
        complete : function() {
          $.mobile.loading( 'hide' );
        },       
        success : function(json) {
          $("#nombre_per").val(json.nombre_per);
          $("#priapellido_per").val(json.priapellido_per);
          $("#segapellido_per").val(json.segapellido_per);
          $("#celular_per").val(json.celular_per);
          $("#telefono_per").val(json.telefono_per);
          $("#email_per").val(json.email_per);
          $("#paginaweb_per").val(json.paginaweb_per);
          $("#pais_per").val(json.pais_per).change();
          $("#estado_per").val(json.estado_per).change();
          $("#direccion_per").val(json.direccion_per).change();
          alert(JSON.stringify(json));
          $("#municipio_per").val(json.municipio_per).change();
          $("#direccion_per").val(json.direccion_per).change();
        },
        error : function(e,ex) {
          window.alert('#BuscarPer ERROR '+JSON.stringify(e)+ex);
        }
      });
      e.preventDefault();
    });




    

    $("#guardarPersona").click(function(e){
      
      $.ajax({
        type : "GET",
        url : urlweb+"GuardarPersona",
        data : $("#persona_form_e").serialize(),
        // crossDomain: false,
        // headers: {'X-Requested-With': 'XMLHttpRequest'},
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
        withCredentials: false
        },
        headers: {
          "Access-Control-Allow-Headers": "XMLHttpRequest",
          "X-Requested-With": "XMLHttpRequest"       
        },
        beforeSend : function() {
          $.mobile.loading( 'show', {
              text: "",
              theme: 'b',
              html: ""
          });
        },   
        complete : function() {
          $.mobile.loading( 'hide' );
        },       
        success : function(json) {
          if(json.res=="1"){
                      alert("Guardado con exito!!");

          }else{
            
          }
        },
        error : function(e,ex) {
          window.alert('#GuardarPersona ERROR '+JSON.stringify(e)+ex);
        }
      });
      e.preventDefault();
    });


  $("#guardarRadicado").click(function(e){
      alert(JSON.stringify($("#persona_form_e,#datos_form_e").serialize()));
      $.ajax({
        type : "GET",
        url : urlweb+"GuardarRadicado",
        data : $("#persona_form_e,#datos_form_e").serialize(),
        // crossDomain: false,
        // headers: {'X-Requested-With': 'XMLHttpRequest'},
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
        withCredentials: false
        },
        headers: {
          "Access-Control-Allow-Headers": "XMLHttpRequest",
          "X-Requested-With": "XMLHttpRequest"       
        },
        beforeSend : function() {
          $.mobile.loading( 'show', {
              text: "",
              theme: 'b',
              html: ""
          });
        },   
        complete : function() {
          $.mobile.loading( 'hide' );
        },       
        success : function(json) {
          if(json.res=="1"){
                      alert("Guardado con exito!!");

          }else{
            alert(json.res);
          }
        },
        error : function(e,ex) {
          window.alert('#GuardarRadicado ERROR '+JSON.stringify(e)+ex);
        }
      });
      e.preventDefault();
    });

});

function msg(text){
  $.mobile.loading('show', {theme:"a", text:text, textonly:true, textVisible: true});
  setTimeout(quitarmsg, 3000);
}
function quitarmsg(){
  $.mobile.loading( 'hide' );
}



/* Instantiate the popup on DOMReady, and enhance its contents */
$( document ).on( "pagecreate", "#demo-page", function() {
    $( ".cars" ).on( "click", function() {
        var target = $( this ),
            brand = target.find( "h2" ).html(),
            model = target.find( "p" ).html(),
            short = target.attr( "id" ),
            closebtn = '<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>',
            header = '<div data-role="header"><h2>' + brand + ' ' + model + '</h2></div>',
            img = '<img src="../_assets/img/' + short + '.jpg" alt="' + brand + '" class="photo">',
            popup = '<div data-role="popup" id="popup-' + short + '" data-short="' + short +'" data-theme="none" data-overlay-theme="a" data-corners="false" data-tolerance="15"></div>';
        // Create the popup.
        $( header )
            .appendTo( $( popup )
                .appendTo( $.mobile.activePage )
                .popup() )
            .toolbar()
            .before( closebtn )
            .after( img );
        // Wait with opening the popup until the popup image has been loaded in the DOM.
        // This ensures the popup gets the correct size and position
        $( ".photo", "#popup-" + short ).load(function() {
            // Open the popup
            $( "#popup-" + short ).popup( "open" );
            // Clear the fallback
            clearTimeout( fallback );
        });
        // Fallback in case the browser doesn't fire a load event
        var fallback = setTimeout(function() {
            $( "#popup-" + short ).popup( "open" );
        }, 2000);
    });
    // Set a max-height to make large images shrink to fit the screen.
    $( document ).on( "popupbeforeposition", ".ui-popup", function() {
        var image = $( this ).children( "img" ),
            height = image.height(),
            width = image.width();
        // Set height and width attribute of the image
        $( this ).attr({ "height": height, "width": width });
        // 68px: 2 * 15px for top/bottom tolerance, 38px for the header.
        var maxHeight = $( window ).height() - 68 + "px";
        $( "img.photo", this ).css( "max-height", maxHeight );
    });
    // Remove the popup after it has been closed to manage DOM size
    $( document ).on( "popupafterclose", ".ui-popup", function() {
        $( this ).remove();
    });
});


$( document ).on( "pagecreate", function() {
    var nextId = 1;
    $("#add").click(function() {
        nextId++;
        var content = "<div data-role='collapsible' id='set" + nextId + "'><h3>Section " + nextId + "</h3><p>I am the collapsible content in a set so this feels like an accordion. I am hidden by default because I have the 'collapsed' state; you need to expand the header to see me.</p></div>";
        $( "#set" ).append( content ).collapsibleset( "refresh" );
    });
    $( "#expand" ).click(function() {
        $("#set").children(":last").collapsible( "expand" );
    });
    $( "#collapse" ).click(function() {
        $( "#set" ).children( ":last" ).collapsible( "collapse" );
    });
});
$(document).ready(function () {
    $("#resultBlock").hide();
    $("#errorBlock").hide();
});
 
$(document).on("click", "#submit", function () {
    $("#resultBlock").hide();
    $("#errorBlock").hide();
 
    var apiKey = $("#apiKey").val().trim(); //Get your API key by registering at http://www.bytescout.com/
 
    var urlUploadFile = "https://bytescout.io/api/v1/file/upload?apiKey=" + apiKey;
 
    var formData = new FormData($("#form")[0]);
 
    $.ajax({
        url: urlUploadFile,
        type: "POST",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (fileId) {
            ConvertToHtml(apiKey, fileId);
        },
        error: function (response) {
            $("#errorBlock").show();
            $("#statusCode").html(response.status);
            $("#errors").html("");
            $.each(response.responseJSON.Errors, function() {
                $("#errors").append($("<li></li>").html(this));
            });
        }
    });
});
 
 
function ConvertToHtml(apiKey, fileId) {
    var url = "https://bytescout.io/api/v1/pdfrenderer/render?apiKey=" + apiKey;
 
    var options = {
        "properties": {
            "pageIndex": $("#pageIndex").val(),
            "resolution": $("#resolution").val(),
            "jpegQuality": 100,
            "rasterOutputFormat": $("#rasterOutputFormat").val()
        },
        "inputType": "fileId",
        "input": fileId,
        "outputType": "link"
    };
 
    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(options),
        contentType: "application/json",
        success: function (link) {
            $("#resultBlock").show();
            $("#result").attr("src", link);
        },
        error: function (response) {
            $("#errorBlock").show();
            $("#statusCode").html(response.status);
            $("#errors").html("");
            $.each(response.responseJSON.Errors, function() {
                $("#errors").append($("<li></li>").html(this));
            });
        }
    });
}
$( document ).on( "pageshow", "#consultaR", function() {
    $("#palabraClave").val("");
    $("#padre").html("");
});

function mostrarpdf(url) {
  url=url.replace("/root/ARCHIVOS/GESTION_DOCUMENTAL/FOTOS","http://www.distrienvios.com/fotos");
  $("#viewpdf").attr("src","http://docs.google.com/gview?url="+url+"&embedded=true");
  // body...
}
$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!

    $.mobile.allowCrossDomainPages = true;
});
