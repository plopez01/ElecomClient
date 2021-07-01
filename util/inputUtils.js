module.exports = {
    emailCheck(email){
        //Email regex
        return email.search(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)+1;
    },
    passCheck(pass){
        //Password regex
        return pass.search(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)+1;
    },
    userCheck(username){
        //Username lenght check
        return username.search(/^.{3,16}$/)+1;
    },
    userTagCheck(tag){
        return tag.search(/^.{3,32}#[0-9]{4}$/)+1;
    }
}