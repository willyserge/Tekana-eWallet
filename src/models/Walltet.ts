import mongoose, { Schema } from 'mongoose';

interface UserInput {
  name: string;
  amount: number;
  createdBy: string;

}

export interface WalletDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const walletSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: false },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

const Wallet = mongoose.model<WalletDocument>('Wallet', walletSchema);

export default Wallet;
