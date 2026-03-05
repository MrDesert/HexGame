let DOMContentLoaded = false;
let pausescreen = false;

const hexs = [];
const mapHexs = [];
let enemyCells = [];
let availableCells = [];
let money = 0;
let wood = 0;
let food = 0;
let energy = 3;
let energyMax = 3;

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
        foodChange(0);
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
            let Item = "void";
            if(Math.floor(Math.random()*39) == 0){
                Item = "tree";
                hex.classList.add("tree");
            }
            if(Item == "void" && Math.floor(Math.random()*39) == 0){
                Item = "wheat";
                hex.classList.add("wheat");
            }
            container.appendChild(hex);
            mapHexs[Row].push(hexs.length);
            hexs.push({row: Row, col: Col, land: "grass", item: Item, id: document.getElementById("hex"+Row+Col)});
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
    hex.id?.classList.remove("enemyGrass", "availableCell");
    hex.land = "player";
    hex.id?.classList.add("playrsGrass");
}
function enemyLand(hex){
    hex.land = "enemy";
    hex.id?.classList.add("enemyGrass");
}
function nextStep(){
    energyPlus(3);
    hexs.forEach(hex => {
            console.log(money)
        if(hex.item == "tree"){
            newTreeChild(hex, 25);
        }
        if(hex.item == "treeChild"){
            treeGrowth(hex, 30);
        }
        if(hex.item == "void" || hex.item == "wheat"){
            if(Math.floor(Math.random()*2) == 0){
                newTreeChild(hex, 1500);
            }
        }
        if(hex.item == "void"){
            const Wheat = Math.floor(Math.random()*49) == 0? true : false;
            if(Wheat){
                hex.id.classList.add("wheat");
                hex.item = "wheat";
            }
        }
        if(hex.land == "player"){
            if(hex.item == "void"){
                finance(1);
            }
            availableCells = [...availableCells, ...neighboringСells(hex)];
        }
        if(hex.land == "enemy"){
            enemyCells.push(hex)
        }
        if(hex.item == "house"){
            finance(5);
            if(food > 2){
                food -= 2;
            }else {
                finance(-6);
            }
            energyPlus(2);
        }
        if(hex.flag == "new"){
            hex.flag = "old";
            hex.id.classList.add("flagOld");
        } else if (hex.flag == "old"){
            hex.id.classList.remove("flagOld", "flag", "flag_Tree", "flag_TreeChild");
            hex.flag = "none";
        }
    })
    let cells;
    let next = false; 
    do {
        cells = neighboringСells(enemyCells[Math.floor(Math.random()*enemyCells.length)]);
        cells.forEach(cell =>{
            if(cell.land == "player" || cell.land == "grass"){
                next = true;
            };
        })
    } while (!next);
    let stepEnemy;
    do {stepEnemy = cells[Math.floor(Math.random()*cells.length)];
    } while (stepEnemy && stepEnemy.land == "enemy" || !stepEnemy);
    enemyLand(stepEnemy);
    enemyCells = [];
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
        hex.id.classList.add("tree");
        hex.id.classList.remove("treeChild", "flag_TreeChild", "flagOld");
        hex.item = "tree";
    }
}
function newTreeChild(hex, chance){
        const cells = neighboringСells(hex);
        cells.forEach(cell => {
            if(cell.item == "void" && Math.round(Math.random()*chance)<1){
                cell.id.classList.add("treeChild");
                cell.item = "treeChild";
            }
        })
}

function neighboringСells(hex){
    rowPlusMinus = hex.col % 2 ? 1 : -1;
    const result = []
    const cells = [hexs[mapHexs[hex.row+1]?.[hex.col]], hexs[mapHexs[hex.row-1]?.[hex.col]], hexs[mapHexs[hex.row]?.[hex.col+1]], hexs[mapHexs[hex.row]?.[hex.col-1]], hexs[mapHexs[hex.row+rowPlusMinus]?.[hex.col+1]], hexs[mapHexs[hex.row+rowPlusMinus]?.[hex.col-1]]]
    cells.forEach(cell => {
        if(cell){
            result.push(cell);
        }
    })
    return result;
}
function hexAction(row, col){
const hex = hexs[mapHexs[row][col]]
if(hex.land == "player"){
    if(hex.item == "tree" && energy > 1){
        hex.id.classList.remove("tree", "flag_Tree", "flagOld");
        hex.item = "void";
        woodChange(5);
        energyChange(-2);
    }else if(hex.item == "treeChild"){
        if(money > 4 && energy > 0){
            finance(-5);
            energyChange(-1);
            treeGrowth(hex, 3);
        }
    }else if(hex.item == "void"){
        if(wood > 9 && energy > 2 && money > 30){
            woodChange(-10);
            finance(-30);
            energyMax += 3;
            energyChange(-3);
            hex.item = "house";
            hex.id.classList.add("house");
        } else if(hex.item != "treeChild" && money > 9 && energy > 1) {
            finance(-10);
            energyChange(-2);
            hex.id.classList.add("treeChild");
            hex.item = "treeChild";
        }
    } else if(hex.item == "wheat"){
        if(energy > 0){
            energyChange(-1);
            foodChange(1);
            hex.item = "void"
            hex.id.classList.remove("wheat");
        }
    }
} else if (hex.land == "enemy" && energy > 5){
    raisingFlaf(hex, -6, "player")
} else if (hex.land == "grass" && energy > 2){
    raisingFlaf(hex, -3, "player");
} 
if(energy <= 0){
    nextStep();
}
}
function raisingFlaf(hex, energy, who){
    const cells = neighboringСells(hex);
    for (const cell of cells) {
        if (cell.land == who) {
            energyChange(energy);
            if(who == "player"){
                playerLand(hex);
                hex.flag = "new";
            } else if(who == "enemy"){
                enemyLand(hex);
                hex.flag = "old";
                hex.id.classList.add("flagOld");
            }
            who == "player" ? playerLand(hex) : enemyLand(hex);
            if(hex.item == "tree"){
                hex.id.classList.add("flag_Tree"); 
            } else if(hex.item == "treeChild"){
                hex.id.classList.add("flag_TreeChild");
            }else{hex.id.classList.add("flag")}
            break;
        }
    }
}
function seizureTerritory() {
    myLog("flag")
    availableCells.forEach(hex => {
        if(hex.land != "player"){
            hex.id.classList.add("availableCell");
        }
    })
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
function foodChange(f){
    food += f;
    ID.foodInfo.textContent = food;
}

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
