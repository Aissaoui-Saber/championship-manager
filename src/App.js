import './App.scss';
import React, { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { HashRouter } from 'react-router-dom';



function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum and the minimum are inclusive
}

let daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
let mounthsOfYear = ["Janvier", "Fevrier", "Mars", "Avril", "May", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"];

let powersOftwo = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192];
let teamPgroup = null;
function isPowerOfTwo(number) {
  return powersOftwo.includes(number);
}


function Planing({ name, data, tour }) {
  const [startingDate, setStartingDate] = useState(undefined);
  const [planingCriteria, setPlaningCriteria] = useState([1, 1, 1, 1, 1, 1, 1]);
  const [planing, setPlaning] = useState([]);

  const planingRef = useRef();
  const handlePlanningPrint = useReactToPrint({
    content: () => planingRef.current,
  });

  function handlePlaningCriteria(criteria) {
    setPlaningCriteria(criteria);
  }

  function arrays2list() {
    let list = [];
    for (let j = 0; j < data[0].length; j++) {
      for (let i = 0; i < data.length; i++) {
        list.push(data[i][j]);
      }
    }
    return list;
  }

  function generatePlaning() {
    if (startingDate === undefined) {
      alert("selectionner la date de début");
    } else {
      if (planingCriteria.filter((e) => { return e > 0 }).length > 0) {
        let date = new Date(startingDate);
        let matchesList = tour === 1 ? arrays2list() : data;
        let planingTemp = [];
        let i = 0;

        while (i < matchesList.length) {
          if (planingCriteria[date.getDay()] > 0) {
            planingTemp.push({
              date: `${daysOfWeek[date.getDay()]} ${date.getDate()} ${mounthsOfYear[date.getMonth()]} ${date.getFullYear()}`,
              matches: []
            });
          }
          for (let a = 0; a < planingCriteria[date.getDay()]; a++) {
            if (matchesList[i] !== undefined) {
              planingTemp[planingTemp.length - 1].matches.push(matchesList[i]);
            }
            i++;
          }
          date.setDate(date.getDate() + 1);
        }
        setPlaning([...planingTemp]);
      } else {
        alert("selectionner les jours de jeu");
      }
    }
  }
  return <HashRouter>
    <h1>Planing ({name})</h1>
    <br></br>
    <label>Date de début: </label>
    <input type='date' onChange={(e) => { setStartingDate(e.target.valueAsDate) }}></input>
    <br></br>
    <br></br>
    <PlaningCriteria handleChanges={handlePlaningCriteria}></PlaningCriteria>
    <br></br>
    <input type='button' value="Générer le planing" onClick={generatePlaning}></input>
    <input type='button' value="Imprimer" onClick={handlePlanningPrint}></input>
    <br></br>
    <br></br>
    <div ref={planingRef}>
      {
        planing.map((day, index) => {
          return <div style={{ width: "70%", margin: "auto" }} className='day' key={index}>
            <label className='day__date' style={{ fontWeight: "700" }}>{day.date}</label>
            <div className='day__matches'>
              {
                day.matches.map((match, index) => {
                  return tour === 1 ? <div key={index}><div className='day__matches__match' >
                    <label style={{ fontWeight: "700" }}>{match.group}</label>
                    <div className='matches__group__match' >
                      <label className='matches__group__teamName'>{match.team1}</label>
                      <label>VS</label>
                      <label className='matches__group__teamName'>{match.team2}</label>
                    </div>
                  </div>
                    {index === day.matches.length - 1 ? "" : <><hr style={{ margin: "10px 0px" }}></hr></>}
                  </div> :
                    <div className='matches__group__match' key={index} style={{ placeSelf: "center" }}>
                      <label className='matches__group__teamName'>{match.team1}</label>
                      <label>VS</label>
                      <label className='matches__group__teamName'>{match.team2}</label>
                    </div>
                })
              }
            </div>
            <br></br>
          </div>
        })
      }
    </div>
  </HashRouter>
}

