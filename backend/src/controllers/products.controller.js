import * as productsService from '../services/products.service.js';

export const getAll = async (req, res, next) => {
  try { res.json(await productsService.getAllProducts()); }
  catch (err) { next(err); }
};

export const create = async (req, res, next) => {
  try { res.status(201).json(await productsService.createProduct(req.body, req.file)); }
  catch (err) { next(err); }
};

export const update = async (req, res, next) => {
  try { res.json(await productsService.updateProduct(req.params.id, req.body, req.file)); }
  catch (err) { next(err); }
};

export const toggleHot = async (req, res, next) => {
  try { res.json(await productsService.toggleHotStatus(req.params.id)); }
  catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try { res.json(await productsService.deleteProduct(req.params.id)); }
  catch (err) { next(err); }
};
