$(function(){
	//LIMPA PLACEHOLDER E ADICIONA LABEL
	$(':input').on('focus', function() {
	    this.dataset.placeholder = this.placeholder;
	    this.placeholder = '';
	    $(this).parents('.input').find('label').show();
	}).on('blur', function(){
	    this.placeholder = this.dataset.placeholder;
	    $(this).parents('.input').find('label').hide();
	});

	//LABEL INPUT UNFOCUS
	$('input').on('focusout',function(){	
		if($(this).val().length > 0 ){	
			$(this).parents('.input').find('label').addClass('correct');
		} else {
			$(this).parents('.input').find('label').removeClass('correct');
		}
	});

	//MÁSCARAS TELEFONE
	selectCountry = $('#countries .dropdown-menu')
	$('#telefone input').mask('(00) 0000-00000');	
	$('#countries .dropdown-menu').on('click','li',function(){
		$('#telefone input').val('');
		if($(selectCountry).find('.bfh-flag-BR').parents('li').hasClass('active')){
			$('#telefone input').mask('(00) 0000-00000');	
		}else if($(selectCountry).find('.bfh-flag-US').parents('li').hasClass('active')){
			$('#telefone input').mask('(000) 000-0000');	
		}else if($(selectCountry).find('.bfh-flag-ES').parents('li').hasClass('active')){
			$('#telefone input').mask('(00) 0000-00000');
		}else if($(selectCountry).find('.bfh-flag-GB').parents('li').hasClass('active')){
			$('#telefone input').mask('(00) 0000-0000');
		}else if($(selectCountry).find('.bfh-flag-DK').parents('li').hasClass('active')){
			$('#telefone input').mask('(00) 0000-0000');
		}
	});

	//VERIFICA CAMPOS FORMULÁRIO
	correctTelefone = false
	correctEmail = false
	correctURL = false

	$('form').on('submit',function(){
		$('form').find('input, button').filter(function() {
			if($(this).val().length === 0 ) {
				$(this).parents('.input').find('.error').remove();
				$(this).parents('.input').append('<div class="error">Este campo é obrigatório!</div>');				
			} else {
				$(this).parents('.input').find('.error').remove();
			}
		});	

		//VALIDA TELEFONE
		var telefone = $('#telefone input').val()
		if (telefone.length >= 1 && telefone.length <= 13){
			$('#telefone').parents('.input').append('<div class="error">Telefone inválido.</div>');	
		} else if (telefone.length == 0){
			$('#telefone').parents('.input').append('<div class="error">Este campo é obrigatório!</div>');	
		} else {
			$('#telefone').parents('.input').find('.error').remove();
			correctTelefone = true
		}

		//VALIDA E-MAIL
		var email = $('#email input').val()
		if (email.length > 0){
			function validaEmail(email) {
			  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			  return regex.test(email);
			}
			if(!validaEmail(email)){
				$('#email').append('<div class="error">E-mail inválido.</div>');	
			} else {
				correctEmail = true
			}
		} else if (email.length == 0){
			$('#email').append('<div class="error">Este campo é obrigatório!</div>');	
		} else if (email.length > 0){
			$('#email').find('.error').remove();			
		}	

		//VALIDA URL
		var url = $('#url input').val()
		if (url.length > 0){
			function validaURL(url) {
			  var regex = /^(www).[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
			  return regex.test(url);
			}
			if(!validaURL(url)){
				$('#url').append('<div class="error">Domínio inválido.</div>');	
			} else {
				correctURL = true
			}
		} else if (url.length == 0){
			$('#url').append('<div class="error">Este campo é obrigatório!</div>');	
		} else {
			$('#url').find('.error').remove();
			correctURL = true
		}			

		var checkInput = $('input').filter(function() {
	        return this.value === "";
	    });	

		if(!checkInput.length){
			if(correctTelefone == true && correctEmail == true && correctURL == true){
		    	$('button.send').fadeOut();
		    	setTimeout(function(){
		    		$('button.send').addClass('success').html('Obrigado!');
		    		$('button.send').prop('disabled','disabled');
		    		$('.info').fadeIn();
		    	},500);
		    	$('button.send').fadeIn();
		    }
		}

		return false;
	});

	//CUSTOM SELECT
	$('#verba .dropdown-item').on('click',function(){
		$('#verba .dropdown-item').removeClass('active');
		$(this).addClass('active');
		selectValue = $('#verba .dropdown-item.active').text();
		$('#verba .dropdown-toggle').val(selectValue).html(selectValue).addClass('selected');
	});

	//CUSTOM SELECT COUNTRY
	$('#countries .dropdown-item').on('click',function(){
		$('#countries .dropdown-item').removeClass('active');
		$(this).addClass('active');
		selectBandeira = $('#countries .dropdown-item.active i').clone();
		selectValue = $('#countries .dropdown-item.active').val();
		$('#countries .dropdown-toggle').val(selectValue).html(selectBandeira).addClass('selected');
	});	
});

