

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var startPage = {
  Consent: function(next, end) {
    pdf_div = document.createElement('div')
    pdf_div.id = 'pdf_div'
    pdf_div.setAttribute("style", "text-align: center;");
    pdf_div.innerHTML = "<embed src='ONLINE_informed_consent_template_revised_09_21_2021.pdf' width='"+Math.floor(screen.width*.8).toString()+"' height='"+Math.floor(screen.height*.6).toString()+"'>"
    document.body.appendChild(pdf_div)
    pdf_div.innerHTML = pdf_div.innerHTML + "<p>Please enter your <strong>first and last name</strong> into the textbox below so that we can assign you SONA credit whether or not you participate.</p>"

    //Text box that records name
    const nameBox = document.createElement("textarea");
    nameBox.setAttribute("type", "text");
    nameBox.setAttribute("style", "resize: none; height: 30px; width: 180px; wrap: soft; autocomplete: off; autocorrect: off; spellcheck: false;");
    pdf_div.appendChild(nameBox)
    nameBox.focus()


    const myPara = document.createElement('p')
    myPara.innerHTML = "You must enter your name into the text box or close the experiment window. If you close the window, then there will be no way to assign you credit."
    pdf_div.appendChild(myPara)

    //Y/N button
    // Event listeners need to ensure that textbox is non empty first
    const buttonNO = document.createElement("button")
    buttonNO.innerText = "No: I do NOT wish to participate"
    buttonNO.addEventListener("click", function(){
      if (nameBox.value != ''){
        document.body.innerHTML = "<div id = \'main\'></div>"
        end()//This should be to kill itself
      }
    })
    pdf_div.appendChild(buttonNO)


    pdf_div.appendChild(document.createElement("br"))
    pdf_div.appendChild(document.createElement("br"))

    const buttonYES = document.createElement("button")
    buttonYES.innerText = "Yes: I DO wish to participate"
    buttonYES.addEventListener("click", function(){
      if (nameBox.value != ''){
        document.body.innerHTML = "<div id = \'main\'></div>"
        next()//This should be to kill itself
      }
    })
    pdf_div.appendChild(buttonYES)


  },

  startUp: async function(next) {

    //Need to display the consent form & collect name.
    // Also have yes/no option for consent; yes Continues and no closes.
    // document.body.innerHTML = "<embed src='ONLINE_informed_consent_template_revised_09_21_2021.pdf' width='500' height='375>'"

    //Dont know if this is needed
    // pdf_div = document.createElement('div')
    // pdf_div.id = 'pdf_div'
    // pdf_div.setAttribute("style", "text-align: center;");
    // pdf_div.innerHTML = "<embed src='ONLINE_informed_consent_template_revised_09_21_2021.pdf' width='"+Math.floor(screen.width*.8).toString()+"' height='"+Math.floor(screen.height*.8).toString()+"'>"
    // document.body.appendChild(pdf_div)

    //First Page text:
    document.body.innerHTML = document.body.innerHTML +
'<h1>Thank you for joining this experiment!</h1>' + "<br>" +
    "<p>In this experiment we will be testing your <strong>memory</strong> for random words.</p>" +
    "<p>You will be asked to study and recall 4 different lists of random words.</p>" +
    "<p>We also will be testing your <strong>basic math skills</strong> (addition, subtraction, multiplication).</p>" + "<br>"

    //We need to make sure we count up our button clicks to have awaits run properly
    buttonClick = 0

    await sleep(3000) //Hopefully we wait 3s then make the button stuff.

    const buttonOne = document.createElement("button")
    buttonOne.innerText = "Continue..."
    document.body.appendChild(buttonOne)

    buttonOne.addEventListener('click', async function() {
      buttonClick++
      if (buttonClick === 1){
        document.body.innerHTML = '<h1>Thank you for joining this experiment!</h1>' + "<br>" +
        "<p>In this experiment we will be testing your <strong>memory</strong> for random words.</p>" +
        "<p>You will be asked to study and recall 4 different lists of random words.</p>" +
        "<p>We also will be testing your <strong>basic math skills</strong> (addition, subtraction, multiplication).</p>" + "<br>" +
        "<h3><strong>Precise timing is important for this experiment. It will be fast paced and you will be pushed through the experiment phases very quickly.</strong></h3>" +
        "<p>It is for this reason that we will go over the instructions for each part of this experiment <strong>before</strong> you begin.</p>"
        await sleep (2500)
        document.body.appendChild(buttonOne)
      } else if (buttonClick === 2){
        document.body.innerHTML = "<p>You will be asked to study and remember 4 lists of random words. You will also be asked to do some math problems.</p>" +
        "<p>For <em>each</em> list, you will have a studying phase, test of your math skills, and then a test of your memory.</p>"
        await sleep(2500)
        document.body.appendChild(buttonOne)
      } else if (buttonClick === 3){
        document.body.innerHTML = "<h2><strong>STUDYING WORDS:</strong></h2><p> During this phase words will be displayed in the middle of the screen, one-by-one, for only a few seconds each." +
        "<br>After you see each word once, you will <em>automatically</em> be moved to your math test.</p>"
        await sleep (4000)
        document.body.appendChild(buttonOne)
      } else if (buttonClick === 4){
        document.body.innerHTML = "<h2><strong>STUDYING WORDS:</strong></h2><p> During this phase words will be displayed in the middle of the screen, one-by-one, for only a few seconds each." +
        "<br>After you see each word once, you will <em>automatically</em> be moved to your math test.</p>" +
        "<br><h2><strong>MATH TEST:</strong></h2><p> Random math problems will generate and you will be asked to provide your answer in a textbox." +
        "<br>You can only enter <em>numeric values</em> and a negative sign (when applicable). After you input your answer, <strong>hit the ENTER button on your computer to submit your answer.</strong>" +
        "<br>Upon submission, you will be told whether your answer was <mark style=\"color:green; background: none;\"><strong>Right</strong></mark> or <mark style=\"color:red; background: none;\"><strong>Wrong</strong></mark> and another math question will generate.</p>" +
        "<p>Please answer as <em>quickly</em> and <em>accurately</em> as you can." +
        "<br><strong>You will have only 20s to answer as many math problems as you can.</strong></p>"
        await sleep(8500)
        document.body.appendChild(buttonOne)
      } else if (buttonClick === 5){
        document.body.innerHTML = "<h2><strong>MEMORY TEST:</strong></h2><p> After the 20second math skill-check is complete, you will <em>automatically</em> be moved to the memory test." +
        "Type each word that you remember from the most recently studied list into the textbox provided.</p>"+
        "<p>DO NOT ENTER WORDS FROM PREVIOUSLY STUDIED LISTS. The memory test is only for words from the <strong>list that you most recently studied</strong>. <br>In other words, the memory test is NOT cumulative.</p>" +
        "<p>Please try to spell words corrects, but DO NOT WASTE TOO MUCH TIME TIME CORRECTING YOUR SPELLING.</p>"
        await sleep(6500)
        document.body.appendChild(buttonOne)
      } else if (buttonClick === 6){
        document.body.innerHTML = "<h2><strong>MEMORY TEST:</strong></h2><p> After the 20second math skill-check is complete, you will <em>automatically</em> be moved to the memory test." +
        "Type each word that you remember from the most recently studied list into the textbox provided.</p>" +
        "<p>DO NOT ENTER WORDS FROM PREVIOUSLY STUDIED LISTS. The memory test is only for words from the <strong>list that you most recently studied</strong>. <br>In other words, the memory test is NOT cumulative.</p>" +
        "<p>Please try to spell words corrects, but DO NOT WASTE TOO MUCH TIME TIME CORRECTING YOUR SPELLING.</p>" +
        "<p>There are few additional important points about this test:<ul><li>You will have <strong>less than 20 <em>seconds</em>.</strong></li><li>You do NOT have to click into the box to begin typing.</li><li>It does <strong>NOT matter what order</strong> you type the words in.</li>" +
        "<li>Only enter words that you remember seeing on the <strong><em>most recently studied list</em></strong>.</li><li><strong>Do NOT use external help on the memory test</strong></li><li>You do NOT have to worry about separating the words when you list them. You can use ENTER, grammatical operators, or no seperation.</li>" +
        "<li>Please try to spell everything correctly, but <strong>do not waste time making your spelling perfect.</strong></li><li><strong>You do NOT need to submit your memory test answers.</strong> When the timelimit is up, the information in the textbox will <em>automatically</em> be saved for you.</li></ul></p>"
        await sleep(11000)
        document.body.appendChild(buttonOne)
      } else if (buttonClick === 7){
        document.body.innerHTML = "<h2><strong>MEMORY TEST:</strong></h2><p> After the 20second math skill-check is complete, you will <em>automatically</em> be moved to the memory test." +
        "Type each word that you remember from the most recently studied list into the textbox provided.</p>" +
        "<p>DO NOT ENTER WORDS FROM PREVIOUSLY STUDIED LISTS. The memory test is only for words from the <strong>list that you most recently studied</strong>. <br>In other words, the memory test is NOT cumulative.</p>" +
        "<p>Please try to spell words corrects, but DO NOT WASTE TOO MUCH TIME TIME CORRECTING YOUR SPELLING.</p>" +
        "<p>There are few additional important points about this test:<ul><li>You will have <strong>less than 20 <em>seconds</em>.</strong></li><li>You do NOT have to click into the box to begin typing.</li><li>It does <strong>NOT matter what order</strong> you type the words in.</li>" +
        "<li>Only enter words that you remember seeing on the <strong><em>most recently studied list</em></strong>.</li><li><strong>Do NOT use external help on the memory test</strong></li><li>You do NOT have to worry about separating the words when you list them. You can use ENTER, grammatical operators, or no seperation.</li>" +
        "<li>Please try to spell everything correctly, but <strong>do not waste time making your spelling perfect.</strong></li><li><strong>You do NOT need to submit your memory test answers.</strong> When the timelimit is up, the information in the textbox will <em>automatically</em> be saved for you.</li></ul></p>" +
        "<p><strong>After the timelimit is up, you will be given less than a 5second break before you are <em>automatically</em> brought to the screen where you will study your next set of random words.</strong></p>" +
        "<p>You will go through each phase (study words, math test, memory test) for every list of random words you are given. You will be given 4 lists." +
        "<br>Please make sure you understand these instructions as you <strong>won't be able to review them later.</strong></p>"
        await sleep(6500)
        document.body.appendChild(buttonOne)
      } else if (buttonClick === 8){
        document.body.innerHTML = "<p>This experiment is <strong>very</strong> fast paced. <strong>Each phase will take less than 1 minute, and you are automatically moved onto following phases.</strong></p>"+
        "<p><strong>There are no breaks given between phases, and no breaks given between lists.</strong></p>"+
        "<p><h3>Please take a moment now to ensure you are in a distraction free environment and won't be taken from your device for the next 5-10min.<br>Thank you :)</h3></p>"+
        "<p>Clicking the <strong>BACK</strong> button will take you back to the previous screen. This is the ONLY time you will be able to go back and review the experiment overview.</p><p>Clicking the <strong>BEGIN</strong> button will take you to the start of the experiment.</p><br><br>"

        const buttonBack = document.createElement("button")
        buttonBack.innerText = "BACK"
        document.body.appendChild(buttonBack)
        buttonBack.addEventListener('click', function(){
          document.body.innerHTML = "<p>You will be asked to study and remember 4 lists of random words.</p>"+
          "<p>For <em>each</em> list, you will have a studying phase, test of your math skills, and then a test of your memory.</p>" +
          "<br><p><strong>STUDYING WORDS:</strong> During this phase words will be displayed in the middle of the screen, one-by-one, for only a few seconds each.</p>" +
          "<p>After you see each word once, you will <em>automatically</em> be moved to your math test.</p>"+
          "<br><p><strong>MATH TEST:</strong> Random math problems will generate and you will be asked to provide your answer in a textbox.</p>" +
          "<p>You can only enter <em>numeric values</em> and a negative sign (when applicable). After you input your answer, hit the ENTER button on your computer to submit your answer.</p>" +
          "<p>Upon submission you will be told whether your answer was <mark style=\"color:green; background: none;\"><strong>Right</strong></mark> or <mark style=\"color:red; background: none;\"><strong>Wrong</strong></mark> and another math question will generate.</p>" +
          "<p><br>Please answer as <em>quickly</em> and <em>accurately</em> as you can.</p>" +
          "<p><strong>You will have only 20s to answer as many math problems as you can.</strong></p>" +
          "<br><p><strong>MEMORY TEST:</strong> After the 20second math skill-check is complete, you will <em>automatically</em> be moved to the memory test." +
          "You will type each word that you remember from the most recently studied list into the textbox provided.</p>" +
          "<p>There are few important points about this test:<ul><li>You will have <strong>less than 10 <em>seconds</em></strong>.</li><li>You do NOT have to click into the box to begin typing.</li><li>It does NOT matter what order you type the words in.</li>" +
          "<li>Only enter words that you remember seeing on the <strong><em>most recently studied list</em></strong>.</li><li>You do NOT have to worry about separating the words when you list them. You can use ENTER, grammatical operators, or no seperation.</li>" +
          "<li>Please try to spell everything correctly, but do not waste time making your spelling perfect.</li><li>Unlike the math test, you do not need to submit your memory test answers. When the timelimit is up, the information in the textbox will <em>automatically</em> be saved for you.</li></ul></p>" +
          "<p><strong>After the timelimit is up, you will be given less than a 5second break before you are <em>automatically</em> brought to the screen where you will study your next set of random words.</strong></p>" +
          "<br><p>You will go through each phase (study words, math test, memory test) for every list of random words you are given. You will be given 4 lists.<p>" +
          "<br><br><p>Please make sure you understand these instructions as you won't be able to review them later.</p>"
          buttonClick = 7
          document.body.appendChild(buttonOne)
        })
        const buttonGo = document.createElement("button")
        buttonGo.innerText = "BEGIN"
        document.body.appendChild(buttonGo)
        buttonGo.addEventListener("click", function(){
          document.body.innerHTML = "<div id = \'main\'></div>"

          next()
        })

    }})

  }
}

