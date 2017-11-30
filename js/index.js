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
    color=["#34495e","#2980b9","#27ae60","#e67e22","#f1c40f","#c0392b","#1abc9c","#d35400","#2c3e50","#e74c3c"],
    time=[],room=["301","302","303"]
    //load time object
    
    var timein=function(){
        var start=7,arr=[],_tm=0,_ct=0, i=0,pm=false
        for(i=7 ; i<=12 ; i++){
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
    var filterTime=function(_in,_out,_day="MON"){
        
        var selectedDay=[]
        if(parseInt(_out)>parseInt(_in)){
            var days=$(`td[data-day="${_day}"]`)
            selectedDay=days.filter(day=> day.dataset.id>=parseInt(_in) && day.dataset.id<parseInt(_out)) 
        }
        else selectedDay=[]
        
        // console.log(`in is ${_in} and out is ${_out} and day is ${_day}`)
        // console.log(selectedDay)
        return selectedDay
    }

    /**
     * 
     * @param {*} time1 collection
     * @param {*} time2 1 node
     */
    var checkOverlap=function(time1,_day=""){
        
        const finDay=Array.from(document.querySelectorAll('td'))
        const filtered=finDay.filter(i=>i.dataset.day==_day && i.dataset.index>=0).map(i=>parseInt(i.dataset.id))
        const basis=time1.map(i=>parseInt(i.dataset.id))
        var arr=[]

        var hasOverlap=false

        basis.forEach(function(i){
            hasOverlap=filtered.some(tm=>tm==parseInt(i))
            // console.log([i,...filtered])
            arr.push(hasOverlap)
        })

        //check time per collection
        // time1.forEach(function(tm){
        //     hasOverlap=filtered.some(time=>time.dataset.id==tm.time_in ||time.dataset.id==tm.time_out)
        //     arr.push(hasOverlap)
        //     // console.log(time.attributeList)
        //     // console.log(time )
        //     // console.log(`time1 ${time1}`)
        // })

        // var checkDay=Array.from(time1).every(function(data){
        //     // return (data.day==time2.)
        // })
        // console.log()
        return arr.some(i=>i==true)
    }

    
    



    window.onload=function(){
        // $('div#app').on=function(){
        //     console.log(this)
        // }
        // console.log($('#app'))
        let _time=timein(),str='',inn=1,_out=1,sday="MON",i=0,_room="301"
        render('#app',`
            <div id="schedule">
            </div>
        `)
        render('#schedule',tblData())
        
        $(`tbody`).removeChild($(`tr:nth-child(31)`))
        // console.log($(`table`).rowIndex)
        render('#schedule',`<div class="sched-option"></div>`)
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
                    filtered.forEach(function(value){
                        value.classList.add(`color${(index>9)?0:index}`,`color`)
                        // value.__proto__.val=value.dataset.time
                        value.dataset.index=parseInt(i)

                        value.onclick=function(){
                            // value.dataset.id=0
                            $(`td[data-day="${time[value.dataset.index].day}"]`).forEach(function(td){
                                td.classList.add('highlight-1')
                            })
                            $(`td[data-timein="${time[value.dataset.index].time_in}"]`).classList.add(`color${(index>9)?0:index}`)
                            $(`td[data-timeout="${time[value.dataset.index].time_out}"]`).classList.add(`color${(index>9)?0:index}`)
                            // console.log(time[value.dataset.index])
                            
                            // proto()
                        }
                    })
                    time.push({
                        index:i,
                        time_in:parseInt(inn),
                        time_out:parseInt(this.value),
                        day:sday,
                        room:_room
                    })
                    i+=1
                }
                else{
                    alert("Overlapping Time")
                }
                //pushes object data to time array
                
                
            }
            else{
                // console.log(filtered)
                alert('Invalid Time!')
            }
            // console.log(time)
            // console.log(checkOverlap(filtered,sday))
        }
        $('#day').onchange=function(){
            sday=this.value
            // console.log(sday)
        }
        $('#room').onchange=function(){
            _room=this.value
            // console.log(_room)
        }
    }
})()
