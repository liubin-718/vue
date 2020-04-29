/* eslint-disable */
let hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function(event){
    if(event.action === 'reload'){

    }
})

module.exports = hotClient;