var noofpoints = 0
var i=0
var xValues = [];
var yValues = [];
var IbyNvalues=[];
var choice='plot'
function handleClick(newchoice) {
   choice=newchoice
  }
  
var connection = new WebSocket('wss://coding-ws.astrome.co:2096/');
connection.onmessage = function (e) {
    noofpoints = noofpoints + 1;
    const myObj = JSON.parse(e.data);
    document.getElementById('no-of-points').textContent = noofpoints;
    xValues.push(myObj.x)
    
    yValues.push(myObj.y)
    if(Math.sqrt(myObj.x*myObj.x+myObj.y*myObj.y)<=1){
        i=i+1
        
    }
    document.getElementById('Ivalue').textContent =i
   var IbyN= (Math.round( i/noofpoints* 100) / 100).toFixed(3)
   IbyNvalues.push(IbyN)
    document.getElementById('IbyN').textContent =IbyN;
    var ctx = document.getElementById('myChart').getContext('2d');
    var plotchart ={
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,1.0)",
                // borderColor: "rgba(0,0,255,0.1)",
                data: yValues
            }]
        },
        options: {
            legend: { display: false },
            scales: {
                yAxes: [{ ticks: { min: -1, max: 1} }],
            }
        }
    }
    var t=[10,20,30,40,50,60,70,80,90,100];
   
  
        var ratiochart ={
        type: "line",
        data: {
            labels: t,
            datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: "rgba(0,0,255,1.0)",
                data: IbyNvalues
            }]
        },
        options: {
            legend: { display: false },
            scales: {
                yAxes: [{ ticks: { min: 0, max: 1} }],
            }
        }
    
    }
    var datachart ={
        type: "line",
        data: {
            labels: t,
            datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: "rgba(0,0,255,1.0)",
                data: xValues
            },{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(123, 239, 178, 1)",
                borderColor: "rgba(123, 239, 178, 1)",
                data: yValues
            }]
        },
        options: {
            legend: { display: false },
            scales: {
                yAxes: [{ ticks: { min: -1, max: 1} }],
            }
        }
    
    }
    if(choice=='plot'){
        new Chart(ctx,plotchart )
    }
    if(choice=='ratio'){
        new Chart(ctx,ratiochart)
    }
    if(choice=='data'){
        new Chart(ctx,datachart)
    }
}









