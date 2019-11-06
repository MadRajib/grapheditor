onload = function () {
    var s = Snap("#svg");
    let colr = "#f5f2d0"
    let nodes = []
    let shiftDown = false;
    let arrow = []

    // Function to deselect every element in graph is clicked on canvas
    s.click(function(e) {
        if(e.target.id == "svg") {
          nodes.forEach(element => {
              element.deselectIt()
              element.pushed = false;
          });
          arrow = []
        }
        
    });

    // function for dragging
    var move = function (dx, dy) {
        this.attr({
            transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
        });
    }
    var start = function () {
        this.data('origTransform', this.transform().local);
    }
    var stop = function () {
        // console.log('finished dragging');
    }

    // Create Entity Diagram
    function createEntity() {

        let that = this;
        this.selected = false;
        this.g = s.group();

        this.drawIt = function(){
            let shp = s.rect(100, 100, 100, 100),
                lbl = s.text(100+20,100+50)
            shp.attr({
                fill: colr,
                stroke: "#000",
                strokeWidth: 1,
            });
            lbl.attr({
                'font-size':20,
                text:""
            });

            this.g.append(shp);
            this.g.append(lbl);
            this.g.drag(move, start, stop);
            this.g.click(()=>{
                this.selectIt(true);
            });

            this.g.dblclick(()=>{
                let doc = prompt("Type Desired label", "entity");
                    if (doc != null){
                        lbl.attr({
                            text:doc,
                        });
                    }
            });

            // this.g.marker(0,0,20,200,100,100)
        }
        // this.pushed = false;
        this.selectIt = function(){
            this.selected = true;
            this.g.select("rect").attr({
                strokeWidth:5,
            })
            // if(shiftDown && !this.pushed){
            //     arrow.push(this.g)
            //     this.pushed = true;
            // }
            // console.log(arrow)            
            deselectAll(this.g.id);    
        }
        this.deselectIt = function(){
            // if(shiftDown) return
            this.selected = false;
            this.g.select("rect").attr({
                strokeWidth:1,
            })
        }
        this.killIt = function(){
            this.g.remove()
        }
    }

    // Create Process
    function createProcess() {

        let that = this;
        this.selected = false;
        this.g = s.group();
        
        this.drawIt = function(){
            let shp = s.circle(100, 100, 80, 80),
                lbl = s.text(100-30,100+10)
            shp.attr({
                fill: colr,
                stroke: "#000",
                strokeWidth: 1,
            });
            lbl.attr({
                'font-size':20,
                text:""
            });

            this.g.append(shp);
            this.g.append(lbl);
            this.g.drag(move, start, stop);
            this.g.click(()=>{
                this.selectIt(true);
            });

            this.g.dblclick(()=>{
                let doc = prompt("Type Desired label", "process");
                    if (doc != null){
                        lbl.attr({
                            text:doc,
                        });
                    }
            });
            
        }
        
        this.selectIt = function(){
            this.selected = true;
            this.g.select("circle").attr({
                strokeWidth:5,
            })            
            deselectAll(this.g.id);    
        }
        this.deselectIt = function(){
            if(shiftDown) return
            this.selected = false;
            this.g.select("circle").attr({
                strokeWidth:1,
            })
        }
        this.killIt = function(){
            this.g.remove()
        }
    }

    // Create Data Store
    function createDataStore() {

        let that = this;
        this.selected = false;
        this.g = s.group();
        this.drawIt = function(){
            let shp = s.rect(100, 100,180, 60),
            lbl = s.text(100+20,100+40)
            shp.attr({
                fill: colr,
                stroke: "#000",
                strokeWidth: 1,
                strokeDasharray: "180 60 240",
            });
            lbl.attr({
                'font-size':20,
                text:""
            });

            this.g.append(shp);
            this.g.append(lbl);
            this.g.drag(move, start, stop);
            this.g.click(()=>{
                this.selectIt(true);
            });

            this.g.dblclick(()=>{
                let doc = prompt("Type Desired label", "Data Store");
                    if (doc != null){
                        lbl.attr({
                            text:doc,
                        });
                    }
            });
            
        }
        this.selectIt = function(){
            this.selected = true;
            this.g.select("rect").attr({
                strokeWidth:5,
            })            
            deselectAll(this.g.id);    
        }
        this.deselectIt = function(){
            if(shiftDown) return
            this.selected = false;
            this.g.select("rect").attr({
                strokeWidth:1,
            })
        }
        this.killIt = function(){
            this.g.remove()
        }
    }

    $(document).keydown(function (e) {
        if (e.keyCode == 16) {
            // alert(e.which + " or Shift was pressed");
            shiftDown = true;
        }
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 16) {
            // alert(e.which + " or Shift was up");
            shiftDown = false;
            
        }
    });

    let rot = 45;
    $(document).keyup(function (e) {
        if (e.keyCode == 82 && arrow.length > 0) {

            var bbox = arrow[0].getBBox()
            arrow[0].attr({
                        transform: "r"+rot +"," +bbox.cx + "," +bbox.cy,
                    });
            rot+=45;
            rot%=360;
        }
    });

    // create Arrow
    function createArrow() {

        let that = this;
        this.selected = false;
        this.g = s.group();

        this.drawIt = function(){
            let Triangle = s.polyline("100,100 120,120 120,80");
            Triangle.attr({
                fill: "#000",
            });
            let head = s.group(Triangle),
                shp = s.line(100, 100,300, 100),
                lbl = s.text(100+20,100+40)
                
            head.attr({
                stroke:"#000",
                strokeWidth:1      
            });  
                    
            shp.attr({
                strokeWidth: 2,
                stroke:"#000",
            });
            lbl.attr({
                'font-size':20,
                text:""
            });

            this.g.append(head);
            this.g.append(shp);
            this.g.append(lbl);
            this.g.drag(move,start,stop);
            this.g.click(()=>{
                this.selectIt(true);
            });

            this.g.dblclick(()=>{
                let doc = prompt("Type Desired label", "Arrow");
                    if (doc != null){
                        lbl.attr({
                            text:doc,
                        });
                    }
            });
        }
        this.pushed = false;
        this.selectIt = function(){
            if(shiftDown && !this.pushed){
                arrow.push(this.g)
                this.pushed = true;
            }
            this.selected = true;
            this.g.select("line").attr({
                strokeWidth:5,
            })            
            deselectAll(this.g.id);    
        }
        this.deselectIt = function(){
            this.selected = false;
            this.g.select("line").attr({
                strokeWidth:1,
            })
        }
        this.killIt = function(){
            this.g.remove()
        }
    }

    function deselectAll(id){
        nodes.forEach(element => {
            if (element.g.id != id){
                element.deselectIt()
            }
        });
    }
    
    $("#addEntityBtn").click(function() {
        let e = new createEntity()
            e.drawIt()
        nodes.push(e)
    });

    $("#addProcessBtn").click(function() {
        let e = new createProcess()
            e.drawIt()
        nodes.push(e)
    });

    $("#addDataStoreBtn").click(function() {
        let e = new createDataStore()
            e.drawIt()
        nodes.push(e) 
    });

    $("#addArrowBtn").click(function() {
        // let arrow1 =createArrow("1st")
        // console.log(arrow[0].transform())
        let a = new createArrow()
            a.drawIt()
        
        nodes.push(a)
        // arrow1.drag(move, start, stop);
    });


    // Select the element in node that has selected flag as true and delete it!
    // By calling its killIt() function and removing it from the nodes array!
    $("#deleteBtn").click(function() {
        for(var i=0;i<nodes.length;i++){ 
            if( nodes[i].selected){
                nodes[i].killIt();
                nodes.splice(i, 1);
                break; 
            }
        }
    });

}
