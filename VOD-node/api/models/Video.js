/**
* Video.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	img:{
  		type:"string",
	    required:true
  	},
  	title:{
  		type:"string",
	    required:true
  	},
  	videoURL:{
  		type:"string",
	    required:true
  	},
  	history:{
        model: 'History'
    }
  }
};

