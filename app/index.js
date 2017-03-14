

 var prompt = require('prompt');

 const chalk = require('chalk');

 var Spinner     = require('clui').Spinner;

 var request = require('request');

if (!String.prototype.format) {

  String.prototype.format = function() {

    var args = arguments;

    return this.replace(/{(\d+)}/g, function(match, number) { 

      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;

    });

  };

}

 prompt.start();
 
console.log(chalk.blue("Welcome to Multiple Sms Sender here you can send SMS to Many users using this wonderful command line App"));

console.log(chalk.green("Please Select your Operation"));

console.log(chalk.yellow("1: Check your Account Balance"));

console.log(chalk.cyan("2: Send Sms"));

prompt.get(["operation"],function(err,result){

    switch(result.operation){

    	case "1":

        var status = new Spinner('Getting your SMS Account Balance, please wait...');

           status.start();

            var username = "wapjuder";

            var password = "password";

           var url = "http://smsmobile24.com/components/com_spc/smsapi.php?username={0}&password={1}&balance=true&".format(username,password);

           request(url,function(error, response, body){

           	if(response.statusCode === 200){

           		status.stop();

           		console.log(chalk.green("Your Account Balance is "+body))
           		
           	}else{

           		console.log(chalk.red("Error occur please try again"));
           	}
           });


    	break;

    	case "2":
    	
    	console.log(chalk.white("Please Enter the numbers to send to."));
    	
    	console.log(chalk.white("Enter the message to be sent"));

    	console.log(chalk.white("Enter the Sender Name"));
 
    	
    	prompt.get(["numbers","message","sender"],function(err,result){

    		var username = "wapjuder";

            var password = "password";

    		var url = "http://smsmobile24.com/components/com_spc/smsapi.php?username={0}&password={1}&sender={2}&recipient={3}&message={4}";

    		url =url.format(username,password,result.sender,result.numbers,result.message);

           var status = new Spinner('Sending Message to '+ result.numbers);

           status.start();

    		request(url,function(error, response, body){

    			if(response.statusCode === 200){

    				status.stop();

    				console.log(chalk.green("Your Message have been sent to "+request.numbers));

    			}else{

    				console.log(chalk.red("Error Sending message"));

    			}
    		});

    	});

    	break;
    	default:
           console.log(chalk.red("Invalid Operation specified"));
    	break;
    }
});