
// ==UserScript==
// @name         Diagnostic Links for BackOffice
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds links for easy access to Diag reports
// @author       Ty Wark
// @match        https://lightspeedanalytics.net/cl_accounts/settings
// @match        https://app.lightspeedanalytics.net/embed/explore/*
// @match        https://app.lightspeedanalytics.net/embed/*
// @run-at      document-idle
// @grant       GM_addStyle
// ==/UserScript==

//Documentation found here https://lightspeedhq.atlassian.net/wiki/spaces/CLOUD/pages/139441487/Looker+Diagnostic+Analytics+Reports
/* globals jQuery, $, waitForKeyElements */


var SubResp = new Object
var ParseResp = new Array
var table










//2D Array Test 1
// Report Name, Link, Header?
// headers = reportbank[i][2]
//reportname = reportbank[i][0]
//reportlinks = reportbank[i][1]
//Do not remove spacer null at 0
let reportbank = [

    ["",null,false],
    ["Sync Checks", null, true],
    ["Sales Present Past 365 Days","https://app.lightspeedanalytics.net/embed/explore/new_sf_sales/sales?qid=jKA7qENU1KlYvCjbg5Zjba&embed_domain=lightspeedanalytics.net&origin_space=315&toggle=fil,vis", false],
    ["Sales by Year: Past 10 Years","https://app.lightspeedanalytics.net/embed/explore/new_sf_sales/sales?qid=amHFyexUG80uP3RDff0iqE&embed_domain=lightspeedanalytics.net&origin_space=315&toggle=pik,vis",false],
    ["Jumps in Sales between days","https://app.lightspeedanalytics.net/embed/explore/new_sf_sales/sales?qid=lRPkhV3SUHMnysYAxqltbp&embed_domain=lightspeedanalytics.net&origin_space=315&toggle=pik,vis",false],
    ["Sales, past 168 hours","https://app.lightspeedanalytics.net/embed/explore/new_sf_sales/sales?qid=jgJbEMz8XHxsdqV34PercV&embed_domain=lightspeedanalytics.net&origin_space=315&toggle=vis",false],
    ["Time Since Last Sale","https://app.lightspeedanalytics.net/embed/explore/new_sf_sales/sales?qid=6J3UxePwusx7i9fSQZCaRU&embed_domain=lightspeedanalytics.net&origin_space=315&toggle=vis",false],
    ["Sale Reports",null,true],
    ["Sale Summary: Retail Alignment","https://app.lightspeedanalytics.net/embed/explore/new_sf_sales/sales?qid=mKmfySKWm3x1HEcay5Pvn4&embed_domain=lightspeedanalytics.net&origin_space=315&toggle=dat,fil,vis",false],
    ["Absent Sales","https://app.lightspeedanalytics.net/embed/explore/new_sf_sales/sales?qid=ICMTCNBoqUDU7qani8L7my&embed_domain=lightspeedanalytics.net&origin_space=315&toggle=vse",false],
    ["Absent Sales by Day of Month","https://app.lightspeedanalytics.net/embed/explore/new_sf_sales/sales?qid=j36wWrRRvYUwfEBNq8VY0h&embed_domain=lightspeedanalytics.net&origin_space=315&toggle=dat,pik,vis",false],
    ["Absent Sales by Day of Week","https://app.lightspeedanalytics.net/embed/explore/new_sf_sales/sales?qid=pV5q25xnyzRptoBnSSjXkr&embed_domain=lightspeedanalytics.net&origin_space=315&toggle=dat,pik,vis",false],
    ["Sale Employee vs. Sale Line Employee","https://app.lightspeedanalytics.net/embed/explore/new_sf_sales/sales?qid=1SJP9Srz3IGsy2vtwAIoIN&embed_domain=lightspeedanalytics.net&origin_space=315&toggle=pik,vis",false],
    ["Years of Sales","https://app.lightspeedanalytics.net/embed/explore/new_sf_sales/sales?qid=EctD9g1ka8JOVuhkCjWBlb&embed_domain=lightspeedanalytics.net&origin_space=315&toggle=dat,pik,vis",false],
    ["Item Reports",null,true],
    ["Ghost Stores","https://app.lightspeedanalytics.net/embed/explore/new_sf_item_metrics/items?qid=6Nod7PyHGxojSsg4WlaAFV&embed_domain=lightspeedanalytics.net&origin_space=54&toggle=fil,vse",false],
    ["Duplicate Products by Name","https://app.lightspeedanalytics.net/embed/explore/new_sf_item_metrics/items?qid=I1bOLrlm2UA0MMECfVQSf2&embed_domain=lightspeedanalytics.net&origin_space=54&toggle=dat,vis",false],
    ["Items Archived over Time","https://app.lightspeedanalytics.net/embed/explore/new_sf_item_metrics/items?qid=DsIoAZEDOVMsCgmnLud3xK&embed_domain=lightspeedanalytics.net&origin_space=54&toggle=dat,vis,vse",false],
    ["Negative Inventory","https://app.lightspeedanalytics.net/embed/explore/new_sf_item_metrics/items?qid=wUQ4Mg7bhgfcZBiLYFMvQs&embed_domain=lightspeedanalytics.net&origin_space=54&toggle=fil,vse",false],
    ["Dusty Configured","https://app.lightspeedanalytics.net/embed/explore/new_sf_item_metrics/items?qid=GO4jGpTtIqnsUMzAUc7iPa&embed_domain=lightspeedanalytics.net&origin_space=54&toggle=fil,vse",false],
    ["Dusty by Location","https://app.lightspeedanalytics.net/embed/explore/new_sf_item_metrics/items?qid=VWp0ci1bRDmIifaMVvDGdX&embed_domain=lightspeedanalytics.net&origin_space=54&toggle=vis",false],
    ["System ID For Excel  - Simple","https://app.lightspeedanalytics.net/embed/explore/new_sf_item_metrics/items?qid=bQup2LErxzOH9SEu8oO6vr&embed_domain=lightspeedanalytics.net&origin_space=54&toggle=fil,vis",false],
    ["System ID For Excel - ID + QOH","https://app.lightspeedanalytics.net/embed/explore/new_sf_item_metrics/items?qid=CyG5G6gnKXadwoI4aWhfAD&embed_domain=lightspeedanalytics.net&origin_space=54&toggle=vis",false],
    ["System ID for Excel - ID, Qoh, Pivoting by Store","https://app.lightspeedanalytics.net/embed/explore/new_sf_item_metrics/items?qid=VVVFn4fcTiyuMjrhPOBtiv&embed_domain=lightspeedanalytics.net&origin_space=54&toggle=vis",false],
    ["QSold on Items","https://app.lightspeedanalytics.net/embed/explore/new_sf_item_metrics/items?qid=9MOX5G6jMcQvJ81t5SstbE&embed_domain=lightspeedanalytics.net&origin_space=54&toggle=pik",false],
    ["Qsold on Items by Store","https://app.lightspeedanalytics.net/embed/explore/new_sf_item_metrics/items?qid=6yYqZCGw5ynjNIrBzdVSgz&embed_domain=lightspeedanalytics.net&origin_space=54&toggle=pik",false],
    ["Quantities in Boxes","https://app.lightspeedanalytics.net/embed/explore/new_sf_item_metrics/items?qid=dJweHQB7BZcI05BVwCGwUR&embed_domain=lightspeedanalytics.net&origin_space=54&toggle=dat,pik,vis",false],
    ["Hidden Spaces in Names","https://app.lightspeedanalytics.net/embed/explore/new_sf_item_metrics/items?qid=bqTNG4NjZpSPWJE2mEbfyg&embed_domain=lightspeedanalytics.net&origin_space=54&toggle=pik,vis",false],
    ["High-Character Descriptions","https://app.lightspeedanalytics.net/embed/explore/new_sf_item_metrics/items?qid=GqWcHUb9XIpX9iUfK8h3cI&embed_domain=lightspeedanalytics.net&origin_space=54&toggle=fil",false],
    ["Items by Character Length","https://app.lightspeedanalytics.net/embed/explore/new_sf_item_metrics/items?qid=CtjNbSA8A9vWOFZKF2tKIj&embed_domain=lightspeedanalytics.net&origin_space=54&toggle=dat,fil,pik,vis",false],
    ["Last Character is a Space?","https://app.lightspeedanalytics.net/embed/explore/new_sf_item_metrics/items?qid=jYqwdTCWkN0CVRiOeG0MsJ&embed_domain=lightspeedanalytics.net&origin_space=54&toggle=vis",false],
    ["Forward Slashes in Categories?","https://app.lightspeedanalytics.net/embed/explore/new_sf_item_metrics/items?qid=IPueVqn4rEbXztt2VdWA21&embed_domain=lightspeedanalytics.net&origin_space=54&toggle=pik,vis",false],
    ["Categories with Forward Slashes","https://app.lightspeedanalytics.net/embed/explore/new_sf_item_metrics/items?qid=NOnK7dAjsbpAs4e8aWNvjy&embed_domain=lightspeedanalytics.net&origin_space=54&toggle=vis",false],
    ["On Order Reports",null,true],
    ["Items by Vendor Count","https://app.lightspeedanalytics.net/embed/explore/sf_on_order/cl_items_on_order?qid=g73agGz2CAqu0s1cstfp5i&embed_domain=lightspeedanalytics.net&origin_space=54&toggle=vis",false],
    ["Purchasing Patterns?","https://app.lightspeedanalytics.net/embed/explore/sf_on_order/cl_items_on_order?qid=j6yhli7IVTq6ZwF7V93ra1&embed_domain=lightspeedanalytics.net&origin_space=54&toggle=vis",false],
    ["Testing Variance",null,true],
    ["QSold on Items","https://app.lightspeedanalytics.net/embed/explore/new_sf_sales/sales?qid=wQnSiplBwizvXRAhhQ9QgS&embed_domain=lightspeedanalytics.net&origin_space=315&toggle=vis",false],
    ["QSold on Sales","https://app.lightspeedanalytics.net/embed/explore/new_sf_sales/sales?qid=wQnSiplBwizvXRAhhQ9QgS&embed_domain=lightspeedanalytics.net&origin_space=315&toggle=vis",false],
    ["Un-Included Categories?","https://app.lightspeedanalytics.net/embed/explore/new_sf_item_metrics/items?qid=8UySSjNch2YjK05sxCSyVP&embed_domain=lightspeedanalytics.net&origin_space=54&toggle=dat,pik,vis",false],
    ["Summary Un-Included Categories","https://app.lightspeedanalytics.net/embed/explore/new_sf_item_metrics/items?qid=zcvyqEQWSP4tzym6QT1Zoo&embed_domain=lightspeedanalytics.net&origin_space=54&toggle=pik,vis",false],
    ["Positive and Negative Included Costs","https://app.lightspeedanalytics.net/embed/merge?embed_domain=lightspeedanalytics.net&mid=Te3kxff1km1NrVIgMj82Fa&toggle=dat,mrp,vis",false],
    ["Summary/ Positive/Negative/Included/Not-Included","https://app.lightspeedanalytics.net/embed/merge?embed_domain=lightspeedanalytics.net&mid=rjxgFyMi2XNuDOG4oefIwr&toggle=dat,mrp,vis",false],
    ["Summary/Pos&Neg/Null Shops/Inc&Not Inc","https://app.lightspeedanalytics.net/embed/merge?embed_domain=lightspeedanalytics.net&mid=F8Y0DlWN1aRxHlQaFrLA1v&toggle=dat,mrp,vis",false],
    ["Dynamic reorders / Demand Forecasting",null,true],
    ["Will Work on Dynamic Reorders","https://app.lightspeedanalytics.net/embed/explore/new_sf_item_metrics/items?qid=kRrA4MJiT3kQoy02iqyOIN&embed_domain=lightspeedanalytics.net&origin_space=54&toggle=vis",false],
    ["Summary of Missing Items","https://app.lightspeedanalytics.net/embed/explore/new_sf_item_metrics/items?qid=NG1M12mJriU13oJNNYwsbH&embed_domain=lightspeedanalytics.net&origin_space=54&toggle=pik,vis",false],
    ["In Sales Range / Out of Sales Range by Category","https://app.lightspeedanalytics.net/embed/explore/new_sf_item_metrics/items?qid=KVG9MAfIdnFL8JoEza6Ylv&embed_domain=lightspeedanalytics.net&origin_space=54&toggle=pik,vis",false],
    ["Item Details","https://app.lightspeedanalytics.net/embed/explore/new_sf_item_metrics/items?qid=u7MTpD5gsmdbdoiSqwzTpO&embed_domain=lightspeedanalytics.net&origin_space=54&toggle=pik",false],
    ["Special Characters in Items (Kind of Heavy)","https://app.lightspeedanalytics.net/embed/explore/new_sf_item_metrics/items?qid=4uxDE7GI5dnneev0XykzHX&embed_domain=lightspeedanalytics.net&origin_space=54&toggle=dat,vis",false],
    ["CLV Reports",null,true],
    ["Duplicate Customers","https://app.lightspeedanalytics.net/embed/explore/new_sf_customer_facts/customers?qid=JF46t192qBwiPR2zJ4tvXv&embed_domain=lightspeedanalytics.net&origin_space=46&toggle=dat,vis",false],
    ["Enterprise Accounts",null,true],
    ["Days Since Last Sale by Account","https://app.lightspeedanalytics.net/embed/explore/new_sf_sales/sales?qid=siFro1a365Z5DBdxO4ycyK&embed_domain=lightspeedanalytics.net&origin_space=315&toggle=dat,pik,vis",false],


]