// List Display portion of event graph.
var listDisplay = {
  initCanvas: function () {
      canvas = document.createElement('canvas')// , {id: 'canvas', style: 'position:absolute;'})
      canvas.id = 'c'
      canvas.style = 'position:absolute;'
      document.body.appendChild(canvas)

      var ctx = canvas.getContext('2d');
      ctx.canvas.width  = window.innerWidth - 20;
      ctx.canvas.height = window.innerHeight - 20;

      return canvas
  },
  start: async function(listNum, params, next) {
    //Params is the list to display. The train or test list can be passed in.

    //Save what list is displayed in proper spot.
    if (listNum === 1){
      subject["results"]['trainList1'].push(params)
    } else if (listNum === 2){
      subject["results"]['trainList2'].push(params)
    } else if (listNum === 3){
      subject["results"]['trainList3'].push(params)
    } else if (listNum === 0){
      subject["results"]['testList0'].push(params)
    }

    var space = oCanvas.create({
        canvas: this.initCanvas(),
        background: 'rgba(190,190,190,1)',
    })
    //console.log("Hello")

    //I'm not changing the index...
    for (let fuck = 0; fuck < params.length; fuck++) {
      textFC = space.display.text({
        x: window.innerWidth/2,
        y: window.innerHeight/2,
        origin: { x: "center", y: "center" },
        align: "center",
        font: "bold 50px sans-serif",
        text: "+", //Fixation cross.
        fill: "rgba(255,255,255,1)",
        zIndex: "front",
      })
      space.addChild(textFC)

      // wait 500ms
      await sleep(500)

      space.removeChild(textFC)
      text = space.display.text({
        x: window.innerWidth/2,
        y: window.innerHeight/2,
        origin: { x: "center", y: "center" },
        align: "center",
        font: "bold 40px sans-serif",
        text: params[fuck], //params at index fuck
        fill: "rgba(255,255,255,1)",
        zIndex: "front",
      })
      space.addChild(text)

      // Wait 1500ms, originally 2000ms, but felt slow
      await sleep(1500);

      space.removeChild(text)
    }
   space.destroy(space)
   next()
   },

}

