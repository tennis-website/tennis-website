import React, {useState, useEffect} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./calender.css";
import moment from 'moment';
import { DateText } from './DateText';
import { Instructors } from './right/Instructors';
import { AdminCalendar } from './admin/AdminCalendar';
import { AdminEdit } from './admin/AdminEdit';


export const MyCalendar = (props) => {
    const mark = props.dateList
   
  console.log(mark)
    function getMonthName(monthNumber) {
      const date = new Date(monthNumber);
      return date.toLocaleString('en-US', { month: 'long' });
    }

  function getDayName(dateStr)
    {
     
        var date = new Date(dateStr);
  
        return date.toLocaleDateString('en-US', { weekday: 'long' }); 
        
    }

    
    const checkToday = () => {
        const dt = new Date(Date.now);
        for(let i = 0; i < mark.length; i++){
            let newDate = new Date((mark[i]));
 
          
              if(newDate.toDateString() === dt.toDateString()){
                return true;
              }
          }
          return false;
    }
    const firstDay = () => {
      if(mark.length > 0){
        let newDate = new Date(mark[0]);
        return(mark[0]);
      }
    }

    const [value, onChange] = useState(new Date());
    const [currentDay, setCurrentDay] = useState(0);
    const [lessonTime, setLessonTime] = useState(0);
    const [isLesson, setIsLesson] = useState(true);
    const [nextDay, setNextDay] = useState(()=>firstDay());
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        
        setIsLesson(false);
        const dt = new Date(value);

        for(let i = 0; i < mark.length; i++){
          let newDate = new Date((mark[i]));

        
            if(newDate.toDateString() === dt.toDateString()){
               setLessonTime(i);
               setCurrentDay(i);
               setIsLesson(true);
            }
        }
        let run = true;
        for(let i = 0; i < mark.length && run; i++){
          let newDate = new Date((mark[i]));
            if(value < newDate){
              setNextDay(getDayName(newDate) + ", " + getMonthName(newDate) + " " + ((newDate).getDate()));
              run = false;
            }
        }
        if(run === true){
          setNextDay("No upcoming Lessons")
        }


    }, [value, loading])
    console.log(props.times.length + "test")
  let today = new Date(Date.now());
  useEffect(() => {
      if(props.times.length > 0){
            setLoading(false);
      }
}, [props.times])
if(loading){
  return(
    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", height:window.innerHeight}}>
      <p className='railwayBold' style={{color:"white", fontSize:"40px", paddingLeft:80}}>Loading Lessons...</p>
    </div>
  )
}
  today.setDate(today.getDate() - 1);
  console.log(isLesson + "lesson")
  if(isLesson){
    return (
        <div style={{position:'relative', paddingLeft:50, paddingRight:50, paddingTop: 150}} className='myContainer'>
            <div style={{flex:1, alignSelf: 'center', paddingRight:250}} className='myContain'>
            <h3 className ="railwayBold"style={{color:"white", fontSize: "200%"}}>Join a Lesson</h3>
            <Calendar className="react-calendar" onChange={onChange} value={value} style={{height: 'auto', width: '50%'}}
            next2Label = {null}
            prev2Label = {null}
            calendarType="US"
            tileClassName={({ date, view }) => {
                if(mark.find(x=>x===moment(date).format("MM/DD/YYYY"))){
                 return  'highlight'
                }
                }}
            />
            </div>
            <div style={{flex:1}}>
            <DateText 
              index = {lessonTime}
              coordinates={props.coordinates[lessonTime]} 
              isLesson = {isLesson} 
              location = {props.location[lessonTime]} 
              address = {props.address[lessonTime]}
              time = {props.times[lessonTime]} 
              weekDay = {getDayName(value)} 
              day = {value.getDate()} 
              month = {getMonthName(value)} 
              nextDay = {nextDay}
              />
            </div>
            <div style={{flex:1}}>
             <Instructors 
              lessonId = {props.lessonId[lessonTime]} 
              isLesson = {isLesson} max = {props.max[lessonTime]} 
              students = {props.students[lessonTime]} 
              people = {props.instructor[lessonTime]}
              value = {value}/>

             </div>
        </div>
    );
  }
  if(value < today){
    return (
      <div style={{position:'relative', paddingLeft:50, paddingRight:50, paddingTop: 150}} className='myContainer'>
          <div style={{flex:1, alignSelf: 'center', paddingRight:250}} className='myContain'>
          <h3 className ="railwayBold"style={{color:"white", fontSize: "200%"}}>Find a Lesson</h3>
          <Calendar onChange={onChange} value={value} style={{height: 'auto', width: '50%'}}
                      next2Label = {null}
                      prev2Label = {null}
          calendarType="US"
          tileClassName={({ date, view }) => {
              if(mark.find(x=>x===moment(date).format("MM/DD/YYYY"))){
               return  'highlight'
              }
              }}
          />
          </div>
          <div style={{flex:1}}>
          <DateText 
            index = {lessonTime}
            coordinates={props.coordinates[lessonTime]} 
            isLesson = {isLesson} 
            location = {props.location[lessonTime]} 
            address = {props.address[lessonTime]}
            time = {props.times[lessonTime]} 
            weekDay = {getDayName(value)} 
            day = {value.getDate()} 
            month = {getMonthName(value)} 
            nextDay = {nextDay}
            />
          </div>
          <div style={{flex:1}}>
           <Instructors 
            lessonId = {props.lessonId[lessonTime]} 
            isLesson = {isLesson} max = {props.max[lessonTime]} 
            students = {props.students[lessonTime]} 
            people = {props.instructor[lessonTime]}
            value = {value}/>

           </div>
      </div>
    );
  }
  else {
    return (
      <div style={{position:'relative', paddingLeft:50, paddingRight:50, paddingTop: 150}} className='myContainer'>
          <div style={{flex:1, alignSelf: 'center', paddingRight:250}} className='myContain'>
              <h3 className ="railwayBold"style={{color:"white", fontSize: "200%"}}>Request a Lesson</h3>
          <Calendar onChange={onChange} value={value} style={{height: 'auto', width: '50%'}}
                      next2Label = {null}
                      prev2Label = {null}
          calendarType="US"
          tileClassName={({ date, view }) => {
              if(mark.find(x=>x===moment(date).format("MM/DD/YYYY"))){
               return  'highlight'
              }
              }}
          />
          </div>
          <div style={{flex:1}}>
          <DateText 
            index = {lessonTime}
            coordinates={props.coordinates[lessonTime]} 
            isLesson = {isLesson} 
            location = {props.location[lessonTime]} 
            address = {props.address[lessonTime]}
            time = {props.times[lessonTime]} 
            weekDay = {getDayName(value)} 
            day = {value.getDate()} 
            month = {getMonthName(value)} 
            nextDay = {nextDay}
            />
          </div>
          <div style={{flex:1}}>
           <Instructors 
            lessonId = {props.lessonId[lessonTime]} 
            isLesson = {isLesson} max = {props.max[lessonTime]} 
            students = {props.students[lessonTime]} 
            people = {props.instructor[lessonTime]}
            value = {value}/>

           </div>
      </div>
  );
}
}

