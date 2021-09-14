//for trigo -- base by  https://www.toutjavascript.com/livre/script.php?url=trigo -- 

const data_ = JSON.parse("{{data_trig|escapejs}}")
const result_2= String(data_["entry_1"])

console.log(result_2)

const myCanvas=document.getElementById("myCanvas");
const container=myCanvas.parentElement;
const PI=Math.PI;
let angle = result_2;
const animationID=0;
const valeurs=["0", "PI/6", "PI/4", "PI/3", "PI/2", "2*PI/3", "3*PI/4", "PI", "5*PI/4"];

/* Cr�ation des boutons de valeurs particuli�res */
const PIs=document.getElementById("PIs");
for (let i=0; i<valeurs.length; i++) {
  const btn=document.createElement("div");
  btn.setAttribute("onclick", "angle="+eval(valeurs[i])+"; displayTrigo("+eval(valeurs[i])+")");
  btn.setAttribute("id","angle"+i);
  PIs.appendChild(btn);
}



/* D�tection du mouvement de souris sur le canvas */
myCanvas.addEventListener("mousemove", function(evt) {
  /* On redessine le canvas avec les informations de position de souris */
  displayTrigo(angle);
  TJScanvas.ctx.beginPath()
  TJScanvas.ctx.fillStyle="#A30015";
  TJScanvas.ctx.arc(evt.offsetX, evt.offsetY, 8, 0, 2*PI );
  TJScanvas.ctx.fill();
  /* Conversion des coordonn�es de souris en pixels dans le r�f�rentiel */
  var x=(evt.offsetX-TJScanvas.deltaX)/TJScanvas.echelle;
  x=x.toFixed(3);
  var y=(evt.offsetY-TJScanvas.deltaY)/TJScanvas.echelle;
  y=y.toFixed(3);
  TJScanvas.ctx.fillText("("+x+","+y+")", evt.offsetX-90, evt.offsetY-15);
  TJScanvas.ctx.strokeStyle="#A30015";  
  TJScanvas.drawLine(0,0,x,y);
  
  /* Calcul de l'angle avec arctangeante */
  if (x>0) {
    angle=-1*Math.atan(y/x);
  } else {
    angle=PI-1*Math.atan(y/x);
  }
});


/* TJScanvas est l'objet permettant d'afficher le canvas */
var TJScanvas={
  width: 0,
  height: 0,
  padding: 0, 
  deltaX:0,
  deltaY:0,
  echelle:0,
  ctx:null,
  clearCanvas: function() {
	this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  },
  drawLine: function(x1, y1, x2, y2) {
    this.ctx.beginPath();  
    this.ctx.moveTo(x1*this.echelle+this.deltaX, y1*this.echelle+this.deltaY);
    this.ctx.lineTo(x2*this.echelle+this.deltaX, y2*this.echelle+this.deltaY);
    this.ctx.stroke();  
  },
  drawCircle: function(x, y, r, a1=0, a2=2*PI) {
    this.ctx.beginPath();  
	this.ctx.arc( x*this.echelle+this.deltaX, y*this.echelle+this.deltaY, r*this.echelle, a1, a2);
    this.ctx.stroke();  
  },
  fillCircle: function(x, y, r, a1=0, a2=2*PI) {
    this.ctx.beginPath();  
	this.ctx.arc( x*this.echelle+this.deltaX, y*this.echelle+this.deltaY, r*this.echelle, a1, a2);
    this.ctx.fill();  
  },
  text: function(txt, x, y, dX=0, dY=0) {
	this.ctx.fillText(txt, x*this.echelle+this.deltaX+dX, y*this.echelle+this.deltaY+dY);
  }
};



