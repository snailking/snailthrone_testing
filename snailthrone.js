contractAddress="0x261d650a521103428C6827a11fc0CBCe96D74DBc" // MAINNET

/* WEB3 DETECTION */

var web3;

var modal2 = document.getElementById("modal2");
/* OLD 
window.addEventListener("load", function() {
	if (typeof web3 !== "undefined") {
        web3 = new Web3(web3.currentProvider);
        web3.version.getNetwork(function(error, result) {
            if (!error) {
                if (result == "1") {
					console.log("Web3 Testnet successfully loaded!");
                } else {
                    console.log("Error: you must be on the Mainnet to use this website.");
					web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/f423492af8504d94979d522c3fbf3794"));
					modal2.style.display = "block";
                }
            }
        });
    } else {
        console.log("Web3 library not found.");
		modal2.style.display = "block";
        web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/f423492af8504d94979d522c3fbf3794"));
    }
});
*/

/* NEW */

window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            web3.eth.sendTransaction({/* ... */});
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

// Get the <span> element that closes the modal
var span2 = document.getElementById("close2");

// When the user clicks on <span> (x), close the modal
span2.onclick = function() {
    modal2.style.display = "none";
}

/* PAST EVENT LOG */

var timeLaunch = 1546099245;
var launchBlock = 6974738;
var blockSpan = 14; //14s blocks on ETH mainnet
var startBlock = 0;
var ranLog = false;

function checkBlock(){
	web3.eth.getBlockNumber(function (error, result){
		////console.log("block number is " + result);
		startBlock = parseInt(result - (172800 / blockSpan)); //~2 days
		if(startBlock < launchBlock) { startBlock = launchBlock };
	});
}

checkBlock();

//Get timestamp for log
function dateLog(_blockNumber) {
	d = new Date((timeLaunch + ((_blockNumber - launchBlock) * blockSpan)) * 1000);
	//////////console.log(d);
	datetext = d.toTimeString();
	datetext = datetext.split(' ')[0];
}

/* VARIABLES */

var a_godTimer = "";
var godtimer_in_seconds = 0;
var god_numhours = 0;
var god_numminutes = 0;
var god_numseconds = 0;

var god_roundover = false;
var godtimer_lastminute = 300;
var i_godTimer = false;

var godtimerdoc;
var playereggdoc;

var a_pharaoh = "";
var a_tokenPrice = 0;
var a_tokenSellPrice = 0;
var a_maxSnail = 0;
var a_godPot = 0;
var a_frogPot = 0;
var a_snailPot = 0;
var a_playerSnail = 0;
var a_playerEgg = 0;
var a_playerProd = 0;
var a_playerHatchCost = 0;
var a_feedReward = 0;
var a_pharaohReq = 0;
var a_pharaohReq2 = 0;
var a_removeSnailReq = 0;
var f_buy = 0;
var f_sell = 0;
var f_sacrifice = 40;
var m_account = "waiting for web3";

var u_updateEvent = false;
var p_keepUpdating = false;

/* MODAL */

// Sacrifice modal
var modal3 = document.getElementById("modal3");

// Get the <span> element that closes the modal
var span3 = document.getElementById("close3");

// When the user clicks on <span> (x), close the modal
span3.onclick = function() {
    modal3.style.display = "none";
}

function CloseModal3() {
	modal3.style.display = "none";
}

// Get the modal
var modal = document.getElementById("modal");

// Get the button that opens the modal
var b_helpmodal = document.getElementById("helpmodal");

// Get the <span> element that closes the modal
var span = document.getElementById("close");

// When the user clicks the button, open the modal 
b_helpmodal.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// Close modal on game info
function closeModal() {
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal || event.target == modal2) {
        modal.style.display = "none";
		modal2.style.display = "none";
		modal3.style.display = "none";
    }
}

/* GLOBAL LOOP */

//Changes u_updateLog to true, manual choice in case event watching fails
function startLogging(){
	u_updateEvent = true;
}

//Update log every few seconds if player chose to
function updateLog(){
	if(u_updateEvent == true || p_keepUpdating == true){
		runLog();
	}
}

