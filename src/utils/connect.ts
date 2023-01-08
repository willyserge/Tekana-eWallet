import mongoose from 'mongoose';
import config from 'config';

async function connect() {
  const dbURI = config.get<string>('dbURI');
  try {
    await mongoose.connect(dbURI);
    console.log('db connected');
  } catch (error:any) {
    console.log(error.message);
    process.exit(1);
  }
}

export default connect;
