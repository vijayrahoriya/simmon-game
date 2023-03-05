const startBtn = document.querySelector('#start'),
container = document.querySelector('.container'),
result = document.querySelector('#result'),
wrapper = document.querySelector('.wrapper'),
countValue = document.querySelector('#count'),
colorPart = document.querySelectorAll('.color-part')

const colors = {
    color1: {
      current: "#068e06",
      new: "#11e711",
    },
    color2: {
      current: "#950303",
      new: "#fd2a2a",
    },
    color3: {
      current: "#01018a",
      new: "#2062fc",
    },
    color4: {
      current: "#919102",
      new: "#fafa18",
    },
};

let randomColors = [];
let pathGenratorBool = false;
let count = 0,
clickCount = 0;

//function to start game
startBtn.addEventListener('click',()=>{
    count = 0;
    clickCount = 0;
    randomColors = []
    pathGenratorBool = false
    wrapper.classList.remove('hide')
    container.classList.add('hide')
    pathGenrator();
}) 

const pathGenrator = () =>{
    randomColors.push(genratorRandomValue(colors));
    count = randomColors.length
    pathGenratorBool = true;
    pathDecide(count);
}

//function to get a random value from object
const genratorRandomValue = (obj) =>{
    //let create array of all keys of this obj
    let arr = Object.keys(obj)
    return arr[Math.floor(Math.random() * arr.length)]
}

const pathDecide = async (count) =>{
    countValue.innerText = count;
    for(let i of randomColors){
        let currentColor = document.querySelector(`.${i}`)
        await delay(500);
        currentColor.style.backgroundColor = `${colors[i]["new"]}`
        await delay(600)
        currentColor.style.backgroundColor = `${colors[i]['current']}`
        await delay(500);
    }
    pathGenratorBool = false;
}

//delay for blink effect
async function delay(time){
    return new Promise((resolve)=>{
        setTimeout(resolve,time)
    })
}

//when user click on the colors
colorPart.forEach(element=>{
    element.addEventListener('click', async(e)=>{
        //if user click the same color than next level
        if(pathGenratorBool){
            return false;
        }
        if(e.target.classList[0] == randomColors[clickCount]){
            //color blink effect on click
            e.target.style.backgroundColor = `${colors[randomColors[clickCount]]["new"]}`;
            await delay(500);

            e.target.style.backgroundColor = `${colors[randomColors[clickCount]]["current"]}`

            //user click
            clickCount += 1;
            //next level if number of valid clicks == count
            if(clickCount == count){
                clickCount = 0;
                pathGenrator();
            }
        }else{
            lose();
        }

    })
})

//function when user executes wrong sequence
const lose = () =>{
    result.innerHTML = `<span> Your Score: </span>${count}`;
    result.classList.remove('hide')
    wrapper.classList.add('hide')
    container.classList.remove('hide')
    startBtn.innerHTML = "Play Again"
    startBtn.classList.remove('hide')
}