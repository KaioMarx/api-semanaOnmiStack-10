import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://kaio:mdp3p9e3@cluster0-li6pz.mongodb.net/week10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})