import './App.css';
import {useState} from 'react';
import MusicPlayer from "./MusicPlayer";
import Todo from './Todo';
function App() {
    const [isClock,setIsClock]=useState(true);
    const [isAsmr,setIsAsmr]=useState(true);
    const[isClassic,setIsClassic]=useState(true);
    const [isTodoList,setIsTodoList]=useState(false);
    const handleClock=()=>{
        setIsClock(!isClock)
    }
    const handleAsmr=()=>{
        setIsAsmr(!isAsmr)
    }
    const handleClassic=()=>{
        setIsClassic(!isClassic)
    }
    const handleTodoList=()=>{
        setIsTodoList(!isTodoList)
    }
  return (
    <div className="App">
        <div className="btn_bar">
            <h5 id="select_text">원하는 아이템을 선택하세요(아이템당 100coin 차감)</h5>
            <button className="btn_style" onClick={handleClock}>포모도로 시계</button>
            <button className="btn_style" onClick={handleAsmr}>ASMR</button>
            <button className="btn_style" onClick={handleClassic}>클래식</button>
            <button className="btn_style" onClick={handleTodoList}>todo list</button>

        </div>
        <div className="container">
            <div className="clock_container">
                {isClock? <div className="mask">
                        <div className="notice">포모도로 시계를 사용하려면 상단의 버튼을 클릭하세요</div>
                    </div>:
                    <div>add component</div>
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

export default App;
