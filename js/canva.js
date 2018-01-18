//Функция создает двумерный массив и заполняет его ноликами.
function masZero() {
    var n = ObjLife.rowsCount,
        m = ObjLife.columnCount;
    for (var i = 0; i < n; i++) {
        ObjLife.masLife[i] = [];
        for (var j = 0; j < m; j++) {
            ObjLife.masLife[i][j] = 0;
        }
    }
}



// Прорисовка текущего цикла жизни.
function installCage() {
    var columnCount = ObjLife.columnCount,
        rowsCount = ObjLife.rowsCount,
        SHIFT = 10;

    ObjLife.context.strokeStyle = "#000";
    ObjLife.context.clearRect(0, 0, ObjLife.width, ObjLife.height);
    for (var i = 0; i < ObjLife.rowsCount; i++) {
        for (var j = 0; j < ObjLife.columnCount; j++) {
            if (ObjLife.masLife[i][j] == 1) {
                ObjLife.context.fillRect(j * 10, i * 10, 10, 10);
            }
        }
    }

    //Прорисовка сетки.
    ObjLife.context.strokeStyle = "hsla(0, 100%, 70%, 0.3)";
    for (var n = 0; n < columnCount; n++) {
        ObjLife.context.moveTo(n * SHIFT, 0);
        ObjLife.context.lineTo(n * SHIFT, rowsCount * SHIFT);
        ObjLife.context.stroke();
    }
    for (n = 0; n < rowsCount; n++) {
        ObjLife.context.moveTo(0, n * SHIFT);
        ObjLife.context.lineTo(columnCount * SHIFT, n * SHIFT);
        ObjLife.context.stroke();
    }
}

//Функция вычисляет координаты точки, по которой нажал пользователь и вселяет туда жизнь, в эту клетку.
function addLife(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    x = Math.floor(x / 10);
    y = Math.floor(y / 10);
    ObjLife.masLife[y][x] = 1;
    installCage();
}
//При нажатии на поле для рисования, вызывается функция добавления жизни в эту клетку.
ObjLife.cell__field.addEventListener("click", addLife);
