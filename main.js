function main(){
    console.log('test');
    controlLoop();
}

function controlLoop(){
    refreshData();
    setTimeout(controlLoop,2500);
}

function updateRound(){
	var godrounddoc = document.getElementById('godround');
	godRound(function(req) {
		godrounddoc.textContent = req;
	});
}

function refreshData(){
	updateRound();
}

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