//reportlinksvis = customdashinfo[i][0]
//reportnamevis = customdashinfo[i][1]
// Report Name, Link
var customdashinfo = [

    ["Sales Present Past 365 Days","https://app.lightspeedanalytics.net/embed/explore/new_sf_sales/sales?qid=jKA7qENU1KlYvCjbg5Zjba&embed_domain=lightspeedanalytics.net&origin_space=315&toggle=fil,vis"],
    ["Sales, past 168 hours","https://app.lightspeedanalytics.net/embed/explore/new_sf_sales/sales?qid=jgJbEMz8XHxsdqV34PercV&embed_domain=lightspeedanalytics.net&origin_space=315&toggle=vis"],
    ["Summary of Missing Items","https://app.lightspeedanalytics.net/embed/explore/new_sf_item_metrics/items?qid=NG1M12mJriU13oJNNYwsbH&embed_domain=lightspeedanalytics.net&origin_space=54&toggle=pik,vis"],
    ["Possible Cost Variance","https://app.lightspeedanalytics.net/embed/merge?embed_domain=lightspeedanalytics.net&mid=VB3903Tgdqpzcjy9oXu72v&toggle=dat,mrp,pik,vis"],




]





//List Out Report Function
var CreateReportList = function CreateList(){
    setTimeout(function() {


        for (let i = 0; i < reportbank.length; i++) {





            //Check to see if this is a spacer line + reset the namecheck per loop
            var namecheck = false
            if (reportbank[i][2] == true)
            {namecheck = true}

            //console.log(namecheck)


            //Find Box and reset link
            var docselect = document.querySelector("#react-root > div > div > section");
            document.createElement('div');
            var link = ""



            // If Spacer, Add extra LineBreak
            if (namecheck == true) {
                docselect.appendChild(document.createElement("br"));

            }



            // If Spacer, do not link. Else, create "A" record
            if (namecheck != true) {
                link = document.createElement("a")
            }
            else{ link = document.createElement("div")}


            //Assign text for button
            var linkText = document.createTextNode(reportbank[i][0]);
            link.appendChild(linkText);

            // If Spacer, do not link, else assign link to text
            if (namecheck != true) {
                link.href = reportbank[i][1] + "&title=" + reportbank[i][0];

            }


            //Create Text
            docselect.appendChild(link);

            // If Spacer, do not link
            if (namecheck != true) {
                docselect.appendChild(document.createElement("br"));
            }

        }
    },

               //Delay. Keep above 1.5 seconds to allow consistant loading
               3000);


}










