$(document).ready(function(){
	llenarTabla();
	llenarMarcaSelect();
	llenarMarcaSelectEditar();
	llenarMarcaSelectEliminar();
})

function llenarMarcaSelect(){

    $.ajax({
        type : 'ajax',
        method : 'get',
        url : 'http://localhost:9000/MarcaWs/listar',
        contentType : 'application/json; charset=utf-8',
        success:function(kakaroto)
        {
            console.log("bien select marca->"+JSON.stringify(kakaroto));
            var cuerpo;

            cuerpo='<option value="0" selected = "true">Selecciona una marca</option>';
           
            for(var i = 0; i < kakaroto.length; i++)
            {
               
               cuerpo+='<option value="'+kakaroto[i].id+'">'+kakaroto[i].nombre+'</option>';
            }//cierra for
            $('#marcaSelect').html(cuerpo);
            },
        error:function()
        {
            console.log("mal");
        }
    });//cierra ajax

}//cierra llenarMarcaSelect


function llenarMarcaSelectEliminar(idM) {
	$.ajax({
		type:'ajax',
		method:'get',
		url:'http://localhost:9000/MarcaWs/listar',
		contentType:'application/json; charset=utf-8',
		success:function(kakaroto)
		{
			console.log("bien select marca - " +JSON.stringify(kakaroto));
			var cuerpo;
			for (var i = 0; i < kakaroto.length; i++) 
			{
			if (idM==kakaroto[i].id) {
					cuerpo+='<option selected="true" value="'+kakaroto[i].id+'">'+kakaroto[i].nombre+'</option>';
				} //else {
				// 	cuerpo+='<option value="'+kakaroto[i].id+'">'+kakaroto[i].nombre+'</option>';
				// }
			} //for
			$('#marcaSelectU').html(cuerpo);
		}, //success
		error:function()
		{
		console.log("mal");
		}
	});
}


function llenarMarcaSelectEditar(idM) {
	
	$.ajax({
		type:'ajax',
		method:'get',
		url:'http://localhost:9000/MarcaWs/listar',
		contentType:'application/json; charset=utf-8',
		success:function(kakaroto)
		{
			console.log("bien select marca - " +JSON.stringify(kakaroto));
			var cuerpo;
			for (var i = 0; i < kakaroto.length; i++) 
			{
			if (idM==kakaroto[i].id) {
					cuerpo+='<option selected="true" value="'+kakaroto[i].id+'">'+kakaroto[i].nombre+'</option>';
				} else {
					cuerpo+='<option value="'+kakaroto[i].id+'">'+kakaroto[i].nombre+'</option>';
				}
			} //for
			$('#marcaSelectU').html(cuerpo);
		}, //success
		error:function()
		{
		console.log("mal");
		}
	}); //ajax
} //funcion llenarMarca


