/* KEEP AUTHOR INFO INTACT 
   CREATED BY SHIVAM BHALLA
   EMAIL: shivambh28@gmail.com
*/

(function($) {		

	replyForm = {

		container: $('.comment'),

		config: {
			formContainer: '.commentFormContainer',
			openedClassName: 'opened',
			upFx: 'slideUp',
			downFx: 'slideDown',
			speed: 300
		},

		form : '<div class="commentFormContainer">'+"\n"+
			   '<h4>Leave a Reply</h4>'+"\n"+
			   '<form class="commentForm">'+"\n"+
			   '<input type="text" value="Name" class="name">'+"\n"+
			   '<input type="text" value="Email" class="email">'+"\n"+
			   '<textarea>Comment</textarea>'+"\n"+
			   '<input type="submit" value="Submit Comment">'+"\n"+	
			   '</form>'+"\n"+
			   '</div>',

		init: function(config) {
			$.extend(this.config, config);

			this.container.children('.info')
				.append('<a href="#">click here to reply</a>') //Adds reply button
				.on('click', this.show); //appends form

		},

		show: function(e) {
			var parent = $(this).parent(),
				rF = replyForm,
				config = rF.config;

			// only add one instance of the .commentFormContainer
			if ( !(parent.next(config.formContainer).length) ) {

				parent.addClass(config.openedClassName)
					.after(replyForm.form)
						.next(config.formContainer)
						[config.downFx](config.speed);	

				validation($(config.formContainer).find('form'));

			}  else if (parent.next(config.formContainer).length === 1) { // if instance of new form = 1, the only slide it down

				parent.addClass(config.openedClassName)
						.next(config.formContainer)
						[config.downFx](config.speed);	

			}

			$('.'+config.openedClassName) // slide up old clicked element
				.not(parent)
				.removeClass(config.openedClassName)
						.next(config.formContainer)
						[config.upFx](config.speed);

			e.preventDefault();				
		}
	}

	replyForm.init();

	function validation(form) {
		$(form).submit(function() {
			
			var error = 'error';

			var name = $(this).find('.name')
				nameVal = name.attr('value')
				email = $(this).find('.email')
				comment = $(this).find('textarea')
				commentVal = comment.html();

			if ( !(name.val() === nameVal || name.val() === '' || name.val().length < 3) &&
				 !(comment.val() === commentVal || comment.val() === '' || comment.val().length < 3) &&
				 validateEmail(email.val())  
			   ) {
				console.log('Form is good');
			    return true;
			} else {
				
				( name.val() === nameVal || name.val() === '' || name.val().length < 3 ) ? name.addClass(error) : name.removeClass(error);
				( comment.val() === commentVal || comment.val() === '' || comment.val().length < 3 ) ? comment.addClass(error) : comment.removeClass(error);
				( !validateEmail(email.val()) ) ? email.addClass(error) : email.removeClass(error);

				console.log('Form is BAD');
				return false;
			 
			}

		});

		function validateEmail(email) { 
		    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    return re.test(email);
		}  
	}
	
}) (jQuery);