function PlaningCriteria({ handleChanges }) {
  const day0Ref = useRef();
  const day1Ref = useRef();
  const day2Ref = useRef();
  const day3Ref = useRef();
  const day4Ref = useRef();
  const day5Ref = useRef();
  const day6Ref = useRef();

  function handleNumbersChanges() {
    handleChanges(
      [
        parseInt(day0Ref.current.value),
        parseInt(day1Ref.current.value),
        parseInt(day2Ref.current.value),
        parseInt(day3Ref.current.value),
        parseInt(day4Ref.current.value),
        parseInt(day5Ref.current.value),
        parseInt(day6Ref.current.value),
      ]
    );
  }

  return <div className='criteria'>
    <label style={{ fontWeight: "700" }}>Jours</label>
    <label style={{ fontWeight: "700" }}>Nombre de matches</label>
    <label>Samedi</label>
    <input key={6} ref={day6Ref} type='number' defaultValue={1} min={0} max={5} onChange={handleNumbersChanges}></input>
    <label>Dimanche</label>
    <input key={0} ref={day0Ref} type='number' defaultValue={1} min={0} max={5} onChange={handleNumbersChanges}></input>
    <label>Lundi</label>
    <input key={1} ref={day1Ref} type='number' defaultValue={1} min={0} max={5} onChange={handleNumbersChanges}></input>
    <label>Mardi</label>
    <input key={2} ref={day2Ref} type='number' defaultValue={1} min={0} max={5} onChange={handleNumbersChanges}></input>
    <label>Mercredi</label>
    <input key={3} ref={day3Ref} type='number' defaultValue={1} min={0} max={5} onChange={handleNumbersChanges}></input>
    <label>Jeudi</label>
    <input key={4} ref={day4Ref} type='number' defaultValue={1} min={0} max={5} onChange={handleNumbersChanges}></input>
    <label>Vendredi</label>
    <input key={5} ref={day5Ref} type='number' defaultValue={1} min={0} max={5} onChange={handleNumbersChanges}></input>

  </div>
}