//Display Table
//console.table(reportbank)






//____________________________________________________________________________________________________Create Button_______________________________________________________________________________________________________________________________________________________________________________


if (window.top === window.self) {

    var zNode = document.createElement ('div');
    zNode.innerHTML = '<button id="myButton" type="button">'
        + 'Run Diagnostics!</button>'
    ;
    zNode.setAttribute ('id', 'myContainer');
    document.body.appendChild (zNode);

    //--- Activate the newly added button.
    document.getElementById ("myButton").addEventListener (
        "click", ButtonClickAction, false
    );





    //________________________________________________________________________________________________Button Click Event_____________________________________________________________________________________________________________________________________________________________________________________________________________
    function ButtonClickAction (zEvent) {










        // Fire Primer
        setTimeout(function(){

            var windowfire = window.open("https://lightspeedanalytics.net/category/1/reports/42719")
            windowfire.blur() //Doesnt work?
            window.top.focus()
            setTimeout(function(){
                console.log(windowfire.name)
                console.log(windowfire.close())
            },4000)
        },100)
        //         setTimeout(function(){window.focus},500)



        document.querySelector("#react-root > div > div > section").style.width = "160%"
        document.querySelector("#react-root > div > div > section").style.marginLeft = "-25%"




        if (window.top === window.self) {


            //_____________________________________________________________________________________________________________________Custom Dash _____________________________________________________________________________________________________________________

















            for (let i = 0; i < customdashinfo.length; i++) {



                //Draw iFrames. Limit how many we want to open to prevent key revoke



                var ifrm = document.createElement("iframe");
                ifrm.setAttribute("src", customdashinfo[i][1] + "&title=" +customdashinfo[i][0]);
                ifrm.style.width = "800px";
                ifrm.setAttribute("sandbox", "allow-scripts allow-same-origin")
                ifrm.setAttribute("id","iframes"+[i])
                ifrm.style.height = "400px";
                ifrm.style.border = "2px solid red;"
                document.querySelector("#react-root > div > div > section").appendChild(ifrm)
                console.log("Dash"+ i+" " +customdashinfo[i][1] + "&title=" +customdashinfo[i][0])

                //   await sleepNow(1000)

            }




            // Remove Textboxes for login info
            setTimeout(function() {
                var element = document.querySelector("#react-root > div > div > section > p")
                delete element
                element.remove()

                element = document.querySelector("#react-root > div > div > section > div:nth-child(2)")
                delete element
                element.remove()
            }, 1000);


            var bar = document.querySelector("#o-wrapper > header")
            //bar.style.height = "20%"
            var helpbar = document.querySelector("#o-wrapper > header > nav > section")
            helpbar.remove()
            delete helpbar
        }




        //Delete Button
        document.getElementById ("myContainer").remove()


        // Create Second Button after first was pressed


        var zNode = document.createElement ('div');
        zNode.innerHTML = '<button id="myButton2" type="button">'
            + 'List Reports!</button>'
        ;
        zNode.setAttribute ('id', 'myContainer2');
        document.body.appendChild (zNode);

        //--- Activate the newly added button.
        document.getElementById ("myButton2").addEventListener (
            "click", ButtonClickAction, false
        );







       //INSERT THE NEW DLC
            if (document.URL == "https://lightspeedanalytics.net/cl_accounts/settings"){

                Engine()

            }



        //________________________________________________________________________________________________Button Click Event_____________________________________________________________________________________________________________________________________________________________________________________________________________
        function ButtonClickAction (zEvent) {
            //Append the Reports below the iFrames and delete second button
            CreateReportList()
            document.getElementById ("myContainer2").remove()

        }






    }


    GM_addStyle ( `
    #myContainer {
        position:               absolute;
        top:                    0;
        left:                   100px;
        font-size:              20px;
        background:             orange;
        border:                 3px outset black;
        margin:                 5px;
        opacity:                0.9;
        z-index:                1100;
        padding:                5px 20px;
    }
    #myButton {
        cursor:                 pointer;
    }
    #myContainer p {
        color:                  red;
        background:             white;
    }
` );

    GM_addStyle ( `
    #myContainer2 {
        position:               absolute;
        top:                    0;
        left:                   100px;
        font-size:              20px;
        background:             orange;
        border:                 3px outset black;
        margin:                 5px;
        opacity:                0.9;
        z-index:                1100;
        padding:                5px 20px;
    }
    #myButton2 {
        cursor:                 pointer;
    }
    #myContainer2 p {
        color:                  red;
        background:             white;
    }
` );






}







