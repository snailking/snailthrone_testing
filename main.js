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

//Refreshes game data
function refreshData(){
	updateGodRound();
	updateGodPot();
	updatePharaoh();
	updateGodTimer();
	//updatePharaohReq();
	updateContractBalance();
}

//Truncates ETH value to 3 decimals
function formatEthValue(ethstr){
    return parseFloat(parseFloat(ethstr).toFixed(3));
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

/*
//Current pharaoh requirement
function updatePharaohReq(){
	var pharaohreqdoc = document.getElementById('pharaohreq');
	ComputePharaohReq(function(req) {
		pharaohreqdoc.textContent = req;
	});
}
*/

//Current max supply of snails
function updateMaxSnail(){
	var maxsnaildoc = document.getElementById('maxsnail');
	maxSnail(function(req) {
		maxsnaildoc.textContent = req;
	});
}

//Current ETH balance in contract
function updateContractBalance(){
	var contractbalancedoc = document.getElementById('contractbalance');
	contractbalancedoc.textContent = web3.fromWei(web3.eth.getBalance('0x854D743d8da78C94CE5fD3c713Fb512Bbd671EeD')); //Remember to change this, or set a variable somewhere else
}

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