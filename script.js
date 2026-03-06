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
            
            let top = Row * 90; 
            // Сдвигаем каждый второй столбец вниз
            if (Col % 2 === 1) {
                top += 45;
            }

            hex.style.left = (Col * 80) + 'px'; 
            hex.style.top = top + 'px';

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
            hexs.push({row: Row, col: Col, land: "grass", item: Item, flag: "none", id: document.getElementById("hex"+Row+Col)});
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
            classFlag(hex, "old");
        } else if (hex.flag == "old"){
            classFlag(hex, "none");
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
    if(Math.round(Math.random()*chance)<1){5
        classItem(hex, "tree")    
    }
}
function newTreeChild(hex, chance){
        const cells = neighboringСells(hex);
        cells.forEach(cell => {
            if(cell.item == "void" && Math.round(Math.random()*chance)<1){
                classItem(cell, "treeChild");
            }
        })
}
function classItem(hex, item){
        hex.id.classList.remove("tree", "treeChild", "wheat", "house", "void");
        hex.id.classList.add(item);
        hex.item = item;
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
        woodChange(5);
        energyChange(-2);
        classItem(hex, "void");
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
            classItem(hex, "house")
        } else if(hex.item != "treeChild" && money > 9 && energy > 1) {
            finance(-10);
            energyChange(-2);
            classItem(hex, "treeChild")
        }
    } else if(hex.item == "wheat"){
        if(energy > 0){
            energyChange(-1);
            foodChange(1);
            classItem(hex, "void");
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
                classFlag(hex, "new");
            } else if(who == "enemy"){
                enemyLand(hex);
                classFlag(hex, "old");
            }
            break;
        }
    }
}
function classFlag(hex, flag){
    myLog(flag)
    hex.flag = flag;
    if(flag == "new" && hex.item == "void"){
        hex.id.classList.add("flag");
    } else if (flag == "new"){
        hex.id.classList.add("flag_Item");
    }
    if(flag == "old" && hex.land == "enemy"){
        hex.id.classList.add("flag", "flagOld");
    } else if(flag == "old"){
        hex.id.classList.add("flagOld");
    }
    if(flag == "none"){
        hex.id.classList.remove("flag", "flag_Item", "flagOld");
    }
}
function seizureTerritory() {
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