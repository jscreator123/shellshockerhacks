// ==UserScript==
// @name         ShellShockers Crazy Hacked Client (No ads)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Crazy Hacked Shellshockers Client, aimbot, esp, redirect
// @author       jscreator & vivaancode
// @match        *://shellshock.io/*
// @match        *://algebra.best/*
// @match        *://algebra.vip/*
// @match        *://biologyclass.club/*
// @match        *://deadlyegg.com/*
// @match        *://deathegg.world/*
// @match        *://eggcombat.com/*
// @match        *://egg.dance/*
// @match        *://eggfacts.fun/*
// @match        *://egghead.institute/*
// @match        *://eggisthenewblack.com/*
// @match        *://eggsarecool.com/*
// @match        *://geometry.best/*
// @match        *://geometry.monster/*
// @match        *://geometry.pw/*
// @match        *://geometry.report/*
// @match        *://hardboiled.life/*
// @match        *://hardshell.life/*
// @match        *://humanorganising.org/*
// @match        *://mathdrills.info/*
// @match        *://mathfun.rocks/*
// @match        *://mathgames.world/*
// @match        *://math.international/*
// @match        *://mathlete.fun/*
// @match        *://mathlete.pro/*
// @match        *://overeasy.club/*
// @match        *://scrambled.best/*
// @match        *://scrambled.tech/*
// @match        *://scrambled.today/*
// @match        *://scrambled.us/*
// @match        *://scrambled.world/*
// @match        *://shellshockers.club/*
// @match        *://shellshockers.site/*
// @match        *://shellshockers.us/*
// @match        *://shellshockers.world/*
// @match        *://softboiled.club/*
// @match        *://violentegg.club/*
// @match        *://violentegg.fun/*
// @match        *://yolk.best/*
// @match        *://yolk.life/*
// @match        *://yolk.rocks/*
// @match        *://yolk.tech/*
// @match        *://zygote.cafe/*
// @icon         https://www.google.com/s2/favicons?domain=shellshock.io
// @grant        none
// @run-at       document-start
// @antifeature  ads
// ==/UserScript==

//Title of website change to yours

