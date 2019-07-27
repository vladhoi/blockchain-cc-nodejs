const Block = require('./block').default;
const fooBlock = Block.mineBlock(Block.genesis(), 'foo');
console.log(fooBlock.toString());