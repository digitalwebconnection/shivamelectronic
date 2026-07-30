import * as categoriesService from '../services/categories.service.js';

export const getAll = async (req, res, next) => {
  try { res.json(await categoriesService.getAllCategories()); }
  catch (err) { next(err); }
};

export const create = async (req, res, next) => {
  try { res.status(201).json(await categoriesService.createCategory(req.body)); }
  catch (err) { next(err); }
};

export const update = async (req, res, next) => {
  try { res.json(await categoriesService.updateCategory(req.params.id, req.body)); }
  catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try { res.json(await categoriesService.deleteCategory(req.params.slug)); }
  catch (err) { next(err); }
};