//____________________________________________________________________________________________________________IFRAME ONLY CODE BEYOND_______________________________________________________________________________________________________________________________________


else{


    //detect if iframe belongs to diag tool or other
    if (document.documentElement.clientWidth == 800) {


        setTimeout(function () {

            try{




                let url = document.URL
                var type = url.includes("merge")

                if (type == false){
                    //delete Filter
                    document.querySelector("#lk-react-container > div > div > div > section > explore-subrouter > ui-view > lk-explore-dataflux > div.center > lk-explore-content > div > div > lk-filter-pane").remove();
                    //delete Vis Bar
                    document.querySelector("#lk-react-container > div > div > div > section > explore-subrouter > ui-view > lk-explore-dataflux > div.center > lk-explore-content > div > div > lk-vis-pane > lk-expandable-pane > div.titlebar.open").remove();
                    //delete Data
                    document.querySelector("#lk-react-container > div > div > div > section > explore-subrouter > ui-view > lk-explore-dataflux > div.center > lk-explore-content > div > div > lk-data-pane").remove();
                    //Delete Nav
                    document.querySelector("#lk-react-container > div > div > div > section > explore-subrouter > ui-view > lk-explore-dataflux > div.center > lk-expandable-sidebar").remove();
                }
                else{


                    // Delete Merge Filter
                    document.querySelector("#lk-embed-container > lk-merge > div.center > lk-merge-content > div > div > lk-merge-rules-pane").remove();
                    // Delete Merge Nav Bar
                    document.querySelector("#lk-embed-container > lk-merge > div.center > lk-expandable-sidebar").remove()
                    // Delete Merge Data
                    document.querySelector("#lk-embed-container > lk-merge > div.center > lk-merge-content > div > div > lk-data-pane").remove()
                    // Delete Merge Vis Bar
                    document.querySelector("#lk-embed-container > lk-merge > div.center > lk-merge-content > div > div > lk-vis-pane > lk-expandable-pane > div.titlebar.open").remove()

                }


            }
            catch(err)

            {console.log(document.URL + "\n" + type +err )}




        }, 8000);

    }
}












