//Known inputs for an S-Curve are the average percentages spent in the startup, peak and close out phases.
//These have to total to 100%.
//The other known is the total amount of tasks we know we need to complete after estimation.
//Finally for the estimation we have the most recent peak velocity this team was able to sustain.
//Onwards.......

var xyDataSet = [];
var startPhaseRatio = 0.2;
var peakPhaseRatio = 0.6;
var endPhaseRatio = 0.2;

var peakPhaseVelocity = 7;
var startPhaseVelocity = 3;
var endPhaseVelocity = 3;

var cyclesSpentInPeak = 0;
var cyclesSpentInStart = 0;
var cyclesSpentInEnd = 0;

var totalTaskSize = 70;
var myChart;
var config;
var ctx;

function createChart(){
    config = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                data: [],
                fill: false
            }]
        },
        options: {
            elements: {
            line: {
                    tension: 0.2 // disables bezier curves
                },
            point: {
                radius:0
            }
            },
            responsive: true,
            title: {
                display: true,
                text: 'S-Curve Modeller'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Cycle'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'No Of Tasks'
                    }
                }]
            }
        }
    }

    var scurveDataset = [];
            scurveDataset= createDataSet();
            
            if(myChart)
            {
                myChart.destroy();
                ctx = document.getElementById('canvas').getContext('2d');
                
                //config.data.labels = [];
                
                config.data.datasets[0].label = 'Predicted';
                config.data.datasets[0].backgroundColor = window.chartColors.red;
                config.data.datasets[0].borderColor = window.chartColors.red;
                for(var i = 0; i < scurveDataset.length; i++) {
                    config.data.labels.push(i);
             }
                config.data.datasets[0].data = scurveDataset;
                window.myChart = new Chart(ctx, config);
            }
            else{
                
                ctx = document.getElementById('canvas').getContext('2d');
                config.data.datasets[0].label = 'Predicted';
                config.data.datasets[0].backgroundColor = window.chartColors.red;
                config.data.datasets[0].borderColor = window.chartColors.red;
                for(var i = 0; i < scurveDataset.length; i++) {
                       config.data.labels.push(i);
                }
                config.data.datasets[0].data = scurveDataset;
                window.myChart = new Chart(ctx, config);
			    
            }
            
            
}

function destroyChart(){

}

function updateStartPhase(){
    startPhaseVelocity = Number(document.getElementById('startPhase').value);
    createChart();
}
function updatePeakPhase(){
    peakPhaseVelocity = Number(document.getElementById('peakPhase').value);
    createChart();
}
function updateEndPhase(){
    endPhaseVelocity = Number(document.getElementById('endPhase').value);
    createChart();
}
function createDataSet() {
    //alert("SCOOBY DOOBY DOO");
    var peakPhaseTotal = 0;
    var remainingTotal = 0;
    var remainingCycles = 0;
    var startPhaseTotal = 0;
    var endPhaseTotal = 0;
    xyDataSet = [];

    peakPhaseTotal = totalTaskSize * peakPhaseRatio;
    cyclesSpentInPeak = Math.ceil(peakPhaseTotal/peakPhaseVelocity);
    remainingTotal = totalTaskSize - peakPhaseTotal;


    //remainingCycles = remainingTotal/(startPhaseVelocity + endPhaseVelocity);
    var startVelocityRatio = (startPhaseRatio/(startPhaseRatio+endPhaseRatio))*startPhaseVelocity;
    var endVelocityRatio = (endPhaseRatio/(startPhaseRatio+endPhaseRatio))*endPhaseVelocity;
    remainingCycles = remainingTotal / (startVelocityRatio + endVelocityRatio);
    cyclesSpentInStart = Math.ceil(remainingCycles * (startPhaseRatio/(startPhaseRatio + endPhaseRatio)));
    cyclesSpentInEnd = Math.ceil(remainingCycles * (endPhaseRatio/(startPhaseRatio + endPhaseRatio)));
    
    //to get to the start and end cycles, it is a measure of the remaining total as a ratio of their relative velocities.
    var totalCycles = cyclesSpentInStart + cyclesSpentInPeak + cyclesSpentInEnd;
    xyDataSet[0]= 0;
    var runningTotal = 0;
    var i = 0;
    for(i = 1 ; i <= cyclesSpentInStart; i++){
        runningTotal += startPhaseVelocity;
        xyDataSet[i] = runningTotal;
    }
    for (i > cyclesSpentInStart; i <= (cyclesSpentInStart+cyclesSpentInPeak); i++)
    {   runningTotal += peakPhaseVelocity;
        xyDataSet[i] = runningTotal;
    }
    for( i> (cyclesSpentInStart+cyclesSpentInPeak); i < totalCycles; i++)
    {
        runningTotal += endPhaseVelocity;
        xyDataSet[i] = runningTotal;
    }
    return xyDataSet;
}