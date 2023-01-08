import mongoose, { Schema } from 'mongoose';

interface UserInput {
  description: string;
  amount: number;
  createdBy: string;
}

export interface TransactionDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    wallet: {
      type: Schema.Types.ObjectId,
      ref: 'Wallet',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

const Transaction = mongoose.model<TransactionDocument>('Transaction', transactionSchema);

export default Transaction;
