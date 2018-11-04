//Started once, to trigger the main loop and the egg loop
function main(){
    console.log('test');
    controlLoop();
}

//Main loop
function controlLoop(){
    refreshData();
    setTimeout(controlLoop,2500);
}

//Refreshes game data
function refreshData(){
	updateGodRound();
	updateGodPot();
	updatePharaoh();
	updateGodTimer();
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
	var godtimerdoc = document.getElementById('godtimer');
	godTimer(function(req) {
		godtimerdoc.textContent = req;
	});
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