const fs = require('fs')
const zlib = require('zlib')
const leveldata = require('./leveldata.json')
const settings = fs.readFileSync('./settings.txt', 'utf8').split("\n").filter(x => x.startsWith(">")).map(x => x.slice(2))

let [gdLevels, inputText, jsonName] = settings
gdLevels = gdLevels.replace("HOME", process.env.HOME || process.env.USERPROFILE).replace(/\\/g,"/").replace("\r", "")
inputText = inputText.replace("HOME", process.env.HOME || process.env.USERPROFILE).replace(/\\/g,"/").replace("\r", "")

const fontdata = require(`./FontFiles/${jsonName}.json`)

console.log()   // Blank line for neatness

let missing = []

function xor(str, key) {
    str = String(str).split('').map(letter => letter.charCodeAt());
    let res = "";
    for (i = 0; i < str.length; i++) res += String.fromCodePoint(str[i] ^ key);
    return res;
}

function letterPick(letter){
    let temp = fontdata.nothing
    let letterTemp
    if(fontdata.ac != ""){ //check to see if font data has caps, idk if works yet
		letterTemp = letter
    }else letterTemp = letter.toLowerCase()

	switch(letterTemp){
		case " ": return fontdata.space
		case "a": if(fontdata.a != "") {return fontdata.a} else return temp
		case "b": if(fontdata.b != "") {return fontdata.b} else return temp
		case "c": if(fontdata.c != "") {return fontdata.c} else return temp
		case "d": if(fontdata.d != "") {return fontdata.d} else return temp
		case "e": if(fontdata.e != "") {return fontdata.e} else return temp
		case "f": if(fontdata.f != "") {return fontdata.f} else return temp
		case "g": if(fontdata.g != "") {return fontdata.g} else return temp
		case "h": if(fontdata.h != "") {return fontdata.h} else return temp
		case "i": if(fontdata.i != "") {return fontdata.i} else return temp
		case "j": if(fontdata.j != "") {return fontdata.j} else return temp
		case "k": if(fontdata.k != "") {return fontdata.k} else return temp
		case "l": if(fontdata.l != "") {return fontdata.l} else return temp
		case "m": if(fontdata.m != "") {return fontdata.m} else return temp
		case "n": if(fontdata.n != "") {return fontdata.n} else return temp
		case "o": if(fontdata.o != "") {return fontdata.o} else return temp
		case "p": if(fontdata.p != "") {return fontdata.p} else return temp
		case "q": if(fontdata.q != "") {return fontdata.q} else return temp
		case "r": if(fontdata.r != "") {return fontdata.r} else return temp
		case "s": if(fontdata.s != "") {return fontdata.s} else return temp
		case "t": if(fontdata.t != "") {return fontdata.t} else return temp
		case "u": if(fontdata.u != "") {return fontdata.u} else return temp
		case "v": if(fontdata.v != "") {return fontdata.v} else return temp
		case "w": if(fontdata.w != "") {return fontdata.w} else return temp
		case "x": if(fontdata.x != "") {return fontdata.x} else return temp
		case "y": if(fontdata.y != "") {return fontdata.y} else return temp
		case "z": if(fontdata.z != "") {return fontdata.z} else return temp
        case "A": if(fontdata.ac != "") {return fontdata.ac} else return temp
        case "B": if(fontdata.bc != "") {return fontdata.bc} else return temp
        case "C": if(fontdata.cc != "") {return fontdata.cc} else return temp
        case "D": if(fontdata.dc != "") {return fontdata.dc} else return temp
        case "E": if(fontdata.ec != "") {return fontdata.ec} else return temp
        case "F": if(fontdata.fc != "") {return fontdata.fc} else return temp
        case "G": if(fontdata.gc != "") {return fontdata.gc} else return temp
        case "H": if(fontdata.hc != "") {return fontdata.hc} else return temp
        case "I": if(fontdata.ic != "") {return fontdata.ic} else return temp
        case "J": if(fontdata.jc != "") {return fontdata.jc} else return temp
        case "K": if(fontdata.kc != "") {return fontdata.kc} else return temp
        case "L": if(fontdata.lc != "") {return fontdata.lc} else return temp
        case "M": if(fontdata.mc != "") {return fontdata.mc} else return temp
        case "N": if(fontdata.nc != "") {return fontdata.nc} else return temp
        case "O": if(fontdata.oc != "") {return fontdata.oc} else return temp
        case "P": if(fontdata.pc != "") {return fontdata.pc} else return temp
        case "Q": if(fontdata.qc != "") {return fontdata.qc} else return temp
        case "R": if(fontdata.rc != "") {return fontdata.rc} else return temp
        case "S": if(fontdata.sc != "") {return fontdata.sc} else return temp
        case "T": if(fontdata.tc != "") {return fontdata.tc} else return temp
        case "U": if(fontdata.uc != "") {return fontdata.uc} else return temp
        case "V": if(fontdata.vc != "") {return fontdata.vc} else return temp
        case "W": if(fontdata.wc != "") {return fontdata.wc} else return temp
        case "X": if(fontdata.xc != "") {return fontdata.xc} else return temp
        case "Y": if(fontdata.yc != "") {return fontdata.yc} else return temp
        case "Z": if(fontdata.zc != "") {return fontdata.zc} else return temp
		case "0": if(fontdata[0] != "") {return fontdata[0]} else return temp
		case "1": if(fontdata[1] != "") {return fontdata[1]} else return temp
		case "2": if(fontdata[2] != "") {return fontdata[2]} else return temp
		case "3": if(fontdata[3] != "") {return fontdata[3]} else return temp
		case "4": if(fontdata[4] != "") {return fontdata[4]} else return temp
		case "5": if(fontdata[5] != "") {return fontdata[5]} else return temp
		case "6": if(fontdata[6] != "") {return fontdata[6]} else return temp
		case "7": if(fontdata[7] != "") {return fontdata[7]} else return temp
		case "8": if(fontdata[8] != "") {return fontdata[8]} else return temp
		case "9": if(fontdata[9] != "") {return fontdata[9]} else return temp
		case "`": if(fontdata['`'] != "") {return fontdata['`']} else return temp
		case "~": if(fontdata['~'] != "") {return fontdata['~']} else return temp
		case "!": if(fontdata['!'] != "") {return fontdata['!']} else return temp
		case "@": if(fontdata['@'] != "") {return fontdata['@']} else return temp
		case "#": if(fontdata['#'] != "") {return fontdata['#']} else return temp
		case "$": if(fontdata['$'] != "") {return fontdata['$']} else return temp
		case "%": if(fontdata['%'] != "") {return fontdata['%']} else return temp
		case "^": if(fontdata['^'] != "") {return fontdata['^']} else return temp
		case "&": if(fontdata['&'] != "") {return fontdata['&']} else return temp
		case "*": if(fontdata['*'] != "") {return fontdata['*']} else return temp
		case "(": if(fontdata['('] != "") {return fontdata['(']} else return temp
		case ")": if(fontdata[')'] != "") {return fontdata[')']} else return temp
		case "-": if(fontdata['-'] != "") {return fontdata['-']} else return temp
		case "_": if(fontdata['_'] != "") {return fontdata['_']} else return temp
		case "=": if(fontdata['='] != "") {return fontdata['=']} else return temp
		case "+": if(fontdata['+'] != "") {return fontdata['+']} else return temp
		case "[": if(fontdata['['] != "") {return fontdata['[']} else return temp
		case "]": if(fontdata[']'] != "") {return fontdata[']']} else return temp
		case "{": if(fontdata['{'] != "") {return fontdata['{']} else return temp
		case "}": if(fontdata['}'] != "") {return fontdata['}']} else return temp
		case "\\": if(fontdata['\\'] != "") {return fontdata['\\']} else return temp
		case "|": if(fontdata['|'] != "") {return fontdata['|']} else return temp
		case ";": if(fontdata[';'] != "") {return fontdata[';']} else return temp
		case ":": if(fontdata[':'] != "") {return fontdata[':']} else return temp
		case "\'": if(fontdata['\''] != "") {return fontdata['\'']} else return temp
		case "\"": if(fontdata['\"'] != "") {return fontdata['\"']} else return temp
		case ",": if(fontdata[','] != "") {return fontdata[',']} else return temp
		case "<": if(fontdata['<'] != "") {return fontdata['<']} else return temp
		case ".": if(fontdata['.'] != "") {return fontdata['.']} else return temp
		case ">": if(fontdata['>'] != "") {return fontdata['>']} else return temp
		case "/": if(fontdata['/'] != "") {return fontdata['/']} else return temp
		case "?": if(fontdata['?'] != "") {return fontdata['?']} else return temp
        case "\n": return fontdata.space
		default: return temp
	}
}

