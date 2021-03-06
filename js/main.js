var easterNihar=0;

//document.ready handler
$(document).ready(function(){
  //instructions
  window.confirm("To use this website, just act like its a chat application. Read the info on the left and choose your response on the right!")
  //get the ball rolling
  setTimeout(function(){
    injectInfo("Hey! Welcome to this website that will hopefully teach you new things about child soldiers.");
    injectUnoInput("COOL!");
    },500);
});

//add in the info section
function injectInfo(text){
  $('#main').append("<div class='main-wrapper-info'>"+
    "<div class='red message-wrapper' id='info'name='"+(text.toString())+"'>"+
      "<div class='message'>"+(text.toString())+"</div>"+
    "</div>"+
  "</div>");
  $('#info').addClass('fadeIn');
  $('[name="'+(text.toString())+'"]').hide().fadeIn("slow");  //add in animations for chat
}

//when theres two choices
function injectTwoInput(text,text2){
  $('#main').append("<div class='main-wrapper-user'>"+
    "<div class='main-message-wrapper' id='biggie'>"+
      "<div class='grey message-wrapper' id='user' name='"+(text.toString())+"' onClick='changeColor(this)'>"+
        "<div class='message'>"+(text.toString())+"</div>"+
      "</div>"+
      "<div class='grey message-wrapper' id='user2' name='"+(text2.toString())+"' onClick='changeColor(this)'>"+
        "<div class='message'>"+(text2.toString())+"</div>"+
      "</div>"+
    "</div>"+
  "</div>");
  $('[name="'+(text.toString())+'"]').hide().fadeIn("slow");
  lastRightName=text.toString();
  $('[name="'+(text2.toString())+'"]').hide().fadeIn("slow");
  lastLeftName=text2.toString();
}

//when theres only one choice
function injectUnoInput(text){
  $('#main').append("<div class='main-wrapper-user'>"+
      "<div class='grey message-wrapper fadeIn' name='"+(text.toString())+"' id='user' onClick='changeColor(this)'>"+
        "<div class='message'>"+(text.toString())+"</div>"+
      "</div>"+
  "</div>");
  $('[name="'+(text.toString())+'"]').hide().fadeIn("slow");
  lastRightName = text.toString();
}

//change color of element upon click and process for next options
function changeColor(element){
    $(element).switchClass('grey','blue');
    var x = element.innerHTML.toString();
    x = x.substring(x.indexOf(">")+1,x.indexOf("</"));
    parsyMcParseFace(x);
  }

//parse the flow and decide what to show next
function parsyMcParseFace(clickedStuff){
  var arr = Object.keys(theWholeConversation);
  var next = "";
  var info= [];
  var input = [];
  for(var i=0;i<arr.length;i++){
    //even i get confused sometimes
    for(var j=0;j<theWholeConversation[arr[i]]['responses'].length;j++){
      if(((theWholeConversation[arr[i]]['responses'][j].content).toString())===clickedStuff){
        next = theWholeConversation[arr[i]]['responses'][j].id;
      }
    }
  }
  for(var i=0;i<arr.length;i++){
    if(arr[i].toString()===next){
      for(var j=0;j<theWholeConversation[arr[i]]['info'].length;j++){
        info.push(theWholeConversation[arr[i]]['info'][j].content);
      }
      for(var j=0;j<theWholeConversation[arr[i]]['responses'].length;j++){
        input.push(theWholeConversation[arr[i]]['responses'][j].content);
      }
    }
  }
  dealWithTheseGodDamnTimeouts(info,input);
}

//for the last bit where links are provided
function addTag(){
  $('#main').append("<div class='main-wrapper-info'>"+
    "<div class='red message-wrapper' id='info'>"+
      "<div class='message'>"+
      "<a href='http://www.child-soldiers.org/index.php'>child-soldiers.org</a><br><a href='https://www.hrw.org/topic/childrens-rights/child-soldiers'>Human Rights Watch</a><br><a href='http://www.child-soldier.org'>child-soldier.org</a>"+
      "</div>"+
    "</div>"+
  "</div>");
}

//for the graph. Uses Chart.JS
function addThatGraph(){
  $('#main').append("<div class='main-wrapper-info'>"+
    "<div class='red message-wrapper' id='info'>"+
      "<canvas id='myChart' width='400' height='400'></canvas>"+
    "</div>"+
  "</div>");
  setTimeout(function(){
    var chart = $('#myChart');
    var myChart = new Chart(chart,{
      type:'bar',
      data:{
        labels:["Beaten", "Killed Someone","Abducted Others","Military trained","Fought","Saw someone die"],
        datasets:[{
          label: '% of 301 child soldiers',
          data: [52,39,39,65,64,77],
          backgroundColor: '#666',
          hoverBackgroundColor: 'rgba(0,0,0,1)'
        }]
      },
      options: {
          title:{
            display:true,
            text:"Thing's Child Soldiers have to go through"
          },
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }],
          },
      }
    });
  },750);
}

