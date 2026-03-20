let DOMContentLoaded = false;
let pausescreen = false;

// Добавь в начало файла
let activeHexMenu = null;
let menuElement = null;

const hexs = [];
const mapHexs = [];
const actions = {
    wood: (hex, free = false) => {
        if(!free){
            changeCurrencies({Wood: 5, Energy: -2, Fly: hex});
        } else{
            changeCurrencies({Wood: 5, Fly: hex});
        }
        classItem(hex, "void");
    },
    waterTree: (hex) => {
        treeGrowth(hex, 3);
        changeCurrencies({Coin: -5, Energy: -1, Fly: hex});
    },
    harvest: (hex, free = false) => {
        if(!free){
            changeCurrencies({Energy: -1, Food: 3, Fly: hex});
        } else{
            changeCurrencies({Food: 3, Fly: hex});
        }
        classItem(hex, "void");
    },
    mushrooms: (hex) => {
        changeCurrencies({Energy: -1, Food: 2, Fly: hex});
        classItem(hex, "tree");
    },
    fishing: (hex) => {
        const food = Math.ceil(Math.random()*5);
        changeCurrencies({Energy: -2, Food: food, Fly: hex});
    },
    rebuildHouse: (hex) => {
        changeCurrencies({Coin: -10, Energy: -2, EnMax: 3, Fly: hex});
        classItem(hex, "house");
    },
    demolishHouse: (hex) => {
        changeCurrencies({Coin: 10, Energy: -2, Fly: hex});
        classItem(hex, "void");
    },
    peasant: (hex) => {
        availableCells = [];
        const cells2 = getCellsInRadius(hex, 2);
        cells2.forEach(cell => {
            const bool = searchNeigborCell(cell, "land", "player");
            if(bool && cell.land === "grass" && (cell.item == "void" || cell.item == "wheat" || cell.item == "treeChild")){
                addAvailableCell(cell, "peasant", hex);
            }
        });
    },
    woodman: (hex) => {
        availableCells = [];
        const cells2 = getCellsInRadius(hex, 2);
        cells2.forEach(cell => {
            const bool = searchNeigborCell(cell, "land", "player");
            if(bool && cell.land === "grass" && (cell.item == "void" || cell.item == "wheat" || cell.item == "treeChild" || cell.item == "tree")){
                addAvailableCell(cell, "woodman", hex);
            }
        });
    },
    spearman: (hex) => {
        availableCells = [];
        const cells2 = getCellsInRadius(hex, 3);
        cells2.forEach(cell => {
            const bool = searchNeigborCell(cell, "land", "player");
            if(bool && cell.land != "water" && (cell.item == "void" || cell.item == "wheat" || cell.item == "treeChild")){
                addAvailableCell(cell, "spearman", hex);
            }
        });
    },
    horseman: (hex) => {
        availableCells = [];
        const cells2 = getCellsInRadius(hex, 4);
        cells2.forEach(cell => {
            const bool = searchNeigborCell(cell, "land", "player");
            if(bool && cell.land != "water" && (cell.item == "void" || cell.item == "wheat" || cell.item == "treeChild")){
                addAvailableCell(cell, "horseman", hex);
            }
        });
    },
    warrior: (hex) => {
        availableCells = [];
        const cells2 = getCellsInRadius(hex, 3);
        cells2.forEach(cell => {
            const bool = searchNeigborCell(cell, "land", "player");
            if(bool && cell.land != "water" && (cell.item == "void" || cell.item == "wheat" || cell.item == "treeChild")){
                addAvailableCell(cell, "warrior", hex);
            }
        });
    },
    king: (hex) => {
        availableCells = [];
        playerCells.forEach(cell => {
            availableCells = [...availableCells, ...neighboringСells(cell)];
        })
        seizureTerritory(true);
    }, 
};
const shopItem = {
    Wheat:{energy: 1, water: true},
    Fir:{energy: 2, coin: 10},
    House:{energy: 3, coin: 30, wood: 10},
    WaterWell:{energy: 2, coin: 15, wood: 5},
    Peasant:{energy: 1, coin: 10},
    Woodman:{energy: 1, coin: 10},
    Spearman:{energy: 2, coin: 40},
    Horseman:{energy: 4, coin: 100},
    Warrior:{energy: 6, coin: 200}
}
let enemyCells = [];
let playerCells = [];
let availableCells = [];
let currentSeed = Math.floor(Math.random() * 1000000);
let useSeed = false;
let itemCounter = 0;
let enemyMoney = 10;
let money = 10;
let wood = 0;
let food = 3;
let energy = 4;
let energyMax = 4;
let warriorStep;
let hexForBuy;

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
}       changeCurrencies({Coin: 0, Wood: 0, Energy: 0, Food: 0});
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
}
}

