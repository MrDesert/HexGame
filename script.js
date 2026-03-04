let DOMContentLoaded = false;
let pausescreen = false;

const hexs = [];
const mapHexs = [];
const enemyCells = [];
const flagHexs = [];
let money = 0;
let wood = 0;
let food = 0;
let energy = 2;
let energyMax = 2;

function startGame() {
    if(sdkLoad && resurses && HTMLLoaded){
        changeLang(document.documentElement.lang);
        document.getElementById("preloaderID").hidden = "hidden";
        loadLocalStorage();
        const col = Math.ceil(window.innerWidth/ 85)+1;
        const row = Math.ceil(window.innerHeight/ 100)+1;
        createHexGrid(row, col, 'map');
        addEdgeFog();
        // addHexEdgeFog()
        finance(0);
        woodChange(0);
        energyChange(0);
    }
}

consoleCreateBtnsCP(["coins", "exp", "hit", "autohit"])//создание панели управления в консоле
function consBtnReturn(value, parameter) {
    switch(parameter){
        case "coins": finance(value); break;
        case "exp": expChanges(value); break;
        case "hit": handHit += value; break;
        case "autohit": minerShovel.value += value; break;
    }
}

document.addEventListener('visibilitychange', ()=>{
    if(document.hidden){safeInLocalStorage();}
    else{loadLocalStorage();}
})

document.addEventListener('DOMContentLoaded', function() {
    DOMContentLoaded = true;
    loadLocalStorage();
}, {once: true});

function loadLocalStorage(){
    // offlineProfit(Math.ceil((new Date() - new Date(localStorage.getItem("exitTime") || new Date()))/1000));
}

window.addEventListener('beforeunload', () => {
    safeInLocalStorage();
})

window.addEventListener('load', () => {
    loadLocalStorage();
});

window.addEventListener('pagehide', () => {
    safeInLocalStorage();
})

function safeInLocalStorage(){
    localStorage.setItem("exitTime", new Date())
}

function preloaderTextChange(){
    const id = document.getElementById("preloaderTextID");
    id.textContent = id.textContent == "..." ? "." : id.textContent == "." ? ".." : "...";
}

window.addEventListener('blur', ()=>{
    DOM.Hide("blurID", false);
    pausescreen = true;
    ysdk?.features?.GameplayAPI?.stop?.();
})

window.addEventListener('focus', ()=>{
    DOM.Hide("blurID");
    pausescreen = false;
    if (sdkLoad && resurses){
        ysdk.features?.GameplayAPI?.start?.();
    }
})

function createHexGrid(rows, cols, containerId) {
    const container = ID.map;
    container.style.width = window.innerWidth+20 + 'px';
    container.style.height = window.innerHeight+40 + 'px';
    
    for (let Row = 0; Row < rows; Row++) {
        mapHexs.push([]);
        for (let Col = 0; Col < cols; Col++) {
            const hex = document.createElement('div');
            hex.id = "hex"+Row+Col;
            hex.className = 'hex grass';
            hex.dataset.row = Row;
            hex.dataset.col = Col;
            hex.onclick = ()=> hexAction(Row, Col);
            
            hex.style.position = 'absolute';
            hex.style.left = (Col * 80) + 'px'; // 70px чтобы наезжали по горизонтали
            
            // Расчет вертикальной позиции
            let top = Row * 90; // 75% высоты для вертикального нахлеста
            
            // Сдвигаем каждый второй столбец вниз
            if (Col % 2 === 1) {
                top += 45;
            }
            
            hex.style.top = top + 'px';
            const Tree = Math.floor(Math.random()*39) == 0? true : false;
            if(Tree){
                hex.classList.add("tree");
            }
            container.appendChild(hex);
            mapHexs[Row].push(hexs.length);
            hexs.push({row: Row, col: Col, land: "grass", tree: Tree, treeChild: false, void: true, house: false, id: document.getElementById("hex"+Row+Col)});
        }
    }
    playerLand(playrsHex());
    enemyLand(playrsHex());
}
function playrsHex(){
    const playrHex = Math.floor(Math.random()*hexs.length);
    const hex = hexs[playrHex];
    return hex;
}
function playerLand(hex){
    if(hex.land == "enemy"){
        hex.id?.classList.remove("enemyGrass");
    }
    hex.land = "player";
    hex.id?.classList.add("playrsGrass");
}
function enemyLand(hex){
    hex.land = "enemy";
    hex.id?.classList.add("enemyGrass");
    enemyCells.push(hex);
}
function nextStep(){
    energyPlus(2);
    hexs.forEach(hex => {
            console.log(money)
        if(hex.tree){
            newTreeChild(hex, 25);
        }
        if(hex.treeChild){
            treeGrowth(hex, 30);
        }
        if(hex.void){
            newTreeChild(hex, 1500);
        }
        if(hex.land == "player" && hex.void){
            finance(1);
        }
        if(hex.house){
            finance(5);
            if(food > 2){
                food -= 2;
            }else {
                finance(-6);
            }
            energyPlus(2);
        }
    })
    let cells;
    let next = false; 
    do {
        cells = neighboringСells(enemyCells[Math.floor(Math.random()*enemyCells.length)]);
        cells.forEach(cell =>{
            if(cell && (cell.land == "player" || cell.land == "grass")){
                next = true;
            };
        })
    } while (!next);
    let stepEnemy;
    do {stepEnemy = cells[Math.floor(Math.random()*cells.length)];
    } while (stepEnemy && stepEnemy.land == "enemy" || !stepEnemy);
    enemyLand(stepEnemy)
    raisingFlaf(stepEnemy, 0, "enemy");
}
function energyPlus(value){
    if (energy < energyMax){
        if (energyMax - energy < value){
            energy = energyMax;
        } else {
            energy += value;
        }
    }
    energyChange(0);
}
function treeGrowth(hex, chance){
    if(Math.round(Math.random()*chance)<1){
        document.getElementById("hex"+hex.row+hex.col)?.classList.add("tree");
        document.getElementById("hex"+hex.row+hex.col)?.classList.remove("treeChild");
        hex.tree = true;
        hex.treeChild = false;
    }
}
function newTreeChild(hex, chance){
        const cells = neighboringСells(hex);
        cells.forEach(cell => {
            if(Math.round(Math.random()*chance)<1){
                if(cell && cell.id && cell.void){
                    cell.id.classList.add("treeChild");
                    cell.treeChild = true;
                    cell.void = false;
                }
            }
        })
}

