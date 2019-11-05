onload = function () {
    var s = Snap("#svg");
    let nodes = [];

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

    var clickCallback = function(event) {
        let shp = this.select("rect");
        if (shp == null){
            shp = this.select("circle");
        }
        shp.attr({ 
            strokeWidth: 5,
         });
        delselectAll(this.id);
    };   

    // Create Entity Diagram
    function createEntity() {
        let shp = s.rect(100, 100, 100, 100),
            lbl = s.text(100+20,100+50)
        
        shp.attr({
            fill: "#f5f2d0",
            stroke: "#000",
            strokeWidth: 1,
        });
        lbl.attr({
            'font-size':20,
            text:""
        });

        g = s.g(shp,lbl)


        g.dblclick(()=>{
            console.log("dbl")
            let doc = prompt("Type Desired label", 
                "Entity");
                if (doc != null){
                    lbl.attr({
                        text:doc,
                    });
                }       
        });

        g.click(clickCallback);
        
        return g
        
    }



    // Create Process Shape
    function createProcess(){
        let process = s.circle(100, 100, 80, 80),
            processlable = s.text(100-30,100+10)
        
        process.attr({
            fill: "#f5f2d0",
            stroke: "#000",
            strokeWidth: 1,
        });
        processlable.attr({
            'font-size':20,
            text:""
        });
        g = s.g(process,processlable)

        g.dblclick(()=>{
            console.log("dbl")
            let doc = prompt("Type Desired label", 
                "process");
                if (doc != null){
                    processlable.attr({
                        text:doc,
                    });
                }
                });
        g.click(clickCallback);
        return g
                
        }
    // Create Data Store
    function createDataStore(){
        let shp = s.rect(100, 100,180, 60),
            lb = s.text(100+20,100+40)
        
        shp.attr({
            fill: "#f5f2d0",
            strokeWidth: 1,
            stroke:"#000",
            strokeDasharray: "180 60 240",
        });
        lb.attr({
            'font-size':20,
            text:""
        });
        g = s.g(shp,lb)

        g.dblclick(()=>{
            console.log("dbl")
            let doc = prompt("Type Desired label", 
                "datastore");
                if (doc != null){
                    lb.attr({
                        text:doc,
                    });
                }
                });
                g.click(clickCallback)
        return g

    }

    function createArrow(){

        
        // let arw = s.polyline("100,100 120,120 120,80 102,100 300,100 ");

        let body = s.line(100+10, 100,300, 100)
        let head = s.polyline("100,100 120,120 120,80");
        let label= s.text(100+60,100-10)
        arw = s.g(body,head,label)
        let lcrl = s.circle(100,100,5,5),
            rcrl = s.circle(300,100,5,5)
        

        

        head.attr({
        //   fill: "#000",
          stroke:"#000",
          strokeWidth:4
          
        });  
        
        body.attr({
            strokeWidth: 5,
            stroke:"#000",
        });
        label.attr({
            'font-size':20,
            text:""
        });

        

        
        mv = function (dx, dy) {
            this.attr({
                transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
            });
            lcrl.attr({
                transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
            });
            rcrl.attr({
                transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
            });
        }

        
        arw.drag(mv, start, stop);
        


        rcrl.drag(function(dx,dy){
            console.log("draging")
            rcrl.attr({cx:+x+dx,cy:+y+dy});
            body.attr({x2:+x+dx,y2:+y+dy});
        },function(){
            console.log("started")
            x = body.attr("x2");
            y = body.attr("y2");
        },function(){});

        lcrl.drag(function(dx,dy){
            lcrl.attr({cx:+x+dx,cy:+y+dy});
            arw.attr({x:+x+dx,x:+y+dy});
        },function(){
            
            console.log("started")
            x = body.attr("x1");
            y = body.attr("y1");
        },function(){});

        // g =  s.g(shp,lntxt);       
        //  g.dblclick(()=>{
        //     console.log("dbl")
        //     let doc = prompt("Type Desired label", 
        //         "arrow");
        //         if (doc != null){
        //             lntxt.attr({
        //                 text:doc,
        //             });
        //         }
        //         });
    
        return null

    }


    function delselectAll(id){

        nodes.forEach(node => {
            if (node.id != id){
                console.log(node.id)
                let shp = node.select("rect");
                if (shp == null){
                    shp = node.select("circle");
                }
                shp.attr({
                    strokeWidth: 1,
                });   
            }
        });
    }

    $("#addEntityBtn").click(function() {
        let e = createEntity()
        e.drag(move, start, stop);
        nodes.push(e);
    });

    $("#addProcessBtn").click(function() {
        let p = createProcess()
        p.drag(move, start, stop);
        nodes.push(p);
    });

    $("#addDataStoreBtn").click(function() {
        let ds = createDataStore()
        ds.drag(move, start, stop);
        nodes.push(ds);
    });

    $("#addArrowBtn").click(function() {
        let arrow1 =createArrow()
        // arrow1.drag(move, start, stop);
        
    });

}