//Started once, to trigger the main loop and the egg loop
function main(){
    console.log('Main loop started.');
    controlLoop();
	controlLoopFast();
}

//Main loop
function controlLoop(){
    refreshData();
    setTimeout(controlLoop,4000);
}

//Secondary loop for actions that need faster refresh
function controlLoopFast(){
	refreshDataFast();
	setTimeout(controlLoopFast,200);
}

/* UTILITIES */

//Truncates ETH value to 3 decimals
function formatEthValue(ethstr){
    return parseFloat(parseFloat(ethstr).toFixed(4));
}

//Truncates ETH value to 6 decimals
function formatEthValue2(ethstr){
	return parseFloat(parseFloat(ethstr).toFixed(6));
}

//Truncates ETH address to first 8 numbers
function formatEthAdr(adr){
	var _smallAdr = adr.substring(0, 10);
	var _stringLink = '<a href="https://etherscan.io/address/' + adr + '" target="_blank">' + _smallAdr + '</a>';
	return _stringLink;
}

//Conversion of Date to hh:mm:ss
var datetext;

function date24() {
	d = new Date();
	datetext = d.toTimeString();
	datetext = datetext.split(' ')[0];
}

//Referrals
function getQueryVariable(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function copyRef() {
  copyText.value = playerreflinkdoc.textContent;
  copyText.style.display="block"
  copyText.select();
  document.execCommand("Copy");
  copyText.style.display="none"
  //displayModalMessage("copied link to clipboard")
  //alert("Copied the text: " + copyText.value);
}

var playerreflinkdoc = document.getElementById('playerreflink'); 
var a_refLink = window.location.protocol + '//' + window.location.host + window.location.pathname + "?ref=" + web3.eth.accounts[0];
var copyText = document.getElementById("copytextthing"); 

/* STATE UPDATES */

//Refreshes game data
function refreshData(){
	updateEthAccount();
	updateGodRound();
	updateGodPot();
	updateRoundPot();
	updatePharaoh();
	updateGodTimer();
	updatePharaohReq();
	updateMaxSnail();
	updateContractBalance();
	updateFrogPot();
	updateSnailPot();
	updatePlayerSnail();
	updateTokenPrice();
	updatePlayerSnailValue();
	updateTokenSellPrice();
	updateMaxSnailSell();
	updatePlayerEgg();
	updatePlayerProd();
	updateHatchPrice();
	updateFullHatchCost();
	updateFeedReward();
	updateFullFeedReward();
	updateUnclaimedDiv();
	updatePlayerEarning();
	updatePlayerRef();
	updateButton();
	updateLog();
	//runLog();
}

//Refreshes some game data faster
function refreshDataFast(){
	fastupdateGodTimer();
	//fastupdatePlayerEgg();
	updateFieldBuy2();
	updateFieldSacrifice2();
	updateFieldSell2();
	updateSellEstimate();
	updateBuyEstimate();
	updatePharaohEstimate();
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

//Full godpot
function updateGodPot(){
	var godpotdoc = document.getElementById('godpot');
	godPot(function(req) {
		a_godPot = formatEthValue(web3.fromWei(req,'ether'));
		godpotdoc.textContent = a_godPot;
	});
}

//Current round pot (50% of godpot)
function updateRoundPot(){
	var roundpotdoc = document.getElementById('roundpot');
	roundpotdoc.textContent = a_godPot / 2;
}
	
//Current pharaoh
function updatePharaoh(){
	var pharaohdoc = document.getElementById('pharaoh');
	pharaoh(function(req) {
		a_pharaoh = "0x" + req.substring(26, 66);
		var b_pharaoh = formatEthAdr(a_pharaoh);
		if(god_roundover === false) {
			if(b_pharaoh === m_account) {
				pharaohdoc.innerHTML = "You Ascend in";
			} else {
			pharaohdoc.innerHTML = b_pharaoh + " Ascends in";
			}
		}
		else {
			if(b_pharaoh === m_account) {
				pharaohdoc.innerHTML = "YOU ARE THE SNAILGOD!<br>Claim your winnings by starting a new round.";
			} else {
			pharaohdoc.innerHTML = b_pharaoh + " is the SnailGod!<br>Start a new round to be next in line!";
			}
		}
	});
}

godtimerdoc = document.getElementById('godtimer');

//Local timer update
function fastupdateGodTimer(){
	if(i_godTimer == true) {
		var _blocktime = (new Date()).getTime(); //current "blocktime" in milliseconds
		var _timer = a_godTimer - (_blocktime / 1000);
		
		if(_timer > 0){
			godtimer_lastminute = 0;
			var _hours = Math.floor(_timer / 3600);
			if(_hours < 10) { _hours = "0" + _hours }
			var _minutes = Math.floor((_timer % 3600) / 60);
			if(_minutes < 10) { _minutes = "0" + _minutes }
			var _seconds = parseFloat((_timer % 3600) % 60).toFixed(0);
			if(_seconds < 10) { _seconds = "0" + _seconds }
				
			godtimerdoc.innerHTML = _hours + ":" + _minutes + ":" + _seconds;
			god_roundover = false;
		} else if(_timer <= 0 && godtimer_lastminute < 300){
			godtimerdoc.innerHTML = "[Waiting for blockchain confirmation...]";
			godtimer_lastminute++;
			god_roundover = false;
		} else {
			godtimerdoc.textContent = "[Round is over. Press the magic button below!]";
			god_roundover = true;		
		}
	}
}

//Current round timer
function updateGodTimer(){
	godTimer(function(result) {
		a_godTimer = result;
		i_godTimer = true;
	});
}

//Show or hide relevant sacrifice/new round buttons
function updateButton(){
	if (god_roundover === false) {
		document.getElementById('showroundon').style.display = "block";
		document.getElementById('showroundoff').style.display = "none";
	} else {
		document.getElementById('showroundoff').style.display = "block";
		document.getElementById('showroundon').style.display = "none";
	}
}


	
//Current pharaoh requirement
function updatePharaohReq(){
	var pharaohreqdoc = document.getElementById('pharaohreq');
	var pharaohreq2doc = document.getElementById('pharaohreq2');
	//Check current pharaohReq
	pharaohReq(function(req) {
		a_pharaohReq = req;
	});
	//Check number of snails to remove
	ComputePharaohReq(function(req) {
		a_removeSnailReq = req;
	});
	//Remove snails from pharaohReq
	a_pharaohReq2 = a_pharaohReq - a_removeSnailReq;
	if(a_pharaohReq2 < 40) {
		a_pharaohReq2 = 40; //minimum req
	}

	pharaohreqdoc.textContent = a_pharaohReq2;
	pharaohreq2doc.textContent = a_pharaohReq2;
}

//Current max supply of snails
function updateMaxSnail(){
	var maxsnaildoc = document.getElementById('maxsnail');
	maxSnail(function(req) {
		a_maxSnail = req;
		maxsnaildoc.textContent = a_maxSnail;
	});
}

//Current ETH balance in contract
function updateContractBalance(){
	var contractbalancedoc = document.getElementById('contractbalance');
	GetContractBalance(function(req) {
		contractbalancedoc.textContent = formatEthValue(web3.fromWei(req,'ether'));
	});
}

//Current frog pot
function updateFrogPot(){
	var frogpotdoc = document.getElementById('frogpot');
	frogPot(function(req) {
		a_frogPot = formatEthValue(web3.fromWei(req,'ether'));
		frogpotdoc.textContent = a_frogPot;
	});
}

//Current snail pot
function updateSnailPot(){
	var snailpotdoc = document.getElementById('snailpot');
	snailPot(function(req) {
		a_snailPot = formatEthValue(web3.fromWei(req,'ether'));
		snailpotdoc.textContent = a_snailPot;
	});
}
	
//Current player snail count
function updatePlayerSnail(){
	var playersnaildoc = document.getElementById('playersnail');
	GetMySnails(function(req) {
		a_playerSnail = req;
		playersnaildoc.textContent = a_playerSnail;
	});
}

//Current token price on buys
function updateTokenPrice(){
	var tokenpricedoc = document.getElementById('tokenprice');
	ComputeTokenPrice(function(req) {
		a_tokenPrice = parseFloat(web3.fromWei(req,'ether')).toFixed(7);
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
	var i_snailPot = a_snailPot / 10; //the maximum obtainable in one sale is 10%
	maxsnailselldoc.textContent = parseFloat(i_snailPot / a_tokenSellPrice).toFixed(0); //divide that max by token price, round up to integer
}
	
//Current player snail ETH value
function updatePlayerSnailValue(){
	var playersnailvaluedoc = document.getElementById('playersnailvalue');
	playersnailvaluedoc.textContent = parseFloat(a_playerSnail * a_tokenSellPrice).toFixed(4);
}

//Current player eggs
function updatePlayerEgg(){
	playereggdoc = document.getElementById('playeregg');
	ComputeMyEggs(m_account, function(req) {
		a_playerEgg = formatEthValue(req);
		//a_playerEgg = parseFloat(a_playerEgg / 1080000).toFixed(0); //TIME_TO_HATCH_1SNAIL
		playereggdoc.textContent = a_playerEgg;
	});
}

//Fast local update for player eggs
/*function fastupdatePlayerEgg(){
	playereggdoc = document.getElementById('playeregg');
	var b_playerEgg = a_playerEgg + (a_playerProd / 18000); //60 minutes * 60 seconds * 5 refreshes per second = 18000
	a_playerEgg = parseFloat(b_playerEgg).toFixed(4);
	playereggdoc.textContent = a_playerEgg;
}*/

//Current player prod
function updatePlayerProd(){
	var playerproddoc = document.getElementById('playerprod');
	a_playerProd = parseFloat(a_playerSnail * 0.08 / 24).toFixed(4); //8% per day, divided by 24 hours
	playerproddoc.textContent = a_playerProd;
}

//Current hatch price per egg
function updateHatchPrice(){
	var hatchpricedoc = document.getElementById('hatchprice');
	hatchpricedoc.textContent = a_tokenSellPrice;
}

//Current hatch cost for player
function updateFullHatchCost(){
	var fullhatchcostdoc = document.getElementById('fullhatchcost');
	var roundup = 0.000004;
	a_playerHatchCost = parseFloat(a_playerEgg * a_tokenSellPrice).toFixed(6);
	a_playerHatchCost = parseFloat(a_playerHatchCost + roundup).toFixed(6);
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
	fullfeedrewarddoc.textContent = parseFloat(a_playerEgg * a_feedReward).toFixed(8);
}

//Current unclaimed dividends for player
function updateUnclaimedDiv(){
	var playerdivdoc = document.getElementById('playerdiv');
	ComputeMyDivs(function(req) {
		var b_playerdiv = formatEthValue(web3.fromWei(req,'ether'));
		playerdivdoc.textContent = b_playerdiv;
	});
}
	
//Current balance for player
function updatePlayerEarning(){
	var playerearningdoc = document.getElementById('playerearning');
	GetMyEarnings(function(req) {
		playerearningdoc.textContent = formatEthValue(web3.fromWei(req,'ether'));
	});
}	

//Status of referral link for player
function updatePlayerRef(){
	if(a_playerSnail >= 300){
		a_refLink = window.location.protocol + '//' + window.location.host + window.location.pathname + "?ref=" + web3.eth.accounts[0];
		playerreflinkdoc.innerHTML = "<br>" + a_refLink;
	} else {
		playerreflinkdoc.textContent = "Reach 300 snails to unlock.";
	}
}

//Lifetime divs - UNUSED
function updateMaxDiv(){
	var maxdivdoc = document.getElementById('maxdiv');
	divsPerSnail(function(req) {
		maxdivdoc.textContent = formatEthValue2(web3.fromWei(req,'ether'));
	});
}

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

//Buy estimate
function updateBuyEstimate(){
	var buyEstimatedoc = document.getElementById('buyestimate');
	buyEstimatedoc.textContent = parseFloat(f_buy / a_tokenPrice).toFixed(0);
}
	
//Player input on sell
function updateFieldSell2(){
	//var fieldbuydoc = document.getElementById('fieldBuy');
	f_sell = document.getElementById('fieldSell').value;
	var fieldsell2doc = document.getElementById('fieldSell2');
	fieldsell2doc.textContent = f_sell;
}

//Sell estimate
function updateSellEstimate(){
	var sellEstimatedoc = document.getElementById('sellEstimate');
	sellEstimatedoc.textContent = parseFloat(f_sell * a_tokenSellPrice).toFixed(6);
}

//Player input on sacrifice
function updateFieldSacrifice2(){
	f_sacrifice = document.getElementById('fieldSacrifice').value;
	if(f_sacrifice < 40) {
		f_sacrifice = 40;
	}
	var fieldsacrifice2doc = document.getElementById('fieldSacrifice2');
	fieldsacrifice2doc.textContent = f_sacrifice;
}

//Next requirement estimate
function updatePharaohEstimate(){
	var pharaohEstimatedoc = document.getElementById('pharaohestimate');
	pharaohEstimatedoc.innerHTML = parseInt(f_sacrifice) + parseInt(40);
}

/* WEB3 TRANSACTIONS */

//Buy snail tokens
function webBuySnail(){
	var ref = getQueryVariable('ref');
    var weitospend = web3.toWei(f_buy,'ether');
    BuySnail(ref, weitospend,function(){
    });
}

//Baseline sacrifice using pharaohReq
function webClaimThrone(){
	BecomePharaoh(a_pharaohReq2, function(){
	});
}

//Sacrifice snail tokens using player input
function CheckSacrifice(){
	if(f_sacrifice < a_pharaohReq2) {
		modal3.style.display = "block";
	} else {
		webSacrificeSnail();
	}
}

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
	var weitospend = web3.toWei(a_playerHatchCost,'ether');
	HatchEgg(weitospend, function(){
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

//Start a new round
function webAscendGod(){
	AscendGod(function(){
	});
}

/* CONTRACT ABI */

abiDefinition=[{"constant": false,"inputs": [],"name": "ClaimDivs","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "ComputeMyDivs","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "AscendGod","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "godTimer","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_snails","type": "uint256"}],"name": "BecomePharaoh","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "hatcherySnail","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "FeedEgg","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "PHARAOH_REQ_START","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GetMySnails","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "lastHatch","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "TOKEN_MAX_BUY","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "frogPot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "claimedDivs","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "SNAIL_REQ_REF","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_ref","type": "address"}],"name": "BuySnail","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [],"name": "gameStarted","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "pharaoh","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "playerEarnings","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "snailPot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GOD_TIMER_START","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "TOKEN_PRICE_FLOOR","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "pharaohReq","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "HatchEgg","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [],"name": "godPot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "StartGame","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [],"name": "lastClaim","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "WithdrawEarnings","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "_ether","type": "uint256"}],"name": "ComputeBuy","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_tokensSold","type": "uint256"}],"name": "SellSnail","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "TIME_TO_HATCH_1SNAIL","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ComputePharaohReq","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ComputeTokenPrice","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "godRound","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "TOKEN_PRICE_MULT","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "divsPerSnail","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GOD_TIMER_BOOST","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GOD_TIMER_INTERVAL","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GetMyEarnings","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "adr","type": "address"}],"name": "ComputeMyEggs","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "gameOwner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GetContractBalance","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "maxSnail","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"inputs": [],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"payable": true,"stateMutability": "payable","type": "fallback"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "ethreward","type": "uint256"}],"name": "WithdrewEarnings","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "ethreward","type": "uint256"}],"name": "ClaimedDivs","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "ethspent","type": "uint256"},{"indexed": false,"name": "snail","type": "uint256"}],"name": "BoughtSnail","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "ethreward","type": "uint256"},{"indexed": false,"name": "snail","type": "uint256"}],"name": "SoldSnail","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "ethspent","type": "uint256"},{"indexed": false,"name": "snail","type": "uint256"}],"name": "HatchedSnail","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "ethreward","type": "uint256"},{"indexed": false,"name": "egg","type": "uint256"}],"name": "FedFrogking","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "ethreward","type": "uint256"},{"indexed": true,"name": "round","type": "uint256"}],"name": "Ascended","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"}],"name": "BecamePharaoh","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"name": "ethreward","type": "uint256"}],"name": "NewDivs","type": "event"}]



