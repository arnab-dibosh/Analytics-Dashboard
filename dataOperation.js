function groupby(arr, prop){
    var result = arr.reduce(function (r, a) {
        r[a[prop]] = r[a[prop]] || [];
        r[a[prop]].push(a);
        return r;
    }, Object.create(null));
    
    return result; 
}

function loadMarketDropDown(rawData){

    var marketWiseDataa, prop;
    if(window.isDummyData){
        rawData=window.marketWiseDummyData;
       prop='label';
    } 
    else prop='Roundtrip_Market';
    marketWiseDataa=groupby(rawData, prop);

    $('#mktfilter')
    .empty()
    .append($('<option>', {
                value: 'All',
                text: 'All'
            }));

    for ( var property in marketWiseDataa ) {
        var marketName= property;
        
        $('#mktfilter').append($('<option>', {
            value: marketName,
            text: marketName
        }));
    };
}

function filterMonth(monthData){
    var result;    
    if(window.selectedMonth!='All'){
           
            result = monthData.filter(function(obj) {
                return obj.Departure_Month.slice(-3) === window.selectedMonth;
            });
        monthData= result;
    }    
    return monthData;
}

function filterMarket(marketData){
    var result;
    window.selectedMarket=$('#mktfilter').children("option:selected").val()
    if(window.selectedMarket!='All'){
           
            result = marketData.filter(function(obj) {
                return obj.label === window.selectedMarket;
            });
        marketData= result;
    }    
    return marketData;
}

function prepareMarketWiseData(rawData){
    if(window.isDummyData){
        rawData=window.marketWiseDummyData;
        return window.marketWiseDummyData;
    } 
    
    var marketWiseChartArray=[];
    var regionWiseData= groupby(rawData, 'Region');
    
    for (var reg in regionWiseData) {
    
        var regionArr= regionWiseData[reg];// All data of Asia
        var regionName= reg;//Asia
        var marketWiseData= groupby(regionArr, 'Roundtrip_Market');
        
        for (var mkt in marketWiseData) {
            var chartBar={};
            var marketArr= marketWiseData[mkt];// All data of Mkt_19
            var marketName= mkt;//Mkt_19
            
            calculateTotalMonth(marketArr);

            var rpmsum= d3.sum(marketArr, function(d) { return d.RPM; });
            var asmsum= d3.sum(marketArr, function(d) { return d.ASM; });

            var onedaymilesum= d3.sum(marketArr, function(d) { return d["1_DAY_MILES"]; });
            var threedaymilesum= d3.sum(marketArr, function(d) { return d["3_DAY_MILES"]; });
            var sevendaymilesum= d3.sum(marketArr, function(d) { return d["7_DAY_MILES"]; });

            var lyFlownRpmsum= d3.sum(marketArr, function(d) { return d.LY_FLOWN_RPM; });
            var lyFlownAsmsum= d3.sum(marketArr, function(d) { return d.LY_FLOWN_ASM; });
            var sevendayLYmilesum= d3.sum(marketArr, function(d) { return d["7_DAY_LY_MILES"]; });
            var LYasmsum= d3.sum(marketArr, function(d) { return d.LY_ASM; });
            var YOYasmsum= d3.sum(marketArr, function(d) { return d.YoY_ASM; });
            var LYrpmsum= d3.sum(marketArr, function(d) { return d.LY_RPM; });

            var lf=rpmsum/asmsum;
            var oneday= onedaymilesum/asmsum;
            var threeday=threedaymilesum/asmsum;
            var sevenday=sevendayLYmilesum/asmsum;
            var lyFlown=lyFlownRpmsum/lyFlownAsmsum;
            var sevendaypace=(sevendaymilesum/asmsum)-(sevendayLYmilesum/LYasmsum);
            var yoycap=YOYasmsum/LYasmsum;
            var lylf=LYrpmsum/LYasmsum;
            var projLf=lyFlown-lylf+lf;

            chartBar['region']=regionName;
            chartBar['label']=marketName;
            chartBar['LF']=lf;
            chartBar['1_DAY']=oneday
            chartBar['3_DAY']=threeday;
            chartBar['7_DAY']=sevenday;
            chartBar['LY_FLOWN']=lyFlown;
            chartBar['7_DAY_PACE']=sevendaypace;
            chartBar['YOY_CAP']=yoycap;
            chartBar['PROJ_LF']=projLf;
            
            marketWiseChartArray.push(chartBar);
            
        };
    };
    updataTop();
    return marketWiseChartArray;
}