/* Fonction principale d'affichage du cercle trigonom�trique */
function displayTrigo(angle) {
  /* Forcer la taille du canvas avec la taille du div container */
  TJScanvas.width=container.getBoundingClientRect().width;
  TJScanvas.height=container.getBoundingClientRect().height;
  /* Optimisation de la hauteur de canvas */
  TJScanvas.height=Math.min(TJScanvas.width,500);  

  container.style.height=TJScanvas.height+"px";
  myCanvas.setAttribute("width", TJScanvas.width);
  myCanvas.setAttribute("height", TJScanvas.height);
  
  /* Effacer le canvas avant de le redessiner enti�rement */
  TJScanvas.ctx=myCanvas.getContext("2d");
  TJScanvas.clearCanvas();
  
  /* Correspondance ref�rentiel interne et taille du canvas */
  /* position (0,0) au centre du  */ 
  TJScanvas.padding=25; /* Bordures libres en px */
  TJScanvas.deltaX=TJScanvas.width/2;  /* translationX du point (0,0) */
  TJScanvas.deltaY=TJScanvas.height/2; /* translationY du point (0,0) */
  TJScanvas.echelle=(TJScanvas.height-2*TJScanvas.padding)/2 / 1.1;  
  
  /* trac� du r�f�rentiel */
  TJScanvas.drawLine(-1.1,0,1.1,0);
  TJScanvas.drawLine(0,-1.1,0,1.1);
  TJScanvas.drawCircle(0,0,1);
  TJScanvas.ctx.fillStyle="rgb(0,0,0)";
  TJScanvas.ctx.font="15px roboto"
  TJScanvas.text("0", 1, 0, 5, 20);
  TJScanvas.text("π", -1, 0, -20, 20);
  TJScanvas.text("π/2", 0, -1, 5, -5);
  TJScanvas.text("3π/2", 0, 1, 5, 17);
  
  /* Trac� des informations de trigonom�trie */
  angleTrigo=angle;
  angle=-1*angle;
  var x=Math.cos(angle), y=Math.sin(angle);
  TJScanvas.fillCircle(x, y, 5/TJScanvas.echelle); 
  TJScanvas.ctx.strokeStyle="rgb(46,41,78)";
  TJScanvas.ctx.lineWidth=2;

  TJScanvas.drawCircle(0, 0, 0.2, angle, 0); /* arc de angle */
  TJScanvas.drawLine(0,0,x,y); /* Rayon */
  
  TJScanvas.ctx.lineWidth=1;
  TJScanvas.ctx.setLineDash([3,3]);
  TJScanvas.drawLine(x,0,x,y); /* axe des Y */
  TJScanvas.drawLine(0,y,x,y); /* axe des X */
  
  /* Libelles */
  TJScanvas.ctx.fillStyle="rgb(163,0,21)";
  var txt="cos : ("+Math.cos(angleTrigo).toFixed(3)+")";
  var display_infos=TJScanvas.ctx.measureText(txt).width;
  if (y<0) {
    TJScanvas.text(txt, x, 0, -1*display_infos/2, 15);
  } else {
    TJScanvas.text(txt, x, 0, -1*display_infos/2, -10);
  }

  var txt="sin : ("+Math.sin(angleTrigo).toFixed(3)+")";
  var display_infos=TJScanvas.ctx.measureText(txt).width;
  if (x<0) {
    TJScanvas.text(txt, 0, y,5, 4);
  } else {
    TJScanvas.text(txt, 0, y, -1*display_infos-5, 4);
  }

  /* Tableau des angles remarquables en fraction de PI */
  TJScanvas.ctx.font="italic 14px arial";
  var rad = "rad : ("+Math.round(angle *1000)/1000+")";
  var deg = "deg : ("+Math.round(angle*(180/Math.PI)*1000)/1000+")";
  var display_infos = TJScanvas.ctx.measureText( deg).width;
  var display_infos = TJScanvas.ctx.measureText(rad).width;
  TJScanvas.text(deg, 0.2*Math.cos(angle/2), 0.2*Math.sin(angle/2), 5, 0);
  TJScanvas.text(rad, 0.2*Math.cos(angle/2), 0.2*Math.sin(angle/2), 5, -20);
}

window.onload=function() {
  displayTrigo(angle);
}
