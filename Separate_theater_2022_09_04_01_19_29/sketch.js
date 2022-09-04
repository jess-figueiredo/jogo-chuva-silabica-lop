
var imagemEducadora;
var imagemProgram;
var gatoParado = []; var gatoAndando = []; gatoPulando = []; var gato = [];
var cont = 0; cont2 = 0;//contador de frames
var fundoMenu,fundoCreditos, fundoN1,fundoN2;
var fontRegular, fontBold;

var xMinBotao = 150;
var largBotao = 200
var xMaxBotao = xMinBotao + largBotao
var yMinBotao = 200
var alturaBotao = 60
var yMaxBotao = yMinBotao + alturaBotao

var xGato =100, yGato = 350;

//variáveis para fazer o gato pular
var pulando = false; incYPulando = 4; contYPulando = 0 ; maxYPulando = -50;

var tela = 0;
// tela 1: Instruções
// tela 2: créditos
// tela 3: jogar

function preload(){
  imagemEducadora = loadImage("educador-guia-150.jpg");
  imagemProgram = loadImage("programadora-150.jpeg");
  fontBold = loadFont("Cardenio-b.otf");
  fontRegular = loadFont("Cardenio-Regular.otf")
  fundoMenu = loadImage("fundos/rana.jpg");
  fundoCreditos = loadImage("fundos/creditos.jpg")
  
  for(var i=1;i<=10;i++){
    gatoParado[i-1] = loadImage('gatoparado/Idle ('+ i +').png');
    gatoAndando[i-1] = loadImage('gatoandando/Walk ('+ i +').png')
  }
  for(var j = 1; j <= 8; j++){
    gatoPulando[j-1] = loadImage('gatopulando/Jump ('+ j +').png')
  }
}

function imagem(img,x,y,escala){
  largfig = img.width*escala;
  altfig = img.height*escala;
  image(img,x,y,largfig,altfig);
}

function desenvolvedor(){
  push()
    textSize(20);
    fill('white');
    text(`(mouseX,mouseY) = (${mouseX},${mouseY}`, 10, 20);
  pop()
}

function desenhaGato(){
  cont+=0.4;

  if(cont>=10){cont = 0;}
  
  if(keyIsDown(LEFT_ARROW)){
    xGato-=2;
    gato = gatoAndando;
  }
  else if(keyIsDown(RIGHT_ARROW)){
    xGato+=2;
    gato = gatoAndando;
  }
  else{
    gato = gatoParado;
  }

if(keyIsDown(UP_ARROW) || keyIsDown(32) ){
    pulando = true;
}
  
  //função que mostra o gato na tela
  imagem(gato[parseInt(cont)], xGato, yGato + contYPulando, 0.25);
}

function pulaGato(){
  cont+=0.4;
  if(cont>=8){
    cont = 0;
  }
  
  if(keyIsDown(LEFT_ARROW)){
    xGato-=2;
    gato = gatoAndando;
  }
  else if(keyIsDown(RIGHT_ARROW)){
    xGato+=2;
    gato = gatoAndando;
  }

  if(pulando == true){
    gato = gatoPulando;
    contYPulando -= incYPulando;
    if(contYPulando <= maxYPulando){
      incYPulando = -incYPulando;
    }
    else if (contYPulando >= 0){
      pulando = false
      incYPulando = -incYPulando;
    }
  }
  
  //função que mostra o gato na tela
  imagem(gato[parseInt(cont)], xGato, yGato + contYPulando , 0.25);
}

function telajogar(){
  background(46,139,87);
  
  noFill();
  stroke(20);
  rect(20,10,410,45,15);
  textSize(32);
  fill(10);
  text("Level 1", 210, 45);
  text("=", 448, 45);
  
  //interação com o botão voltar na telajogar
  noFill();
  rect(435,10,45,45,15); //botão menu
    if((mouseX > 435 && mouseX < 435+45) && (mouseY > 10 && mouseY < 10+45)){
      fill(0, 255, 127);
      if(mouseIsPressed){
        tela = 0;
      }
    }
  
  //if de pulaar
  
   if(pulando == false){
    desenhaGato();
  }
  else{
    pulaGato();
  }
  
  desenvolvedor();
}

