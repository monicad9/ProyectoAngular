import { Component, OnInit } from '@angular/core';
import { BusquedaService } from '../busqueda.service';
import { routerTransition } from '../router.animations';
/*import { ArtistPopularityPipe } from '../artist-popularity.pipe';*/
declare var $:any;

@Component({

	selector: 'app-artist',
	templateUrl: './artist.component.html',
	styleUrls: ['./artist.component.css'],
	animations: [routerTransition()],
	host: {'[@routerTransition]': ''},
})

export class ArtistComponent implements OnInit {
    sliderValue=0;
	private cont_input:string="";
	private resultado;
	private array_datos = [];
	private offset = 0;
    
	constructor(private search: BusquedaService ) { }

    ngOnInit() { 
        $(".pager").hide(); 
        $(".search").hide();
        $(".fail").hide();
        $("footer").css("position","fixed");
        
    }

    searchFor(){

        this.array_datos = []
        this.search.searchFor(this.cont_input,"artist")
        .subscribe( results => {
            this.resultado = results.json();
            this.array_datos.push(this.resultado.artists.items);
            console.log(this.array_datos[0].length)

            if (this.array_datos[0].length > 0) {

                    $(".pager").show(); 
                    $(".search").show();
                    $("footer").css("position","relative");
                    
            }

            else{

                $(".fail").show();
                $(".fail").delay(1500).fadeOut(); 
                $(".pager").hide();
                $("footer").css("position","fixed");
                  
            }
        });
    }

    next(){
        this.array_datos = []
        this.offset += 20;
        this.search.next_page(this.cont_input,"artist",this.offset)
        .subscribe( results => {
            this.resultado = results.json();
            this.array_datos.push(this.resultado.artists.items);  
        });

    }

    previous(){

        if (this.offset > 0){
            this.array_datos = []
            this.offset -= 20;
            this.search.previous_page(this.cont_input,"artist",this.offset)
            .subscribe( results => {
                this.resultado = results.json();
                this.array_datos.push(this.resultado.artists.items);  
                
            });
        }	    
    }

}