document.title = "Hacked Client | Shell Shockers";
window.XMLHttpRequest = class extends window.XMLHttpRequest {

	open( method, url ) {

		if ( url.indexOf( 'shellshock.js' ) > - 1 ) {

			this.isScript = true;

		}

		return super.open( ...arguments );

	}

	get response() {

		if ( this.isScript ) {

			const code = super.response;

			let babylonVarName,
				playersVarName,
				myPlayerVarName,
				sceneVarName,
				cullFuncName;

			try {

				babylonVarName = /this\.origin=new ([a-zA-Z]+)\.Vector3/.exec( code )[ 1 ];
				playersVarName = /([^,]+)=\[\],{}/.exec( code )[ 1 ];
				myPlayerVarName = /"fire":document.pointerLockElement&&([^&]+)&&/.exec( code )[ 1 ];
				sceneVarName = /createMapCells\(([^,]+),/.exec( code )[ 1 ];
				cullFuncName = /=([a-zA-Z_$]+)\(this\.mesh,\.[0-9]+\)/.exec( code )[ 1 ];

			} catch ( error ) {

				alert( 'Script failed to inject. Report the issue to the script developer.\n' + JSON.stringify( getVars(), undefined, 2 ) );

				return code;

			}

			function getVars() {

				return { 
					babylonVarName,
					playersVarName,
					myPlayerVarName,
					playersVarName,
					sceneVarName,
					cullFuncName
				};

			}

			console.log( '%cShell Shockers Hack: Injecting Code', 'color: red; background: black; font-size: 2em;', getVars() );

			return code.replace( sceneVarName + '.render()', `

					window[ '${onUpdateFuncName}' ](
						${babylonVarName},
						${playersVarName},
						${myPlayerVarName}
					);

				${sceneVarName}.render()` )
				.replace( `function ${cullFuncName}`, `

					function ${cullFuncName}() {

						return true;

					}

				function someFunctionWhichWillNeverBeUsedNow` );

		}

		return super.response;

	}

};

let espEnabled = true;
let aimbotEnabled = true;
let showLines = true;
let aimbotOnRightMouse = false;

const value = parseInt( new URLSearchParams( window.location.search ).get( 'showAd' ), 16 );
const shouldShowAd = false;

const temp = document.createElement( 'div' );

temp.innerHTML = `<style>

.info {
	position: absolute;
	left: 50%;
	top: 50%;
	padding: 20px;
	background: rgba(0, 0, 0, 0.8);
	border: 6px solid rgba(0, 0, 0, 0.2);
	color: #fff;
	transform: translate(-50%, -50%);
	text-align: center;
	z-index: 999999;
	font-weight: bolder;
}

.info * {
	color: #fff;
}

.close-icon {
	position: absolute;
	right: 5px;
	top: 5px;
	width: 20px;
	height: 20px;
	opacity: 0.5;
	cursor: pointer;
}

.close-icon:before, .close-icon:after {
	content: ' ';
	position: absolute;
	left: 50%;
	top: 50%;
	width: 100%;
	height: 20%;
	transform: translate(-50%, -50%) rotate(-45deg);
	background: #fff;
}

.close-icon:after {
	transform: translate(-50%, -50%) rotate(45deg);
}

.close-icon:hover {
	opacity: 1;
}

.btn {
	cursor: pointer;
	padding: 0.5em;
	background: red;
	border: 3px solid rgba(0, 0, 0, 0.2);
}

.btn:active {
	transform: scale(0.8);
}

.msg {
	position: absolute;
	left: 10px;
	bottom: 10px;
	color: #fff;
	background: rgba(0, 0, 0, 0.6);
	font-weight: bolder;
	padding: 15px;
	animation: msg 0.5s forwards, msg 0.5s reverse forwards 3s;
	z-index: 999999;
	pointer-events: none;
}

@keyframes msg {
	from {
		transform: translate(-120%, 0);
	}

	to {
		transform: none;
	}
}

</style>
<div class="msg" style="display: none;"></div>
<div class="info">${shouldShowAd ? `<big>Client Loading</big>` : `<div class="close-icon" onclick="this.parentNode.style.display='none';"></div>
	<big>-- Hacked Client Commands --</big>
	<br>
	<br>
	[B] to toggle aimbot<br>
	[V] to toggle ESP (see through walls)<br>
	[N] to toggle ESP Lines<br>
	[L] to toggle aimbot on <br>Right Click Hold
	<br>
	[H] to show/hide help<br>
    [C] close tab <br>
	Thanks to Zertalious for Aimbot + ESP<br>
	Thanks to Klaus-Dieter Bauer for Adblock<br>
	Thanks to TDStuart for the crosshairs<br>
	<br>
	<br>
	` }
</div>`;

const msgEl = temp.querySelector( '.msg' );
const infoEl = temp.querySelector( '.info' );

window.addEventListener( 'DOMContentLoaded', async function () {

	while ( temp.children.length > 0 ) {

		document.body.appendChild( temp.children[ 0 ] );

	}

} );

let rightMouseDown = false;

function handleMouse( event ) {

	if ( event.button === 2 ) {

		rightMouseDown = event.type === 'pointerdown' ? true : false;

	}

}

window.addEventListener( 'pointerdown', handleMouse );
window.addEventListener( 'pointerup', handleMouse );

window.addEventListener( 'keyup', function ( event ) {

	if ( document.activeElement && document.activeElement.tagName === 'INPUT' ) {

		return;

	}

	switch ( event.code ) {

		case 'KeyB' :

			aimbotEnabled = ! aimbotEnabled;

			showMsg( 'Aimbot', aimbotEnabled );

			break;

		case 'KeyV' :

			espEnabled = ! espEnabled;

			showMsg( 'ESP', espEnabled );

			break;

		case 'KeyN' :

			showLines = ! showLines;

			showMsg( 'ESP Lines', showLines );

			break;

		case 'KeyH' :

			infoEl.style.display = infoEl.style.display === '' ? 'none' : '';

			break;

		case 'KeyL' :

			aimbotOnRightMouse = ! aimbotOnRightMouse;

			showMsg( 'Aimbot On Right Mouse Hold', aimbotOnRightMouse );

			break;

       case 'KeyC' :

			window.close();

	}

} );

function showMsg( name, bool ) {

	msgEl.innerText = name + ': ' + ( bool ? 'ON' : 'OFF' );

	msgEl.style.display = 'none';

	void msgEl.offsetWidth;

	msgEl.style.display = '';

}

let lineOrigin, lines;

const onUpdateFuncName = btoa( Math.random().toString( 32 ) );

window[ onUpdateFuncName ] = function ( BABYLON, players, myPlayer ) {

	if ( shouldShowAd !== false ) {

		return;

	}

	if ( ! myPlayer ) {

		return;

	}

	if ( ! lineOrigin ) {

		lineOrigin = new BABYLON.Vector3();
		linesArray = [];

	}

	lineOrigin.copyFrom( myPlayer.actor.mesh.position );

	const yaw = myPlayer.actor.mesh.rotation.y;

	lineOrigin.x += Math.sin( yaw );
	lineOrigin.z += Math.cos( yaw );
	lineOrigin.y += Math.sin( - myPlayer.pitch );

	for ( let i = 0; i < linesArray.length; i ++ ) {

		linesArray[ i ].playerExists = true;

	}

	for ( let i = 0; i < players.length; i ++ ) {

		const player = players[ i ];

		if ( ! player || player === myPlayer ) {

			continue;

		}

		if ( player.sphere === undefined ) {

			console.log( 'Adding sphere...' );

			const material = new BABYLON.StandardMaterial( 'myMaterial', player.actor.scene );
			material.emissiveColor = material.diffuseColor = new BABYLON.Color3( 0, 0, 1 );
			material.wireframe = true;

			const sphere = BABYLON.MeshBuilder.CreateBox( 'mySphere', { width: 0.5, height: 0.75, depth: 0.5 }, player.actor.scene );
			sphere.material = material;
			sphere.position.y = 0.3;

			sphere.parent = player.actor.mesh;

			player.sphere = sphere;

		}

		if ( player.lines === undefined ) {

			const options = {
				points: [ lineOrigin, player.actor.mesh.position ],
				updatable: true
			};

			const lines = options.instance = BABYLON.MeshBuilder.CreateLines( 'lines', options, player.actor.scene );
			lines.color = new BABYLON.Color3( 0, 0, 1 );
			lines.alwaysSelectAsActiveMesh = true;
			lines.renderingGroupId = 1;

			player.lines = lines;
			player.lineOptions = options;

			linesArray.push( lines );

			console.log( '%cAdding line...', 'color: green; background: black; font-size: 2em;' );

		}

		player.lines.playerExists = true;
		player.lines = BABYLON.MeshBuilder.CreateLines( 'lines', player.lineOptions );

		player.sphere.renderingGroupId = espEnabled ? 1 : 0;
		player.sphere.visibility = ( aimbotEnabled || espEnabled ) && myPlayer !== player && ( myPlayer.team === 0 || myPlayer.team !== player.team );

		player.lines.visibility = player.playing && player.sphere.visibility && showLines;

	}

	for ( let i = 0; i < linesArray.length; i ++ ) {

		if ( ! linesArray[ i ].playerExists ) {

			console.log( '%cRemoving line...', 'color: red; background: black; font-size: 2em;' );

			linesArray[ i ].dispose();
			linesArray.splice( i, 1 );

		}

	}

	if ( aimbotEnabled && ( aimbotOnRightMouse ? rightMouseDown : true ) && myPlayer.playing ) {

		let minDistance = Infinity;
		let targetPlayer;

		for ( let i = 0; i < players.length; i ++ ) {

			const player = players[ i ];

			if ( player && player !== myPlayer && player.playing && ( myPlayer.team === 0 || player.team !== myPlayer.team ) ) {

				const distance = Math.hypot( player.x - myPlayer.x, player.y - myPlayer.y, player.z - myPlayer.z );

				if ( distance < minDistance ) {

					minDistance = distance;

					targetPlayer = player;

				}

			}

		}

		if ( targetPlayer ) {

			const x = targetPlayer.actor.mesh.position.x - myPlayer.actor.mesh.position.x;
			const y = targetPlayer.actor.mesh.position.y - myPlayer.actor.mesh.position.y;
			const z = targetPlayer.actor.mesh.position.z - myPlayer.actor.mesh.position.z;

			myPlayer.yaw = Math.radAdd( Math.atan2( x, z ), 0 );
			myPlayer.pitch = - Math.atan2( y, Math.hypot( x, z ) ) % 1.5;

		}

	}

}

delete localStorage[ 'lastVersionPlayed' ];


(function(){
const exceptOrigins = [
  'https://disqus.com',
  document.origin
];
function remIF(e){
  try{
    var orgn = new URL(e.src || 'http://unknown-src').origin;
    if( ! exceptOrigins.includes(orgn)){
      e.parentElement.removeChild(e);
      console.log('REMOVE IFRAME',orgn);
    }
  } catch(err) {
    console.log('REMOVE ERROR',err);
  }
}
function remIFs(){
  for(var e of document.getElementsByTagName('iframe')){
    remIF(e);
  }
}
/* Must repeat to catch recurring frames. */
window.setInterval(remIFs,500);
})();

/*
  Created By : Sharkbucks and Death Boi
  Thanks To :
    TDStuart - Developer (Helped with a bunch of code)

    5514 Ethical Modding: https://discord.gg/fxAmwBS
*/

(function () {
	"use strict";
  
	window.mod = {
	  loadGui: () => {},
	  modMenu: {
		instruction: {},
		credit: {},
		crosshairSettings: {
		  /* Change the type here to have the type be always set as a default */
		  type: "None", // None, White Cross, Black Cross, White Circle, Black Circle, White Square, Black Square
		  container: {
			label: {},
		  },
		},
	  },
	};
  
	window._utils = {};
	window._utils.requirelib = async function (url, global) {
	  return new Promise(async function (resolve) {
		async function getCode() {
		  var xmlHttp = new XMLHttpRequest();
		  xmlHttp.open("GET", url, false);
		  xmlHttp.send(null);
		  return xmlHttp.responseText;
		}
		let code = await getCode();
  
		if (global) {
		  code += 'window["' + global + '"] = ' + global + ";";
		}
		let evaluateCode = new Function(code);
		evaluateCode();
		resolve("done");
	  });
	};
  
	window._utils
	  .requirelib("https://unpkg.com/guify@0.12.0/lib/guify.min.js")
	  .then(() => {
		window.mod.loadGui();
	  });
  
	const y = document.createElement("div");
	y.id = "crossY";
	const z = document.createElement("div");
	z.id = "crossZ";
	const w = document.createElement("div");
	w.id = "crossW";
	const x = document.createElement("div");
	x.id = "crossX";
  
	document.body.appendChild(y);
	document.body.appendChild(z);
	document.body.appendChild(w);
	document.body.appendChild(x);
  
	function updateCrosshair(type) {
	  if (type == "None") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:0.0000000001px;height:1px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		z.style.cssText = `width:0.0000000001px;height:1px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		w.style.cssText = `width:0.0000000001px;height:1px;background-color:#FFFFFF;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:0.0000000001px;height:1px;background-color:#FFFFFF;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "White Cross") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:5px;height:17px;background-color:Black;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		z.style.cssText = `width:17px;height:5px;background-color:Black;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		w.style.cssText = `width:4px;height:16px;background-color:White;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:16px;height:4px;background-color:White;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "Black Cross") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:5px;height:17px;background-color:White;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		z.style.cssText = `width:17px;height:5px;background-color:White;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		w.style.cssText = `width:4px;height:16px;background-color:Black;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:16px;height:4px;background-color:Black;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "Red Cross") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:5px;height:17px;background-color:Black;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		z.style.cssText = `width:17px;height:5px;background-color:Black;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		w.style.cssText = `width:4px;height:16px;background-color:#ff0000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:16px;height:4px;background-color:#ff0000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "Orange Cross") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:5px;height:17px;background-color:Black;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		z.style.cssText = `width:17px;height:5px;background-color:Black;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		w.style.cssText = `width:4px;height:16px;background-color:#ff9900;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:16px;height:4px;background-color:#ff9900;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "Yellow Cross") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:5px;height:17px;background-color:Black;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		z.style.cssText = `width:17px;height:5px;background-color:Black;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		w.style.cssText = `width:4px;height:16px;background-color:#ffff00;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:16px;height:4px;background-color:#ffff00;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "Green Cross") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:5px;height:17px;background-color:Black;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		z.style.cssText = `width:17px;height:5px;background-color:Black;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		w.style.cssText = `width:4px;height:16px;background-color:#00ff00;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:16px;height:4px;background-color:#00ff00;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "Blue Cross") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:5px;height:17px;background-color:Black;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		z.style.cssText = `width:17px;height:5px;background-color:Black;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		w.style.cssText = `width:4px;height:16px;background-color:#0000ff;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:16px;height:4px;background-color:#0000ff;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "Purple Cross") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:5px;height:17px;background-color:Black;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		z.style.cssText = `width:17px;height:5px;background-color:Black;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		w.style.cssText = `width:4px;height:16px;background-color:#ff00ff;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:16px;height:4px;background-color:#ff00ff;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "White Circle") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:9px;height:9px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:100px`;
		z.style.cssText = `width:8px;height:8px;background-color:#FFFFFF;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:100px`;
		w.style.cssText = `width:0.0000000001px;height:1px;background-color:#FFFFFF;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:0.0000000001px;height:1px;background-color:#FFFFFF;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "Red Circle") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:9px;height:9px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:100px`;
		z.style.cssText = `width:8px;height:8px;background-color:#ff0000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:100px`;
		w.style.cssText = `width:0.0000000001px;height:1px;background-color:#ff0000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:0.0000000001px;height:1px;background-color:#ff0000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "Orange Circle") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:9px;height:9px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:100px`;
		z.style.cssText = `width:8px;height:8px;background-color:#ff9900;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:100px`;
		w.style.cssText = `width:0.0000000001px;height:1px;background-color:#ff9900;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:0.0000000001px;height:1px;background-color:#ff9900;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "Yellow Circle") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:9px;height:9px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:100px`;
		z.style.cssText = `width:8px;height:8px;background-color:#ffff00;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:100px`;
		w.style.cssText = `width:0.0000000001px;height:1px;background-color:#ffff00;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:0.0000000001px;height:1px;background-color:#ffff00;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "Green Circle") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:9px;height:9px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:100px`;
		z.style.cssText = `width:8px;height:8px;background-color:#00ff00;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:100px`;
		w.style.cssText = `width:0.0000000001px;height:1px;background-color:#00ff00;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:0.0000000001px;height:1px;background-color:#00ff00;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "Blue Circle") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:9px;height:9px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:100px`;
		z.style.cssText = `width:8px;height:8px;background-color:#0000ff;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:100px`;
		w.style.cssText = `width:0.0000000001px;height:1px;background-color:#0000ff;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:0.0000000001px;height:1px;background-color:#0000ff;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "Purple Circle") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:9px;height:9px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:100px`;
		z.style.cssText = `width:8px;height:8px;background-color:#ff00ff;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:100px`;
		w.style.cssText = `width:0.0000000001px;height:1px;background-color:#ff00ff;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:0.0000000001px;height:1px;background-color:#ff00ff;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "Black Circle") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:9px;height:9px;background-color:#FFFFFF;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:100px`;
		z.style.cssText = `width:8px;height:8px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:100px`;
		w.style.cssText = `width:0.0000000001px;height:1px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:0.0000000001px;height:1px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "White Square") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:9px;height:9px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		z.style.cssText = `width:8px;height:8px;background-color:#ffffff;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		w.style.cssText = `width:0.0000000001px;height:1px;background-color:#ffffff;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:0.0000000001px;height:1px;background-color:#ffffff;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "Red Square") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:9px;height:9px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		z.style.cssText = `width:8px;height:8px;background-color:#ff0000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		w.style.cssText = `width:0.0000000001px;height:1px;background-color:#ff0000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:0.0000000001px;height:1px;background-color:#ff0000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "Orange Square") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:9px;height:9px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		z.style.cssText = `width:8px;height:8px;background-color:#ff9900;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		w.style.cssText = `width:0.0000000001px;height:1px;background-color:#ff9900;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:0.0000000001px;height:1px;background-color:#ff9900;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "Yellow Square") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:9px;height:9px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		z.style.cssText = `width:8px;height:8px;background-color:#ffff00;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		w.style.cssText = `width:0.0000000001px;height:1px;background-color:#ffff00;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:0.0000000001px;height:1px;background-color:#ffff00;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "Green Square") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:9px;height:9px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		z.style.cssText = `width:8px;height:8px;background-color:#00ff00;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		w.style.cssText = `width:0.0000000001px;height:1px;background-color:#00ff00;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:0.0000000001px;height:1px;background-color:#00ff00;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "Blue Square") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:9px;height:9px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		z.style.cssText = `width:8px;height:8px;background-color:#0000ff;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		w.style.cssText = `width:0.0000000001px;height:1px;background-color:#0000ff;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:0.0000000001px;height:1px;background-color:#0000ff;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "Purple Square") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:9px;height:9px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		z.style.cssText = `width:8px;height:8px;background-color:#ff00ff;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		w.style.cssText = `width:0.0000000001px;height:1px;background-color:#ff00ff;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:0.0000000001px;height:1px;background-color:#ff00ff;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "Black Square") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:9px;height:9px;background-color:#FFFFFF;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		z.style.cssText = `width:8px;height:8px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		w.style.cssText = `width:0.0000000001px;height:1px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:0.0000000001px;height:1px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "White Long Width") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:17px;height:5px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		z.style.cssText = `width:16px;height:4px;background-color:#FFFFFF;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		w.style.cssText = `width:0.0000000001px;height:1px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:0.0000000001px;height:1px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "Red Long Width") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:17px;height:5px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		z.style.cssText = `width:16px;height:4px;background-color:#ff0000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		w.style.cssText = `width:0.0000000001px;height:1px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:0.0000000001px;height:1px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "Orange Long Width") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:17px;height:5px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		z.style.cssText = `width:16px;height:4px;background-color:#ff9900;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		w.style.cssText = `width:0.0000000001px;height:1px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:0.0000000001px;height:1px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "Yellow Long Width") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:17px;height:5px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		z.style.cssText = `width:16px;height:4px;background-color:#ffff00;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		w.style.cssText = `width:0.0000000001px;height:1px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:0.0000000001px;height:1px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "White Long Width") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:17px;height:5px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		z.style.cssText = `width:16px;height:4px;background-color:#FFFFFF;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		w.style.cssText = `width:0.0000000001px;height:1px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:0.0000000001px;height:1px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "Green Long Width") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:17px;height:5px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		z.style.cssText = `width:16px;height:4px;background-color:#00ff00;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		w.style.cssText = `width:0.0000000001px;height:1px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:0.0000000001px;height:1px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "Blue Long Width") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:17px;height:5px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		z.style.cssText = `width:16px;height:4px;background-color:#0000ff;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		w.style.cssText = `width:0.0000000001px;height:1px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:0.0000000001px;height:1px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "Purple Long Width") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:17px;height:5px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		z.style.cssText = `width:16px;height:4px;background-color:#ff00ff;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		w.style.cssText = `width:0.0000000001px;height:1px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:0.0000000001px;height:1px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "Black Long Width") {
		let y = document.getElementById("crossY");
		let z = document.getElementById("crossZ");
		let w = document.getElementById("crossW");
		let x = document.getElementById("crossX");
  
		y.style.cssText = `width:17px;height:5px;background-color:#FFFFFF;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		z.style.cssText = `width:16px;height:4px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		w.style.cssText = `width:0.0000000001px;height:1px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
		x.style.cssText = `width:0.0000000001px;height:1px;background-color:#000000;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:0px`;
	  }
  
	  if (type == "--- RED ---") {
		alert(
		  `You can not set this as your crosshair. \nPlease choose a crosshair that does not start with a "---".`
		);
	  }
	  if (type == "--- ORANGE ---") {
		alert(
		  `You can not set this as your crosshair. \nPlease choose a crosshair that does not start with a "---".`
		);
	  }
	  if (type == "--- YELLOW ---") {
		alert(
		  `You can not set this as your crosshair. \nPlease choose a crosshair that does not start with a "---".`
		);
	  }
	  if (type == "--- GREEN ---") {
		alert(
		  `You can not set this as your crosshair. \nPlease choose a crosshair that does not start with a "---".`
		);
	  }
	  if (type == "--- BLUE ---") {
		alert(
		  `You can not set this as your crosshair. \nPlease choose a crosshair that does not start with a "---".`
		);
	  }
	  if (type == "--- PURPLE ---") {
		alert(
		  `You can not set this as your crosshair. \nPlease choose a crosshair that does not start with a "---".`
		);
	  }
	  if (type == "--- WHITE ---") {
		alert(
		  `You can not set this as your crosshair. \nPlease choose a crosshair that does not start with a "---".`
		);
	  }
	  if (type == "--- BLACK ---") {
		alert(
		  `You can not set this as your crosshair. \nPlease choose a crosshair that does not start with a "---".`
		);
	  }
	}
  
	window.mod.loadGui = function () {
	  const crosshairGui = new window.guify({
		title: "Crosshair Menu (Version 2)",
		theme: "dark",
		align: "left",
		width: 300,
		barMode: "none",
		opacity: 0.95,
		root: document.body,
		open: true,
	  });
  
	  crosshairGui.Register({
		type: "folder",
		label: "Instructions",
		open: false,
	  });
  
	  window.mod.modMenu.instruction = crosshairGui.Register({
		type: "text",
		label: "Credits",
		folder: "Instructions",
	  });
  
	  window.mod.modMenu.instruction.container.innerHTML = `<p style="color:yellow;font-size: small;margin-bottom: 0px;padding-left: 2.5px;">Thank you for installing and using Crosshair Mods for Shell Shockers!</p><p style="color:white;font-size: small;margin-top: 0px;padding-left: 2.5px;">1. Below are the settings for the mod as you can see.</p><p style="color:white;font-size: small;margin-top: 0px;padding-left: 2.5px;">2. Select the settings you would want to use, they will appear in the center of the screen.</p><p style="color:white;font-size: small;margin-top: 0px;padding-left: 2.5px;">3. You can not set to anything that start or end with a "---" as they are markers.</p><p style="color:white;font-size: small;margin-top: 0px;padding-left: 2.5px;">4. Take this mod into a game and try it out!</p><p style="color:orange;font-size: small;margin-top: 0px;padding-left: 2.5px;">[WARNING] : This has not been publicly allowed or disallowed in Shell League!</p><p style="color:red;font-size: small;margin-top: 0px;padding-left: 2.5px;">[NOTE] : Do not reproduce, reupload, or take this mod as your own as the mods worked hard on this. If you do please credit us as we worked on this, any modifications will be yours, but the framework will still be ours, due to reason of the creators.</p>`;
  
	  crosshairGui.Register({
		type: "folder",
		label: "Crosshair Settings",
		open: false,
	  });
  
	  crosshairGui.Register({
		type: "select",
		label: "Types",
		object: window.mod.modMenu.crosshairSettings,
		property: "type",
		folder: "Crosshair Settings",
		options: [
		  "None",
		  "--- RED ---",
		  "Red Cross",
		  "Red Circle",
		  "Red Square",
		  "Red Long Width",
		  "--- ORANGE ---",
		  "Orange Cross",
		  "Orange Circle",
		  "Orange Square",
		  "Orange Long Width",
		  "--- YELLOW ---",
		  "Yellow Cross",
		  "Yellow Circle",
		  "Yellow Square",
		  "Yellow Long Width",
		  "--- GREEN ---",
		  "Green Cross",
		  "Green Circle",
		  "Green Square",
		  "Green Long Width",
		  "--- BLUE ---",
		  "Blue Cross",
		  "Blue Circle",
		  "Blue Square",
		  "Blue Long Width",
		  "--- PURPLE ---",
		  "Purple Cross",
		  "Purple Circle",
		  "Purple Square",
		  "Purple Long Width",
		  "--- WHITE ---",
		  "White Cross",
		  "White Circle",
		  "White Square",
		  "White Long Width",
		  "--- BLACK ---",
		  "Black Cross",
		  "Black Circle",
		  "Black Square",
		  "Black Long Width",
		],
		onChange: updateCrosshair,
	  });
  
	  window.mod.modMenu.credit = crosshairGui.Register({
		type: "text",
		label: "Credits",
	  });
  
	  window.mod.modMenu.credit.container.innerHTML = `<p style="color:gray;font-size: medium;margin-bottom: 0px;padding-left: 15px;">Made by Sharkb. & DeathB.</p><p style="color:gray;font-size: medium;margin-top: 0px;padding-left: 15px;">With the help of TDStuart!</p>`;
  
	  let titleTextElm = crosshairGui.panel.panel.childNodes[0];
	  titleTextElm.style.color = "rgb(255, 196, 0)";
	  titleTextElm.style.fontWeight = "bold";
	};
  })();