var contractAbi = web3.eth.contract(abiDefinition);
var myContract = contractAbi.at(contractAddress);

	
function AscendGod(callback){
    var outputData = myContract.AscendGod.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('AscendGod ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function BecomePharaoh(_snails,callback){
    var outputData = myContract.BecomePharaoh.getData(_snails);
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('BecomePharaoh ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function BuySnail(_ref,eth,callback){
    var outputData = myContract.BuySnail.getData(_ref);
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            //console.log('BuySnail ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function ClaimDivs(callback){
    var outputData = myContract.ClaimDivs.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ClaimDivs ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function FeedEgg(callback){
    var outputData = myContract.FeedEgg.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('FeedEgg ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function HatchEgg(eth,callback){
    var outputData = myContract.HatchEgg.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            //console.log('HatchEgg ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function SellSnail(_tokensSold,callback){
    var outputData = myContract.SellSnail.getData(_tokensSold);
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('SellSnail ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function StartGame(eth,callback){
    var outputData = myContract.StartGame.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            //console.log('StartGame ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function WithdrawEarnings(callback){
    var outputData = myContract.WithdrawEarnings.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('WithdrawEarnings ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function claimedDivs(callback){
    var outputData = myContract.claimedDivs.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('claimedDivs ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeBuy(_ether,callback){
    var outputData = myContract.ComputeBuy.getData(_ether);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ComputeBuy ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeMyDivs(callback){
    var outputData = myContract.ComputeMyDivs.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ComputeMyDivs ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeMyEggs(adr,callback){
    var outputData = myContract.ComputeMyEggs.getData(adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ComputeMyEggs ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function ComputePharaohReq(callback){
    var outputData = myContract.ComputePharaohReq.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ComputePharaohReq ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeTokenPrice(callback){
    var outputData = myContract.ComputeTokenPrice.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ComputeTokenPrice ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function divsPerSnail(callback){
    var outputData = myContract.divsPerSnail.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('divsPerSnail ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function frogPot(callback){
    var outputData = myContract.frogPot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('frogPot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function gameOwner(callback){
    var outputData = myContract.gameOwner.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('gameOwner ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function gameStarted(callback){
    var outputData = myContract.gameStarted.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('gameStarted ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function GetContractBalance(callback){
    var outputData = myContract.GetContractBalance.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetContractBalance ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function GetMyEarnings(callback){
    var outputData = myContract.GetMyEarnings.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetMyEarnings ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function GetMySnails(callback){
    var outputData = myContract.GetMySnails.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetMySnails ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function GOD_TIMER_BOOST(callback){
    var outputData = myContract.GOD_TIMER_BOOST.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GOD_TIMER_BOOST ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function GOD_TIMER_INTERVAL(callback){
    var outputData = myContract.GOD_TIMER_INTERVAL.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GOD_TIMER_INTERVAL ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function GOD_TIMER_START(callback){
    var outputData = myContract.GOD_TIMER_START.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GOD_TIMER_START ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function godPot(callback){
    var outputData = myContract.godPot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('godPot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function godRound(callback){
    var outputData = myContract.godRound.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('godRound ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function godTimer(callback){
    var outputData = myContract.godTimer.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('godTimer ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function hatcherySnail(callback){
    var outputData = myContract.hatcherySnail.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('hatcherySnail ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function lastClaim(callback){
    var outputData = myContract.lastClaim.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('lastClaim ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function lastHatch(callback){
    var outputData = myContract.lastHatch.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('lastHatch ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function maxSnail(callback){
    var outputData = myContract.maxSnail.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('maxSnail ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function pharaoh(callback){
    var outputData = myContract.pharaoh.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('pharaoh ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function PHARAOH_REQ_START(callback){
    var outputData = myContract.PHARAOH_REQ_START.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('PHARAOH_REQ_START ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function pharaohReq(callback){
    var outputData = myContract.pharaohReq.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('pharaohReq ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function playerEarnings(callback){
    var outputData = myContract.playerEarnings.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('playerEarnings ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function SNAIL_REQ_REF(callback){
    var outputData = myContract.SNAIL_REQ_REF.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('SNAIL_REQ_REF ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function snailPot(callback){
    var outputData = myContract.snailPot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('snailPot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function TIME_TO_HATCH_1SNAIL(callback){
    var outputData = myContract.TIME_TO_HATCH_1SNAIL.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('TIME_TO_HATCH_1SNAIL ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function TOKEN_MAX_BUY(callback){
    var outputData = myContract.TOKEN_MAX_BUY.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('TOKEN_MAX_BUY ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function TOKEN_PRICE_FLOOR(callback){
    var outputData = myContract.TOKEN_PRICE_FLOOR.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('TOKEN_PRICE_FLOOR ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function TOKEN_PRICE_MULT(callback){
    var outputData = myContract.TOKEN_PRICE_MULT.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('TOKEN_PRICE_MULT ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}

/* EVENT WATCH */

//Store transaction hash and event name for each event, and check before executing result, as web3 events fire twice (metamask?)
var store_hash = [];
var store_event = [];

function checkHash(txhash, eventname) {
	var i = 0;
	var _name = false;
	do {
		if(store_hash[i] == txhash) {
			if(store_event[i] == eventname) {
				return 0;
			}
		}
		i++;
	}
	while(i < store_event.length);
	
	//Add new tx hash and event name
	store_hash.push(txhash);
	store_event.push(eventname);
	
	//Remove first entry if there's more than 8 entries saved
	if(store_hash.length > 8){
		store_hash.shift();
	}
	if(store_event.length > 8){
		store_event.shift();
	}
}

/* EVENTS */

var logboxscroll = document.getElementById('logboxscroll');
var eventdoc = document.getElementById("event");

function runLog(){
	ranLog = true;
	myContract.allEvents({ fromBlock: startBlock, toBlock: 'latest' }).get(function(error, result){
		if(!error){
			//////console.log(result);
			var i = 0;
			if(result.length > 0){ //check if we have events, if not stop the loop
				p_keepUpdating = true;
				for(i = 0; i < 40; i++){ //loop through only 40 events at most
					if(i < result.length){ //make sure there's enough events
						if(checkHash(result[i].transactionHash, result[i].event) != 0) {
							startBlock = result[i].blockNumber; //store the last blocknumber to start next loop
							dateLog(result[i].blockNumber);
							if(result[i].event == "HatchedSnail"){
							eventdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " hatched " + result[i].args.snail + " snails for " + formatEthValue2(web3.fromWei(result[i].args.ethspent,'ether')) + " ETH." ;
							
						} else if(result[i].event == "SoldSnail"){
							eventdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " sold " + result[i].args.snail + " snails for " + formatEthValue2(web3.fromWei(result[i].args.ethreward,'ether')) + " ETH." ;
							
						} else if(result[i].event == "BoughtSnail"){
							eventdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " bought " + result[i].args.snail + " snails for " + formatEthValue2(web3.fromWei(result[i].args.ethspent,'ether')) + " ETH." ;

						} else if(result[i].event == "BecamePharaoh"){
							eventdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " sacrifices snails and claims the throne!" ;
	
						} else if(result[i].event == "WithdrewEarnings"){
							eventdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " withdrew " + formatEthValue2(web3.fromWei(result[i].args.ethreward,'ether')) + " ETH." ;

						} else if(result[i].event == "ClaimedDivs"){
							eventdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " claimed " + formatEthValue2(web3.fromWei(result[i].args.ethreward,'ether')) + " ETH in divs." ;

						} else if(result[i].event == "FedFrogking"){
							eventdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " fed the Frogking " + result[i].args.egg + " eggs and won " + formatEthValue2(web3.fromWei(result[i].args.ethreward,'ether')) + " ETH." ;

						} else if(result[i].event == "Ascended"){
							var _roundwon = result[i].args.round - 1;
							eventdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " ASCENDS!<br>The new SnailGod wins Round " + _roundwon + " and claims " + formatEthValue2(web3.fromWei(result[i].args.ethreward,'ether')) + " ETH." ;

						} else if(result[i].event == "NewDivs"){
							eventdoc.innerHTML += "<br>[~" + datetext + "] Another snail game just paid out " + formatEthValue2(web3.fromWei(result[i].args.ethreward,'ether')) + " ETH in divs to all holders!" ;
						}
						logboxscroll.scrollTop = logboxscroll.scrollHeight;
						}
					}	
				}
			} else {
				p_keepUpdating = false;
			}
		}
		else{
			////////console.log("problem!");
		}
	});
}
			
var hatchEvent = myContract.HatchedSnail();

hatchEvent.watch(function(error, result){
    if(!error){
		//console.log(result);
		if(checkHash(result.transactionHash, result.event) != 0) {
			date24();
			eventdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " hatched " + result.args.snail + " snails for " + formatEthValue2(web3.fromWei(result.args.ethspent,'ether')) + " ETH." ;
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var soldEvent = myContract.SoldSnail();

soldEvent.watch(function(error, result){
    if(!error){
		//console.log(result);
		if(checkHash(result.transactionHash, result.event) != 0) {
			date24();
			eventdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " sold " + result.args.snail + " snails for " + formatEthValue2(web3.fromWei(result.args.ethreward,'ether')) + " ETH." ;
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var boughtEvent = myContract.BoughtSnail();

boughtEvent.watch(function(error, result){
    if(!error){
		//console.log(result);
		if(checkHash(result.transactionHash, result.event) != 0) {
			date24();
			eventdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " bought " + result.args.snail + " snails for " + formatEthValue2(web3.fromWei(result.args.ethspent,'ether')) + " ETH." ;
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var newpharaohEvent = myContract.BecamePharaoh();

newpharaohEvent.watch(function(error, result){
    if(!error){
		//console.log(result);
		if(checkHash(result.transactionHash, result.event) != 0) {
			date24();
			eventdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " sacrifices snails and claims the throne!" ;
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var withdrewEvent = myContract.WithdrewEarnings();

withdrewEvent.watch(function(error, result){
    if(!error){
		//console.log(result);
		if(checkHash(result.transactionHash, result.event) != 0) {
			date24();
			eventdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " withdrew " + formatEthValue2(web3.fromWei(result.args.ethreward,'ether')) + " ETH." ;
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var claimedEvent = myContract.ClaimedDivs();

claimedEvent.watch(function(error, result){
    if(!error){
		//console.log(result);
		if(checkHash(result.transactionHash, result.event) != 0) {
			date24();
			eventdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " claimed " + formatEthValue2(web3.fromWei(result.args.ethreward,'ether')) + " ETH in divs." ;
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var fedEvent = myContract.FedFrogking();

fedEvent.watch(function(error, result){
    if(!error){
		//console.log(result);
		if(checkHash(result.transactionHash, result.event) != 0) {
			date24();
			eventdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " fed the Frogking " + result.args.egg + " eggs and won " + formatEthValue2(web3.fromWei(result.args.ethreward,'ether')) + " ETH." ;
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var ascendedEvent = myContract.Ascended();

ascendedEvent.watch(function(error, result){
    if(!error){
		//console.log(result);
		if(checkHash(result.transactionHash, result.event) != 0) {
			date24();
			var _roundwon = result.args.round - 1;
			eventdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " ASCENDS!<br>The new SnailGod wins Round " + _roundwon + " and claims " + formatEthValue2(web3.fromWei(result.args.ethreward,'ether')) + " ETH." ;
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var divEvent = myContract.NewDivs();

divEvent.watch(function(error, result){
    if(!error){
		//console.log(result);
		if(checkHash(result.transactionHash, result.event) != 0) {
			date24();
			eventdoc.innerHTML += "<br>[" + datetext + "] Another snail game just paid out " + formatEthValue2(web3.fromWei(result.args.ethreward,'ether')) + " ETH in divs to all holders!" ;
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});