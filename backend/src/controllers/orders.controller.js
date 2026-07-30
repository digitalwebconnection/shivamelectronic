import * as ordersService from '../services/orders.service.js';

export const place = async (req, res, next) => {
  try { res.status(201).json(await ordersService.placeOrder(req.body)); }
  catch (err) { next(err); }
};

export const getMy = async (req, res, next) => {
  try { res.json(await ordersService.getMyOrders(req.user)); }
  catch (err) { next(err); }
};

export const getAll = async (req, res, next) => {
  try { res.json(await ordersService.getAllOrders()); }
  catch (err) { next(err); }
};

export const updateStatus = async (req, res, next) => {
  try { res.json(await ordersService.updateOrderStatus(req.params.id, req.body.status)); }
  catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try { res.json(await ordersService.deleteOrder(req.params.id)); }
  catch (err) { next(err); }
};
