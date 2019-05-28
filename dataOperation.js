function prepareMarketWiseData(rawData){
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
            
            //Remove row from market arr when filter applied
            var rpmsum= d3.sum(marketArr, function(d) { return d.RPM; });
            var asmsum= d3.sum(marketArr, function(d) { return d.ASM; });

            var onedaymilesum= d3.sum(marketArr, function(d) { return d["1_DAY_MILES"]; });
            var threedaymilesum= d3.sum(marketArr, function(d) { return d["3_DAY_MILES"]; });
            var sevendaymilesum= d3.sum(marketArr, function(d) { return d["7_DAY_MILES"]; });

            var lyFlownRpmsum= d3.sum(marketArr, function(d) { return d.LY_FLOWN_RPM; });
            var lyFlownAsmsum= d3.sum(marketArr, function(d) { return d.LY_FLOWN_ASM; });
            var sevendayLYmilesum= d3.sum(marketArr, function(d) { return d["7_DAY_LY_MILES"]; });
            var LYasmsum= d3.sum(marketArr, function(d) { return d.LY_ASM; });
            var YOYasmsum= d3.sum(marketArr, function(d) { return d.YOY_ASM; });
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
       
    return marketWiseChartArray;
}


function prepareDayWiseData(rawData){
    var dayWiseChartArray=[];

        var dayWiseData= Array.from(d3.group(rawData, d => d.Departure_Date), ([key, value]) => ({key, value}));
        
        $.each( dayWiseData, function( j, daykeyval ) {
            var chartBar={};
            var dayArr= daykeyval['value'];// All data of Mkt_19
            var dayName= daykeyval['key'];//Mkt_19
            
            //Remove row from market arr when filter applied
            var rpmsum= d3.sum(dayArr, function(d) { return d.RPM; });
            var asmsum= d3.sum(dayArr, function(d) { return d.ASM; });

            var onedaymilesum= d3.sum(dayArr, function(d) { return d["1_DAY_MILES"]; });
            var threedaymilesum= d3.sum(dayArr, function(d) { return d["3_DAY_MILES"]; });
            var sevendaymilesum= d3.sum(dayArr, function(d) { return d["7_DAY_MILES"]; });

            var lyFlownRpmsum= d3.sum(dayArr, function(d) { return d.LY_FLOWN_RPM; });
            var lyFlownAsmsum= d3.sum(dayArr, function(d) { return d.LY_FLOWN_ASM; });
            var sevendayLYmilesum= d3.sum(dayArr, function(d) { return d["7_DAY_LY_MILES"]; });
            var LYasmsum= d3.sum(dayArr, function(d) { return d.LY_ASM; });
            var YOYasmsum= d3.sum(dayArr, function(d) { return d.YOY_ASM; });
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
       
    return dayWiseChartArray;
}


//  "Departure_Date": "5/29/2019",
//    "LY_Departure_Date": "5/30/2018",
//    "Departure_Day_of_Week": "Wednesday",
//    "LY_Departure_Day_of_Week": "Wednesday",
//    "Departure_Month": "19-May",
//    "LY_Departure_Month": "18-May",
//    "Region": "Asia",
//    "LY_Region": "Asia",
//    "Roundtrip_Market": "MKT_19",
//    "LY_Roundtrip_Market": "MKT_19",
//    "RPM": 502213,
//    "LY_RPM": 625708,
//    "YoY_RPM": -123495,
//    "ASM": 1811260,
//    "LY_ASM": 987960,
//    "YoY_ASM": 823300,
//    "Mileage": 8233,
//    "LY_Mileage": 8233,
//    "YoY_Mileage": 0,
//    "Total_Bookings": 61,
//    "LY_Total_Bookings": 76,
//    "YoY_Total_Bookings": -15,
//    "1_day_PU": 0,
//    "3_day_PU": 1,
//    "7_day_PU": 0,
//    "7_day_LY": 1,
//    "LY_FLOWN_RPM": 675106,
//    "LY_FLOWN_ASM": 987960,
//    "7_DAY_MILES": 0,
//    "7_DAY_LY_MILES": 8233,
//    "1_DAY_MILES": 0,
//    "3_DAY_MILES": 8233