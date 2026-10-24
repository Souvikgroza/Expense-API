const express = require('express');

const { body, validationResult} = require('express-validator');
const exp = require('../models/Exp');

const router = express.Router();

const expValResult = [
    body('amount').notEmpty().isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
    body('category').notEmpty().withMessage('Category is required'),
    body('date')
    .notEmpty()
    .isISO8601()
    .withMessage('Date is required and must be a valid date')
];

function checkValidation(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

router.get('/', async (req, res, next ) => {
    try{
    const filter = {};
    if(req.query.date) filter.date = req.query.date;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [notes, total] = await Promise.all([
        exp.find(filter).skip(skip).limit(limit),
        exp.countDocuments(filter)
    ]);

    res.status(200).json({
        success: true,
        count: total,
        page: page,
        limit: limit,
        notes: notes
    });
    } catch (err) {
        next(err);
    }
});


router.get('/summary', async (req, res, next) => {
    try {
        const summary = await exp.aggregate([
            {
                $group: {
                    _id: null,
                    totalExpenses: { $sum: '$amount' },
                    expenseCount: { $sum: 1 },
                    averageExpense: { $avg: '$amount' }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: summary[0] || {
                totalExpenses: 0,
                expenseCount: 0,
                averageExpense: 0
            }
        });
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try{
        const note = await exp.findById(req.params.id);

        if(!note) {
            return res.status(404).json({success: false, message:'Expense Not found'});
        }

        res.status(200).json({ success: true, data: note});
    } catch(exp){
        next(exp);
    }
});

router.post('/', expValResult, checkValidation, async (req, res, next) => {
    try{
        const { amount, category, date} = req.body;
        const note = await exp.create({ amount, category, date});

        res.status(201).json({ success: true, data: note});
    } catch(exp){
        next(exp);
    }
});

router.put('/:id', expValResult, checkValidation, async (req, res, next) => {
    try{
        const note = await exp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if(!note) {
            return res.status(404).json({ success: false, message: 'Note not found'});
        }

        res.status(200).json({ success: true, data: note});
    } catch(exp){
        next(exp);
    }
});

router.delete('/:id', async (req, res, next ) => {
    try{
        const note = await exp.findByIdAndDelete(req.params.id);
        
        if(!note) {
            return res.status(404).json({ success: false, message: 'Note not Found'});
        }

        res.status(200).json({success: true, data: {} });
    } catch(exp){
        next(exp);
    }
});

module.exports = router;