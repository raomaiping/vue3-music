module.exports = {
    css:{
        loaderOptions:{
            sass:{
                //引入全局变量 和 mixin
                additionalData:`
                  @import "@/assets/scss/variable.scss";
                  @import "@/assets/scss/mixin.scss";
                `
            }
        }
    }
}