function neighboringСells(hex){
    rowPlusMinus = hex.col % 2 ? 1 : -1;
    const cells = [hexs[mapHexs[hex.row+1]?.[hex.col]], hexs[mapHexs[hex.row-1]?.[hex.col]], hexs[mapHexs[hex.row]?.[hex.col+1]], hexs[mapHexs[hex.row]?.[hex.col-1]], hexs[mapHexs[hex.row+rowPlusMinus]?.[hex.col+1]], hexs[mapHexs[hex.row+rowPlusMinus]?.[hex.col-1]]]
    return cells;
}
function hexAction(row, col){
const hex = hexs[mapHexs[row][col]]
const hexDom = document.getElementById("hex"+row+col);
if(hex.land == "player"){
    if(hex.tree && energy > 0){
        hexDom?.classList.remove("tree");
        hex.tree = false;
        hex.void = true;
        woodChange(5);
        energyChange(-1);
    }else if(hex.void){
        if(wood > 9 && energy > 1 && money > 30){
            woodChange(-10);
            finance(-30);
            energyMax += 2;
            energyChange(-2);
            hex.house = true;
            hex.void = false;
            hexDom?.classList.add("house");
        } else if(money > 9 && energy > 0) {
            finance(-10);
            energyChange(-1);
            hex.treeChild = true;
            hex.void = false;
            hexDom?.classList.add("treeChild");
        }
    } else if(hex.treeChild){
        if(money > 4 && energy > 0){
            finance(-5);
            energyChange(-1);
            treeGrowth(hex, 3);
        }
    }  
} else if (hex.land == "enemy" && energy > 3){
    raisingFlaf(hex, -4, "player")
} else if (hex.land == "grass" && energy > 1){
    raisingFlaf(hex, -2, "player")
} 
if(energy <= 0){
    const flagDel = [];
    flagHexs.forEach((hex, index) => {
     myLog(hex.id.classList)   
    if(hex.flag === "new") {
        hex.flag = "old";  
    } else if(hex.flag == "old") {
        hex.id.classList.remove("flag", "flag_Tree", "flag_TreeChild");
        flagDel.push(index)
    }
    });
    flagDel.forEach(index => {
        flagHexs.splice(index, 1);
    })
    nextStep();
}
}
function raisingFlaf(hex, energy, who){
    const cells = neighboringСells(hex);
    for (const cell of cells) {
        console.log(cell.land +" - "+ who)
        if (cell.land == who) {
            energyChange(energy);
            who == "player" ? playerLand(hex) : enemyLand(hex);
            if(hex.tree){
                hex.id.classList.add("flag_Tree"); 
            } else if(hex.treeChild){
                hex.id.classList.add("flag_TreeChild");
            }else{hex.id.classList.add("flag")}
            hex.flag = "new";
            flagHexs.push(hex);
            break;
        }
    }
}
function finance(m) {
    money += m;
    ID.moneyInfo.textContent = money;
}
function woodChange(w){
    wood += w;
    ID.woodInfo.textContent = wood;
}
function energyChange(e){
    energy += e;
    ID.energyInfo.textContent = energy+"/"+energyMax;
};

function addEdgeFog() {
    const fog = document.createElement('div');
    fog.id = 'edge-fog';
    fog.style.position = 'absolute';
    fog.style.top = '0';
    fog.style.left = '0';
    fog.style.width = '100%';
    fog.style.height = '100%';
    fog.style.pointerEvents = 'none';
    fog.style.zIndex = '20';
    fog.style.boxShadow = 'inset 0 0 80px 40px rgba(104, 104, 104, 1)';
    
    document.body.appendChild(fog);
}

function addHexEdgeFog() {
    const fog = document.createElement('div');
    fog.id = 'edge-fog';
    fog.style.position = 'absolute';
    fog.style.top = '0';
    fog.style.left = '0';
    fog.style.width = '100%';
    fog.style.height = '100%';
    fog.style.pointerEvents = 'none';
    fog.style.zIndex = '20';
    
    // Маска из нескольких градиентов
    fog.style.background = `
        linear-gradient(to right, rgba(83, 83, 83, 1) 0%, transparent 10%),
        linear-gradient(to left, rgba(83, 83, 83, 1) 0%, transparent 10%),
        linear-gradient(to top, rgba(83, 83, 83, 1) 0%, transparent 10%),
        linear-gradient(to bottom, rgba(83, 83, 83, 1) 0%, transparent 10%)
    `;
    fog.style.backgroundBlendMode = 'normal';
    
    document.body.appendChild(fog);
}
