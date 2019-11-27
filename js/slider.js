$(function(){
    var $range = $(".js-range-slider");
$range.ionRangeSlider({
    skin: "modern",
    type: "double",
    min: 0,
    max: 100,
    from: startPhaseRatio*100,
    to: (startPhaseRatio+peakPhaseRatio)*100,
    postfix: "%",
    onFinish: function(data){
        startPhaseRatio = data.from/100;
        endPhaseRatio = (100 - data.to)/100;
        peakPhaseRatio = (data.to - data.from)/100;
        //var scurveDataset = [];
            //scurveDataset = createDataSet();
            
            //window.sCurveChart.destroy();
            createChart();
            //var ctx = document.getElementById('canvas').getContext('2d');
			//window.sCurveChart = new Chart(ctx, config);
            //config.data.datasets[0].data.pop();
            //for(var i = 0; i < scurveDataset.length; i++) {

              //  config.data.labels.push(i);
                //config.data.datasets.data.push(scurveDataset[i]);
                //config.data.datasets[0].label = 'Predicted';
                //config.data.datasets[0].backgroundColor = window.chartColors.red;
                //config.data.datasets[0].borderColor = window.chartColors.red;
                
                //config.data.datasets[0].data.push(scurveDataset[i]);
            //}
            //window.sCurveChart.update();
        }
    }
)});