function seededRandom(seed, index) {
    const value = Math.sin(seed * 9999 + index) * 10000;
    return value - Math.floor(value);
}

function createHexGrid(rows, cols, containerId) {
    const container = ID.map;
    container.style.width = cols*81+19 + 'px';
    container.style.height = rows*89+55 + 'px';
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
    if(typeWater == "swamp"){
        hex.className = 'hex waterSwamp';
    }else if(typeWater == "sea"){
        hex.className = 'hex waterSea';
    }else if(typeWater == "lake"){
        hex.className = 'hex waterLake';
    }else{
        hex.className = 'hex water';
    }
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
hex.onclick = (e) => hexAction(Row, Col, e);
hex.ontouchstart = (e) => {
    e.preventDefault();
    hexAction(Row, Col, e);
};
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
    
    playerCells.push(startHex);
    playerLand(startHex);
    classItem(startHex, "king")
    startHex.itemHP = 1000;
    enemyLand(enemyHex);
    classItem(enemyHex, "king");
    enemyHex.itemHP = 1000;
    initMapControls();
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
function shop(bool, hex){
    ID.shopWindow.hidden = !bool;
    if(bool){
        for (let key in shopItem) {
            const item = shopItem[key];
            const iEnergy = item.energy ? item.energy : 0;
            const iCoin = item.coin ? item.coin : 0;
            const iWood = item.wood ? item.wood : 0;
            const iFood = item.food ? item.food : 0;
            let iWater = false;
            if(item.water){
                const find = searchNeigborCell(hex, "land", "water");
                const find2 = searchNeigborCell(hex, "item", "waterWell");
                if(!find && !find2){
                    iWater = true
                }
            }
            if(energy >= iEnergy && money >= iCoin && wood >= iWood && food >= iFood && !iWater){
                ID["buy"+key+"Btn"].disabled = false;
                ID["buy"+key].classList.remove("buyItemDisable");
            }else{
                ID["buy"+key+"Btn"].disabled = true;
                ID["buy"+key].classList.add("buyItemDisable");
            }
        }
    }
}
function nextStep(){
    availableCells = [];
    playerCells = [];
    enemyCells = [];
    energyPlus(4);
    function death(hex){
        if(hex.item === "warrior" || hex.item == "peasant" || hex.item == "woodman" || hex.item == "spearman" || hex.item == "horseman"){
            classItem(hex, "cross");
        }
    }
    hexs.forEach(hex => {
            console.log(money)
        if(hex.item == "warrior" && hex.land == "player"){
            if((food - 3) < 0){
                death(hex);
            }else{
                changeCurrencies({Coin: -10, Food: -3});
                hex.warriorStep = 1;
                hex.id.classList.add("jump");
            }
        }else if(hex.item == "spearman" && hex.land == "player"){
            if((food - 2) < 0){
                death(hex);
            }else{
                changeCurrencies({Coin: -5, Food: -2});
                hex.warriorStep = 1;
                hex.id.classList.add("jump");
            }
        }else if(hex.item == "horseman" && hex.land == "player"){
            if((food - 3) < 0){
                death(hex);
            }else{
                changeCurrencies({Coin: -8, Food: -3});
                hex.warriorStep = 1;
                hex.id.classList.add("jump");
            }
        }else if(hex.item == "peasant" && hex.land == "player"){
            if((food - 1) < 0){
                death(hex);
            }else{
                changeCurrencies({Coin: -2, Food: -1});
                hex.warriorStep = 1;
                hex.id.classList.add("jump");
            }
        }else if(hex.item == "woodman" && hex.land == "player"){
            if((food - 1) < 0){
                death(hex);
            }else{
                changeCurrencies({Coin: -4, Food: -1});
                hex.warriorStep = 1;
                hex.id.classList.add("jump");
            }
        }else if(hex.item == "cross"){
            const random = Math.floor(Math.random()*6)
            if(random == 0){
                classItem(hex, "treeChild");
            } else if(random < 3){
                classItem(hex, "wheat");
            }
        }else if(hex.item == "tree"){
            newTreeChild(hex, 25)
            if(Math.floor(Math.random()*10) == 0){
                classItem(hex, "treeMushrooms");
            }
        } else if(hex.item == "treeMushrooms"){
            const cells = neighboringСells(hex);
            cells.forEach(cell =>{
                if(cell.item == "tree" && Math.floor(Math.random()*3) == 0){
                    classItem(cell, "treeMushrooms");
                }
            })
        }else if(hex.item == "treeChild"){treeGrowth(hex, 30)
        }else if(hex.item == "wheatSeed" && Math.floor(Math.random()*2) == 0){
                classItem(hex, "wheat");
        }else if(hex.item == "void" || hex.item == "wheat"){
            if(Math.floor(Math.random()*2) == 0){
                newTreeChild(hex, 1500);
            }
        }else if(hex.item == "void"){
            let water = 0;
            const cells = neighboringСells(hex);
            for(const cell of cells){
                if(cell.land === "water"){water = 125; break}
            }
            if(Math.floor(Math.random()*(140-water)) == 0){
                hex.id.classList.add("wheat");
                hex.item = "wheat";
            }
        }else if(hex.item == "house"){
            if(food < 2){
                classItem(hex, "houseOld")
                changeCurrencies({EnMax: -3});
                energyPlus(0);
            }else{
                changeCurrencies({Coin: 5, Energy: 3, Food: -2, Fly: hex});
            }
        }
        if(hex.land == "player"){
            if(hex.item == "void"){
                changeCurrencies({Coin: 1, Fly: hex});
            } else if(hex.item == "king"){
                hex.id.classList.add("jump");
                changeCurrencies({Coin: 3, Fly: hex});
            }
            playerCells.push(hex);
        }else if(hex.land == "enemy"){
            if(hex.item == "void"){
                enemyMoney += 1;
            } else if(hex.item == "king"){
                enemyMoney += 3;
            }
            enemyCells.push(hex)
        }
        if(hex.flag == "new"){classFlag(hex, "old")} 
        else if (hex.flag == "old"){classFlag(hex, "none")}
        hex.id.classList.remove("availableCell");
    })
    if(enemyCells.length > 0){
        let enemyBuy;
        const enemyVoid = [];
        if(enemyMoney > 10 && Math.floor(Math.random()*10) == 0){
            enemyCells.forEach(cell => {
                if(cell.item == "void"){
                    enemyVoid.push(cell);
                }
            })
            if(enemyVoid.length > 0){
                enemyBuy = enemyVoid[Math.floor(Math.random()*enemyVoid.length)];
                classItem(enemyBuy, "peasant")
                enemyMoney -= 10;
            }
        }
    if(!enemyBuy){    
    let cells;
    let next = false; 
    do {
        cells = neighboringСells(enemyCells[Math.floor(Math.random()*enemyCells.length)]);
        cells.forEach(cell =>{
            if(cell.land == "player" || cell.land == "grass"){next = true};
        })
    } while (!next);
    let stepEnemy;
    do {stepEnemy = cells[Math.floor(Math.random()*cells.length)];
    } while (stepEnemy && stepEnemy.land == "enemy" || !stepEnemy || stepEnemy.land == "water");
    enemyLand(stepEnemy);
    raisingFlaf(stepEnemy, 0, "enemy");
    }
    }
    if(playerCells.length < 1){windowGameEnd("Поражение!", "red")}
    else if(enemyCells.length < 1){windowGameEnd("Победа!", "green")}
}
function windowGameEnd(text, color){
    ID.gameEndText.textContent = text;
    ID.gameEndText.style.color = color;
    ID.step.disabled = true;
}
function energyPlus(value){
    if (energy < energyMax){
        if (energyMax - energy < value){
            energy = energyMax;
        } else {
            energy += value;
        }
    }
    changeCurrencies({Energy: 0});
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
        hex.id.classList.remove("tree", "treeChild", "treeMushrooms", "wheat", "wheatSeed", "house", "houseOld", "waterWell", "void", "warrior", "peasant", "woodman", "spearman", "horseman", "king", "cross");
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
function searchNeigborCell(hex, type, filter){
    const cells = neighboringСells(hex);
    if(type == "land"){
        for(const cell of cells){
            if(cell.land == filter){
                return true;
            }
        }
    } else if(type == "item"){
        for(const cell of cells){
            if(cell.item == filter){
                return true;
            }
        }
    }
}
function getCellsInRadius(centerHex, radius, filterType = null) {
    const result = [];
    const visited = new Set();
    const queue = [{hex: centerHex, dist: 0}];
    
    while (queue.length > 0) {
        const {hex, dist} = queue.shift();
        const key = `${hex.row},${hex.col}`;
        
        if (visited.has(key)) continue;
        visited.add(key);
        
        // Добавляем все клетки кроме центральной (dist > 0)
        if (dist > 0 && dist <= radius) {
            // Применяем фильтр если нужен
            if (!filterType || hex.land === filterType || hex.item === filterType) {
                result.push(hex);
            }
        }
        
        if (dist < radius) {
            const neighbors = neighboringСells(hex);
            for (const neighbor of neighbors) {
                if (!visited.has(`${neighbor.row},${neighbor.col}`)) {
                    queue.push({hex: neighbor, dist: dist + 1});
                }
            }
        }
    }
    return result;
}
function showHexMenu(hex, event) {
    if(menuElement){close(); return}; // Удаляем старое меню по клику на другой hex

    // Создаем контейнер меню
    menuElement = document.createElement('div');
    menuElement.className = 'hex-menu';
    
    // Получаем координаты мыши
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    document.body.appendChild(menuElement); // Сначала добавляем в DOM чтобы измерить размер
    
    const items = []; // Наполняем пунктами в зависимости от типа клетки
            
    if (hex.land == "player") {
        if ((hex.item == "king") && energy >= 3) {
            items.push({ text: "Захватить территорию", action: () =>  actions["king"](hex)});
        }
        if ((hex.item == "tree" || hex.item == "treeMushrooms") && energy >= 2) {
            items.push({ text: "🌳 Срубить (5 дерева, 2 энергии)", action: () =>  actions["wood"](hex)});
        }
        if (hex.item == "treeChild" && energy >= 1 && money >= 5) {
            items.push({ text: "🌱 Полить (5 монет, 1 энергии)", action: () => actions["waterTree"](hex)});
        }
        if (hex.item == "wheatSeed" && energy >= 1 && money >= 2) {
            items.push({ text: "🌱 Полить (2 монет, 1 энергии)", action: () => actions["waterWheat"](hex)});
        }
        if ((hex.item == "void" || hex.item == "treeChild" || hex.item == "wheat") && energy >= 1) {
            items.push({ text: "Установить...", action: () => shop(true, hex) });
            hexForBuy = hex;
        }
        if (hex.item == "wheat" && energy >= 1) {
            items.push({ text: "🌾 Собрать (+3 еда)", action: () => actions["harvest"](hex)});
        }
        if (hex.item == "treeMushrooms" && energy >= 1) {
            items.push({ text: "🌾 Собрать (+2 еда)", action: () => actions["mushrooms"](hex)});
        }
        if (hex.item == "houseOld" && energy >= 2 && money >= 10){
            items.push({ text: "Восстановить (-10 монет, 2 энергии)", action: () => actions["rebuildHouse"](hex)});
        }
        if (hex.item == "houseOld" && energy >= 2){
            items.push({ text: "Снести (+10 монет, 2 энергии)", action: () => actions["demolishHouse"](hex)});
        }
        if (hex.item == "peasant" && hex.warriorStep > 0){
            items.push({ text: "Ход", action: () => actions["peasant"](hex)});
        }
        if (hex.item == "woodman" && hex.warriorStep > 0){
            items.push({ text: "Ход", action: () => actions["woodman"](hex)});
        }
        if (hex.item == "spearman" && hex.warriorStep > 0){
            items.push({ text: "Ход", action: () => actions["spearman"](hex)});
        }
        if (hex.item == "horseman" && hex.warriorStep > 0){
            items.push({ text: "Ход", action: () => actions["horseman"](hex)});
        }
        if (hex.item == "warrior" && hex.warriorStep > 0){
            items.push({ text: "Ход", action: () => actions["warrior"](hex)});
        }
    } else if(hex.land == "water"){
        const bool = searchNeigborCell(hex, "land", "player")
        if(bool){
            items.push({ text: "Рыбалка -2 энергии (+1-5 еды)", action: () => actions["fishing"](hex)});
        }
    }
    
    // if (hex.land == "grass" && energy >= 3) {
    //     const find = searchNeigborCell(hex, "land", "player")
    //     if(find) items.push({ text: "⚔️ Захватить", action: () => raisingFlaf(hex, -3, "player")});
    // }
    
    if (items.length === 0) {close(); return} // Если нет действий - не показываем меню
    
    // Создаем пункты меню
    items.forEach(item => {
        const btn = document.createElement('button');
        btn.textContent = item.text;
        btn.onclick = () => {

            item.action();
            close()
        };
        menuElement.appendChild(btn);
    });
    
    // Кнопка закрытия
    const closeBtn = document.createElement('button');
    closeBtn.textContent = "❌ Закрыть";
    closeBtn.onclick = () => {close()};
    menuElement.appendChild(closeBtn);
    
    // Измеряем размер меню
    const menuWidth = menuElement.offsetWidth;
    const menuHeight = menuElement.offsetHeight;
    
    const spaceRight = window.innerWidth - mouseX; // Проверяем поместится ли справа
    const spaceLeft = mouseX;
    const spaceBottom = window.innerHeight - mouseY; // Проверяем поместится ли снизу
    const spaceTop = mouseY;
    
    let left;
    if (spaceRight >= menuWidth || spaceRight >= spaceLeft) { // Определяем позицию по горизонтали
        left = mouseX; // Ставим справа
    } else {
        left = mouseX - menuWidth; // Ставим слева
    }
    
    let top;
    if (spaceBottom >= menuHeight || spaceBottom >= spaceTop) { // Определяем позицию по вертикали
        top = mouseY; // Ставим снизу
    } else {
        top = mouseY - menuHeight; // Ставим сверху
    }
    
    // Применяем позицию
    menuElement.style.top = top + 'px';
    menuElement.style.left = left + 'px';
    menuElement.style.position = 'fixed'; // fixed вместо absolute

    function close(){
        menuElement.remove();
        menuElement = null;
    }
}

function hexAction(row, col, event) {
    const hex = hexs[mapHexs[row][col]];
    if(hex.available){
        if(hex.available === "flag"){
            raisingFlaf(hex, -3, "player");
            hex.id.classList.remove("jump");
        }else{
            if(hex.availableType === "warrior"){
                classItem(hex, "warrior");
            } else if (hex.availableType === "peasant"){
                if(hex.item === "wheat"){
                    actions["harvest"](hex, true);
                }
                classItem(hex, "peasant");
            } else if (hex.availableType === "woodman"){
                if(hex.item === "wheat"){
                    actions["tree"](hex, true);
                }
                classItem(hex, "woodman");
            } else if (hex.availableType === "spearman"){
                if(hex.item == "void" || hex.item == "wheat" || hex.item == "treeChild"){
                    classItem(hex, "spearman");
                }else if (hex.item == "king"){
                    flyAction(hex, 100, "coin", "green");
                }
            } else if (hex.availableType === "horseman"){
                classItem(hex, "horseman");
            }
            playerLand(hex);
            myLog(hex.row + ":" + hex.col)
            myLog(hex.available.row + ":" + hex.available.col)
            classItem(hex.available, "void")
            hex.available.warriorStep -= 1;
        }
        availableCells.forEach(cell => {
            cell.id.classList.remove("availableCell");
            cell.available = null;
        })
        hex.id.classList.remove("jump");
    } else {
    showHexMenu(hex, event);
}
}
function buyItem(item){
    myLog(item);
    shop(false);
    if(item == "house" && hexForBuy.land == "player"){
        changeCurrencies({Coin: -30, Wood: -10, Energy: -3, EnMax: 3, Fly: hexForBuy})
        classFlag(hexForBuy, "none");
        classItem(hexForBuy, "house")
    }
    if(item == "tree" && hexForBuy.land == "player"){
        changeCurrencies({Coin: -10, Energy: -2, Fly: hexForBuy});
        classItem(hexForBuy, "treeChild")
    }
    if(item == "wheat" && hexForBuy.land == "player"){
        changeCurrencies({Energy: -1, Fly: hexForBuy})
        classItem(hexForBuy, "wheatSeed")
    }
    if(item == "waterWell" && hexForBuy.land == "player"){
        changeCurrencies({Coin: -15, Wood: -5, Energy: -2, Fly: hexForBuy});
        classItem(hexForBuy, "waterWell")
    }
    if(item == "peasant" && hexForBuy.land == "player"){
        changeCurrencies({Coin: -10, Energy: -1, Fly: hexForBuy});
        classItem(hexForBuy, "peasant");
        classFlag(hexForBuy, "none");
        hexForBuy.warriorStep = 1;
    }
    if(item == "woodman" && hexForBuy.land == "player"){
        changeCurrencies({Coin: -10, Energy: -1, Fly: hexForBuy});
        classItem(hexForBuy, "woodman");
        classFlag(hexForBuy, "none");
        hexForBuy.warriorStep = 1;
    }
    if(item == "spearman" && hexForBuy.land == "player"){
        changeCurrencies({Coin: -40, Energy: -2, Fly: hexForBuy});
        classItem(hexForBuy, "spearman");
        classFlag(hexForBuy, "none");
        hexForBuy.warriorStep = 1;
    }
    if(item === "horseman" && hexForBuy.land == "player"){
        changeCurrencies({Coin: -100, Energy: -4, Fly: hexForBuy});
        classItem(hexForBuy, "horseman");
        classFlag(hexForBuy, "none");
        hexForBuy.warriorStep = 1;
    }
    if(item == "warrior" && hexForBuy.land == "player"){
        changeCurrencies({Coin: -200, Energy: -6, Fly: hexForBuy});
        classItem(hexForBuy, "warrior");
        classFlag(hexForBuy, "none");
        hexForBuy.warriorStep = 1;
    }
} 
function raisingFlaf(hex, en, who){
    if(who == "player"){
        changeCurrencies({Energy: en, Fly: hex});
        playerCells.push(hex);
        availableCells.forEach(cell => {
            cell.id.classList.remove("availableCell")
        })
    }else if(who == "enemy"){
        enemyCells.push(hex);
     }
    const cells = neighboringСells(hex);
    for (const cell of cells) {
        // if(who == "player" && (cell.land == "grass" || cell.land == "enemy")){
        //     cell.id.classList.add("availableCell");
        // }
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
function addAvailableCell(hex, type, hexMan){
    hex.available = hexMan;
    hex.availableType = type;
    availableCells.push(hex);
    hex.id.classList.add("availableCell");
}
function seizureTerritory(bool) {
    if(bool){
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
            hex.available = "flag"
        }
    })
    }else {
        availableCells.forEach(hex => {
            hex.id.classList.remove("availableCell");
        })
    }
}
function changeCurrencies({Coin = 0, Wood = 0, Energy = 0, EnMax = 0, Food = 0, Fly = null}){
    money += Coin;
    wood += Wood;
    energy += Energy;
    energyMax += EnMax;
    food += Food;
    ID.moneyInfo.textContent = money;
    ID.woodInfo.textContent = wood;
    ID.energyInfo.textContent = energy+"/"+energyMax;
    ID.foodInfo.textContent = food;
    if(Fly){
        const currencies = [[Coin, "coin"], [Wood, "firewood"], [Energy, "energy"], [Food, "food"]];
        currencies.forEach(cur => {
            if(cur[0] != 0){
                const color = cur[0] > 0 ? "green" : "red";
                flyAction(Fly, cur[0], cur[1], color);
            }
        })
    }
    if(energy < 3){
        availableCells.forEach(cell => {
            cell.id.classList.remove("availableCell");
        })
    }
}
function flyAction(hex, value, img, color){
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
            dom.style.color = color
            animationOnce(dom, "fly");
            setTimeout(()=>dom.remove(), 1000);
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
    });
    
    // Двойной клик - сброс
    map.addEventListener('dblclick', () => {
        scale = 0.6;
        startTransform();
    });
}