/**
 * HistoryController
 *
 * @description :: Server-side logic for managing histories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	/**
	*	This method will check, if the clientId is present or not,
	*	If clientId is not present, then new client Entry will be created.
	*	Else it will update the Video array.
	**/
	createOrUpdate:function(req,res){

		var responseObj = {
			"status": "",
			"count": 0,
			"type": "",
			"results":[]
		};

		var video = {
			img: req.body.img,
			title: req.body.title,
			videoURL: req.body.videoURL
		};

		var clientId = req.body.clientId;

		//check whether the clientId is present
		if(clientId){

			//check whether the video is already present
			Video.find({history:clientId}).populate("history")  		
			.then(function(returnVideos){					
				
				//If wrong clientId was passed.
				if(!(returnVideos && (returnVideos.length > 0))){
					responseObj.status = "error";
		  			responseObj.type = "Error";		
		  			return res.json(responseObj);
				}

				var returnVideo;

				for (var i = 0; i < returnVideos.length; i++) {
					returnVideo = returnVideos[i];

					//duplicate is found
					if(returnVideo.title === video.title){
						responseObj.status = "error";
		  				responseObj.type = "Error";		
		  				return res.json(responseObj);
					}
				};

				sails.log.info("Existing Video : " + JSON.stringify(returnVideo));
				

				video.history = returnVideo.history;
				Video.create(video).exec(function (err, savedVideo) {
					if(err){
						sails.log.error(err);
					}else{
				  		//Specification created.
				  		sails.log.info("New Video created : " + JSON.stringify(savedVideo));	
						  		
				  		responseObj.status = "success";
					  	responseObj.type = "History";
					  	responseObj.count = returnVideo.history.length;
					  	responseObj.results = returnVideo.history;
					  			
					  	sails.log.info("History Response : " + JSON.stringify(returnVideo.history));
					  	return res.json(responseObj);
				  	} 						  		
				});				
			})
			.catch(function (error) {
				
				sails.log.error(error);	

				responseObj.status = "error";
	  			responseObj.type = "Error";		
	  			return res.json(responseObj);
			});
							
		}else{

			Video.create(video)  		
			.then(function(savedVideo){	

				var history = {
					videos : [savedVideo]
				};
				
				History.create(history).exec(function (err, savedHistory) {
					if(err){
						sails.log.error(err);
					}else{
				  		//Specification created.
				  		sails.log.info("New Video created : " + JSON.stringify(savedVideo));	
						  		
				  		//Update History with savedVideo								  					
				  		savedVideo.history = savedHistory;						  		
				  		savedVideo.save(function(err){
					        if(err){
					        	sails.log.error(err);
					        }else{
					        	responseObj.status = "success";
					  			responseObj.type = "History";
					  			responseObj.count = savedHistory.length;
					  			responseObj.results = savedHistory;
					  			
					  			sails.log.info("History Response : " + JSON.stringify(savedHistory));
					  			return res.json(responseObj);
					        }					        	
					    });
				  	} 						  		
				});
			})
		}

	},

	/**
	*	This method will review the History based on clientId.
	**/
	getHistory:function(req,res){

		var responseObj = {
			"status": "",
			"count": 0,
			"type": "",
			"results":[]
		};

		var clientId = req.param('clientId');  	

		Video.find({history:clientId}).populate("history")  		
		.then(function(returnVideos){	

			responseObj.status = "success";
  			responseObj.type = "History";
  			responseObj.count = returnVideos.length;
  			responseObj.results = returnVideos;
  			
  			sails.log.info("History Response : " + JSON.stringify(responseObj));
  			return res.json(responseObj);
		})
		.catch(function (error) {
			
			sails.log.error(error);	

			responseObj.status = "error";
  			responseObj.type = "Error";		
  			return res.json(responseObj);
		});

	}
};