function levelDatatoObjectData(data){
	const objectData = new Object()
	let list = data.split(",")
	for(i=0;i<list.length;i+=2){
		switch(list[i]){
			case "1": objectData.objid = parseFloat(list[i+1])
			break;
			case "2": objectData.xPos = parseFloat(list[i+1])
			break;
			case "3": objectData.yPos = parseFloat(list[i+1])
			break;
			case "4": objectData.flipX = true
			break;
			case "5": objectData.flipY = true
			break;
			case "6": objectData.r = parseFloat(list[i+1])
			break;
			case "23": console.log(list[i+1])
			break;
			case "25": objectData.zLayer = parseFloat(list[i+1])
			break;
			case "32": objectData.scale = parseFloat(list[i+1])
			break;
			case "57": objectData.groups = list[i+1]
			break;
			//colors \/
			case "21": objectData.cid1 = parseFloat(list[i+1])
			break;
			case "22": objectData.cid2 = parseFloat(list[i+1])
			break;
			case "43": objectData.c1 = list[i+1]
			break;
			case "44": objectData.c2 = list[i+1]
			break;
		}
	}
	return objectData
}

function objectDatatoLevelData(objectData,linkNum){
	let levelStr = ""
	let y = objectData
	let objectCreated = false
	let pos = [0,0]
	if (y.xPos) pos[0] += (y.xPos)           // X Offset 
	if (y.yPos) pos[1] += (y.yPos)           // Y Offset
	if (y.objid) { 
		levelStr += `1,${y.objid},2,${pos[0]},3,${pos[1]}`
		if(fontdata.link) levelStr += `,108,${linkNum + 1}` // links objects to a value
		if(y.groups) levelStr += `,57,${y.groups}`
		levelStr += `,64,1,67,1` //dont fade dont enter
		objectCreated = true
	}
	if (y.r) levelStr += `,6,${y.r}`    // Rotation
	if (y.flipX) levelStr += `,4,1`     // Flip X
	if (y.flipY) levelStr += `,5,1`     // Flip Y
	if (y.zLayer) levelStr += `,25,${y.zLayer}`   // Z Layer
	if (y.scale) levelStr += `,32,${y.scale}`   // Scale                          
	// Color (HSV)
	if (y.cid1) {
		levelStr += `,21,${y.cid1}`
		if (y.cid2) {levelStr += `,22,${y.cid2}`}
		//levelStr += `,23,10`
		if (y.c2) {
			levelStr += `,41,1,43,${y.c1},42,1,44,${y.c2}`
		}else if (y.c1) levelStr += `,41,1,43,${y.c1}`
	}
	if(objectCreated){
		return levelStr += ";"
	}
	return levelStr
}

