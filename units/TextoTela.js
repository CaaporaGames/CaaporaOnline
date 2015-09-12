function TextoTela(opts){
    
    this.positionX = opts.x;
    this.positionY = opts.y;
    this.text = opts.text;
    this.size = opts.size;
    this.family = opts.family;
    this.color = opts.color;
    
    // Inclui o texto acima da barra de vida
    // Este texto será atualizado no Update do game loop
    var style = {font: "bold " + opts.size +"px " + this.family, fill: this.color, wordWrap: true, wordWrapWidth: 150, align: "center"};
    
    this.textCaapora = game.add.text(this.positionX, this.positionY, this.text, style);
    this.textCaapora.fixedToCamera = true;
    this.textCaapora.cameraOffset.setTo(this.positionX, this.positionY); 
    //this.itemSprite.anchor.set(0.5);
    
    this.destruir = function(){
        
        this.textCaapora.destroy();
        
    }
}