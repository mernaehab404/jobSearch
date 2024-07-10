import { Schema, model } from "mongoose";

const userSchema= new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
     username: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    recoveryEmail: {
        type: String,
        required: false
    },
    DOB: {
        type: Date,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['User', 'Company_HR'],
        required: true
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        required: true
    }
    
},{
    timestamps:{updatedAt:false},
    versionKey:false,
    strictPopulate: false // Disable strict populate
  })

// Pre-save hook to generate username from firstName and lastName
userSchema.pre('save', function(next) {
    if (!this.username || this.isModified('firstName') || this.isModified('lastName')) {
        this.username = `${this.firstName}${this.lastName}`;
    }
    next();
});

export const User= model('User',userSchema)