async function GetSubs(){


    await fetch("https://lightspeedanalytics.net/account-admin/subscriptions", {
        "headers": {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "max-age=0",
          "upgrade-insecure-requests": "1"
        },
        "referrer": "https://lightspeedanalytics.net/enterprises/33",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "same-origin"
      }) .then(function(response) {
        return response.text();
      }).then(function(data) {
        SubResp = data; // this will be a string
      });




}


function Slicer(String){
    String = String.split('table-responsive')[1]
    String = String.split('/section')[0]
    String = String.split('</tr>')
    console.log(String)
    return String

}



function CleanResp(array){
    for (let i = 0; i < array.length; i++) {
     array[i] = array[i].replaceAll(" ","")
     array[i] = array[i].replaceAll("\n","")
     array[i] = array[i].replaceAll("<td>","")
     array[i] = array[i].replaceAll("<tr>","")
     array[i] = array[i].replaceAll("<tdclass=","")
     array[i] = array[i].split('</td>')
    }
console.log(array)
array = array
}



function CleanSubArray(ParentArray){

for (let i = 0; i < ParentArray.length; i++) {


    ParentArray[i].pop()
    ParentArray[i].pop()
    try{ParentArray[i][3] = ParentArray[i][3].substring(46,ParentArray[i][3].length-1)}catch{null}



    //Button Data ID NOT REPORT ID
    //try{ParentArray[i].push(ParentArray[i][1].substring(7,12))}catch{null}

    for (let t = 0; t < ParentArray[i].length; t++) {
    try{ParentArray[i][t] = ParentArray[i][t].split('">')}catch{null}
     try{ParentArray[i][t] = ParentArray[i][t].split('"subscriptions">')}catch{null}
     try{ParentArray[i][t] = ParentArray[i][t].split('"subscriptions">')}catch{null}
     try{
        if(ParentArray[i][t].length == 2){
            ParentArray[i][t] = ParentArray[i][t][1]
        }else{ParentArray[i][t] = ParentArray[i][t][0]}
    }
   catch{null}

     //console.log(ParentArray[i][t])
     if(ParentArray[i][3].length == 15){

        ParentArray[i][3] = "enabled"

     }
   }

}

console.log(ParentArray)
ParentArray = ParentArray

}

