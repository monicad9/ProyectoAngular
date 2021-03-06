import { Component, OnInit } from '@angular/core';
import { BusquedaService } from '../busqueda.service';
import { routerTransition } from '../router.animations';
declare var $:any;

@Component({
	selector: 'app-song',
	templateUrl: './song.component.html',
	styleUrls: ['./song.component.css'],
	animations: [routerTransition()],
 	host: {'[@routerTransition]': ''}
})
export class SongComponent implements OnInit {

	private cont_input:string="";
	private resultado;
	private array_datos = [];
	private idSong = "";
	private offset = 0;

	constructor(private search: BusquedaService) { }

	ngOnInit() {
        $(".pager").hide(); 
        $(".search").hide();
        $(".fail").hide();
        $("footer").css("position","fixed");

	}

	searchFor(){
		this.array_datos = []
  		this.search.searchFor(this.cont_input,"track")
  			       .subscribe( results => {
  			   	    	this.resultado = results.json();
            			this.array_datos.push(this.resultado.tracks.items);
			            
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
  		this.search.next_page(this.cont_input,"track",this.offset)
  			       .subscribe( results => {
  			   	    	this.resultado = results.json();
  			   	    	this.array_datos.push(this.resultado.tracks.items);
			   		});
		    
  	}

  	previous(){
		
		if (this.offset > 0){
			this.array_datos = []
			this.offset -= 20;
  			this.search.previous_page(this.cont_input,"track",this.offset)
  			       .subscribe( results => {
  			   	    	this.resultado = results.json();
  			   	    	this.array_datos.push(this.resultado.tracks.items);
	
  			   		});
  		}	    
  	}

	play( $event ) {
	    let id = $event.currentTarget.className;
	    let music = $('#' + id)[0];

	    if ( music.paused ) {
	      music.play();
	    } 

	    else {
	      music.pause();
	    }
  	}
}
  