function App() {
  const teamNameInputRef = useRef();
  const teamPgroupRef = useRef();
  const groupsRef = useRef();
  const handleGroupsPrint = useReactToPrint({
    content: () => groupsRef.current,
  });
  const matches1erTourRef = useRef();
  const handleMatches1erTourPrint = useReactToPrint({
    content: () => matches1erTourRef.current,
  });

  //"studio", "payment", "teacher", "philosophy", "editor", "method", "imagination", "environment", "people", "diamond", "presence", "system", "initiative", "operation", "memory", "connection", "studio", "payment", "teacher", "philosophy", "editor", "method", "imagination", "environment", "people", "diamond", "presence", "system", "initiative", "operation", "memory", "connection", "studio", "payment", "teacher", "philosophy", "editor", "method", "imagination", "environment", "people", "diamond", "presence", "system", "initiative", "operation", "memory", "connection"
  const [teams, setTeams] = useState([]);
  const [groupes, setGroupes] = useState([]);
  const [matches1erTour, setMatches1erTour] = useState([]);
  const [totalMatches1erTour, setTotalMatches1erTour] = useState(0);
  const [matches2emeTour, setMatches2emeTour] = useState([]);


  useEffect(() => {
    generateMatches1erTour();
  }, [groupes]);

  useEffect(() => {
    if (isPowerOfTwo((teams.length / 3)) || isPowerOfTwo((teams.length / 4))) {
      if (isPowerOfTwo((teams.length / 4))) {
        teamPgroup = 4;
      } else {
        teamPgroup = 3;
      }
      generateGroups();
    } else {
      teamPgroup = null;
      setGroupes([]);
    }
  }, [teams.length]);


  function addTeam() {
    if (teamNameInputRef.current.value.length > 0) {
      setTeams([...teams, teamNameInputRef.current.value]);
      teamNameInputRef.current.value = "";
    }
  }
  function deleteTeam(e) {
    let t = [...teams];
    t.splice(parseInt(e.target.attributes.data.value), 1);
    setTeams(t);
  }

  function generateMatches1erTour() {
    let totalMatches = 0;
    let tempM = [];
    let shuflledArray = [];
    groupes.forEach((group, index) => {
      tempM.push([]);
      for (let i = 0; i < group.length - 1; i++) {
        for (let j = i + 1; j < group.length; j++) {
          tempM[index].push({ team1: group[i], team2: group[j], group: "Groupe " + String.fromCharCode(65 + index) });
          totalMatches++;
        }
      }
      if (teamPgroup === 4) {
        shuflledArray.push([]);
        shuflledArray[index].push(tempM[index][0]);
        shuflledArray[index].push(tempM[index][5]);
        shuflledArray[index].push(tempM[index][1]);
        shuflledArray[index].push(tempM[index][4]);
        shuflledArray[index].push(tempM[index][2]);
        shuflledArray[index].push(tempM[index][3]);
      }
    });
    if (teamPgroup === 4) {
      setMatches1erTour(shuflledArray);
    } else {
      setMatches1erTour(tempM);
    }
    setTotalMatches1erTour(totalMatches);
    generateMatches2emeTour();
  }

  function generateMatches2emeTour() {
    let tours = [];
    for (let i = groupes.length; i >= 1; i = i / 2) {
      switch (i) {
        case 1:
          tours.push({ name: "Finale", matches: [] });
          break;
        case 2:
          tours.push({ name: "Demi Finale", matches: [] });
          break;
        case 4:
          tours.push({ name: "Quart de finale", matches: [] });
          break;
        default:
          tours.push({ name: i + " ème de Finale", matches: [] });
          break;
      }
    }
    for (let i = 0; i < tours.length; i++) {
      if (i == 0) {
        for (let g = 0; g < groupes.length; g = g + 2) {
          tours[i].matches.push({
            team1: "Vainqueur 1, Groupe " + String.fromCharCode(65 + g),
            team2: "Vainqueur 2, Groupe " + String.fromCharCode(65 + g + 1),
            group: ""
          });
          tours[i].matches.push({
            team1: "Vainqueur 2, Groupe " + String.fromCharCode(65 + g),
            team2: "Vainqueur 1, Groupe " + String.fromCharCode(65 + g + 1),
            group: ""
          });
        }
      } else {
        for (let g = 0; g < tours[i - 1].matches.length / 2; g++) {
          tours[i].matches.push({
            team1: "Equipe",
            team2: "Equipe",
            group: ""
          });
        }
      }
    }
    setMatches2emeTour([...tours]);
  }

  function generateGroups() {
    if (teamPgroup !== null) {
      let temp = [];
      for (let i = 0; i < teams.length / teamPgroup; i++) {
        temp.push([]);
      }
      let teamsCopy = [...teams];
      temp.forEach((group, index) => {
        for (let i = 0; i < teamPgroup; i++) {
          if (teamsCopy.length > 0) {
            let r = getRandomInt(0, teamsCopy.length);
            group.push(teamsCopy[r]);
            teamsCopy.splice(r, 1);
          }
        }
      });
      setGroupes(temp);
    }
  }

  function handleDragStart(e) {
    e.dataTransfer.setData("text", e.target.attributes.data.value);
  }

  function handleDrop(e) {
    let SG = parseInt(e.dataTransfer.getData("text")[0]);
    let ST = parseInt(e.dataTransfer.getData("text")[2]);
    let TG = parseInt(e.target.attributes.data.value[0]);
    let TT = parseInt(e.target.attributes.data.value[2]);

    let temp = [...groupes];
    let t = temp[SG][ST];
    temp[SG][ST] = temp[TG][TT];
    temp[TG][TT] = t;
    setGroupes(temp);
  }
  function handleDragOver(e) {
    e.preventDefault();
  }

  return (<>
    <h1 style={{ display: "inline" }}>1. Equipes ({teams.length})</h1>
    <input ref={teamNameInputRef} type="text"></input>
    <input type="button" value="Ajouter" onClick={addTeam}></input>
    <br></br>
    <br></br>
    <div className="teams">
      {
        teams.map((team, index) => {
          return <div key={index} className='teams__team'>
            <div data={index} className='teams__team__remove' onClick={deleteTeam}><label data={index} onClick={deleteTeam}>×</label></div>
            <label className='teams__team__name'>{team}</label>
          </div>
        })
      }
    </div>


    {
      groupes.length === 0 ? "" : <>
        <br></br>
        <hr></hr>
        <br></br>
        <h1 style={{ display: "inline" }}>2. Groupes ({groupes.length})</h1>
        <input type='button' value={"Mélanger"} onClick={generateGroups}></input>
        <input type='button' value={"Imprimer"} onClick={handleGroupsPrint}></input>
        <br></br>

        <br></br>
        <br></br>
        <div className='groups' ref={groupsRef}>
          {
            groupes.map((group, i) => {
              return <div key={i} className='groups__group'>
                <label className='groups__group__name'>Groupe {String.fromCharCode(65 + i)}</label>
                {
                  group.map((team, j) => {
                    return <div key={j} data={[i, j]} className='groups__group__dropZone' onDrop={handleDrop} onDragOver={handleDragOver}><label className='groups__group__teamName' data={[i, j]} draggable={true} onDragStart={handleDragStart} >{team}</label></div>
                  })
                }
              </div>
            })
          }
        </div>
        <br></br>
        <hr></hr>
        <br></br>

        <h1 style={{ display: "inline" }}>3. Matches ({totalMatches1erTour})</h1>
        <input type='button' value={"Imprimer"} onClick={handleMatches1erTourPrint}></input>
        <br></br>
        <br></br>
        <div className='matches' ref={matches1erTourRef}>
          {
            matches1erTour.map((group, index) => {
              return <div key={index} className='matches__group'>
                <label className='matches__group__name'>Groupe {String.fromCharCode(65 + index)}</label>
                {
                  group.map((match, index) => {
                    return <div className='matches__group__match' key={index} >
                      <label className='matches__group__teamName'>{match.team1}</label>
                      <label>VS</label>
                      <label className='matches__group__teamName'>{match.team2}</label>
                    </div>
                  })
                }
              </div>
            })
          }
        </div>
        <br></br>
        <hr></hr>
        <br></br>
      </>
    }
    {
      groupes.length === 0 ? "" :
        <>
          <Planing name={"1er Tour"} data={matches1erTour} tour={1}></Planing>
          {
            matches2emeTour.map((tour, index) => {
              return <div key={index}><hr></hr><br></br><Planing name={tour.name} data={tour.matches} tour={2}></Planing></div>
            })
          }
        </>
    }
  </>
  );
}

export default App;
