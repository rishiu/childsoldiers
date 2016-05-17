$(document).ready(function(){
  setTimeout(function(){
    injectInfo("Hey! Welcome this website that will hopefully teach you new things about child soldiers.");
    injectTwoInput("COOL!","Yea...I'm not really feelin' it");
  },500);
});

function injectInfo(text){
  $('#main').append("<div class='main-wrapper-info'>"+
    "<div class='red message-wrapper' id='info'name='"+(text.toString())+"' onclick='changeColor(this)'>"+
      "<div class='message'>"+(text.toString())+"</div>"+
    "</div>"+
  "</div>");
  $('#info').addClass('fadeIn');
  $('[name="'+(text.toString())+'"]').hide().fadeIn("slow");
}

function injectTwoInput(text,text2){
  $('#main').append("<div class='main-wrapper-user'>"+
    "<div class='main-message-wrapper' id='biggie'>"+
      "<div class='grey message-wrapper' id='user' name='"+(text.toString())+"' onclick='changeColor(this)'>"+
        "<div class='message'>"+(text.toString())+"</div>"+
      "</div>"+
      "<div class='grey message-wrapper' id='user2' name=''"+(text2.toString())+"' onclick='changeColor(this)'>"+
        "<div class='message'>"+(text2.toString())+"</div>"+
      "</div>"+
    "</div>"+
  "</div>");
  $('[name="'+(text.toString())+'"]').hide().fadeIn("slow");
  $('[name="'+(text2.toString())+'"]').hide().fadeIn("slow");
}

function injectUnoInput(text){
  $('#main').append("<div class='main-wrapper-user'>"+
      "<div class='grey message-wrapper fadeIn' name="+(text.toString())+" id='user' onclick='changeColor(this)'>"+
        "<div class='message'>"+(text.toString())+"</div>"+
      "</div>"+
  "</div>");
  $('[name="'+(text.toString())+'"]').hide().fadeIn("slow");
}

function changeColor(element){
  $(element).switchClass('grey','blue');
  var x = element.innerHTML.toString();
  x = x.substring(x.indexOf(">")+1,x.indexOf("</"));
  parsyMcParseFace(x);
}

function parsyMcParseFace(clickedStuff){
  var arr = Object.keys(theWholeConversation);
  var next = "";
  var info= [];
  var input = [];
  for(var i=0;i<arr.length;i++){
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

function dealWithTheseGodDamnTimeouts(info,input){
  info.forEach(function(arrayElement){
    setTimeout(function(){
      injectInfo(arrayElement);
    },750)
  })
  setTimeout(function(){
    if(input.length===2){
      injectTwoInput(input[0],input[1]);
    }else{
      injectUnoInput(input[0]);
    }
    $('html, body').animate({scrollTop:$(document).height()}, 1000);
  },1000);
}

var theWholeConversation = { //legit the whole entire thing
  initial: {
    info:[{
      content:"Hey! Welcome this website that will hopefully teach you new things about child soldiers."
    }],
    responses:[{
      content:"Yea...I'm not really feelin' it",
      id: "sucks"
    },{
      content:"COOL!",
      id: "purpose"
    }]
  },
  sucks:{
    info:[{
      content: "Sucks to suck. You have to learn anyway"
    }],
    responses:[{
      content:"Fine.",
      id: "purpose"
    }]
  },
  purpose:{
    info:[{
      content: "Our purpose is to :To spread awareness about the brutality that child soldiers experience, and"
    },{
      content: "To convince people that they should care about child soldiers even though they are in Africa and we are in America."
    }],
    responses:[{
      content: "Noble! Sounds cool.",
      id: "getStarted"
    }]
  },
  getStarted:{
    info:[{
      content: "OK then! Let's start with some background"
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
      content: "Yeah, It's a pretty big deal."
    }],
    responses:[{
      content:"Dang Daniel! Life as a child soldier must suck.",
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
      content: "Many children are used as cooks, porter, gaurds, and for sexual purposes"
    }],
    responses:[{
      content:"Dang Daniel! Life as a child soldier must suck.",
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
    }],
    responses:[{
      content:"This is all sad and stuff, but why should I care?",
      id: "whyCare"
    }]
  },
  whyUse:{
    info:[{
      content: "Children are considered more effective than the average soldier because they follow authority."
    },{
      content: "They also don't prioritize payment and are wayyy less likely to desert"
    }],
    responses:[{
      content: "That's sad. But how does this all affect me?",
      id: "whyCare"
    }]
  },
  whyCare:{
    info:[{
      content: "If kids are exposed to violence and are taught to hate at a young age, they carry these feelings through adulthood and their entire lifetime."

    },{
      content: "These kids carry on these feelings to future generations which are affected by these same ideals of hatred and violence. "+
      "This includes bias and discrimination."
    },{
      content: "This impacts the global society, creating a world based around hate, violence and fear"
    }],
    responses:[{
      content: "But doesn't this just change the society in Africa? I'm way over here in CPT man.",
      id: "farAway"
    },{
      content: "I see what you mean. Do you have any examples?",
      id: "example"
    }]
  },
  farAway:{
    info:[{
      content: "We were lucky to be born into an area like Cupertino, where are needs are catered too, we receive excellent education and we have enough money to live happily."
    },{
      content: "However, some are not. Just because we were not on the short end of the straw does not mean it’s not our responsibility to help out."
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
      content:"You're spouting some serious wisdom buddy.",
      id: "imABeast"
    },{
      content:"I guess that kinda make sense. But how else are you helping out? This cra...mediocre website can't be all",
      id: "plan"
    }]
  },
  imABeast:{
    info:[{
      content: "YES! Finally some one gets it. Wanna see how else I plan to help out?"
    }],
    responses:[{
      content: "I'm for it",
      id: "plan"
    }]
  },
  plan:{
    info:[{
      content: "Are you ready for this? I'm about to blow your mind."
    }],
    responses: [{
      content: "I WAS BORN READY!!",
      id: "realPlan"
    },{
      content: "I'm not so sure...",
      id: "sideTrackrealPlan"
    }]
  },
  sideTrackrealPlan:{
    info:[{
      content: "Eh. You'll be fine"
    }],
    responses:[{
      content: "ok. lets go",
      id: "realPlan"
    }]
  },
  realPlan:{
    info:[{
      content: "We (the group) plan to make posters that have different flaps with different rights and luxuries on them."
    },{
      content: "Each person will choose the right most important to them and lift it up"
    },{
      content: "When you lift these flaps up, you will be able to see how many child soldiers don't have these rights."
    },{
      content: "These posters will be strategically(randomly) places around campus to maximize exposure. Shouldn't take long, we have 124 people"
    }],
    responses:[{
      content: "MIND=BLOWN",
      id: "youKnowThatsRight"
    }]
  },
  youKnowThatsRight:{
    info:[{
      content: "Well, that's all I got for today. Feel free to check out the following websites:"
    },{
      content: "http://www.child-soldiers.org/index.php"
    },{
      content: "https://www.hrw.org/topic/childrens-rights/child-soldiers"
    },{
      content: "http://www.child-soldier.org (not the same one)"
    }],
    responses:[{
      content: "I learned a lot. It was fun.",
      id: "nah"
    }]
  }
}
