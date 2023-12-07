const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');



const UserSchema=new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50,
      },
      email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
        validate: {
          validator: validator.isEmail,
          message: 'Please provide valid email',
        },
      },
      role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
      },
      contestId:{
       codeforces:{
        type:String,
        default:''
       },
       leetcode:{
        type:String,
        default:''
       }

      },
      password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
      },
      
      verificationToken: String,
      isVerified: {
        type: Boolean,
        default: false,
      },
      // when email get varified
      verified: Date,

      // for reset purpose
      passwordToken: {
        type: String,
      },
      passwordTokenExpirationDate: {
        type: Date,
      },
})

// middle-ware of mongoos
UserSchema.pre('save', async function(){

    if(!this.isModified('password'))return;
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
})


// custome method to compare passWord
UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};



module.exports=mongoose.model('User',UserSchema);
