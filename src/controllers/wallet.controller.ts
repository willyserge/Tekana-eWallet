import { Request, Response } from 'express';

import Wallet from '../models/Walltet';
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

export default { createWallet, getWallets };