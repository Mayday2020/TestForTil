document.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed ");

    const controlPanel = document.querySelector(".controlPanel");
    const container = document.querySelector(".container");
    const canvasItem = document.querySelector('#c_canvas')
    const canvasString = document.querySelector('#c_canvasString')

    const canvasWidth_input = controlPanel.querySelector("#canvasWidth"),
        canvasHeight_input = controlPanel.querySelector("#canvasHeight"),
        canvasIndentation_input = controlPanel.querySelector("#canvasIndentation");
    const columnAmount_input = controlPanel.querySelector("#columnAmount"),
        columnWidth_input = controlPanel.querySelector("#columnWidth"),
        columnIndentation_input = controlPanel.querySelector("#columnIndentation");
    const stringHeight_input = controlPanel.querySelector("#stringHeight"),
        moduleHeight_input = controlPanel.querySelector("#moduleHeight");

// clear input
    document.querySelectorAll('input').forEach((input)=>{
        input.addEventListener('focus', (e)=>{
            if(e.target.value == 0){
                e.target.value = null;
            }
        });
        input.addEventListener('blur', (e)=>{
            if(e.target.value === ''){
                e.target.value = 0;
            }
        })
    })
    class AppData {
        constructor() {
            this.c_Width = 1800;         // ширина полотна
            this.c_Height = 720;        // высота полотна
            this.cont_Padding = 15;     // отступ у полотна
            this.p_columnAmount = 8;        // кол-во колонок
            this.p_columnWidth = 20;         // ширина колонок
            this.p_columnIdentation = 5;    // отступы колонок
            this.p_stringHeight = 0;    // высота строк
            this.p_moduleHeight = 0;    // кол-во строк в модуле

        }
        drawTheGrid(){
            if(document.querySelector('.gridElement')){
                document.querySelectorAll('.gridElement').forEach((el)=>{
                    el.remove();
                });
            }
            for(let i = 0; i < this.p_columnAmount; i++){
                let div = document.createElement('div');
                div.className = 'gridElement';
                div.style.width = this.p_columnWidth + 'px';
                div.style.margin = `0 ${this.p_columnIdentation / 2}px`
                canvasItem.append(div);
            }
            if(document.querySelector('.c_canvasStringItem')){
                document.querySelectorAll('.c_canvasStringItem').forEach((el)=>{
                    el.remove();
                });
            }
            if(this.p_stringHeight > 0){
                let stringInterval = Math.round(this.c_Height / this.p_stringHeight)
                for (let j = 0; j < stringInterval; j++){
                    let hiddenDiv = document.createElement('div');
                    hiddenDiv.className = 'c_canvasStringItem';
                    hiddenDiv.style.width = this.c_Width + 'px';
                    hiddenDiv.style.height = this.p_stringHeight + 'px';
                    canvasString.append(hiddenDiv);
                }
                if (this.p_moduleHeight > 0){
                    let array = document.querySelectorAll('.c_canvasStringItem');
                    let counter = +this.p_moduleHeight + 1
                    for (let i = 0; i <= array.length; i++){
                        if( i !== 0 && i % counter === 0){
                            array[i - 1].style.opacity = '0.2';
                        }
                    }
                }
            }
        }
        getStarted(){
            canvasWidth_input.value = this.c_Width;
            canvasHeight_input.value = this.c_Height;
            canvasIndentation_input.value = this.cont_Padding;
            columnAmount_input.value = this.p_columnAmount;
            columnWidth_input.value = this.p_columnWidth;
            columnIndentation_input.value = this.p_columnIdentation;
            stringHeight_input.value = this.p_stringHeight;
            moduleHeight_input.value = this.p_moduleHeight;

            this.renderWidth(this.c_Width);
            this.renderHeight(this.c_Height)
            this.renderPadding(this.cont_Padding)
        }
        canvasWidthHandler(e){
            let totalValue = (this.p_columnWidth * this.p_columnAmount) + (this.p_columnIdentation * this.p_columnAmount);
            if(e.target.value < totalValue){
                alert("Недостаточно места на холсте, для заданных параметров необходимо увеличить ширину холста или уменьшить ширину/количество колонок/отступов.")
                canvasWidth_input.value = this.c_Width
                return
            }
            if (e.target.value > 1800) {
                canvasWidth_input.value = '1800';
            } else if (e.target.value < 1 || e.target.value[0] == 0) {
                canvasWidth_input.value = null;
            }
            this.c_Width = canvasWidth_input.value
            this.renderWidth(this.c_Width);
        }
        canvasHeightHandler(e){
            if(e.target.value > 720) {
                canvasHeight_input.value = '720'
            } else if (e.target.value < 1 || e.target.value[0] == 0) {
                canvasHeight_input.value = null;
            }
            this.c_Height = canvasHeight_input.value
            this.renderHeight(this.c_Height)
        }
        containerPaddingHandler(e){
            if (e.target.value > 50){
                canvasIndentation_input.value = '50'
            } else if (e.target.value < 0 || e.target.value[0] == 0 || e.target.value === '') {
                canvasIndentation_input.value = null;
            }
            this.cont_Padding = canvasIndentation_input.value
            this.renderPadding(this.cont_Padding)
        }
        columnAmountHandler(e){
            if (e.target.value > this.c_Width / 2){
                columnAmount_input.value = this.c_Width / 2
            } else if (e.target.value < 0 || e.target.value[0] == 0 || e.target.value === ''){
                columnAmount_input.value = null;
            }
            this.p_columnAmount = columnAmount_input.value;
            this.drawTheGrid();
        }
        columnWidthHandler(e){
            if(e.target.value > 200/*this.c_Width / this.p_columnAmount*/ ){
                columnWidth_input.value = this.c_Width / this.p_columnAmount
            } else if(e.target.value < 0 || e.target.value[0] == 0 || e.target.value === ''){
                columnWidth_input.value = null
            }
            this.p_columnWidth = columnWidth_input.value;

            this.drawTheGrid()
        }
        columnIndentHandler(e){
            if(e.target.value > 150){
                columnIndentation_input.value = '150'
            } else if (e.target.value < 0 || e.target.value[0] == 0 || e.target.value === ''){
                columnIndentation_input.value = null
            }
            this.p_columnIdentation = columnIndentation_input.value;
            this.drawTheGrid()
        }
        stringHeightHandler(e){
            if(e.target.value > this.c_Height){
                stringHeight_input.value = this.c_Height
            } else if (e.target.value < 0 || e.target.value[0] == 0 || e.target.value === ''){
                stringHeight_input.value = null
            }
            this.p_stringHeight = stringHeight_input.value;
            this.drawTheGrid()
        }
        moduleHeightHandler(e){
            let horizonLine = document.querySelectorAll('.c_canvasStringItem');
            if(e.target.value > horizonLine.length){
                moduleHeight_input.value = horizonLine.length;
            } else if (e.target.value < 0 || e.target.value[0] == 0 || e.target.value === ''){
                moduleHeight_input.value = null
            }
            this.p_moduleHeight = moduleHeight_input.value;
            this.drawTheGrid()
        }
        eventListeners(){
            canvasWidth_input.addEventListener("input", (event)=>{this.canvasWidthHandler(event)})
            canvasHeight_input.addEventListener("input", (event)=>{this.canvasHeightHandler(event)})
            canvasIndentation_input.addEventListener("input", (event)=>{this.containerPaddingHandler(event)})
            columnAmount_input.addEventListener('input', (event)=>{this.columnAmountHandler(event)})
            columnWidth_input.addEventListener('input', (event)=>{this.columnWidthHandler(event)})
            columnIndentation_input.addEventListener('input', (event)=>{this.columnIndentHandler(event)})
            stringHeight_input.addEventListener('input', (event)=>{this.stringHeightHandler(event)})
            moduleHeight_input.addEventListener('input', (event)=>{this.moduleHeightHandler(event)})
            this.getStarted()
        }
        renderWidth(width){
            canvasItem.style.width = width + 'px';
            container.style.width = width + 'px';
            this.drawTheGrid()
        }
        renderHeight(height){
            canvasItem.style.height = height + 'px';
            this.drawTheGrid()
        }
        renderPadding(padding){
            if(padding == 0){
                container.style.padding = '0';
            } else {
                container.style.padding = padding + 'px';
            }
            this.drawTheGrid();
        }
    }
    const appData = new AppData();
    appData.eventListeners()

});
