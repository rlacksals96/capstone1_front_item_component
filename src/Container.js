import './App.css';
import {useState} from 'react';
import MusicPlayer from "./MusicPlayer";
import Todo from './Todo';
import Timer from './Timer';

const url="http://172.20.10.6:8080"
const submitHandler = async () => {
    let params = new URLSearchParams(document.location.search.substring(1));
    let email=params.get('email')
    // alert(email);//for testing
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "");
    myHeaders.append("Content-Type", "application/json");
    const info={
        email:email,
        coin:100
    }
    let raw = JSON.stringify(info);
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    let status='';
    fetch(url+"/coin", requestOptions)    //url()+"/coin"
        .then(response => {
            status=response.status;
            return response.json();
        })
        .then(result => {
            //console.log(result)
            if(status===200){
                alert('코인이 차감되었습니다')
            }
        })
        .catch(error => console.log('error', error));
};

function Container() {
    const [isClock,setIsClock]=useState(true);
    const [isAsmr,setIsAsmr]=useState(true);
    const[isClassic,setIsClassic]=useState(true);
    const [isTodoList,setIsTodoList]=useState(true);

    const handleClock=()=>{
        submitHandler();
        alert("clock을 구입하였습니다. 100 coin 차감됩니다")
        setIsClock(!isClock)
    }
    const handleAsmr=()=>{
        submitHandler();
        alert("ASMR을 구입하였습니다. 100 coin 차감됩니다")
        setIsAsmr(!isAsmr)
    }
    const handleClassic=()=>{
        submitHandler();
        alert("classic 음악을 구입하였습니다. 100 coin 차감됩니다")
        setIsClassic(!isClassic)
    }
    const handleTodoList=()=>{
        submitHandler();
        alert("todo list를 구입하였습니다. 100 coin 차감됩니다")
        setIsTodoList(!isTodoList)
    }


    return (
        <div className="App">
            {/*{window.moveTo(0,-1)}*/}
            {/*{window.resizeTo(500,1000)}*/}
            <div className="btn_bar">
                <h5 id="select_text">원하는 아이템을 선택하세요(아이템당 100coin 차감)</h5>
                <button className="btn_style" onClick={handleClock}>포모도로 시계</button>
                <button className="btn_style" onClick={handleAsmr}>ASMR</button>
                <button className="btn_style" onClick={handleClassic}>클래식 음악</button>
                <button className="btn_style" onClick={handleTodoList}>todo list</button>

            </div>
            <div className="container">
                <div className="clock_container">
                    {isClock? <div className="mask">
                            <div className="notice">포모도로 시계를 사용하려면 상단의 버튼을 클릭하세요</div>
                        </div>:
                        <div><Timer></Timer></div>
                    }
                </div>
                <div className="asmr_music_container">
                    {isAsmr ? <div className="mask">
                        <div className="notice">ASMR을 사용하려면 상단의 버튼을 클릭하세요</div>
                    </div> :<MusicPlayer name='whiteNoise'/>

                    }
                </div>
                <div className="classic_music_container">
                    {isClassic ? <div className="mask">
                            <div className="notice">클래식을 사용하려면 상단의 버튼을 클릭하세요</div>
                        </div> :
                        <MusicPlayer name='nocturn_op9_2'/>
                    }
                </div>
                <div className="to_do_list_container">
                    {isTodoList ? <div className="mask">
                        <div className="notice">to do list를 사용하려면 상단의 버튼을 클릭하세요</div>
                    </div> :<Todo/>

                    }
                </div>
            </div>

        </div>
    );
}

export default Container;