// return (
//   <div style={{position:'relative', paddingLeft:50, paddingRight:50}} className='myContainer'>
//       <div style={{flex:1}}>
//       <DateText coordinates={props.coordinates[lessonTime]} isLesson = {isLesson} location = {props.location[lessonTime]} address = {props.address[lessonTime]} time = {props.times[lessonTime]} weekDay = {getDayName(value)} day = {value.getDate()} month = {getMonthName(value)} />
//       </div>
//       <div style={{flex:3, alignSelf: 'center', width:'100%'}} className='myContain'>
//       <Calendar onChange={onChange} value={value} style={{height: '100%', width: '100%' }}
      
//       tileClassName={({ date, view }) => {
//           if(mark.find(x=>x===moment(date).format("MM/DD/YYYY"))){
//            return  'highlight'
//           }
//           }}
//       />
//       </div>
//       <div style={{flex:1}}>
//        <Instructors lessonId = {props.lessonId[lessonTime]} isLesson = {isLesson} max = {props.max[lessonTime]} students = {props.students[lessonTime]} people = {props.instructor[lessonTime]}/>
//        </div>
//   </div>
// );

//(value, event) => alert('Clicked day: ', value)

//let nowDay, nowMonth, nowYear, fullDate;
         // nowDay = dt.getDay();
        // nowMonth = dt.getMonth()+1;
        // nowYear = dt.getFullYear();
        // if (nowDay < 10) {
        //     nowDay = '0' + nowDay;
        //   }
          
        //   if (nowMonth < 10) {
        //     nowMonth = '0' + nowMonth;
        //   }
        // fullDate = nowDay + "/" + nowMonth + "/" + nowYear;
        // console.log(fullDate)