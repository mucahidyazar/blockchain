const TodoSmartContract = artifacts.require('TodoSmartContract')

module.exports = function (deployer) {
  deployer.deploy(TodoSmartContract)
}
