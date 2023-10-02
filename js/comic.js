AFRAME.registerComponent("comic", {
  schema: {
    state: { type: "string", default: "comic-screen" },
    selectedCard: { type: "string", default: "#card1" },
  },
  init: function () {
    this.placesContainer = this.el;
    this.createCards()
    
  },

  tick: function () {
    const { state } = this.el.getAttribute("comic");

    if (state === "view") {
      this.hideEl([this.placesContainer]);
      this.showView();
    }
  },
  hideEl: function (elList) {
    elList.map(el => {
      el.setAttribute("visible", false);
    });
  },

  showView: function () {
    const { selectedCard } = this.data;

    const bannerEl = this.banner(selectedCard);

    const pageEl = this.page(selectedCard);

    const titleEl = this.title(selectedCard);

    const descEl = this.desc(selectedCard);

    const bgEl = document.querySelector("#fadeBackground");
    
    bgEl.appendChild(descEl)
    bgEl.appendChild(titleEl)
    bgEl.appendChild(pageEl)
    bgEl.appendChild(bannerEl)

    bgEl.setAttribute("visible",true)
  },

  banner:function(item){
    const entity = document.createElement("a-entity");

    console.log(item)

    entity.setAttribute("id",item)

    entity.setAttribute("position",{
      x:"0",
      y:"-1",
      z:"-1"
    })

    entity.setAttribute("geometry",{
      primitive : "plane",
      height : "15",
      width : "21",
    })

    entity.setAttribute("material",{
      color : "black",
    })

    return entity

  },
  page:function(item){
    const entity = document.createElement("a-entity");

    console.log(item);

    entity.setAttribute("geometry",{
      primitive : "plane",
      width : "18.9",
      height : "6"
    })

    entity.setAttribute("position",{
      x:"0",
      y:"2.85",
      z:"0"
    })

    entity.setAttribute("material",{
      src : `./assests/${item}tb.jpg`,
      opacity : "1"
    })

    return entity

  },

  title:function(item){
    var text = ""

    if(item == "hulk"){
      text = "World War Hulk"
    }
    else if(item == "ironman"){
      text = "Armour Wars"
    }
    else if(item == "spiderman"){
      text = "Superior Spiderman"
    }
    else if(item == "deadpool"){
      text = "Deadpool Kills the Marvel Universe"
    }

    const entity = document.createElement("a-entity")

    entity.setAttribute("position",{
      x:"0",
      y:"-1",
      z:"1"
    })

    entity.setAttribute("text",{
      value : text,
      color : "white",
      width : "15",
      align : "center",
    })

    return entity;

  },

  desc:function(item){
    var text = ""

    if(item == "hulk"){
      text = "Hulk being tricked into going to space by the Illuminati. He is exiled from Earth and crashes on Sakaar, where he leads a revolution against Sakaar's ruler. His shuttle explodes, killing his pregnant wife, and he and his Warbound army journey to Earth to seek revenge on the heroes who banished him."
    }
    else if(item == "ironman"){
      text = " Stark reached a surprising realization when he found out that his designs were being employed by his enemies — sold to them by Justin Hammer, Sam Rockwell’s Iron Man 2 character. Upset by this discovery, Stark worried that his technology would be used for evil and embarked on a crusade to make sure that no harm would be inflicted by his inventions."
    }
    else if(item == "spiderman"){
      text = "Peter Parker is killed off and replaced with his nemesis Otto Octavius, who swapped consciousnesses with Parker and left him to die in his decaying body to ensure his own survival. However, Octavius becomes inspired by Parker's dying wish to have a new Spider-Man protect New York City, and decides to take on the mantle himself, becoming the self-proclaimed 'Superior Spider-Man'."
    }
    else if(item == "deadpool"){
      text = "Deadpool’s mind is corrupted by Psycho-Man, who wants to create an efficient killer out of Wade. He succeeds, and Deadpool goes on a killing spree, eliminating Marvel superheroes and eventually breaking the ‘fourth wall,’ determining it is the only way to kill the Marvel Universe once and for all."
    }

    const entity = document.createElement("a-entity")

    entity.setAttribute("position",{
      x:"0",
      y:"-4",
      z:"1"
    })

    entity.setAttribute("text",{
      value : text,
      color : "white",
      width : "12",
      align : "center",
    })

    return entity;

  },
  

  createCards: function () {
    const thumbNailsRef = [
      {
        id: "hulk",
        title: "World War Hulk",
        url: "./assests/Hulk.jpg",
      },
      {
        id: "deadpool",
        title: "Deapool Kills the Marvel Universe",
        url: "./assests/Deadpool.jpg",
      },

      {
        id: "ironman",
        title: "Armour Wars",
        url: "./assests/Ironman.jpg",
      },
      {
        id: "spiderman",
        title: "The Superior Spiderman",
        url: "./assests/Spiderman.jpg",
      },
    ];
    let prevoiusXPosition = -75;

    for (var item of thumbNailsRef) {
      const posX = prevoiusXPosition + 30;
      const posY = 10;
      const posZ = -40;
      const position = { x: posX, y: posY, z: posZ };
      prevoiusXPosition = posX;

      const rectEl = this.rect(position,item.id , item);

      const borderEl = this.border(item,position);

      const textEl = this.text(item,position);
      
      
      rectEl.appendChild(textEl);
      this.placesContainer.appendChild(rectEl);
      this.placesContainer.appendChild(borderEl);

    }
  },
    rect:function(position , id , item){
    
      const entity = document.createElement("a-entity");
      entity.setAttribute("id",id);
      entity.setAttribute("visible",true);
      entity.setAttribute("geometry",{
        primitive : "plane",
        height : 28,
        width : 20,   
      });
      entity.setAttribute("position",position);
      entity.setAttribute("material",{
        src : item.url,

      })
      entity.setAttribute("cursor-listener", {});
      return entity;
    },
    border:function(item,position){
      const pos = position;
      pos.z = -40.1;
      const entity = document.createElement("a-entity");
      entity.setAttribute("visible",true);
      entity.setAttribute("position",pos);
      entity.setAttribute("geometry",{
        primitive : "plane",
        height : 30,
        width : 22   
      });
      entity.setAttribute("material",{
        color : 'white',
        opacity : 1,
      })    
      entity.setAttribute("cursor-listener", {});
      return entity;
    },
    text:function(item,position){
      const pos = position;
      pos.y = -25;
      const entity = document.createElement("a-entity");
      entity.setAttribute("visible",true);
      entity.setAttribute("position" , pos );
      entity.setAttribute("text",{
        value : item.title ,
        color : "black",
        width : 65,
        align : "center",
        font : "exo2bold",

      })
      return entity;
    },
    
  });
  