    var FogoFactory = function() {
        this.createFogo = function (options) {


           // this.fogo;
            this.tileSize = options.tileSize;
            this.xt = options.xt;
            this.yt = options.yt;
            this.isoGroup = options.isoGroup;
            this.tileName = options.tileName;

            this.fogo = new Fogo({
                isoGroup: this.isoGroup,
                tileName: this.tileName,
                tileSize : this.tileSize,
                xt : this.xt,
                yt : this.yt


            });

            return this.fogo.incendio;

        };
    };
