module.exports={
    devServer:{
        proxy:{
            '/api3':{
                target:'http://localhost:3000',
                changeOrigin:true
            },
            '/api':{
                target:'http://localhost:8080',
                ws:true,
                changeOrigin:true,
                
                }
            }
        }
    }