function telamenu(){
  background(fundoMenu, 200);
    textSize(90);
    fill(10);
    textFont(fontBold);
    text("Chuva Silábica",20,100);
    
    // posição, largura e altura do botão, cantos
    noFill();
    if((mouseX > xMinBotao && mouseX < xMaxBotao) && (mouseY > yMinBotao && mouseY < yMaxBotao)){
      fill(0,255,127);
      if(mouseIsPressed){
        tela = 3;
      }
    }
    noStroke();
    rect(xMinBotao, yMinBotao, largBotao, alturaBotao, 15);
    textSize(60);
    fill(0)
    text("Jogar", xMinBotao + 40,yMinBotao + 50)
    //botao tutorial
    noFill(0);
    if(mouseX > xMinBotao && mouseX < xMaxBotao && mouseY > yMinBotao +80 && mouseY < yMaxBotao + 80){
      fill(0,255,127);
      if(mouseIsPressed){
        tela = 1;
      }
    }
    rect(xMinBotao, yMinBotao + 80, largBotao, alturaBotao, 15)
     fill(0);
    text("Tutorial", xMinBotao + 15, yMinBotao + 132)
    //botao créditos
    noFill(0);
    if(mouseX > xMinBotao && mouseX < xMaxBotao && mouseY > yMinBotao + 160 && mouseY < yMaxBotao + 160){
      fill(0,255,127);
      if(mouseIsPressed){
        tela = 2;
      }
    }
    rect(xMinBotao, yMinBotao + 160, largBotao, alturaBotao, 15)
    fill(0);
    text("Creditos", xMinBotao + 13, yMinBotao + 210)
    text("´", xMinBotao + 70, yMinBotao + 221)
}

function telatutorial(){
  background(46,139,87);
  textSize(80);
  fill(10);
  text("Tutorial", 140, 90);
  textSize(20);
  text("¬ Mova se com as setas do teclado.\n\n¬ Acerte a ordem das sílabas do animal apresentado na imagem.\n\n¬ Você perderá um coração caso erre a sílaba \n\n¬ Você pode reabastecer seus corações com xícaras de chá de camomila.", 20, 160, 480);
  noFill(0);
   if(mouseX > xMinBotao +130 && mouseX < xMaxBotao + 130 && mouseY > yMinBotao + 230 && mouseY < yMaxBotao + 230){
    fill(0,255,127);
    if(mouseIsPressed){
      tela = 0;
    }
  }
  rect(xMinBotao +130, yMinBotao +230, largBotao , alturaBotao, 15);
    fill(50);
  textSize(25)
  text("Voltar", xMinBotao +175,yMinBotao + 270)
}

function telacreditos(){
   background(fundoCreditos, 200);
  textStyle(fontBold)
  fill(240,248,255);
  noStroke();
  rect(50, 60,400, 15,15);
  
  textSize(90);
  fill(10)
  text("Créditos", 120, 100);
  text("¨",240,250);
  text("¨",240,300);
  text("¨",240,350);
  text("¨",240,400);
  text("¨",240,450);
 
  
  fill(10)
  textSize(24);
  text("Mª ROSILENE FEITOSA", 280, 150)
  
  textSize(20)
  textStyle(BOLD);
  text("Educadora Guia", 320, 335);
  
  textSize(14);
  fill(50)
  text("Formada em pedagogia no ano de XXXX pela Univerdade Federal do Rio Grande do Norte, segue como professora do Ens. Fundamental I.", 280, 360, 200)
  image(imagemEducadora, 300, 160);
  
  fill(10)
  textSize(24);
  text("JÉSSICA F. FIGUEIREDO", 30, 150)
  
  textSize(20);
  textStyle(BOLD);
  text("Programadora", 80, 335);
  
  textSize(14)
  fill(50)
  text("Aluna do curso de ciências e tecnologia na Escola de Ciência e Tecnologia da Universidade Federal do Rio grande do Norte.", 30, 360, 200)
  
  image(imagemProgram, 50, 160)
  /*
  fill(240,248,255);
  
  if(mouseX > 65 && mouseY < 65){
    fill(255,228,225);
  }
  circle(65, 67, 60);
  
  
  fill(00);
  textFont('arial');
  textSize(40);
  text("◀", 45,80)*/
  
  textFont(fontBold)
  noFill(0);
  if(mouseX > xMinBotao +130 && mouseX < xMaxBotao + 130 && mouseY > yMinBotao + 230 && mouseY < yMaxBotao + 230){
    fill(175,238,238);
    if(mouseIsPressed){
      tela = 0;
    }
  }
  rect(xMinBotao +130 , yMinBotao + 230, largBotao, alturaBotao, 15)
  fill(50);
  textSize(25)
  text("Voltar", xMinBotao +175,yMinBotao + 270)
}




function setup() {
  createCanvas(500, 500);
  
}

function draw() {
  if(tela == 0){
    telamenu();
  }
  if(tela == 1){
    telatutorial();
  }
  if(tela == 2){
    telacreditos();
  }
  if(tela == 3){
    telajogar();
  }
}
