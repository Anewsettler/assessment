import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calls: [],
        }
        this.archiveAll = this.archiveAll.bind(this)
        this.showDetail = this.showDetail.bind(this)
    }
    componentDidMount() {
        const url = "https://aircall-job.herokuapp.com/activities";
        fetch(url).then(res => res.json()).then(json =>{
            json.forEach(call=>{
                let time = convertTime(call.created_at);
                call.created_at=time;
                call.show="none";
            })
            this.setState({
                calls: json,
            })
        })
    }


    archiveAll(call){
        const url = "https://aircall-job.herokuapp.com/activities/";
        call.forEach((item) => {
            if (item.is_archived == false) {
                item.is_archived = true;
            }
            fetch(url+item.id,{
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(item)
            })
        })
        this.setState({
            calls: call,
        })

    }

    showDetail(mark){
        if(mark.show=="none")
        {mark.show="block";}
        else
        {mark.show="none";}
        this.forceUpdate();
    }

    renderList(call){
        if(call.is_archived==false){
            return <li key={call.id} onClick={() => this.showDetail(call)}>
                <div className="line">
                    <span className="text">{call.created_at[1]}, {call.created_at[2]} {call.created_at[0]}</span>
                </div>
                <div className="call">
                    <div className="left">
                        <svg width='40px' height='40px' viewBox='-70 -70 240 240' version='1.1'>
                            <g transform='translate(0.000000, 0.000000)'>
                                <path d='M122.342895,100.615799 C120.353028,98.7917542 118.031517,97.4651764 115.710006,96.3044208 C112.227739,94.6461985 107.08725,91.9930429 103.273338,94.4803763 C101.946761,95.3094874 100.951827,96.8018875 99.7910717,97.7968209 C98.2986716,99.2892209 96.6404493,100.781621 94.6505826,101.776554 C86.1936489,106.087932 75.0835595,104.263888 68.1190259,97.7968209 C64.1392924,93.6512651 61.651959,87.6816649 61.8177812,81.8778869 C61.9836034,77.4006867 63.4760035,72.7576643 66.2949814,69.1095752 C67.455737,67.6171752 68.948137,66.2905973 70.2747149,64.7981973 C71.6012927,63.4716194 72.4304039,61.9792194 72.4304039,59.9893526 C72.4304039,57.5020192 71.2696482,55.180508 70.2747149,52.8589968 C69.2797815,50.7033078 68.2848481,48.3817966 66.7924481,46.5577521 C65.4658702,44.7337075 63.4760035,42.7438408 61.3203145,41.9147296 C60.3253811,41.5830852 59.3304477,41.4172629 58.3355144,41.7489074 C57.0089365,42.0805519 56.0140032,43.0754852 55.0190698,43.9045964 C50.7076918,47.221041 46.2304916,51.0349522 44.0748027,56.0096191 C40.4267136,63.9690861 42.0849359,73.0893087 45.2355583,80.8829535 C48.8836473,89.6715316 54.8532476,97.6309986 61.8177812,104.098066 C65.9633369,108.243621 70.6063593,112.057533 75.5810262,115.208155 C82.0480931,119.187888 89.5100935,122.504333 97.137916,123.333444 C102.444227,123.996733 108.082183,123.167622 112.725206,120.680289 C114.715072,119.519533 116.539117,118.192955 118.197339,116.534733 C120.021384,114.710688 122.01125,112.720821 123.50365,110.730955 C124.498584,109.570199 125.825162,108.409444 125.990984,106.585399 C126.156806,104.263888 124.001117,102.108199 122.342895,100.615799 Z' fill='#C0C0C0'/>
                            </g>
                        </svg>
                    </div>
                    <div className="center">
                        <div className="from">{call.from}</div>
                        <div className="via">tried to call on {call.via}</div>
                    </div>
                    <div className="right">
                        <div className="divider"></div>
                        <div className="hour">
                            <span>{call.created_at[3]}:{call.created_at[4]}</span>
                        </div>
                        <div className="box">
                            <span>{call.created_at[5]}</span>
                        </div>
                    </div>
                </div>
                <div className={call.show}>
                    <div>Try to call {call.direction} to {call.to}</div>
                    <div>The call was {call.call_type}, total time on the call was {call.duration}s</div>
                </div>
            </li>
        }
        return null;
    }

    render() {
        const {calls} = this.state;
        return (
            <div className='container'>
                <Header/>
                <div className="container-view">
                    <div className="archiveAll" onClick={() => this.archiveAll(calls)}>Archive all calls</div>
                    <ul className="callList">
                        {calls.map(call => (
                            this.renderList(call)
                        ))}
                    </ul>
                </div>
            </div>
        );
    };

}

function convertTime(callTime){
    let time=callTime.split("T")[0].split("-")
    if(time[1]=="01") time[1]="January";
    else if(time[1]=="02") time[1]="February";
    else if(time[1]=="03") time[1]="March";
    else if(time[1]=="04") time[1]="April";
    else if(time[1]=="05") time[1]="May";
    else if(time[1]=="06") time[1]="June";
    else if(time[1]=="07") time[1]="July";
    else if(time[1]=="08") time[1]="August";
    else if(time[1]=="09") time[1]="September";
    else if(time[1]=="10") time[1]="October";
    else if(time[1]=="11") time[1]="November";
    else if(time[1]=="12") time[1]="December";
    let hour=callTime.split("T")[1].split(":")
    if(hour[0]>=12){
        hour[2]="pm";
        if(hour[0]>12){
            hour[0]-=12;
        }
    }
    else{
        hour[2]="am";
    }
    let date=[time[0],time[1],time[2],hour[0],hour[1],hour[2]]
    return date;
}

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