// Distractor portion of Event graph
var distract = {
  start: function(next) {

    document.body.innerHTML = '<p>Please try your best on the following problems.<br>You have <strong>15 seconds starting now</strong> to correctly answer as many problems as you can.</p>'
    // Make sure #sec is correct during test changes.
    const ourCont = document.createElement("div");
    ourCont.setAttribute("id", "ourDiv");
    ourCont.setAttribute("style", "text-align: center;");
    document.body.appendChild(ourCont)

    firstNum = 0
    secondNum = 0
    chosOp = "+"

    const input = document.createElement("input");


    function displayProb() {
      firstNum = Math.floor(Math.random()*10)
      secondNum = Math.floor(Math.random()*10)
      operations = ["+", "-", "*"]
      chosOp = operations[Math.floor(Math.random()*3)]

      ourCont.innerHTML = "<p><strong>" + firstNum.toString() + chosOp + secondNum.toString() + "=" + "</strong></p>"

      ourCont.appendChild(input);
      input.focus()

    }


    input.setAttribute("type", "text");
    input.setAttribute("left", "40px");
    input.onkeyup = (e) => {
      if (e.key ==='Enter' || e.keyCode === 13){
        const parsedInt = /^-?\d+$/.test(input.value) ? parseInt(input.value, 10) : NaN
        if (chosOp === "+") {
          correctAnswer = firstNum + secondNum
        } else if (chosOp === "-") {
          correctAnswer = firstNum - secondNum
        } else {
          correctAnswer = firstNum * secondNum
        }
        input.value = ''
        ourCont.innerHTML = ourCont.innerHTML + "\n" + ((isNaN(parsedInt) || parsedInt != correctAnswer) ? "<p style=\"color:red;\"><strong>Wrong" : "<p style=\"color:green;\"><strong>Right") + "</strong></p>"
        setTimeout(displayProb, 500)
      }
    }
    ourCont.appendChild(input);
    input.focus()

    displayProb()


// 1.5s
var endScreenOn = 1500 //msec

    setTimeout(() => {
      document.body.innerHTML = ""
      const warnDiv = document.createElement("div");
      warnDiv.setAttribute("style", "text-align: center;");
      document.body.appendChild(warnDiv)
      warnDiv.innerHTML = "<h1><strong>MEMORY TEST BEGINS SOON</strong></h1>"
      setTimeout(next, endScreenOn)
    }, 15000 - endScreenOn) // was 20, trying 15
  }
}

