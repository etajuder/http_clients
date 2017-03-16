

 var prompt = require('prompt');

 const chalk = require('chalk');

 var Spinner = require('clui').Spinner;

 var request = require('request');
 var app = new App();


 	prompt.start();

	
    app.display_message([chalk.blue("Welcome to Multiple Sms Sender here you can send SMS to Many users using this wonderful command line App"),
                       chalk.green("Please Select your Operation"),
                       chalk.yellow("1: Check your Account Balance"),
                       chalk.cyan("2: Send Sms")
                    ]);

	  

	prompt.get(["operation"],function(err,result){

   			 switch(result.operation){

    				case "1":

                app.initiate_request("'Getting your SMS Account Balance, please wait...'");

          			
          			 var url = "http://smsmobile24.com/components/com_spc/smsapi.php?username={0}&password={1}&balance=true&".format(app.username,app.password);


          			 request(url,function(error, response, body){

                  app.stop_request();

           					if(response.statusCode === 200){

           								app.display_message(chalk.green("Your Account Balance is "+body));
           								
           		
           					}else{

                          app.display_message(chalk.red("Error occur please try again"));
           								
           					}

                   });


    	break;

    	 	case "2":
    	
    				
            app.display_message([chalk.white("Please Enter the numbers to send to."),
                             chalk.white("Enter the message to be sent"),
                             chalk.white("Enter the Sender Name")
              ]);

    	
    				prompt.get(["numbers","message","sender"],function(err,result){

    				var url = "http://smsmobile24.com/components/com_spc/smsapi.php?username={0}&password={1}&sender={2}&recipient={3}&message={4}";

    				    url = url.format(app.username,app.password,result.sender,result.numbers,result.message);


           			app.initiate_request('Sending Message to '+ result.numbers);

           			
    				request(url,function(error, response, body){

                    app.stop_request();

    						if(response.statusCode === 200){

    									
    									app.display_message(chalk.green("Your Message have been sent to "+request.numbers));

    						}else{

    									app.display_message(chalk.red("Error Sending message"));

    						}
    				});

    		});

    	break;

    	default:

          		 console.log(chalk.red("Invalid Operation specified"));

    	break;
    }
});



  function App(){

    this.username = "wapjuder";
    this.password = "password";    
    this.request_sms_url = "http://smsmobile24.com/components/com_spc/smsapi.php?username={0}&password={1}&balance=true&";
    this.message = "";
    this.numbers = "";
    this.sender = "Andela";
    this.sms_url = "http://smsmobile24.com/components/com_spc/smsapi.php?username={0}&password={1}&sender={2}&recipient={3}&message={4}";
    this.spinner = new Spinner("");

    this.display_message = function(message){
                              if(Array.isArray(message)){

                              message.forEach(function(mess){
                                 console.log(mess);
                              });


                              }else{

                                 console.log(message);
                              
                              }
                         
                          }

    this.initiate_request = function(request_message){

                            this.spinner.message(request_message);

                            this.spinner.start();

                          }

  this.stop_request    = function(){

                           this.spinner.stop();  
                         }
  }

  


     //define string format prototype
if (!String.prototype.format) {

            String.prototype.format = function() {

        var args = arguments;

        return this.replace(/{(\d+)}/g, function(match, number) { 

         return typeof args[number] != 'undefined' ? args[number]: match

              ;

        });

  };

}
  