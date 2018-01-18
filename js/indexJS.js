//Сам объект "Жизнь"
var ObjLife = {
    masLife: [],
    timeShift: 1000,
    timerID: 0,
    isStarted: false,
    cell__field: document.getElementById("cell__field"),
    context: cell__field.getContext("2d"),
    rowsCount: 0,
    columnCount: 0,
    width: 0,
    height: 0
}

//Функция создает массив из клеток и если пользователь нажал на какую-то из них, то вызывается функция "installCage()", которая и прорисовывает в данной клетке жизнь. Таким образом создается один цикл жизни.  
function LifeCycle() {
    var mass = [];
    for (var i = 0; i < ObjLife.rowsCount; i++) {
        mass[i] = [];
        for (var j = 0; j < ObjLife.columnCount; j++) {
            if (LifeOrDeath(j, i)) {
                mass[i][j] = 1;
            } else {
                mass[i][j] = 0;
            }
        }
    }

    ObjLife.masLife = mass;
    installCage();
}

//Функция проверяет наличие соседей у клетки, а также количество соседей у клетки. В зависимости от количества соседей, потом прорисовываются новые и новые цикли жизни. Аргументами являются Х и У - это координаты границ поля для рисования.
function LifeOrDeath(x, y) {
    var count = 0,
        answ = false,
        maxRow = ObjLife.rowsCount - 1,
        maxColumn = ObjLife.columnCount - 1;
    //проверка верхних соседей
    if (y > 0) {
        if (ObjLife.masLife[y - 1][x] === 1) {
            count++;
        }
        if (x > 0) {
            if (ObjLife.masLife[y - 1][x - 1] === 1) {
                count++;
            }

        }
        if (x < maxColumn) {
            if (ObjLife.masLife[y - 1][x + 1] === 1) {
                count++;
            }
        }
    }
    //проверка нижних соседей
    if (y < maxRow) {
        if (ObjLife.masLife[y + 1][x] === 1) {
            count++;
        }
        if (x > 0) {
            if (ObjLife.masLife[y + 1][x - 1] === 1) {
                count++;
            }

        }
        if (x < maxColumn) {
            if (ObjLife.masLife[y + 1][x + 1] === 1) {
                count++;
            }
        }
    }

    if (x > 0) {
        if (ObjLife.masLife[y][x - 1] === 1) {
            count++;
        }

    }
    if (x < maxColumn) {
        if (ObjLife.masLife[y][x + 1] === 1) {
            count++;
        }
    }
    //проверка на кол-во соседей
    if (ObjLife.masLife[y][x] === 0) {
        if (count == 3) {
            answ = true;
        }
    } else {
        if (count == 2 || count == 3) {
            answ = true;
        }
    }
    return answ;
}
//Запуск одной итерации игры. Вызывается функция создания и прорисовки одного цикла жизни.
document.getElementsByClassName("menu-list__item")[0].addEventListener("click", function () {
    LifeCycle();
});

//Запускает и останавливает игру.
document.getElementsByClassName("menu-list__item")[1].addEventListener("click", function (event) {
    if (ObjLife.isStarted == false) {
        startLife();
        ObjLife.isStarted = true;
        event.target.innerHTML = "Стоп";
    } else {
        ObjLife.isStarted = false;
        event.target.innerHTML = "Старт";
        clearInterval(ObjLife.timerID);

    }
    document.getElementById("cell__field").removeEventListener("click", addLife);
});



//Эта функция позволяет регулировать скорость создания новых циклов жизни.
function startLife() {
    ObjLife.timeShift = document.getElementById("inpRange").value;
    console.log(ObjLife.timeShift);
    ObjLife.timerID = setInterval(LifeCycle, ObjLife.timeShift);
}

// Очистка поля и данных для игры.
document.getElementsByClassName("menu-list__item")[2].addEventListener("click", function (event) {
    masZero();
    ObjLife.context.clearRect(0, 0, ObjLife.width, ObjLife.height);
    ObjLife.cell__field.addEventListener("click", addLife);


});

// Эта функция считывает размер экрана и меняет размер поля для рисования.
function resizeCanva() {
    var w = 0,
        h = 0,
        HEADERSIZE = 100,
        UNITS = "px",
        squareSize = 0; //длина одной стороны квадрата
    //считывание размера экрана
    w = window.innerWidth;
    h = window.innerHeight;

    console.log(w, h);

    h -= HEADERSIZE;
    console.log(w, h);
    if (w < h) {
        squareSize = w - w % 10;
    } else {
        squareSize = h - h % 10;
    }

    ObjLife.cell__field.width = squareSize;
    ObjLife.cell__field.height = squareSize;

    ObjLife.rowsCount = squareSize / 10;
    ObjLife.columnCount = squareSize / 10;

    ObjLife.width = squareSize;
    ObjLife.height = squareSize;

}
