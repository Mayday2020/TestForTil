document.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed ");

    const controlPanel = document.querySelector(".controlPanel");
    const container = document.querySelector(".container");
    const canvasItem = document.querySelector('#c_canvas')

    // canvas inputs
    const canvasWidth_input = controlPanel.querySelector("#canvasWidth"),
        canvasHeight_input = controlPanel.querySelector("#canvasHeight"),
        canvasIndentation_input = controlPanel.querySelector("#canvasIndentation");
    // column inputs
    const columnAmount = controlPanel.querySelector("#columnAmount"),
        columnWidth = controlPanel.querySelector("#columnWidth"),
        columnIndentation = controlPanel.querySelector("#columnIndentation");
    // row inputs
    const stringHeight = controlPanel.querySelector("#stringHeight"),
        moduleHeight = controlPanel.querySelector("#moduleHeight");

// clear input
    document.querySelectorAll('input').forEach((input)=>{
        input.addEventListener('focus', (e)=>{
            if(e.target.value == 0){
                e.target.value = null;
            }
        })
    })

    // start value
    let containerPadding = 0;
    let canvasWidth = 100;
    let canvasHeight = 100;

    const renderWidth = (width) => {
        container.style.width = width + 'px';
        canvasItem.style.width = width + 'px';
    }
    const renderHeight = (height) => {
        container.style.height = height + 'px';
        canvasItem.style.height = height + 'px';
    }
    const renderPadding = (padding) => {
        container.style.padding = padding + 'px';
    }
    const toReady = () => {
        canvasWidth_input.value = canvasWidth;
        renderWidth(canvasWidth);
        canvasHeight_input.value = canvasHeight;
        renderHeight(canvasHeight);
        canvasIndentation_input.value = containerPadding;
    }
    toReady();

    // canvas control
    canvasWidth_input.addEventListener("input", (e)=>{
        if (e.target.value > 1000) {
            canvasWidth_input.value = '1000';
        } else if (e.target.value < 1 || e.target.value[0] == 0) {
            canvasWidth_input.value = 0;
        }
        renderWidth(canvasWidth_input.value);
        canvasPaint.setSettings();
        canvasPaint.drawGrid();
    })
    canvasHeight_input.addEventListener("input", (e)=>{
        if(e.target.value > 750) {
            canvasHeight_input.value = '750'
        } else if (e.target.value < 1 || e.target.value[0] == 0) {
            canvasHeight_input.value = 0;
        }
        renderHeight(canvasHeight_input.value)
        canvasPaint.setSettings();
        canvasPaint.drawGrid();
    })
    canvasIndentation_input.addEventListener("input", (e)=>{
        console.log('canvasIndentation')
        if (e.target.value > 50){
            canvasIndentation_input.value = '50'
        } else if (e.target.value < 0 || e.target.value[0] == 0 || e.target.value === '') {
            canvasIndentation_input.value = 0;
        }
        console.dir(canvasIndentation_input)
        renderPadding(canvasIndentation_input.value)
    })

    const canvasPaint = {
        canvasWidth: canvasWidth_input.value,
        canvasHeight: canvasHeight_input.value,
        cellsNumberX: 15,
        cellsNumberY: 15,
        color: "#0124ff",
        setSettings(){
            canvasItem.width = this.canvasWidth;
            canvasItem.height = this.canvasHeight;
            ctx = canvasItem.getContext("2d");
            ctx.strokeStyle = this.color;
            lineX = canvasItem.width / this.cellsNumberX;
            lineY = canvasItem.height / this.cellsNumberY;
        },
        drawGrid(){
            let buf = 0;
            for (let i = 0; i <= this.cellsNumberX; i++){
                ctx.beginPath();
                ctx.moveTo(buf, 0);
                ctx.lineTo(buf, canvasItem.height);
                ctx.stroke();
                buf += lineX;
            }
            buf = 0;
            for (let j = 0; j <=this.cellsNumberY; j++){
                ctx.beginPath();
                ctx.moveTo(0, buf);
                ctx.lineTo(canvasItem.width, buf)
                ctx.stroke();
                buf += lineY;
            }
        }
    }
    canvasPaint.setSettings();
    canvasPaint.drawGrid();
    /*let context = canvasItem.getContext("2d");

    for (let x = 0.5; x < 400; x += 10) {
        context.moveTo(x, 0);
        context.lineTo(x, 400);
    }

    for (let y = 0.5; y < 400; y += 10) {
        context.moveTo(0, y);
        context.lineTo(400, y);
    }

    context.strokeStyle = "#000";
    context.stroke();*/



























});