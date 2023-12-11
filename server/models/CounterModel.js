import mongoose from 'mongoose';

const CounterSchema = new mongoose.Schema({
  lastRegNo: {
    type: Number,
    default: 0,
    unique: true,
  }

});

const CounterModel = mongoose.model('counters', CounterSchema);

export default CounterModel;
