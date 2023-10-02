AFRAME.registerComponent("cursor-listener", {
    schema: {
      selectedItemId: { default: "", type: "string" },
    },
    init: function () {
      this.handleMouseEnterEvents();
      this.handleMouseLeaveEvents();
    },

    update: function(){
      const fadeBackgroundEl = document.querySelector("#fadeBackground");

      c = fadeBackgroundEl.children;
      console.log(c);
      console.log(c.length);

      if(c.length > 0){
        var i ;
        for(i=0;i>=c.length ;i++){
          fadeBackgroundEl.removeChild(c[i])
        }
      }
      else{
        this.handleClickEvents();
      }

    },
    
    handleClickEvents: function() {
      this.el.addEventListener("click", evt => {
        const placesContainer = document.querySelector("#places-container");
        const { state } = placesContainer.getAttribute("comic");
  
        if (state === "comic-screen") {
          const id = this.el.getAttribute("id");
          const placesId = [
            "hulk",
            "ironman",
            "deadpool",
            "spiderman"
          ];
          if (placesId.includes(id)) {
            placesContainer.setAttribute("comic", {
              state: "view",
              selectedCard: id
            });
          }
        }
  
        
      });
    },

    handlePlacesListState: function () {
        const id = this.el.getAttribute("id");
        console.log(id);
        const placesId = ["hulk", "deadpool", "ironman", "spiderman"];
        if (placesId.includes(id)) {
          const placeContainer = document.querySelector("#places-container");
          placeContainer.setAttribute("cursor-listener", {
            selectedItemId: id,
          });
          this.el.setAttribute("material", {
            color : "grey",
            opacity: 1,
          });
        }
      },
    handleMouseEnterEvents: function () {
      this.el.addEventListener("mouseenter", () => {
        this.handlePlacesListState();
      });
    },
    handleMouseLeaveEvents: function () {
      this.el.addEventListener("mouseleave", () => {
        const {selectedItemId} = this.data;
        if(selectedItemId){
          const el = document.querySelector(`#${selectedItemId}`);
          const id = el.getAttribute("id");
          if(selectedItemId == id){
            el.setAttribute("material", {
                color : "white",
                opacity : 1,
            });
          }
        }   
      });
      
    },
  });