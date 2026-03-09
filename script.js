let DOMContentLoaded = false;
let pausescreen = false;

const hexs = [];
const mapHexs = [];
let enemyCells = [];
let playerCells = [];
let availableCells = [];
let currentSeed = Math.floor(Math.random() * 1000000);
let useSeed = false;
let itemCounter = 0;
let money = 0;
let wood = 0;
let food = 0;
let energy = 3;
let energyMax = 3;
let seizTerr = false;
let plTree = false;

function startGame() {
    if(sdkLoad && resurses && HTMLLoaded){
        changeLang(document.documentElement.lang);
        document.getElementById("preloaderID").hidden = "hidden";
        loadLocalStorage();
// Базовый размер карты (можно менять)
const baseCols = 30;
const baseRows = 20;

// Если используем сид - размер зависит от сида
if (useSeed && currentSeed) {
    // Используем seededRandom для определения размера
    const randCol = seededRandom(currentSeed, 999999); // большой индекс чтобы не пересекался
    const randRow = seededRandom(currentSeed, 999998);
    
    // Размер от 20 до 40 колонок и от 15 до 30 рядов
    const cols = 5 + Math.floor(randCol * 21);
    const rows = 5 + Math.floor(randRow * 16);
    
    createHexGrid(rows, cols, 'map');
} else {
    // Если нет сида - размер под экран
    const cols = Math.ceil(window.innerWidth/ 85)+1;
    const rows = Math.ceil(window.innerHeight/ 100)+1;
    createHexGrid(rows, cols, 'map');
}
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

function applySeed() {
    const seedInput = prompt("Введите сид (число):", currentSeed);
    const seedValue = parseInt(seedInput);
    if (!isNaN(seedValue)) {
        currentSeed = seedValue;
        useSeed = true;
        restartGame();
    }
}

function randomSeed() {
    currentSeed = Math.floor(Math.random() * 1000000);
    useSeed = true;
    alert("Новый сид: " + currentSeed);
    restartGame();
}

function copySeed() {
    navigator.clipboard.writeText(currentSeed.toString());
    alert("Сид скопирован: " + currentSeed);
}

function restartGame() {
    ID.map.innerHTML = '';
    hexs.length = 0;
    mapHexs.length = 0;
    availableCells = [];
    playerCells = [];
    enemyCells = [];
    
if (useSeed && currentSeed) {
    const randCol = seededRandom(currentSeed, 999999);
    const randRow = seededRandom(currentSeed, 999998);
    
    const cols = 5 + Math.floor(randCol * 21);
    const rows = 5 + Math.floor(randRow * 16);
    
    createHexGrid(rows, cols, 'map');
} else {
    const cols = Math.ceil(window.innerWidth/ 85)+1;
    const rows = Math.ceil(window.innerHeight/ 100)+1;
    createHexGrid(rows, cols, 'map');
}ы
}

function seededRandom(seed, index) {
    const value = Math.sin(seed * 9999 + index) * 10000;
    return value - Math.floor(value);
}

function createHexGrid(rows, cols, containerId) {
    const container = ID.map;
    container.style.width = cols*81+19 + 'px';
    container.style.height = rows*89+55 + 'px';
    container.style.cursor = 'grab';
    itemCounter = 0; // Сбрасываем счетчик
    let typeWater;
    let randomTypeWater;
    let waterCells = [];
    let waterCellsMaxRandom;
    if (useSeed && currentSeed) {
        randomTypeWater = seededRandom(currentSeed, 1234567890);
        waterCellsMaxRandom = seededRandom(currentSeed, 234567890);
    } else {
        randomTypeWater = Math.random();
        waterCellsMaxRandom = Math.random();
    }
    const allcells= rows*cols
    const waterCellsMax = Math.floor(waterCellsMaxRandom*(allcells/7))+Math.floor(allcells/50)+3;
    myLog(waterCellsMax)
    const randomWater = Math.floor(randomTypeWater*5);
    if(randomWater == 0){
        typeWater = "swamp";
    } else if(randomWater == 1) {
        typeWater = "river";
    } else if(randomWater == 2) {
        typeWater = "sea";
    } else if(randomWater == 3) {
        typeWater = "lake";
    } else {
        typeWater = "none";
    }
    myLog(typeWater)

        // Вспомогательные функции для работы с соседями
    function getNeighbors(row, col) {
        const rowOffset = col % 2 ? 1 : -1;
        return [
            [row-1, col], [row+1, col], [row, col-1], [row, col+1],
            [row+rowOffset, col-1], [row+rowOffset, col+1]
        ].filter(([r, c]) => r >= 0 && r < rows && c >= 0 && c < cols);
    }
    
    function isEdge(row, col) {
        return row === 0 || row === rows-1 || col === 0 || col === cols-1;
    }

    // Функции генерации воды
    function generateSwamp(count) {
        for (let i = 0; i < count; i++) {
            let placed = false;
            let attempts = 0;
            
            while (!placed && attempts < 100) {
                const row = Math.floor(Math.random() * rows);
                const col = Math.floor(Math.random() * cols);
                
                // Проверяем, что клетка не вода и не рядом с водой
                const neighbors = getNeighbors(row, col);
                const hasWaterNearby = neighbors.some(([r, c]) => 
                    waterCells.some(w => w[0] === r && w[1] === c)
                );
                
                if (!hasWaterNearby && !waterCells.some(w => w[0] === row && w[1] === col)) {
                    waterCells.push([row, col]);
                    placed = true;
                }
                attempts++;
            }
        }
    }
    
    function generateLake(count) {
        // Выбираем стартовую точку не у края
        let startRow, startCol;
        let attempts = 0;
        
        do {
            startRow = 1 + Math.floor(Math.random() * (rows - 2));
            startCol = 1 + Math.floor(Math.random() * (cols - 2));
            attempts++;
        } while (attempts < 100 && waterCells.some(w => w[0] === startRow && w[1] === startCol));
        
        // BFS для создания формы
        const queue = [[startRow, startCol]];
        const visited = new Set();
        visited.add(`${startRow},${startCol}`);
        
        while (waterCells.length < count && queue.length > 0) {
            // Сортируем очередь для круглой формы
            queue.sort((a, b) => {
                const distA = Math.hypot(a[0] - startRow, a[1] - startCol);
                const distB = Math.hypot(b[0] - startRow, b[1] - startCol);
                return distA - distB;
            });
            
            const [r, c] = queue.shift();
            
            // Проверяем, что не у края
            if (r > 0 && r < rows-1 && c > 0 && c < cols-1) {
                waterCells.push([r, c]);
            }
            
            // Добавляем соседей
            const neighbors = getNeighbors(r, c);
            for (const [nr, nc] of neighbors) {
                const key = `${nr},${nc}`;
                if (!visited.has(key) && nr > 0 && nr < rows-1 && nc > 0 && nc < cols-1) {
                    const dist = Math.hypot(nr - startRow, nc - startCol);
                    const chance = 1 - (dist / (count / 2));
                    const rand = useSeed && currentSeed ? seededRandom(currentSeed, itemCounter++) : Math.random();
                    if (rand < chance) {
                        queue.push([nr, nc]);
                        visited.add(key);
                    }
                }
            }
        }
    }
    
    function generateSea(count) {
        const edgeCells = [];
        
        // Собираем все краевые клетки
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (isEdge(r, c)) {
                    edgeCells.push([r, c]);
                }
            }
        }
        
        // Перемешиваем
        edgeCells.sort(() => Math.random() - 0.5);
        
        // Начинаем с нескольких точек на краю
        const startPoints = edgeCells.slice(0, Math.min(3, edgeCells.length));
        const queue = [...startPoints];
        const visited = new Set(startPoints.map(p => `${p[0]},${p[1]}`));
        
        while (waterCells.length < count && queue.length > 0) {
            const [r, c] = queue.shift();
            waterCells.push([r, c]);
            
            const neighbors = getNeighbors(r, c);
            for (const [nr, nc] of neighbors) {
                const key = `${nr},${nc}`;
                if (!visited.has(key) && waterCells.length < count) {
                    const rand = useSeed && currentSeed ? seededRandom(currentSeed, itemCounter++) : Math.random();
                    if (rand < 0.7) {
                        queue.push([nr, nc]);
                        visited.add(key);
                    }
                }
            }
        }
    }
    
function generateRiver() {
    let riverCells = [];
    let maxLength = Math.floor(waterCellsMax * 0.9); // Река занимает ~80% водных клеток
    
    // Случайно выбираем тип реки (0 - от края до края, 1 - внутри)
    let rand;
    if (useSeed && currentSeed) {
        rand = seededRandom(currentSeed, itemCounter++);
    } else {
        rand = Math.random();
    }
    const riverType = Math.floor(rand * 2); // 0 или 1
    
    if (riverType === 0) {
        // Река от края до края
        if (useSeed && currentSeed) {
            rand = seededRandom(currentSeed, itemCounter++);
        } else {
            rand = Math.random();
        }
        const startEdge = Math.floor(rand * 4);
        let startRow, startCol, direction;
        
        switch(startEdge) {
            case 0: // верх
                startRow = 0;
                if (useSeed && currentSeed) {
                    rand = seededRandom(currentSeed, itemCounter++);
                } else {
                    rand = Math.random();
                }
                startCol = 1 + Math.floor(rand * (cols - 2));
                direction = [1, 0]; // вниз
                break;
            case 1: // право
                if (useSeed && currentSeed) {
                    rand = seededRandom(currentSeed, itemCounter++);
                } else {
                    rand = Math.random();
                }
                startRow = 1 + Math.floor(rand * (rows - 2));
                startCol = cols - 1;
                direction = [0, -1]; // влево
                break;
            case 2: // низ
                if (useSeed && currentSeed) {
                    rand = seededRandom(currentSeed, itemCounter++);
                } else {
                    rand = Math.random();
                }
                startRow = rows - 1;
                startCol = 1 + Math.floor(rand * (cols - 2));
                direction = [-1, 0]; // вверх
                break;
            case 3: // лево
                if (useSeed && currentSeed) {
                    rand = seededRandom(currentSeed, itemCounter++);
                } else {
                    rand = Math.random();
                }
                startRow = 1 + Math.floor(rand * (rows - 2));
                startCol = 0;
                direction = [0, 1]; // вправо
                break;
        }
        
        let currentRow = startRow;
        let currentCol = startCol;
        
        // Добавляем стартовую клетку
        riverCells.push([currentRow, currentCol]);
        maxLength -= riverCells.length;
        while (riverCells.length < maxLength) {
            // Двигаемся
            currentRow += direction[0];
            currentCol += direction[1];
            
            // Проверяем границы
            if (currentRow < 0 || currentRow >= rows || currentCol < 0 || currentCol >= cols) {
                break;
            }
            
            riverCells.push([currentRow, currentCol]);
            
            // Если дошли до другого края
            if (isEdge(currentRow, currentCol)) {
                break;
            }
            
            // Иногда меняем направление
            if (useSeed && currentSeed) {
                rand = seededRandom(currentSeed, itemCounter++);
            } else {
                rand = Math.random();
            }
            if (rand < 0.3) {
                if (useSeed && currentSeed) {
                    rand = seededRandom(currentSeed, itemCounter++);
                } else {
                    rand = Math.random();
                }
                if (rand < 0.5) {
                    direction = [direction[1], direction[0]];
                } else {
                    direction = [-direction[1], -direction[0]];
                }
            }
        }
    } else {
        // Река внутри карты (может касаться краев)
        if (useSeed && currentSeed) {
            rand = seededRandom(currentSeed, itemCounter++);
        } else {
            rand = Math.random();
        }
        
        // Начальная точка
        let startRow = Math.floor(rand * rows);
        if (useSeed && currentSeed) {
            rand = seededRandom(currentSeed, itemCounter++);
        } else {
            rand = Math.random();
        }
        let startCol = Math.floor(rand * cols);
        
        // Начальное направление
        let direction;
        if (useSeed && currentSeed) {
            rand = seededRandom(currentSeed, itemCounter++);
        } else {
            rand = Math.random();
        }
        const dirIndex = Math.floor(rand * 4);
        const directions = [[1,0], [-1,0], [0,1], [0,-1]];
        direction = directions[dirIndex];
        
        let currentRow = startRow;
        let currentCol = startCol;
        let length = 0;
        
        // Добавляем стартовую клетку
        riverCells.push([currentRow, currentCol]);
        length++;
        maxLength -= riverCells.length;
        while (length < maxLength) {
            // Двигаемся
            currentRow += direction[0];
            currentCol += direction[1];
            
            // Проверяем границы
            if (currentRow < 0 || currentRow >= rows || currentCol < 0 || currentCol >= cols) {
                break;
            }
            
            // Проверяем, не занята ли клетка
            if (!riverCells.some(([r,c]) => r === currentRow && c === currentCol)) {
                riverCells.push([currentRow, currentCol]);
                length++;
            }
            
            // Иногда меняем направление
            if (useSeed && currentSeed) {
                rand = seededRandom(currentSeed, itemCounter++);
            } else {
                rand = Math.random();
            }
            if (rand < 0.3) {
                if (useSeed && currentSeed) {
                    rand = seededRandom(currentSeed, itemCounter++);
                } else {
                    rand = Math.random();
                }
                if (rand < 0.4) {
                    direction = [direction[1], direction[0]];
                } else {
                    direction = [-direction[1], -direction[0]];
                }
            }
        }
    }
    
    // Добавляем реку в waterCells
    waterCells.push(...riverCells);
    return riverCells;
}
    
    /// Генерируем воду в зависимости от типа
if (typeWater != "none") {
    let totalWater = 0;
    let attempts = 0;
    const maxAttempts = 10;
    
    while (totalWater < waterCellsMax && attempts < maxAttempts) {
        switch(typeWater) {
            case "swamp":
                generateSwamp(waterCellsMax - totalWater);
                break;
            case "lake":
                generateLake(waterCellsMax - totalWater);
                break;
            case "sea":
                generateSea(waterCellsMax - totalWater);
                break;
            case "river":
                generateRiver();
                break;
        }
        
        totalWater = waterCells.length;
        attempts++;
    }
}

    for (let Row = 0; Row < rows; Row++) {
        mapHexs.push([]);
        for (let Col = 0; Col < cols; Col++) {
            const hex = document.createElement('div');
            hex.id = "hex"+Row+Col;
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
            let Land = "grass"
let Item = "void";

// Используем seededRandom если включен сид
let randomValue;
if (useSeed && currentSeed) {
    randomValue = seededRandom(currentSeed, itemCounter);
} else {
    randomValue = Math.random();
}
itemCounter++;

// Проверяем, является ли клетка водой из сгенерированного списка
const isWater = waterCells.some(([r, c]) => r === Row && c === Col);

if (isWater) {
    Land = "water";
    Item = "none";
    hex.className = 'hex water';
} else {
    hex.className = 'hex grass';
}

if(Item == "void"){
    if (useSeed && currentSeed) {
        randomValue = seededRandom(currentSeed, itemCounter);
    } else {
        randomValue = Math.random();
    }
    itemCounter++;
    
    if(Math.floor(randomValue * 39) == 0){
        Item = "tree";
        hex.classList.add("tree");
    }
}

if(Item == "void"){
    if (useSeed && currentSeed) {
        randomValue = seededRandom(currentSeed, itemCounter);
    } else {
        randomValue = Math.random();
    }
    itemCounter++;
    
    // Проверяем, есть ли рядом вода
    let hasWaterNearby = false;
    const neighbors = getNeighbors(Row, Col);
    for (const [nRow, nCol] of neighbors) {
        // Проверяем по waterCells или по временным переменным
        if (waterCells.some(([r,c]) => r === nRow && c === nCol)) {
            hasWaterNearby = true;
            break;
        }
    }
    const wheatSwamp = typeWater === "swamp" ? 10 : 3;
    // Если есть вода рядом - шанс 1/19, иначе 1/39
    const chance = hasWaterNearby ? wheatSwamp : 39;
    
    if(Math.floor(randomValue * chance) == 0){
        Item = "wheat";
        hex.classList.add("wheat");
    }
}
            container.appendChild(hex);
            mapHexs[Row].push(hexs.length);
            hexs.push({row: Row, col: Col, land: Land, item: Item, flag: "none", id: document.getElementById("hex"+Row+Col)});
        }
    }
function getStartPosition(offset, avoidHex = null, minDistance = 0) {
    // Собираем все доступные клетки (только трава)
    let availableHexes = hexs.filter(hex => hex.land == "grass");
    
    // Если есть клетка для избегания (игрок) и нужна минимальная дистанция
    if (avoidHex && minDistance > 0) {
        availableHexes = availableHexes.filter(hex => {
            const distance = Math.abs(hex.row - avoidHex.row) + Math.abs(hex.col - avoidHex.col);
            return distance >= minDistance;
        });
    }
    
    // Если нет травы - берем любые кроме воды
    if (availableHexes.length === 0) {
        availableHexes = hexs.filter(hex => hex.land != "water");
        if (avoidHex && minDistance > 0) {
            availableHexes = availableHexes.filter(hex => {
                const distance = Math.abs(hex.row - avoidHex.row) + Math.abs(hex.col - avoidHex.col);
                return distance >= minDistance;
            });
        }
    }
    
    const totalHexes = availableHexes.length;
    
    let randomIndex;
    if (useSeed && currentSeed) {
        const rand = seededRandom(currentSeed, itemCounter + offset);
        randomIndex = Math.floor(rand * totalHexes);
    } else {
        randomIndex = Math.floor(Math.random() * totalHexes);
    }
    
    return availableHexes[randomIndex];
}
    
// Игрок - используем offset 0
const startHex = getStartPosition(0);
itemCounter++;

// Вычисляем среднее арифметическое и минимальную дистанцию
const avgDistance = Math.floor((rows + cols) / 2) - 1;

// Враг - используем offset 1, избегаем игрока на расстоянии avgDistance
const enemyHex = getStartPosition(1, startHex, avgDistance);
itemCounter++;
    
    availableCells = [...availableCells, ...neighboringСells(startHex)];
    playerCells.push(startHex);
    playerLand(startHex);
    enemyLand(enemyHex);

    initMapControls();
}
function playerLand(hex){
    hex.id?.classList.remove("enemyGrass", "availableCell", "availableCellRed");
    hex.land = "player";
    hex.id?.classList.add("playrsGrass");
}
function enemyLand(hex){
    hex.land = "enemy";
    hex.id?.classList.add("enemyGrass");
}
function shop(bool){
    ID.shopWindow.hidden = !bool;
}
function nextStep(){
    availableCells = [];
    playerCells = [];
    enemyCells = [];
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
            let water = 0;
            const cells = neighboringСells(hex);
            for(const cell of cells){
                if(cell.land === "water"){
                    water = 125;
                    break;
                }
            }
            const Wheat = Math.floor(Math.random()*(140-water)) == 0? true : false;
            if(Wheat){
                hex.id.classList.add("wheat");
                hex.item = "wheat";
            }
        }
        if(hex.land == "player"){
            if(hex.item == "void"){
                flyAction(hex, "1", "coin") 
                finance(1);
            }
            playerCells.push(hex);
            availableCells = [...availableCells, ...neighboringСells(hex)];
        }
        if(hex.land == "enemy"){
            enemyCells.push(hex)
        }
        if(hex.item == "house"){
            finance(5);
            if(food > 2){
                foodChange(-2);
            }else {
                finance(-6);
            }
            energyPlus(3);
        }
        if(hex.flag == "new"){
            classFlag(hex, "old");
        } else if (hex.flag == "old"){
            classFlag(hex, "none");
        }
        hex.id.classList.remove("availableCell", "availableCellRed");
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
    } while (stepEnemy && stepEnemy.land == "enemy" || !stepEnemy || stepEnemy.land == "water");
    enemyLand(stepEnemy);
    raisingFlaf(stepEnemy, 0, "enemy");

    removeClassActionBtn();
    if(playerCells.length < 1){
        ID.gameEndText.textContent = "Поражение!"
        ID.gameEndText.style.color = "red";
        ID.step.disabled = true;
    }else if(enemyCells.length < 1){
        ID.gameEndText.textContent = "Победа!"
        ID.gameEndText.style.color = "green";
        ID.step.disabled = true;
    }
}
function removeClassActionBtn(){
    const actionBtns = [ID.actionFlag, ID.actionTree];
    actionBtns.forEach(btn => {
        btn.classList.remove("actionBtnTrue");
    })
    seizTerr = false;
    plTree = false;
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
    if(plTree && hex.item == "tree" && energy > 1){
        woodChange(5);
        energyChange(-2);
        classItem(hex, "void");
    }else if(plTree && hex.item == "treeChild"){
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
        } else if(plTree && hex.item != "treeChild" && money > 9 && energy > 1) {
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
} else if (seizTerr && hex.land == "enemy" && energy > 5){
    raisingFlaf(hex, -6, "player")
} else if (seizTerr && hex.land == "grass" && energy > 2){ 
    raisingFlaf(hex, -3, "player");
} 
if(energy <= 0){
    removeClassActionBtn()
}
}
function flyAction(hex, value, img){
    const id = "fly"+hex.row+hex.col;
    DOM.Create({Parent:"body", Id:id, Class:"flyCost"});
    DOM.Create({Parent:id, Tag:"img", Class:"flyCostIMG", Src:IMG[img].src});
    DOM.Create({Parent:id, Tag:"span", Class:"flyCostText", Text: value});
            const object =  hex.id.getBoundingClientRect();
            const objectX = object.left + Math.floor(object.width/2)-23;
            const objectY = object.top + Math.floor(object.height/2)-13;
            const dom = DOM.Id(id)
            dom.style.top = objectY+"px";
            dom.style.left = objectX+"px";
            animationOnce(dom, "fly");
            setTimeout(()=>dom.remove(), 1000);
}
function raisingFlaf(hex, en, who){
    if(who == "player"){
        energyChange(en);
    }
    const cells = neighboringСells(hex);
    for (const cell of cells) {
        if(who == "player" && (cell.land == "grass" || cell.land == "enemy")){
            cell.id.classList.add("availableCell");
        }
        if (cell.land == who) {
            if(who == "player"){
                playerLand(hex);
                classFlag(hex, "new");
            } else if(who == "enemy"){
                enemyLand(hex);
                classFlag(hex, "old");
            }
        }
    }
    if(who == "player"){
        playerCells.push(hex);
        flyAction(hex, en, "energy")
        if(energy < 6){
        playerCells.forEach(cell => {
            const cells2 = neighboringСells(cell);
            cells2.forEach(cell2 => {
                if(energy < 3 && cell2.land == "grass"){
                    cell2.id.classList.add("availableCellRed");
                } else if(energy < 6 && cell2.land == "enemy"){
                    cell2.id.classList.add("availableCellRed");
                }
            })
        })
        }
     }
}
function classFlag(hex, flag){
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
function plantTree(bool){
    plTree = bool;
    if(bool){
        seizureTerritory(false);
        ID.actionTree.classList.add("actionBtnTrue");
        playerCells.forEach(hex => {
            if(hex.item == "void"){
                hex.id.classList.add("availableTree");
            }
        })
    }else{
        ID.actionTree.classList.remove("actionBtnTrue");
        playerCells.forEach(hex => {
            hex.id.classList.remove("availableTree");
        })
    }
}
function seizureTerritory(bool) {
    seizTerr = bool;
    if(bool){
        plantTree(false);
    availableCells.forEach(hex => {
        let bool2 = false;
        const cells = neighboringСells(hex);
        for(const cell of cells){
            if(hex.land != "water" && cell.land == "player"){
                bool2 = true;
                break
            }
        }
        if(hex.land != "player" && bool2){
            hex.id.classList.add("availableCell");
        }
    })
    ID.actionFlag.classList.add("actionBtnTrue");
    }else {
        availableCells.forEach(hex => {
            hex.id.classList.remove("availableCell");
        })
        ID.actionFlag.classList.remove("actionBtnTrue");
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
function foodChange(f){
    food += f;
    ID.foodInfo.textContent = food;
}

// Функция инициализации управления картой
function initMapControls() {
    // Получаем DOM-элемент карты (убеждаемся что он уже создан)
    const map = ID.map;
    
    // Переменные для управления
    let scale = 0.6;
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    function getMapBounds() {
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    const mapWidth = map.scrollWidth * scale;
    const mapHeight = map.scrollHeight * scale;
    
    const margin = 0.3; // 20% от размера экрана
    
    return {
        minX: Math.min(0, containerWidth - mapWidth) - (containerWidth * margin),
        maxX: Math.max(0, containerWidth - mapWidth) + (containerWidth * margin),
        minY: Math.min(0, containerHeight - mapHeight) - (containerHeight * margin),
        maxY: Math.max(0, containerHeight - mapHeight) + (containerHeight * margin)
    };
}
    
    // Настройка CSS
    map.style.transformOrigin = '0 0';
    startTransform();
        // Центрируем карту при старте
    function startTransform() {
        // Получаем размеры контейнера и карты
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;
        const mapWidth = map.scrollWidth * scale;
        const mapHeight = map.scrollHeight * scale;
        
        // Вычисляем смещение для центрирования
        offsetX = (containerWidth - mapWidth) / 2;
        offsetY = (containerHeight - mapHeight) / 2;
        
        updateTransform();
    }
    // Функция применения трансформации
function updateTransform() {
    const bounds = getMapBounds();
    offsetX = Math.min(bounds.maxX, Math.max(bounds.minX, offsetX));
    offsetY = Math.min(bounds.maxY, Math.max(bounds.minY, offsetY));
    
    map.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
}
    
// Зум колесиком с приближением к курсору
    map.addEventListener('wheel', (e) => {
        e.preventDefault();
    
        // Координаты мыши относительно окна
        const mouseX = e.clientX;
        const mouseY = e.clientY;
    
        // Координаты мыши относительно карты ДО зуда
        const mouseMapX = (mouseX - offsetX) / scale;
        const mouseMapY = (mouseY - offsetY) / scale;
    
        // Новый масштаб
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        let newScale = scale * delta;
        newScale = Math.min(Math.max(0.3, newScale), 2);
    
        // Новые координаты мыши относительно карты ПОСЛЕ зума
        const newMouseMapX = (mouseX - offsetX) / newScale;
        const newMouseMapY = (mouseY - offsetY) / newScale;
    
        // Корректируем смещение, чтобы точка под мышкой осталась на месте
        offsetX += (newMouseMapX - mouseMapX) * newScale;
        offsetY += (newMouseMapY - mouseMapY) * newScale;
    
        scale = newScale;
        updateTransform();
    });
    
    // Начало перетаскивания
    map.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX - offsetX;
        startY = e.clientY - offsetY;
        map.style.cursor = 'grabbing';
    });
    
    // Движение мыши
document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    let newOffsetX = e.clientX - startX;
    let newOffsetY = e.clientY - startY;
    
    const bounds = getMapBounds();
    newOffsetX = Math.min(bounds.maxX, Math.max(bounds.minX, newOffsetX));
    newOffsetY = Math.min(bounds.maxY, Math.max(bounds.minY, newOffsetY));
    
    offsetX = newOffsetX;
    offsetY = newOffsetY;
    
    updateTransform();
});
    
    // Конец перетаскивания
    document.addEventListener('mouseup', () => {
        isDragging = false;
        map.style.cursor = 'grab';
    });
    
    // Двойной клик - сброс
    map.addEventListener('dblclick', () => {
        scale = 0.6;
        startTransform();
    });
}