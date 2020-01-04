var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    username: {type:String,required:true},
    userid: {type:String,required:true},
    friends: [new mongoose.Schema({friend: String, phonenumber: String})],
    imageaddrs: [{imageaddr:String}],
});

userSchema.methods.addFriend = function (id,newfriend, number) {
    let input={friend:newfriend, phonenumber:number}
    this.friends.push(input);
    return this.save();
};

userSchema.methods.addImage = function (id,addr) {
    let input={imageaddr:addr}
    this.imageaddrs.push(input);
    return this.save();
};
/*
userSchema.methods.removeFriend = function (oldfriend,oldmoney) {
    let input={friend:oldfriend,money:oldmoney}
    this.friends.pull(input);
    return this.save();
};*/


var User = mongoose.model("User",userSchema);
module.exports = User;