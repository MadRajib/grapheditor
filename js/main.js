onload = function () {
    var s = Snap("#svg");
    

    // var entity1 = createEntity(s,"1st")


    var move = function (dx, dy) {
        this.attr({
            transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
        });
    }

    var start = function () {
        this.data('origTransform', this.transform().local);
    }
    var stop = function () {
        console.log('finished dragging');
    }

   

    // Create Entity Diagram
    function createEntity(label) {
        let entity = s.rect(100, 100, 100, 100),
            entitylable = s.text(100+20,100+50)
        
        entity.attr({
            fill: "#bada55",
            stroke: "#000",
            strokeWidth: 5,
        });
        entitylable.attr({
            'font-size':20,
            text:"Entity"
        });
    
        return s.g(entity,entitylable)
        
    }
    // Create Process Shape
    function createProcess(lable){
        let process = s.circle(100, 100, 80, 80),
            processlable = s.text(100-30,100+10)
        
        process.attr({
            fill: "#bada55",
            stroke: "#000",
            strokeWidth: 5,
        });
        processlable.attr({
            'font-size':20,
            text:"Process"
        });
    
        return s.g(process,processlable)

    }
    // Create Data Store
    function createDataStore(lable){
        let shp = s.rect(100, 100,180, 60),
            lb = s.text(100+20,100+40)
        
        shp.attr({
            fill: "#bada55",
            strokeWidth: 5,
            stroke:"#000",
            strokeDasharray: "180 60 240",
        });
        lb.attr({
            'font-size':20,
            text:"Data Store"
        });
    
        return s.g(shp,lb)

    }

    function createArrow(lable){
        let rhl = s.circle(100-20,100,10,10)
        let shp = s.line(100+10, 100,300, 100)
        var Triangle = s.polyline("100,100 120,120 120,80");
        Triangle.attr({
          fill: "#000",
          
        });  

        rhl.attr({
            visibility:"hidden",
        });
        
        shp.attr({
            strokeWidth: 5,
            stroke:"#000",
        });
        g =  s.g(shp,Triangle,rhl);
        g.click(function () {
           let e =  g.select("circle")
           console.log(e)
           e.attr({
                
                visibility:"visible",
            })
         });        
    
        return g

    }


    
    $("#addEntityBtn").click(function() {
        let entity1 = createEntity("1st")
        entity1.drag(move, start, stop);
    });

    $("#addProcessBtn").click(function() {
        let proces1 = createProcess("1st")
        proces1.drag(move, start, stop);
    });

    $("#addDataStoreBtn").click(function() {
        let dataStore1 = createDataStore("1st")
        dataStore1.drag(move, start, stop);
        
    });

    $("#addArrowBtn").click(function() {
        let arrow1 =createArrow("1st")
        arrow1.drag(move, start, stop);
        
        
    });

}

// class Shape{
//     constructor(){

//     }
// }

// Shape.prototype.move = function(){
//     this.attr
// }
