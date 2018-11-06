/* VARIABLES */

var a_tokenPrice = 0;
var a_tokenSellPrice = 0;
var a_maxSnail = 0;
var a_frogPot = 0;
var a_playerSnail = 0;
var a_playerEgg = 0;
var a_playerHatchCost = 0;
var a_feedReward = 0;
var a_pharaohReq = 0;
var f_buy = 0;
var f_sell = 0;
var m_account = 0;

/* GLOBAL LOOP */

//Started once, to trigger the main loop and the egg loop
function main(){
    console.log('Main loop started.');
    controlLoop();
}

//Main loop
function controlLoop(){
    refreshData();
    setTimeout(controlLoop,4000);
}

/* UTILITIES */

//Truncates ETH value to 3 decimals
function formatEthValue(ethstr){
    return parseFloat(parseFloat(ethstr).toFixed(3));
}

//Truncates ETH value to 6 decimals
function formatEthValue2(ethstr){
	return parseFloat(parseFloat(ethstr).toFixed(6));
}

/* STATE UPDATES */

//Refreshes game data
function refreshData(){
	updateEthAccount();
	updateGodRound();
	updateGodPot();
	updatePharaoh();
	updateGodTimer();
	updatePharaohReq();
	updateMaxSnail();
	//updateContractBalance();
	updateFrogPot();
	//updatePlayerSnail();
	updateTokenPrice();
	updatePlayerSnailValue();
	updateTokenSellPrice();
	updateMaxSnailSell();
	updateFieldBuy2();
	updateFieldSacrifice2();
	updateFieldSell2();
	updatePlayerEgg();
	updatePlayerProd();
	updateHatchPrice();
	updateFullHatchCost();
	updateFeedReward();
	updateFullFeedReward();
	//updatePlayerEarning();
}

//Current ETH address in use
function updateEthAccount(){
	m_account = web3.eth.accounts[0];
}

//Current round
function updateGodRound(){
	var godrounddoc = document.getElementById('godround');
	godRound(function(req) {
		godrounddoc.textContent = req;
	});
}

//Current round pot
function updateGodPot(){
	var godpotdoc = document.getElementById('godpot');
	godPot(function(req) {
		godpotdoc.textContent = formatEthValue(web3.fromWei(req,'ether'));
	});
}

//Current pharaoh
function updatePharaoh(){
	var pharaohdoc = document.getElementById('pharaoh');
	pharaoh(function(req) {
		pharaohdoc.textContent = req.substring(26, 66);
	});
}

//Current round timer
function updateGodTimer(){
	var blocktime = Math.round((new Date()).getTime() / 1000); //current blocktime should be Unix timestamp
	var godtimerdoc = document.getElementById('godtimer');
	godTimer(function(req) {
		var seconds = req - blocktime; //godTimer is the planned blocktime for the end
		
		//Convert result to hour minute second format
		var numhours = Math.floor(seconds / 3600);
		var numminutes = Math.floor((seconds % 3600) / 60);
		var numseconds = (seconds % 3600) % 60;

		godtimerdoc.textContent = numhours + "h " + numminutes + "m " + numseconds + "s ";
	});
}

//Current pharaoh requirement
function updatePharaohReq(){
	var pharaohreqdoc = document.getElementById('pharaohreq');
	var pharaohreq2doc = document.getElementById('pharaohreq2');
	ComputePharaohReq(function(req) {
		a_pharaohReq = req;
		pharaohreqdoc.textContent = a_pharaohReq;
		pharaohreq2doc.textContent = a_pharaohReq;
	});
}

//Current max supply of snails
function updateMaxSnail(){
	var maxsnaildoc = document.getElementById('maxsnail');
	maxSnail(function(req) {
		a_maxSnail = req;
		maxsnaildoc.textContent = a_maxSnail;
	});
}

//Current ETH balance in contract NOT WORKING, SHOULD ADD GET FUNCTIONS IN SMART CONTRACT TO MAKE THIS EASIER
function updateContractBalance(){
	var contractbalancedoc = document.getElementById('contractbalance');
	contractbalancedoc.textContent = web3.fromWei(web3.eth.getBalance('0x854D743d8da78C94CE5fD3c713Fb512Bbd671EeD')); //Remember to change this, or set a variable somewhere else
}

//Current frog pot
function updateFrogPot(){
	var frogpotdoc = document.getElementById('frogpot');
	frogPot(function(req) {
		a_frogPot = formatEthValue(web3.fromWei(req,'ether'));
		frogpotdoc.textContent = a_frogPot;
	});
}
	
//Current player snail count PROBABLY WON'T WORK
function updatePlayerSnail(){
	var playersnaildoc = document.getElementById('playersnail');
	hatcherySnail(web3.eth.accounts[0], function(req) {
		a_playerSnail = req;
		playersnaildoc.textContent = a_playerSnail;
	});
}

//Current token price on buys
function updateTokenPrice(){
	var tokenpricedoc = document.getElementById('tokenprice');
	ComputeTokenPrice(function(req) {
		a_tokenPrice = formatEthValue2(web3.fromWei(req,'ether'));
		tokenpricedoc.textContent = a_tokenPrice;
	});
}

//Current token price on sells
function updateTokenSellPrice(){
	var tokensellpricedoc = document.getElementById('tokensellprice');
	a_tokenSellPrice = a_tokenPrice / 2;
	tokensellpricedoc.textContent = a_tokenSellPrice;
}