///RECALL PHASE.
var recall = {
  start: async function(listNum, next) {

    document.body.innerHTML = '<h2>You have 12 seconds starting now.</h2><p>Please type into the box, in any order, all of the items that were on the list that you most recently studied.</p>'
    //Make sure #sec is correct during testing changes.
    const ourScreen = document.createElement("div");
    ourScreen.setAttribute("id", "ourDiv");
    ourScreen.setAttribute("style", "text-align: center;");
    document.body.appendChild(ourScreen)

    const answerBox = document.createElement("textarea");
    answerBox.setAttribute("type", "text");
    answerBox.setAttribute("style", "resize: none; height: 300px; width: 500px; wrap: soft; autocomplete: off; autocorrect: off; spellcheck: false;"); //If don't use resize:none, then they can resize it
    ourScreen.appendChild(answerBox);
    answerBox.focus() //Focus makes it so they don't have to click on the box to type

    // After timeout, get textbox input value and store them and eventually put that in the json?
    setTimeout(() => {
      var memAnsw = answerBox.value.toString(); //This is only available under recallStart though, so return it?
      console.log(memAnsw);
      //Send it to proper place:
      if (listNum === 1){
        subject["results"]["recallList1"].push(memAnsw)
      } else if (listNum === 2){
        subject["results"]["recallList2"].push(memAnsw)
      } else if (listNum === 3){
        subject["results"]["recallList3"].push(memAnsw)
      } else if (listNum === 0){
        subject["results"]["recallTestList0"].push(memAnsw)
      }
      document.body.innerHTML = "";
      setTimeout(() => {
        const endHead = document.createElement("div");
        endHead.setAttribute("style", "text-align: center;");
        document.head.appendChild(endHead)
        endHead.innerHTML = "</h1>Thank you!</h1>"


        const endSlide = document.createElement("div");
        endSlide.setAttribute("style", "text-align: center;")
        if (listNum > 0){
          document.body.appendChild(endSlide)
          endSlide.innerHTML = "<p>You just completed one of the sequences!<br>You will now move onto the next series of items to study!<br><br><b></p><h1><strong>Get Ready!</strong></h1>"
        } else if (listNum === 0){
          endSlide.innerHTML = "<p>Good job! You completed all of the memory and math tests required for this portion of your participation.<br>You will be moved to the ending screen shortly<br><strong>Thank you!</strong>"
        }
        setTimeout(() => {
          document.head.innerHTML = "" //ADD TEXT ABOUT SPELLING TO TOP
          document.body.innerHTML = ""
          next()
        }, 2000) // 2s to read final endSlide
      }, 5)
    }, 12000) //Testing 12s to answer //They have 9s to answer //Add 3s for slow people

//Average typing speed in ~35-45 words per minute.
// 6-words = 6/35 = ~17%, so 17% of a min = 10.2sec,
// 6-words = 6/45 = ~13%, so 13% of a min = 7.8sec
// (10.2 + 7.8)/2 = 9sec

  }
}
