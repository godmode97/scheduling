(function(){

    //load all data

    /** 
     * @param {*} element 
     */
    var $=function(element){
        var elem=Array.from(document.querySelectorAll(element))
        if(elem.length===1){
            return elem[0]
        }
        else return elem;
    }
    
    /**
     * 
     * @param {string} elem 
     * @param {string} value 
     */
    
    var render=function(elem,value){
        $(elem).innerHTML+=value
    }
    /**
     * set attribute to an element
     * @param {*} elem 
     * @param {*} attribute 
     * @param {*} value 
     */
    var setAttribute=function(elem,attribute,value){
        if($(elem).length>0){
            $(elem).forEach()
        }
        else{
            $(elem).setAttribute(attribute,value)
        }
    }
 
    
    //load time object
    var timein=function(){
        var start=7,arr=[],_tm=0,_ct=0, i=0,pm=false
        for(i=7 ; i<=12 ; i++){
            // console.log(i)
            _tm++
            arr.push({
                data:`${i}:00`,
                time:`${i}:00`,
                value:`${i}:00 ${(pm)?"pm":"am"}`,
                index:_tm
            })
            arr.push({
                data:`${i}:30`,
                time:`${i}:30`,
                value:`${i}:30 ${(pm)?"pm":"am"}`,
                index:_tm+=1
            })
            if(i==12){
                i=0
                start=0
                pm=true
                _ct+=1
                if(_ct>1)break
            }
            
        }
        return arr
    }
    
    var tblData=function(){
        var _time=timein().filter(i=>i.index<=29),str=''
        str+=`<table>
        <tr>
            <td colspan="9">Schedule for BSCS 4 B</td>
        </tr>
        <tr>
            <td>Time In</td>
            <td>Monday</td>
            <td>Tuesday</td>
            <td>Wednesday</td>
            <td>Thursday</td>
            <td>Friday</td>
            <td>Saturday</td>
            <td>Sunday</td>
            <td>Time Out</td>
        </tr>
        `
        
        for(var i=0 ; i<_time.length; i++)    
        {
            var timeout=i+1,out=(timeout>=_time.length)?i:i+1
            str+=`<tr>
                <td data-timeIn="${_time[i].data}">${_time[i].value}</td>
                <td data-day="MON" data-time="${_time[i].data}" data-id="${_time[i].index}"></td>
                <td data-day="TUE" data-time="${_time[i].data}" data-id="${_time[i].index}"></td>
                <td data-day="WED" data-time="${_time[i].data}" data-id="${_time[i].index}"></td>
                <td data-day="THURS" data-time="${_time[i].data}" data-id="${_time[i].index}"></td>
                <td data-day="FRI" data-time="${_time[i].data}" data-id="${_time[i].index}"></td>
                <td data-day="SAT" data-time="${_time[i].data}" data-id="${_time[i].index}"></td>
                <td data-day="SUN" data-time="${_time[i].data}" data-id="${_time[i].index}"></td>
                <td data-timeOut="${_time[out].data}">${_time[out].value}</td>
                
            </tr>
            `
        }    
        
        str+=`
        <tr>
            <td>Time In</td>
            <td>Monday</td>
            <td>Tuesday</td>
            <td>Wednesday</td>
            <td>Thursday</td>
            <td>Friday</td>
            <td>Saturday</td>
            <td>Sunday</td>
            <td>Time Out</td>
        </tr>
        </table>`
        return str;
    }
    
    var time_in=function(data){
        var str='';
        data.forEach(function(data){
            str+=`<option value="${data.index}"> ${data.value} </option>`
        })
        return str;
    }
    var filterTime=function(_in,_out,_day){
        var days=$(`td[data-day="${_day}"]`)
        var selectedDay=days.filter(day=> day.dataset.id>=_in && day.dataset.id<=(_out-1) )
        console.log(`in is ${_in} and out is ${_out} and day is ${_day}`)
        // console.log(selectedDay)
        return selectedDay
    }
    



    window.onload=function(){
        var _time=timein().filter(i=>i.index<=29),str='',_in=1,_out=1,sday="MON"
        render('#app',`
            <div id="schedule">
            </div>
        `)
        render('#schedule',tblData())
        render('#app',`<div class="sched-option"></div>`)
        render('.sched-option',`
            <select id="timein">
                ${time_in(_time)}
            </select>
        `)
        render('.sched-option',`
        <select id="timeout">
            ${time_in(_time)}
        </select>
    `)
        
        $('.time>div').forEach(day=>{
            
            day.onclick=function(){
                 sday=this.innerText
            }
            
        })

        $('#timeout').onchange=function(){
            
            var filtered=filterTime(_in,this.value,sday)
            
            filtered.forEach(function(value){
                
                setTimeout(function(){
                    value.style.backgroundColor="blue",
                    value.style.border=0
                },500)
                
                console.log(value)
            })
        }
        $('#timein').onchange=function(){
            _in=this.value
        }
        
    }
})()
