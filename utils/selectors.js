module.exports = {
    AMD: ':root :has(:has(.type:val("ExpressionStatement")) > .expression > .callee > .name:val("define"))',
    FUNCTION: ':root :has(.type:val("FunctionExpression"))',
    IDENTIFIER: ':root :has(.type:val("Identifier"))'
};