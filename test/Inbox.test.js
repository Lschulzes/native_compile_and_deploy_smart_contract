const assert = require("assert");

const ganache = require("ganache-cli");
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());

const { abi, evm } = require("../compile");

const message = "Hi there!";
let accounts;
let inbox;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(abi)
    .deploy({ data: "0x" + evm.bytecode.object, arguments: [message] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("General test", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const messageResponse = await inbox.methods.message().call();
    assert.equal(message, messageResponse);
  });

  it("Can change the message", async () => {
    await inbox.methods.setMessage("Bye There!").send({ from: accounts[0] });
    const messageChange = await inbox.methods.message().call();
    assert.notEqual(message, messageChange);
    assert.equal("Bye There!", messageChange);
  });
});