//ERROR
function llenarTabla(){
	$.ajax({
		type:'ajax',
		method:'get',
		url:'http://localhost:9000/CelularWs/listar',
		contentType:'application/json; charset=utf-8',
		success:function(kakaroto)
		{
			console.log("bien---> " +JSON.stringify(kakaroto));
			var cuerpo;
			var marcad;
			for (var i = 0; i < kakaroto.length; i++) 
			{
				if (kakaroto[i].marca==null) {
					marcad="Sin marca";
				} //if

				else {
					marcad=kakaroto[i].marca.nombre;
				}

				cuerpo +='<tr>' +
				'<td>'+kakaroto[i].id+'</td>'+
				'<td>'+kakaroto[i].modelo+'</td>'+
				'<td>'+marcad+'</td>'+
				'<td>'+kakaroto[i].ram+
				'</td>'+'<td>'+kakaroto[i].precio+
				//'</td>''<a class="btn btn-danger" data="'+kakaroto[i].id+'"><i class="fa fa-fw fa-remove"></i></a></td>'+
				// '</td>''<a class="btn btn-warning" data="'+kakaroto[i].id+'"><i class="fa fa-fw fa-remove"></i></a></td>'+
				'</tr>';
			} //for
			$('#cuerpoT').html(cuerpo);
		},
		error:function()
		{
			console.log("mal");
		}
	}); //ajax
} //cierra llenar tabla


	$('#btnEditar').on('click', '.btn-warning', function(){
		var id=$(this).attr("data"); //obtiene el valor de los objetos al principio(cuando se crea el html)
		console.log("id---> " +id);
		var json={"id":id};

		$.ajax({
			type:'ajax',
			method:'post',
			url:'http://localhost:9000/CelularWs/buscar',
			data: JSON.stringify(json),
			contentType:'application/json; charset=utf-8',
			success:function(kakaroto)
			{

				var marcad;
				if (kakaroto.marca==null) {
					marcad=0;
				} else {
					marcad.kakaroto.marca.id;
				}

			$('#idU').val(id); // id tiene el valor del elemento html
			$('#modeloU').val(kakaroto.modelo);
			$('#id_marca').val(marcad);
			llenarMarcaSelectEditar(marcad);
			$('#ramU').val(kakaroto.ram);
			$('#precioU').val(kakaroto.precio);
			$('#modalEditar').modal('show');
			},
			error:function() 
		{
			console.log("mal");
		}
		});
	});

	$('#cuerpoT').on('click','.btn-danger',function(){
		var id=$(this).attr("data");
		console.log("id-->" +id);
		var json={"id":id};
		$.ajax({
			type:'ajax',
			method:'post',
			url:'http://localhost:9000/CelularWs/buscar',
			data:JSON.stringify(json),
			contentType:'application/json; charset=utf-8',
			success:function(kakaroto)
			{
				var marcad;
				if (kakaroto.marca==null) {
					marcad=0;
				} else {
					marcad=kakaroto.marca,id;
				} //else
				$('#idE').val(id);
				$('#modeloE').val(kakaroto.modelo);
				$('#ramE').val(kakaroto.ram);
				llenarMarcaSelectEliminar(marcad);
				$('#precioE').val(kakaroto.precio);
				$('#modeloEliminar').modal('show');
			},
			error:function() 
			{
			console.log("mal");
			}
		}); //ajax
	}); //cierra btnDanger

	$("#btnEliminar").click(function(){
		var id=$('#idE').val();
		var modelo=$('#modeloE').val();
		var id_marca=$('#id:marca').val();
		var ram=$('#ram').val();

		var marca={'id':id_marca}
		var json={"id":id, "modelo":modelo, marca, "ram":ram, "precio" :precio}

		$.ajax({
			type:'ajax',
			method:'post',
			url:'http://localhost:9000/CelularWs/eliminar',
			data:JSON.stringify(json),
			contentType:'application/json; charset=utf-8',
			success:function(kakaroto)
			{
				console.log("bien---> " +JSON.stringify(kakaroto));
				$('#modalEliminar').modal('hide');
				limpiar();
				$('.alert-danger').html("Se eliminó "+modelo).fadeIn().delay(4000).fadeOut('snow');
				llenarTabla();
			}, //succes
			error:function () 
			{
			console.log("mal");
			}
		}); //ajax
	}); //btnEliminar 

	$('#btnEditar').click(function(){
		var id=$('#idU').val(); // id tiene el valor del elemento html
		var modelo=$('#modeloU').val();
		var id_marca=$('#id_marca').val();
		var ram=$('#ram').val();
		var precio=$('#precioU').val();

		var marca={'id':id_marca}
		var json={"id":id, "modelo":modelo, marca, "ram":ram, "precio" :precio };


		$.ajax({
			type:'ajax',
			method:'post',
			url:'http://localhost:9000/CelularWs/editar',
			data: JSON.stringify(json),
			contentType:'application/json; charset=utf-8',
			success:function(kakaroto)
			{

		console.log("--->" +JSON.stringify(kakaroto));
		$('#modalEditar').modal('hide');
		limpiar();
		$('.alert-success').html("Se editó exitosamente " +modelo).fadeIn().delay(4000).fadeOut('snow');
		llenarTabla();
		},//success
		error:function () 
		{
			console.log("mal");
		}

	}) //btnEditar
})



$("#btnAbrirAgregar").click(function(){

  $("#modalAgregar").modal("show");

});//cierra btnAbrirAgregar

$("#btnGuardar").click(function(){

  var id=$("#id").val();
  var modelo=$("#modelo").val();
  var id_marca=$("#marcaSelect").val();
  var ram=$("#ram").val();
  var precio=$("#precio").val();

  console.log("id-->"+id);
  console.log("modelo--"+modelo);
  console.log("id_marca-->"+id_marca);
  console.log("ram-->"+ram);
  console.log("precio-->"+precio);

  	if (id == '') {
  		alert("Falta el id");
 	} else if (modelo == '') {
  		alert("Falta el modelo");
  	}	else if (id_marca == '') {
  		alert("Falta el id marca");
	} else if (ram == '') {
		alert("Falta la ram");
	} else if (precio == '') {
		alert("Falta el precio");
	} else {

		var marca = {"id": id_marca}
		var json = {"id":id, "modelo":modelo, marca, "ram":ram, "precio" :precio};

		$.ajax({
			type:'ajax',
			method:'post',
			url:'http://localhost:9000/CelularWs/guardar',
			data: JSON.stringify(json),
			contentType:'application/json; charset=utf-8',
			success:function(kakaroto)
			{

		console.log("--->" +JSON.stringify(kakaroto));
		$('#modalAgregar').modal('hide');
		limpiar();
		$('.alert-success').html("Se guardó exitosamente " +modelo).fadeIn().delay(4000).fadeOut('snow');
		},//success
		error:function () 
		{ 
			console.log("mal");
		}
  		}); //ajax
  	} //else
}); //btnGuardar

function limpiar() {
	$("#id").val('');
	$("#modelo").val('');
	$("#id_marca").val('');
	$("#ram").val('');
	$("#precio").val('');
} //limpiar 