const allowdOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:3000',
]
export const corsOptions = {
    origin : function(origin, callback){
        if(allowdOrigins.indexOf(origin) !== -1){
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS Error"))
        }
    },
    credentials : true,
    optionsSuccessStatus : 200
} 