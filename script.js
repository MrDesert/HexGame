let DOMContentLoaded = false;
let pausescreen = false;

function startGame() {
    if(sdkLoad && resurses && HTMLLoaded){
        changeLang(document.documentElement.lang);
        document.getElementById("preloaderID").hidden = "hidden";
        loadLocalStorage();
        const col = Math.ceil(window.innerWidth/ 100);
        const row = Math.ceil((window.innerHeight-50)/ 100);
        createHexGrid(row, col, 'map');
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
    container.style.position = 'relative';
    container.style.width = window.innerWidth + 'px';
    container.style.height = (rows * 100) + 'px';
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const hex = document.createElement('div');
            hex.className = 'hex grass';
            hex.dataset.row = row;
            hex.dataset.col = col;
            
            hex.style.position = 'absolute';
            hex.style.left = (col * 80) + 'px'; // 70px чтобы наезжали по горизонтали
            
            // Расчет вертикальной позиции
            let top = row * 90; // 75% высоты для вертикального нахлеста
            
            // Сдвигаем каждый второй столбец вниз
            if (col % 2 === 1) {
                top += 45;
            }
            
            hex.style.top = top + 'px';
            
            container.appendChild(hex);
        }
    }
}

// Создаем поле 10x10
