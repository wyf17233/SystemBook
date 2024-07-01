const { getErr } = require("./sendResultMid")
module.exports = (err, req, res, next) => {
    //如果存在错误
    if(err){
        const errObj = err instanceof Error ? err.message : err
        res.status(500).send(getErr(errObj))
    }else{
        next()
    }
}