import mongoose from 'mongoose';

export interface ItokenInterface {
  token: string;
}

export const TokenSchema = new mongoose.Schema<ItokenInterface>(
  {
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

export const Token = mongoose.model<ItokenInterface>('Token', TokenSchema);
