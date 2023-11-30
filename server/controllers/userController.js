const User= require("../model/userModel");
const bcrypt= require("bcrypt");

module.exports.register=async (req,res,next)=>{
try{
    const {username,email,password}=req.body;
    const usernameCheck = await User.findOne({username});
    if(usernameCheck){
        return res.json({msg:"Username already used",status:false});
    }
    const emailCheck = await User.findOne({email});
    if(emailCheck){
        return res.json({msg:"Email already used",status:false});
    }
    const hashPassword = await bcrypt.hash(password,10);
    const user= await User.create({
        email,
        username,
        Password: hashPassword,
   })
    const {Password,...info}=user._doc;
   return res.json({ status: true, ...info });
}catch(e){
    next(e)
}
}

module.exports.login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user)
        return res.json({ msg: "Incorrect Username or Password", status: false });
      const isPasswordValid = await bcrypt.compare(password, user.Password);
      if (!isPasswordValid)
        return res.json({ msg: "Incorrect Username or Password", status: false });
      const {Password,...info}=user._doc;
      return res.json({ status: true, ...info });
    } catch (ex) {
      next(ex);
    }
  };

  module.exports.setAvatar = async(req,res,next)=>{
    try{
      const userId=req.params.id;
      const avatarImage=req.body.image;
      const userData = await User.findByIdAndUpdate(
        userId,
        {
          isAvatarImageSet: true,
          avatarImage,
        },
        { new: true }
      );
      return res.json({
        isSet: userData.isAvatarImageSet,
        image: userData.avatarImage,
      });
    }catch(ex){
      next(ex)
    }
  }
  