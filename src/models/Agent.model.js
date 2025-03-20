import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const AgentSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    bv: {
      type: Number,
      trim: true,
    },
    rank: {
      type: Number,
      trim: true,
    },
    date_of_birth: {
      type: String,
      trim: true,
    },
    introducer: {
      id: {
        type: String,
        require: true,
        trim: true,
      },
      name: {
        type: String,
        trim: true,
      },
    },
    juniors: [
      {
        id: {
          type: String,
          trim: true,
        },
        name: {
          type: String,
          trim: true,
        },
      },
    ],
    earning : {
      type: Number,
      require: true,
    },
    rank: {
      type: Number,
      require: true,
    },
    kyc: {
      type: Number,
    },
    phone_number: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
    },
    adhaar: {
      type: Number,
      trim: true,
    //   unique: true,
    },
    pan: {
      type: String,
      trim: true,
    //   unique: true,
    },
    pin: {
      require: true,
      type: Number,
      trim: true,
    },
    address: {
      careof: { require: true, type: String, trim: true },
      addressline1: { require: true, type: String, trim: true },
      addressline2: { require: true, type: String, trim: true },
      post: { require: true, type: String, trim: true },
      policestation: { require: true, type: String, trim: true },
      town_city: { require: true, type: String, trim: true },
      dist: { require: true, type: String, trim: true },
      state: { require: true, type: String, trim: true },
    },
    adhaar_pic_URL: {
      type: String,
      trim: true,
    },
    profile_pic_URL: {
      type: String,
      trim: true,
    },
    kyc_profile_pic_URL: {
      type: String,
      trim: true,
    },
    pan_pic_URL: {
      type: String,
      trim: true,
    },
    signature_pic_URL: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

AgentSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

AgentSchema.methods.genarateToken = function () {
  const token = jwt.sign({ userid: this.userid }, process.env.SECRET);
  return token;
};

AgentSchema.pre("validate",async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

AgentSchema.methods.isPasswordCorrect = function (password) {
  return bcrypt.compare(password, this.password);
};

const Agent = mongoose.model("Agent", AgentSchema);

export default Agent;
