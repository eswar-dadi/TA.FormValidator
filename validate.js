

var TA = {

	// Initializing the function for form 
	formValidator: function(form, fields) {
		var that =  this;
		form.onsubmit = function() {
			if(!that.validateAll(form, fields)) {
				that.showMessages(that.errors);
				that.reset();		
				return false;
			}

		};
	},
	// Reset the errrors to empty
	reset: function() {
		this.errors = [];
	},

	// function for capturing the fields by name 
	getElementByName: function(field) {
		return document.getElementsByName(field.name)[0];
	},

	// Validate function where all the validations get checked
	validateAll: function(form, fields) {
		var error = 0;
		for(var i = 0; i < fields.length; i++) {
			if(fields[i].email) {
				if( !this.validateEmail(fields[i]) ) {
					error++;
				}
			}
			if(fields[i].phone) {
				if(!this.validatePhone(fields[i]));
				error++;
			}
			if(fields[i].dl) {
				if(!this.validateDrivingLicense(fields[i]));
				error++;
			}
			if(fields[i].address) {
				if(!this.validateAddress(fields[i]));
				error++;
			}
			if(fields[i].city) {
				if(!this.validateCity(fields[i]));
				error++;
			}
			if(fields[i].zip) {
				if(!this.validateZip(fields[i]));
				error++;
			}
		}
		if(error > 0) {
			return false;
		}
		else
			return true
	},

	// Validate Email function for Email input field
	validateEmail: function(field) {
		var ele = this.getElementByName(field);
		if(field.require == true){
			if( this.isEmpty(ele, field) ) return false;
		
			if( !regex.email.test(ele.value) ) {
				this.pushError(ele, this.messages.email);
				return false;
			}
			if( !this.isRangeValid(ele, field, field.range[0], field.range[1]) ) return false;

			return true;
		} else{
			return false;
		}
		
		
	},
	// Validations for Contact number
	validatePhone: function(field) {
		var ele = this.getElementByName(field);
		if( this.isEmpty(ele, field) ) return false;
		if(field.trim == true ){
			var removeSpaceAndHyphens = ele.value.replace(/-|\s/g,"");	
		}
		else var removeSpaceAndHyphens = ele.value;
		if( !regex.phone.test(removeSpaceAndHyphens) ) {
			this.pushError(ele, this.messages.phone);
			return false;
		}
		if( !this.isRangeValid(ele, field, field.range[0], field.range[1]) ) return false;

		return true;
	},
	// Validations for Driving License
	validateDrivingLicense: function(field) {
		var ele = this.getElementByName(field);
		if( this.isEmpty(ele, field) ) return false;
		if(field.trim == true ){
			var removeSpaceAndHyphens = ele.value.replace(/-|\s/g,"");	
		}
		else var removeSpaceAndHyphens = ele.value;
		alert(removeSpaceAndHyphens);
		if( !regex.dl.test(removeSpaceAndHyphens) ) {
			this.pushError(ele, this.messages.dl);
			return false;
		}
		if( !this.isRangeValid(ele, field, field.range[0], field.range[1]) ) return false;

		return true;
	},
	// Validations for Address fields
	validateAddress: function(field) {
		var ele = this.getElementByName(field);

		if( this.isEmpty(ele, field) ) return false;
		if( !regex.address.test(ele.value) ) {
			this.pushError(ele, this.messages.address);
			return false;
		}
		if( !this.isRangeValid(ele, field, field.range[0], field.range[1]) ) return false;

		return true;
	},

	// Validations for city fields
	validateCity: function(field) {
		var ele = this.getElementByName(field);

		if( this.isEmpty(ele, field) ) return false;
		if( !regex.city.test(ele.value) ) {
			this.pushError(ele, this.messages.city);
			return false;
		}
		if( !this.isRangeValid(ele, field, field.range[0], field.range[1]) ) return false;

		return true;
	},

	// Validations for Zip/postal code
	validateZip: function(field) {
		var ele = this.getElementByName(field);

		if( this.isEmpty(ele, field) ) return false;
		if( !regex.zip.test(ele.value) ) {
			this.pushError(ele, this.messages.zip);
			return false;
		}
		if( !this.isRangeValid(ele, field, field.range[0], field.range[1]) ) return false;

		return true;
	},
	// function to check range with starting and ending values defined in fields array
	isRangeValid: function(element, field, s, e) {
		var valid = (element.value.length > s && element.value.length <= e)
		if( !valid ) this.pushError(element, this.messages.range(field.range[0], field.range[1]));
		return valid;
	},
	// function to check whether the field is empty or not
	isEmpty: function(ele, field) {
		var value = ele.value.trim();
		if( value == "" ) this.pushError(ele, this.messages.required(field.name));
		return (value == "");
	},
	// function for pushing errors
	pushError: function(element, message) {
		this.errors.push({field: element, message: message});
	},

	// Error Messages 
	messages: {
		required: function(name){
			return "This " + name + " is required."
		},
		range: function(s ,e){
			return "range should be between " + s + " and" + e ;
		},
		email: "This email is not valid",
		phone: "This contact number is not valid",
		dl:    "This drving license is not valid",
		address: "This Address is not valid",
		city: "City name is not valid",
		zip: "zip/postal code is not valid"

	},
	errors: [],
	showMessages: function(errors) {
		var errorListStr = "<ul>";
		for (var i = 0; i < errors.length; i++) {
			errorListStr += '<li>' + errors[i]['message'] + '</li>';
		}
		errorListStr += "</ul>";
		document.getElementById('validationErrors').innerHTML = errorListStr;		
	}
};

// regex for all the fields 
var regex = {
	email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
	phone: /^\d([- ]*\d){1,21}$/,
	dl: /^\d([- ]*\d){1,26}$/,
	address : /^[a-zA-Z0-9\s,'-]*$/,
	city: /^(?:[a-zA-Z]+(?:[.'\-,])?\s?)+$/,
	zip: /^([a-zA-Z0-9_-]){1,11}$/
}

window.onload = function(fields) {
	var value = document.getElementById('email').getAttribute("data-email");
	console.log(value);
	var fields = [
		{
			email: true,
			name: 'email',
			require: true,
			range: [5,80]
		},
		{	
			phone: true,
			name: 'phone',
			require: true,
			range: [1, 20],
			trim: true
		},
		{
			dl: true,
			name: 'dl',
			require: true,
			range:[1,25],
			trim: false
		},
		{
			address: true,
			name: 'address',
			require: true,
			range: [1,30]
		},
		{
			city: true,
			name: 'city',
			require: true,
			range: [1,20]
		},
		{
			zip: true,
			name: 'zip',
			require: true,
			range: [1,11]
		}
	];
	TA.formValidator(document.getElementById('myForm'), fields);
}