//Build and Display Table
function BuildTable(array) {
    //setup our table array
    var tableArr = array
    //create a Table Object
    table = document.createElement('table');
    //iterate over every array(row) within tableArr
    for (let row of tableArr) {
        //Insert a new row element into the table element
        table.insertRow();
        //Iterate over every index(cell) in each array(row)
        for (let cell of row) {
            //While iterating over the index(cell)
            //insert a cell into the table element
            let newCell = table.rows[table.rows.length - 1].insertCell();
            //add text to the created cell element
            newCell.textContent = cell;
        }
    }
    table.style.border = "1px solid red"
    table.setAttribute("id", "maintable")
    document.querySelector("#react-root > div > div > section").append(table);
}



function CheckEmails(){

    let numberofrows = 0
    try{
        numberofrows = document.querySelector("#maintable > tbody").childElementCount
    }catch{
        numberofrows = 1
    }

    for (let i =1; i < numberofrows; i++){
        if(i !=1){
        let query = document.querySelector(`#maintable > tbody > tr:nth-child(${i}) > td:nth-child(1)`)
        console.log(isValidEmail(query.innerText))
        if(isValidEmail(query.innerText)==false){
            query.style.backgroundColor = "red"
        }

        }


     }




}


function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}




async function Engine(){

    await GetSubs()
    ParseResp = Slicer(SubResp)
    ParseResp.shift()
    CleanResp(ParseResp)
    CleanSubArray(ParseResp)
    ParseResp.unshift(["Recepient Email","Report Name","Sending Freq","Alert Mode?","Subscription Creator"])
    BuildTable(ParseResp)
    CheckEmails()



}









