$(function() {

	$("#first_Name_Error").hide();
	$("#email_Error").hide();
	$("#password_Error").hide();
	$("#password_Retype_Error").hide();
	$('#date_Error').hide();

	var error_username = false;
	var non_Error_password = false;
	var pass_Has_Numb = false;
	var pass_Has_Min = false;
	var pass_Has_Up = false;
	var pass_Has_Low = false;
	var pass_Has_Non_Alph = false;
	var error_retype_password = false;
	var error_email = false;
	var error_Date = false;

	$("#first_name").focusout(function() {

		check_username();
		
	});

	$("#password").focusout(function() {
		// Precisa colocar .hide() novamente para cancelar o show error quando está certo em uma segunda tentativa. Motivo: Operador Ternário.
		$("#password_Error").hide();
	    check_For_Number();
		check_Minimum();
		check_For_UpperCase();
		check_For_LowerCase();
		check_Non_Alphanumeric();
		
	});

	$("#password2").focusout(function() {

		check_retype_password();
		
	});

	$("#email_inline").focusout(function() {

		check_email();
		
	});

	$('#data').focusout(function() {
	     $('#date_Error').hide();
		check_Date();
		
	});
	
	function check_username() {
	
		var username_length = $("#first_name").val().length;
	
		if(username_length < 1 || username_length > 100) {
			$("#first_Name_Error").show();
			error_username = true;
		} else {
			$("#first_Name_Error").hide();
		}
	
	}

	function check_retype_password() {
	
		var password1 = $("#password").val();
		var retype_password = $("#password2").val();
		
		if(password1 !=  retype_password) {
			$("#password_Retype_Error").show();
			error_retype_password = true;
		} else {
			$("#password_Retype_Error").hide();
		}
	
	}

	function check_email() {

		var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
	
		if(pattern.test($("#email_inline").val())) {
			$("#email_Error").hide();
		} else {
			$("#email_Error").show();
			error_email = true;
		}
	
	}
	
	function check_For_Number(){
	    // (/\d/) Significa que vai buscar um dígito na palavra. Metacaracteres Js Guia do programador P.236
		var buscar = new RegExp(/\d/);
		buscar.test($('#password').val())?pass_Has_Numb = true:$('#password_Error').show();
	}
	
	function check_Minimum(){
	    //Verifica se Existem No Mínimo 8 Caracteres na senha
		var password_length = $("#password").val().length;
		password_length >= 8?pass_Has_Min = true:$('#password_Error').show();
	}
	
	function check_For_UpperCase(){
		var upper_Unknown = new RegExp(/[A-Z]/);
		upper_Unknown.test($('#password').val())?pass_Has_Up = true:$('#password_Error').show();
	}
	
	function check_For_LowerCase(){
		var lower_Unknown = new RegExp(/[a-z]/);
		lower_Unknown.test($('#password').val())?pass_Has_Low = true:$('#password_Error').show();
	}
	
	function check_Non_Alphanumeric(){
		var alphanumeric_Unknown = new RegExp(/[!@#$%*()_+^&{}}:;?.]/);
		alphanumeric_Unknown.test($('#password').val())?pass_Has_Non_Alph = true:$('#password_Error').show();
	}
	
	function check_Date(){
		var date = new Date($('#data').val());
		var max = new Date();
		if(Date.parse(date)>Date.parse(max)){
			$('#date_Error').show();
			error_Date = true;
		}
	}
	
	$("#register_Form").submit(function() {
											
		error_username = false;
		non_Error_password = false;
		error_retype_password = false;
		error_email = false;
		error_password = false;
		pass_Has_Numb = false;
		pass_Has_Min = false;
		pass_Has_Up = false;
		pass_Has_Low = false;
		pass_Has_Non_Alph = false;
		error_Date = false;
											
		check_username();
	    check_For_Number();
		check_Minimum();
		check_For_UpperCase();
		check_For_LowerCase();
		check_Non_Alphanumeric();
		check_retype_password();
		check_email();
		check_Date();
		
		error_password = !(pass_Has_Low && pass_Has_Min && pass_Has_Non_Alph && pass_Has_Numb && pass_Has_Up);
		return (error_Date || error_username || error_password || error_retype_password || error_email?false:true);
	});

});