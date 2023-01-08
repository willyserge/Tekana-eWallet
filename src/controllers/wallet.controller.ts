import { Request, Response } from 'express';

import Wallet from '../models/Wallet';
import logger from '../utils/logger';

// create a wallet

const createWallet = async (req: Request, res: Response) => {
  try {
    const newWallet = new Wallet(req.body);
    newWallet.createdBy = req.user.id;
    await newWallet.save();
    return res.status(201).json('wallet created');
  } catch (error:any) {
    logger.info(error);
    return res.status(500).json(error);
  }
};

// retrieve user wallets

const getWallets = async (req: Request, res: Response) => {
  try {
    const wallets = await Wallet.find({ createdBy: req.user.id });
    return res.status(200).json({ wallets });
  } catch (error:any) {
    logger.info(error);
    return res.status(500).json(error);
  }
};

const updateWalletAmount = async (req: Request, res: Response) => {
  const { walletId } = req.params;

  try {
    const wallet = await Wallet.findByIdAndUpdate(walletId, req.body, { new: true });
    res.status(200).json({
      message: 'note updated successfully',
      wallet,
    });
  } catch (error:any) {
    logger.info(error);
    return res.status(500).json(error);
  }
};

export default { createWallet, getWallets, updateWalletAmount };
