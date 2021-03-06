(function(window) {

var Gag = function(cat, x, y, dir) {
    this.initialize(cat, x, y, dir);
}
var p = Gag.prototype = new Container();

Gag.count = 0;
Gag.img = null;

Gag.initialize = function() {
    Gag.img = Game.resMan.get("catgag");
    Gag.gfx = new Bitmap(Gag.img);
}
    
    p.escaped = false;
    p.dir = 0;
    p.cat = null;

    p.base_initialize = p.initialize;
    p.initialize = function(cat, x, y, dir) {
        p.base_initialize();
        
        this.id = Gag.count;
        Gag.count++;
        
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.cat = cat;
        
        this.gfx = Gag.gfx.clone();
        this.addChild(this.gfx);
        
        cat.getStage().addChild(this);
    }
    
    p.tick = function() {
        if (!this.escaped && !this.rect().collidesWith(this.cat.rect())) {
            this.escaped = true;
            window.Log("(" + this.id + ") " + this.x + "," + this.y + " escaped");
        }
        
        this.x += Math.cos(this.dir * Math.PI / 180.0) * 2;
        this.y += Math.sin(this.dir * Math.PI / 180.0) * 2;
    }
    
    p.rect = function() {
        return new Rectangle(this.x, this.y, Gag.img.width, Gag.img.height);
    }

window.Gag = Gag;
}(window))