//for the image
function addThatImage(){
  $('#main').append("<div class='main-wrapper-info'>"+
    "<div class='red message-wrapper' id='info'>"+
      "<img src='https://s-media-cache-ak0.pinimg.com/736x/df/a7/93/dfa79337ce1649199261ff56cd234e99.jpg' style='max-width:35vh;max-height:45vh;'>"+
    "</div>"+
  "</div>");
}

//add info,graphs,images,etc...
function dealWithTheseGodDamnTimeouts(info,input){
  info.forEach(function(arrayElement){
    if(arrayElement==='graph here'){
      setTimeout(function(){
        addThatGraph();
      },750);
    }else if(arrayElement==='image'){
      setTimeout(function(){
        addThatImage();
      },750);
    }else if(arrayElement==='tags'){
      setTimeout(function(){
        addTag();
      },750);
    }else{
      setTimeout(function(){
        injectInfo(arrayElement);
      },750);
    }
  })
  //offer choices after 1 sec.
  setTimeout(function(){
    if(input.length===2){
      injectTwoInput(input[0],input[1]);
    }else{
      injectUnoInput(input[0]);
    }
    $('html, body').animate({scrollTop:$(document).height()}, 1000);
  },1000);
}

var theWholeConversation = {
  initial: {
    info:[{
      content:"Hey! Welcome this website that will hopefully teach you new things about child soldiers."
    }],
    responses:[{
      content:"COOL!",
      id: "purpose"
    }]
  },
  purpose:{
    info:[{
      content: "OK, but first our purpose for this website:"
    },{
      content: "To spread awareness about the brutality that child soldiers experience, and"
    },{
      content: "To convince people that they should care about child soldiers even though they are in Africa and we are in America."
    },{
      content: "OK then! Let us start with some background"
    }],
    responses:[{
      content:"How widespread of a problem is this issue child soldiers?",
      id: "extent"
    },{
      content:"Do the children actually fight battles?",
      id: "jobs"
    }]
  },
  extent:{
    info:[{
      content: "There are over 300,000 child soldiers in over 20 countries across 4 continents."
    },{
      content: "Yeah, It is a pretty big deal."
    }],
    responses:[{
      content:"Life as a child soldier must suck.",
      id: "lifeSucks"
    },{
      content:"Hold it up. Why in the world do people even use child soldiers?",
      id: "whyUse"
    }]
  },
  jobs:{
    info:[{
      content: "You can bet your behind they do. But they also do other things."
    },{
      content: "Many children are used as cooks, porter, guards, or for sexual purposes"
    }],
    responses:[{
      content:"Life as a child soldier must suck.",
      id: "lifeSucks"
    },{
      content:"But why children? Adults could do all of that stuff too.",
      id: "whyUse"
    }]
  },
  lifeSucks:{
    info:[{
      content: "Oh it does. More than 62% of deployed children are killed in combat."
    },{
      content: "In addition, 60% of children are recruited before the age of 14."
    },{
      content: "graph here"
    }],
    responses:[{
      content:"This is all very sad, but why should I care?",
      id: "whyCare"
    }]
  },
  whyUse:{
    info:[{
      content: "Children are considered more effective than the average soldier because they follow authority."
    },{
      content: "They also do not prioritize payment and are way less likely to desert"
    }],
    responses:[{
      content: "That is sad. But how does this all affect me?",
      id: "whyCare"
    }]
  },
  whyCare:{
    info:[{
      content: "If kids are exposed to violence and are taught to hate at a young age, they carry these feelings through adulthood and their entire lifetime."
    },{
      content: "These kids carry on these feelings to future generations which are affected by these same ideals of hatred and violence including bias and discrimination."+
      "This impacts the global society, creating a world based around hate, violence and fear"
    },{
      content: "image"
    }],
    responses:[{
      content: "But does not this just change the society in Africa? I am way over here in US man.",
      id: "farAway"
    },{
      content: "I see what you mean. Do you have any examples?",
      id: "example"
    }]
  },
  farAway:{
    info:[{
      content: "We were lucky to be born into an area like US, where are needs are catered too, we receive excellent education and we have enough money to live happily."
    },{
      content: "However, some are not. Just because we were not on the short end of the straw does not mean it is not our responsibility to help out."
    }],
    responses:[{
      content: "Hmm...maybe. Do you have any examples?",
      id: "example"
    }]
  },
  example:{
    info:[{
      content: "Think about Nelson Mandela. Nelson Mandela had a great impact on society all over the world including in the US. He was born and raised in South Africa, where child soldiers is still a problem."
    },{
      content: "If less children become child soldiers, the chances of finding another great leader, innovator and world changer are greatly increased."
    }],
    responses:[{
      content:"I guess that kinda make sense. Is there anywhere I can learn more?",
      id: "learnMore"
    }]
  },
  learnMore:{
    info:[{
      content: "Of course there is. Take a look at the following links:"
    },{
      content: "tags"
    }],
    responses:[{
      content: "I learned a lot. It was fun.",
      id: "nah"
    }]
  }
}