//Maximum snails that can be sold
function updateMaxSnailSell(){
	var maxsnailselldoc = document.getElementById('maxsnailsell');
	snailPot(function(req) {
	var a_snailPot = formatEthValue(web3.fromWei(req,'ether'));
	a_snailPot = a_snailPot / 10; //the maximum obtainable in one sale is 10%
	maxsnailselldoc.textContent = parseFloat(a_snailPot / a_tokenSellPrice).toFixed(0); //divide that max by token price, round up to integer
	});
}
	
//Current player snail ETH value
function updatePlayerSnailValue(){
	var playersnailvaluedoc = document.getElementById('playersnailvalue');
	playersnailvaluedoc.textContent = a_playerSnail * a_tokenSellPrice;
}

//Current player eggs
function updatePlayerEgg(){
	var playereggdoc = document.getElementById('playeregg');
	ComputeMyEggs(m_account, function(req) {
		a_playerEgg = formatEthValue(req);
		a_playerEgg = parseFloat(a_playerEgg / 1080000).toFixed(0); //TIME_TO_HATCH_1SNAIL
		playereggdoc.textContent = a_playerEgg;
	});
}

//Current player prod
function updatePlayerProd(){
	var playerproddoc = document.getElementById('playerprod');
	playerproddoc.textContent = a_playerSnail * 0.08 / 24; //8% per day, divided by 24 hours
}

//Current hatch price per egg
function updateHatchPrice(){
	var hatchpricedoc = document.getElementById('hatchprice');
	hatchpricedoc.textContent = a_tokenSellPrice;
}

//Current hatch cost for player
function updateFullHatchCost(){
	var fullhatchcostdoc = document.getElementById('fullhatchcost');
	var roundup = 0.000001;
	a_playerHatchCost = parseFloat(a_playerEgg * a_tokenSellPrice).toFixed(6);
	a_playerHatchCost = a_playerHatchCost + roundup;
	fullhatchcostdoc.textContent = a_playerHatchCost;
}

//Current feed reward per egg
function updateFeedReward(){
	var feedrewarddoc = document.getElementById('feedreward');
	a_feedReward = parseFloat(a_frogPot / a_maxSnail).toFixed(8);
	feedrewarddoc.textContent = a_feedReward;
}

//Current feed reward for player
function updateFullFeedReward(){
	var fullfeedrewarddoc = document.getElementById('fullfeedreward');
	fullfeedrewarddoc.textContent = a_playerEgg * a_feedReward;
}

//Lifetime earnings for player
function updateLifetimeEarning(){
	var lifetimeearningdoc = document.getElementById('lifetimeearning');
	//Make new GETTER in smart contract for this
}
/*
//Current balance for player
function updatePlayerEarning(){
	var playerearningdoc = document.getElementById('playerearning');
	playerEarnings(function(req) {
		playerearningdoc.textContent = formatEthValue(web3.fromWei(req,'ether'));
	});
}
*/	

/* LOCAL FIELD INPUT */

//Player input on buy
function updateFieldBuy2(){
	//var fieldbuydoc = document.getElementById('fieldBuy');
	f_buy = document.getElementById('fieldBuy').value;
	if(f_buy > 4){ 
		f_buy = 4; //max 4 ETH per buy
	}
	var fieldbuy2doc = document.getElementById('fieldBuy2');
	fieldbuy2doc.textContent = f_buy;
}

//Player input on sell
function updateFieldSell2(){
	//var fieldbuydoc = document.getElementById('fieldBuy');
	f_sell = document.getElementById('fieldSell').value;
	var fieldsell2doc = document.getElementById('fieldSell2');
	fieldsell2doc.textContent = f_sell;
}

//Player input on sacrifice
function updateFieldSacrifice2(){
	f_sacrifice = document.getElementById('fieldSacrifice').value;
	if(f_sacrifice < a_pharaohReq){
		f_sacrifice = a_pharaohReq;
	}
	var fieldsacrifice2doc = document.getElementById('fieldSacrifice2');
	fieldsacrifice2doc.textContent = f_sacrifice;
}

/* WEB3 TRANSACTIONS */

//Buy snail tokens
function webBuySnail(){
    var weitospend = web3.toWei(f_buy,'ether');
    BuySnail(0x0000000000000000000000000000000000000000, weitospend,function(){ //NEED to change address
    });
}

//Sacrifice snail tokens
function webSacrificeSnail(){
	BecomePharaoh(f_sacrifice, function(){
	});
}

//Sell snail tokens
function webSellSnail(){
	SellSnail(f_sell, function(){
	});
}

//Hatch eggs
function webHatchEgg(){
	HatchEgg(a_playerHatchCost, function(){
	});
}

//Feed eggs
function webFeedFrog(){
	FeedEgg(function(){
	});
}

//Claim divs
function webClaimDiv(){
	ClaimDivs(function(){
	});
}

//Withdraw earnings
function webWithdrawEarning(){
	WithdrawEarnings(function(){
	});
}

/* NETWORK CHECK */

//Check if user is on proper network
web3.version.getNetwork((err, netId) => {
    if(netId!="3"){
        console.log('Wrong network. Switch to Ropsten.');
    }
    /*
  switch (netId) {
    case "1":
      console.log('This is mainnet')
      break
    case "2":
      console.log('This is the deprecated Morden test network.')
      break
    case "3":
      console.log('This is the ropsten test network.')
      break
    default:
      console.log('This is an unknown network.')
      
  }*/
})