function addDatatoObject(object,xoffset){ //add when needed
	if(object.objid != null)
		object.objid = object.objid

	if(object.xPos != null)
		object.xPos = object.xPos + (xoffset * fontdata.spacing) //30 per block

	if(object.yPos != null)
		object.yPos = object.yPos

	if(object.r != null)
		object.r = object.r

	if(object.zLayer != null)
		object.zLayer = object.zLayer

	if(object.scale != null)
		object.scale = object.scale

	if(object.groups != null)
		object.groups = `${object.groups}` // to add a group do (.groupid) > `${object.groups}.108` is adding group 108
	
	//colors
	if(object.c1 != null)
		object.c1 = object.c1       // change to a number to change color id 1

	if(object.cid1 != null)         //black color only to use rgb2hsv("r,g,b")
		object.cid1 = object.cid1   // change to a rgb2hsv("r,g,b") to change color id 1 hue

	if(object.c2 != null)
		object.c2 = object.c2       // change to a number to change color id 2

	if(object.cid2 != null)         //black color only to use rgb2hsv("r,g,b")
		object.cid2 = object.cid2   // change to rgb2hsv("r,g,b") to change color id 2 hue
	
	return object
}


fs.readFile(inputText, 'utf8', function(err, data) {
    if (err) return console.log("Error! svg file not found: " + inputText + "\nMaybe double check that you entered the correct file path into settings.txt?\n")
	
	let offsetNum = 0
	let noLetterData = 0
    let objects = 0
	let levelStr = ""
	
	while(data.length > offsetNum + noLetterData){
        if(letterPick(data[offsetNum + noLetterData]) != ""){
			list = letterPick(data[offsetNum + noLetterData]).split(";").forEach(x => {
				let object = levelDatatoObjectData(x)
				object = addDatatoObject(object,offsetNum)
				levelStr += objectDatatoLevelData(object,offsetNum)
				if (object.objid != 440)
				{
					objects += 1
				}
			})
			offsetNum += 1
		} else noLetterData += 1
	}
    console.log(levelStr + "\n")
	console.log("Level Built")

    //import to gd \/

    fs.readFile(gdLevels, 'utf8', function(err, saveData) {
		//return
        if (err) return console.log("Error! Could not open or find GD save file: " + gdLevels + "\nMaybe double check that you entered the correct file path into settings.txt?\n")

        if (!saveData.startsWith('<?xml version="1.0"?>')) {
            console.log("> Decrypting GD save file...")
            saveData = xor(saveData, 11)
            saveData = Buffer.from(saveData, 'base64')
            try { saveData = zlib.unzipSync(saveData).toString() }
            catch(e) { return console.log("Error! GD save file seems to be corrupt!\nMaybe try saving a GD level in-game to refresh it?\n") }
        }
        
        console.log("> Importing to GD...")
        let name = "Generated Text"
        let desc = "subscibe to bedrock :)"
        saveData = saveData.split("<k>_isArr</k><t />")
        saveData[1] = saveData[1].replace(/<k>k_(\d+)<\/k><d><k>kCEK<\/k>/g, function(n) { return "<k>k_" + (Number(n.slice(5).split("<")[0])+1) + "</k><d><k>kCEK</k>" })
        saveData = saveData[0] + "<k>_isArr</k><t />" + leveldata.ham + leveldata.bur + levelStr + leveldata.ger + saveData[1]
        saveData = saveData
        .replace("[[LEVELNAME]]", name).replace("[[LEVELDESC]]", desc)
        .replace("[[BGCOL]]", "1_0_2_0_3_0")//1_255_2_0_3_0 is red bg, leave empty for basic bg color
        .replace("[[OBJECTS]]", objects)
        
        fs.writeFileSync(gdLevels, saveData, 'utf8')
        console.log(`Saved level with ${objects} objects!`);
        if (missing.length) console.log(`Could not add objects for: ${missing.sort().join(", ")}`)
        console.log()
    })
});