(function(){

    //load all data

    /** create a selector
     * @param {*} element 
     */
    var $=function(element){
        var elem=Array.from(document.querySelectorAll(element))
        if(elem.length===1){
            return elem[0]
        }
        else return elem;
    }

    $().__proto__.on=function(action){
        // if(typeof e==='string' && typeof fcn==='function'){
        //     return this.addEventListener(`on${e}`,fcn())
        // }
        // else throw new Error('Parameter 1 expects to be string, 2 is function')
        // console.log(this)
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
    
    /**
     * declare variable {day} for days in schedule
     * declare {color} for subject distinction
     */

    var day=["MON","TUE","WED","THURS","FRI","SAT","SUN"],
    color=["#34495e","#2980b9","#27ae60","#e67e22","#f1c40f","#c0392b","#1abc9c","#d35400","#2c3e50","#e74c3c","8e44ad","d35400","16a085"],
    time=[],room=["301","302","303"],
    error={
        title:"Error Message",
        error_list:[]
    },
    loadDefault={
        color:"#363636",
        timeColor:"#151336",

    }
    //load time object
    
    var timein=function(){
        var start=7,arr=[],_tm=0,_ct=0, i=0,pm=false
        for(i=7 ; i<=12 ; i++){
            _tm++
            if(i==12){
                i=0
                start=0
                pm=true
                _ct+=1
                if(_ct>1)break
            }
            arr.push({
                data:`${(i==0)?12:i}:00`,
                time:`${(i==0)?12:i}:00`,
                value:`${(i==0)?12:i}:00 ${(pm)?"pm":"am"}`,
                index:_tm
            })
            arr.push({
                data:`${(i==0)?12:i}:30`,
                time:`${(i==0)?12:i}:30`,
                value:`${(i==0)?12:i}:30 ${(pm)?"pm":"am"}`,
                index:_tm+=1
            })
            
            
        }
        // console.log(arr)
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
            <td data-day="MON">Monday</td>
            <td data-day="TUE">Tuesday</td>
            <td data-day="WED">Wednesday</td>
            <td data-day="THURS">Thursday</td>
            <td data-day="FRI">   Friday   </td>
            <td data-day="SAT">Saturday</td>
            <td data-day="SUN">Sunday</td>
            <td>Time Out</td>
        </tr>
        `
        var timeout=0;
        for(var i=0 ; i<_time.length; i++)    
        {
            timeout=i+1,out=(timeout>=_time.length)?i:i+1
            str+=`<tr>
                <td data-timeIn="${_time[i].index}">${_time[i].value}</td>
                <td data-day="MON" data-time="${_time[i].data}" data-id="${_time[i].index}"></td>
                <td data-day="TUE" data-time="${_time[i].data}" data-id="${_time[i].index}"></td>
                <td data-day="WED" data-time="${_time[i].data}" data-id="${_time[i].index}"></td>
                <td data-day="THURS" data-time="${_time[i].data}" data-id="${_time[i].index}"></td>
                <td data-day="FRI" data-time="${_time[i].data}" data-id="${_time[i].index}"></td>
                <td data-day="SAT" data-time="${_time[i].data}" data-id="${_time[i].index}"></td>
                <td data-day="SUN" data-time="${_time[i].data}" data-id="${_time[i].index}"></td>
                <td data-timeOut="${_time[out].index}">${_time[out].value}</td>
            </tr>
            `
        }
        // $(`table`).removeChild($(`tr:nth-child(${_time.length})`))
        
        str+=`
        <tr>
            <td>Time In</td>
            <td data-day="MON">Monday</td>
            <td data-day="TUE">Tuesday</td>
            <td data-day="WED">Wednesday</td>
            <td data-day="THURS">Thursday</td>
            <td data-day="FRI">Friday</td>
            <td data-day="SAT">Saturday</td>
            <td data-day="SUN">Sunday</td>
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
    /**
     * filter inputted time
     * 
     * @param {*} _in 
     * @param {*} _out 
     * @param {*} _day 
     */
    var filterTime=function(_in,_out,_day="MON"){
        
        var selectedDay=[] //create an empty array of time in a day
        if(parseInt(_out)>parseInt(_in)){
            var days=$(`td[data-day="${_day}"]`)
            return selectedDay=days.filter(day=> day.dataset.id>=parseInt(_in) && day.dataset.id<parseInt(_out)) 
        }//check if time out is greater than time in
        else return selectedDay=[] // if non matches, returns an empty array
        // return selectedDay
    }

    /**
     * check overlapping schedules
     * 
     * @param {*} time1 collection
     * @param {*} time2 1 node
     * 
     */
    var checkOverlap=function(time1,_day=""){
        
        const finDay=Array.from(document.querySelectorAll('td'))
        const filtered=finDay.filter(i=>i.dataset.day==_day && i.dataset.index>=0).map(i=>parseInt(i.dataset.id))
        filtered.push(filtered[filtered.length]+1)
        const basis=time1.map(i=>parseInt(i.dataset.id))
        var arr=[]

        var hasOverlap=false

        basis.forEach(function(i){
            hasOverlap=filtered.some(tm=>tm==parseInt(i))
            // console.log([i,...filtered])
            arr.push(hasOverlap)
        })

        return arr.some(i=>i==true)
    }

    var initializeDOM=function(){
        
        //render schedule holder
        render('#app',`
            <div id="schedule">
            </div>
        `)

        //render schedule data
        render('#schedule',tblData())

        //remove excess data of schedule data
        $(`tbody`).removeChild($(`tr:nth-child(31)`))

        //render schedule controls holder
        render('#schedule',`<div class="sched-option"></div>`)

        //render controls

        render('.sched-option',`
            <select id="timein">
                ${timein().map(tm=>`<option value='${tm.index}'>${tm.value}</option>`)}
            </select>
            
        `)
        render('.sched-option',`
            <select id="timeout">
                ${timein().map(tm=>`<option value='${tm.index}'>${tm.value}</option>`)}
            </select>
        `)
        render('.sched-option',`
        <select id="day">
            ${day.map(dy=>`<option>${dy}</option>`)}
        </select>
        `)
        render('.sched-option',`
        <select id="room">
            ${room.map(rm=>`<option>${rm}</option>`)}
        </select>
        `)
        render('.sched-option',`
            <input type="button" value="Add Schedule">
        `)
        //render overlay holder for modal       
        render('body',`
                    <div class="overlay" data-shown="true"></div>
            `)

        //render modal
        render('.overlay',`
        <div class="modal">
            <div class="modal-header">
                <h2></h2>
            </div>
            <div class="modal-body">
                <h3>Possible Error:</h3>
                <ul>
                    ${error.error_list.map(el=>`<li>${el}</li>`)}
                </ul>
            </div>
            <div class="modal-button">
                
                <button>OK</button>
            </div>
        </div>
        `)
        
        
    }
    
    var showMessage=function(message="",messageContent="",messageInfo,color=""){
        //show modal
        $('.overlay').classList.add('show')
        $('.modal').classList.add('modal-show')
        $('.modal-header>h2').style.background=colorLuminance(color,0)
        $('.modal-button>button').style.background=colorLuminance(color,0.3)
        $('.modal-button').style.background=colorLuminance(color,-0.2)
        if(typeof message==='string' && message==='error'){
            
        }
        else if(typeof message==='string' && message==='message'){
            
            
        }
        if(typeof messageInfo=='object')
        {
            // render('.modal-body',`<ul></ul>`)
            $('.modal-body>ul').innerHTML=`${messageInfo.map(el=>`<li>${el}</li>`).join('')}`
        }
        if(typeof messageInfo=='string') 
        {
            $('.modal-body>ul').innerHTML=`<p>${messageInfo}</p>`
        }
        $('.modal-header>h2').innerText=messageContent
        // console.log(typeof messageInfo)
        $('.modal-body>h3').innerText=(message=='message')?"Info:":"Error! Possible Reasons are:"
        
    }

    var colorLuminance=function(hex, lum) {
        
            // validate hex string
            hex = String(hex).replace(/[^0-9a-f]/gi, '');
            if (hex.length < 6) {
                hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
            }
            lum = lum || 0;
        
            // convert to decimal and change luminosity
            var rgb = "#", c, i;
            for (i = 0; i < 3; i++) {
                c = parseInt(hex.substr(i*2,2), 16);
                c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
                rgb += ("00"+c).substr(c.length);
            }
            
            return rgb;
        }
    var removeHighlighting=function(){

        
        $('td').forEach(function(td){
            td.onmouseup=function(){
                $('td').forEach(function(td){
                    td.style.borderLeftColor=loadDefault.color
                    td.style.borderRightColor=loadDefault.color
                    td.style.borderWidth="1px"
                })
                $('td:first-child,td:last-child').forEach(function(td){
                    td.removeAttribute('style')
                })
                $(`tr:nth-child(2)>td,tr:nth-child(31)>td`).forEach(function(td){
                    td.removeAttribute('style')
                    // console.log(td)
                })
                $('tr>td').filter(td=>td.dataset.index==null).forEach(function(td){
                    td.style.borderColor=loadDefault.color
                    td.style.borderWidth="1px"
                })
                $('tr>td').filter(td=>td.dataset.index>=0).forEach(function(td){
                    td.style.borderColor=time[td.dataset.index].color
                    td.style.borderWidth="1px"
                    td.style.transform="scale(1)"
                    td.style.zIndex=1
                })
            }
            
        })
        
    }



    window.onload=function(){
        
        let _time=timein(),str='',inn=1,_out=1,sday="MON",i=0,_room="301",overlay=true
        
        initializeDOM();
        
        $('#timein').onchange=function(){
            inn=this.value
        }

        $('#timeout').onchange=function(){
            
            // var filtered=$(`td[data-day="MON"]`).filter(day=>day.dataset.id>=parseInt(inn) && day.dataset.id<parseInt(this.value))
            const filtered=filterTime(inn,this.value,sday)
            // console.log(`${inn} ${this.value}`)
            // console.log(`${filtered} ${inn} ${this.value}`)
            
            if(filtered.length>0){
                
                var index=i+1
                
                if(!checkOverlap(filtered,sday)){
                    if((filtered.length/2)>=2 && (filtered.length/2)<=6){
                        filtered.forEach(function(value){
                            // value.classList.add(`color${(index>9)?0:index}`,`color`)
                            // value.__proto__.val=value.dataset.time
                            value.dataset.index=parseInt(i)
                            value.dataset.highlighted=true;
                            value.style.background=colorLuminance(color[i],0)
                            value.style.borderColor=colorLuminance(color[i],0)
                            value.style.transition="0.3s"
                            value.onclick=function(){
                                // value.dataset.id=0
                                $(`td[data-day="${time[value.dataset.index].day}"]`).forEach(function(td){
                                    td.style.borderLeftColor=time[value.dataset.index].color
                                    td.style.borderRightColor=time[value.dataset.index].color
                                    td.style.borderLeftWidth="2px"
                                    td.style.borderRightWidth="2px"
                                    value.style.transition="0.3s"
                                    // td.style.
                                    
                                    $('td:first-child,td:last-child').forEach(function(td){
                                        td.removeAttribute('style')
                                    })
                                    $(`td[data-id="${time[value.dataset.index].time_in}"]`).forEach(function(td){
                                        td.style.borderTopColor=time[value.dataset.index].color
                                        td.style.borderTopWidth="2px"
                                    })
                                    $(`td[data-id="${time[value.dataset.index].time_out-1}"]`).forEach(function(td){
                                        td.style.borderBottomColor=time[value.dataset.index].color
                                        td.style.borderBottomWidth="2px"
                                    })
                                    
                                    $(`td[data-timein="${time[value.dataset.index].time_in}"]`).style.background=colorLuminance(time[value.dataset.index].color,-0.2)
                                    $(`td[data-timeout="${time[value.dataset.index].time_out}"]`).style.background=colorLuminance(time[value.dataset.index].color,-0.2)
                                    $(`td[data-timein="${time[value.dataset.index].time_in}"]`).style.transition="0.3s"
                                    $(`td[data-timeout="${time[value.dataset.index].time_out}"]`).style.transition="0.3s"
    
                                })
                                $(`td[data-day="${time[value.dataset.index].day}"]`)[29].setAttribute('style',`background:${colorLuminance(time[value.dataset.index].color,-0.2)}!important`)
                                $(`td[data-day="${time[value.dataset.index].day}"]`)[0].setAttribute('style',`background:${colorLuminance(time[value.dataset.index].color,-0.2)}!important`)
                                var getDay=filterTime((time[value.dataset.index].time_in),parseInt(time[value.dataset.index].time_out),time[value.dataset.index].day)
                                getDay.forEach(function(item){
                                    item.style.position="relative"
                                    item.style.transition="0.3s"
                                    item.style.transform="scale(2)"
                                    item.style.zIndex=2
                                })
                                
                                showMessage('message','Schedule Info',`The "subject" is scheduled on <b>${time[value.dataset.index].day}</b> at <b>${time[value.dataset.index].timein}</b> to <b>${time[value.dataset.index].timeout}</b>`,time[value.dataset.index].color)
                            }
                        })
                        time.push({
                            index:i,
                            time_in:parseInt(inn),
                            time_out:parseInt(this.value),
                            timein:filtered[0].dataset.time,
                            timeout:filtered[filtered.length-1].dataset.time,
                            day:sday,
                            room:_room,
                            color:color[i]
                        })
                        i+=1
                    }
                    else{
                        showMessage('error','Error in Input!',["The Schedule selected is less than 2 units",
                        "The Schedule selected is more than 6 units",
                        `The inputted number of units is ${filtered.length/2}`],color[9])
                    }
                    
                    // console.log(filtered)
                }
                else{
                    showMessage('error','Overlapping Time!',["Some Schedules in on the selected day is occupied","Time In can be in",""],color[9])
                }
                //pushes object data to time array
                
                
            }
            else{
                // console.log(filtered)
                showMessage('error','Invalid Time Entered!',["Time In is greater than time out","Invalid Input"],color[9])
            }
        }
        $('td').forEach(function(){
            removeHighlighting()
            // console.log($(`tr:nth-child(2)`))
        })
        $('#day').onchange=function(){
            sday=this.value
            // console.log(sday)
        }
        $('#room').onchange=function(){
            _room=this.value
            // console.log(_room)
        }
        $('#showOverlay').onclick=function(){
            
        }
        $('.overlay').onclick=function(){
            
            
        }
        $('.modal button').onmouseup=function(){
            $('.modal').classList.remove('modal-show')
            setTimeout(function(){
                $('.overlay').classList.remove('show')
            },500)
        }
        
    }
})()
