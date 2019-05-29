function loadMarketDropDown(rawData){

    var marketWiseDataa;
    if(window.isDummyData){
        rawData=window.marketWiseDummyData;
        marketWiseDataa= Array.from(d3.group(rawData, d => d.label), ([key, value]) => ({key, value}));
    } 
    else{
        marketWiseDataa= Array.from(d3.group(rawData, d => d.Roundtrip_Market), ([key, value]) => ({key, value}));
    } 
    
    //console.log(JSON.stringify(marketWiseDataa));
    $('#mktfilter')
    .empty()
    .append($('<option>', {
                value: 'All',
                text: 'All'
            }));

        $.each( marketWiseDataa, function( j, marketkeyval ) {
            var marketName= marketkeyval['key'];//Mkt_19
            
            $('#mktfilter').append($('<option>', {
                value: marketName,
                text: marketName
            }));
        });

    
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

    var regionWiseData= Array.from(d3.group(rawData, d => d.Region), ([key, value]) => ({key, value}));
    
    $.each( regionWiseData, function( i, keyval ) {
    
        var regionArr= keyval['value'];// All data of Asia
        var regionName= keyval['key'];//Asia

        var marketWiseData= Array.from(d3.group(regionArr, d => d.Roundtrip_Market), ([key, value]) => ({key, value}));
        
        $.each( marketWiseData, function( j, marketkeyval ) {
            var chartBar={};
            var marketArr= marketkeyval['value'];// All data of Mkt_19
            var marketName= marketkeyval['key'];//Mkt_19
            
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
            
        });
    });
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

        var dayWiseData= Array.from(d3.group(rawData, d => d.Departure_Date), ([key, value]) => ({key, value}));
        
        $.each( dayWiseData, function( j, daykeyval ) {
            var chartBar={};
            var dayArr= daykeyval['value'];// All data of Mkt_19
            var dayName= daykeyval['key'];//Mkt_19
            
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
        });
       
       updataTop();
    return dayWiseChartArray;
}

function updataTop(){
     window.grandlf=window.trpmsum/window.tasmsum;
        window.grandlyf=window.tlyFlownRpmsum/window.tlyFlownAsmsum;
        window.grandyoy=window.tYOYasmsum/window.tLYasmsum;
     window.tlylf=window.tLYasmsum/window.tLYrpmsum;
    window.grandprolf=window.lyFlownlf-window.tlylf+window.grandlf;

    $('#toplf').text(parseInt(window.grandlf*100)+'%');
    if(!isNaN(window.grandprolf)) $('#toppro').text(parseInt(window.grandprolf*100)+'%');
    else $('#toppro').text('75%');

    if(!isNaN(window.grandlyf))$('#toplyf').text(parseInt(window.grandlyf*100)+'%');
    else $('#toplyf').text(parseInt('100%'));

    $('#topyoy').text(parseInt(window.grandyoy*100)+'%');
}