function calculateTotalMonth(monthAarr){
    window.trpmsum+= d3.sum(monthAarr, function(d) { return d.RPM; });
    window.tasmsum+= d3.sum(monthAarr, function(d) { return d.ASM; });
    window.tlyFlownRpmsum+= d3.sum(monthAarr, function(d) { return d.LY_FLOWN_RPM; });
    window.tlyFlownAsmsum+= d3.sum(monthAarr, function(d) { return d.LY_FLOWN_ASM; });
    window.tYOYasmsum+= d3.sum(monthAarr, function(d) { return d.YoY_ASM; });
    window.tLYasmsum+= d3.sum(monthAarr, function(d) { return d.LY_ASM; });
     window.tLYasmsum+= d3.sum(monthAarr, function(d) { return d.LY_ASM; });
     window.tLYrpmsum+= d3.sum(monthAarr, function(d) { return d.LY_RPM; });

}

function prepareDayWiseData(rawData){
    if(window.isDummyData) return window.dayWiseDummyData;
    var dayWiseChartArray=[];

        var dayWiseData=groupby(rawData, 'Departure_Date');
        
        for (var day in dayWiseData) {
            var chartBar={};
            var dayArr= dayWiseData[day];// All data of Mkt_19
            var dayName= day;//Mkt_19
            
            //Remove row from market arr when filter applied
            dayArr=filterMonth(dayArr);
            calculateTotalMonth(dayArr);
            var rpmsum= d3.sum(dayArr, function(d) { return d.RPM; });
            var asmsum= d3.sum(dayArr, function(d) { return d.ASM; });

            var onedaymilesum= d3.sum(dayArr, function(d) { return d["1_DAY_MILES"]; });
            var threedaymilesum= d3.sum(dayArr, function(d) { return d["3_DAY_MILES"]; });
            var sevendaymilesum= d3.sum(dayArr, function(d) { return d["7_DAY_MILES"]; });

            var lyFlownRpmsum= d3.sum(dayArr, function(d) { return d.LY_FLOWN_RPM; });
            var lyFlownAsmsum= d3.sum(dayArr, function(d) { return d.LY_FLOWN_ASM; });
            var sevendayLYmilesum= d3.sum(dayArr, function(d) { return d["7_DAY_LY_MILES"]; });
            var LYasmsum= d3.sum(dayArr, function(d) { return d.LY_ASM; });
            var YOYasmsum= d3.sum(dayArr, function(d) { return d.YoY_ASM; });
            var LYrpmsum= d3.sum(dayArr, function(d) { return d.LY_RPM; });

            var lf=rpmsum/asmsum;
            var oneday= onedaymilesum/asmsum;
            var threeday=threedaymilesum/asmsum;
            var sevenday=sevendayLYmilesum/asmsum;
            var lyFlown=lyFlownRpmsum/lyFlownAsmsum;
            var sevendaypace=(sevendaymilesum/asmsum)-(sevendayLYmilesum/LYasmsum);
            var yoycap=YOYasmsum/LYasmsum;
            var lylf=LYrpmsum/LYasmsum;
            var projLf=lyFlown-lylf+lf;

            chartBar['label']=dayName;
            chartBar['LF']=lf;
            chartBar['1_DAY']=oneday
            chartBar['3_DAY']=threeday;
            chartBar['7_DAY']=sevenday;
            chartBar['LY_FLOWN']=lyFlown;
            chartBar['7_DAY_PACE']=sevendaypace;
            chartBar['YOY_CAP']=yoycap;
            chartBar['PROJ_LF']=projLf;
            
            dayWiseChartArray.push(chartBar);
        };
       
    updataTop();
    return dayWiseChartArray;
}

function updataTop(){
     window.grandlf=window.trpmsum/window.tasmsum;
        window.grandlyf=window.tlyFlownRpmsum/window.tlyFlownAsmsum;
        window.grandyoy=window.tYOYasmsum/window.tLYasmsum;
     window.tlylf=window.tLYasmsum/window.tLYrpmsum;
    window.grandprolf=window.lyFlownlf-window.tlylf+window.grandlf;
console.log(window.tlylf);
    $('#toplf').text(parseInt(window.grandlf*100)+'%');
    if(!isNaN(window.grandprolf)) $('#toppro').text(parseInt(window.grandprolf*100)+'%');
    else $('#toppro').text('75%');

    if(!isNaN(window.grandlyf))$('#toplyf').text(parseInt(window.grandlyf*100)+'%');
    else $('#toplyf').text(parseInt('100%'));

    $('#topyoy').text(parseInt(window.grandyoy*100)+'%');
}
