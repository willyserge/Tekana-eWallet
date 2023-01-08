import express from 'express';

import controller from '../controllers/wallet.controller';

const walletRouter = express.Router();

walletRouter.post('/create', controller.createWallet);
walletRouter.get('/read', controller.getWallets);
walletRouter.put('/update/:walletId', controller.updateWalletAmount);

export default walletRouter;
