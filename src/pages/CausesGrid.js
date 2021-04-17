import React, {useState, useEffect} from 'react';
import firebase, { auth } from '../Firebase/Firebase';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { db } from '../Firebase/Firebase';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 800,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    circularProgess: {
        
    },
    button: {
      marginTop: theme.spacing(90),
      marginLeft: theme.spacing(2),
      backgroundColor: "#0133C0",
      color: "#fff",
      "&:hover":{
        backgroundColor: "#214DC5"
      },
    },
  }));

  let newArray = [];
  
function CausesGrid(props) {
    const [causes, setCauses] = useState([]);
    const [loading, setLoading] = useState(false)
    const classes = useStyles();
    const [buttonStatus, SetButtonStatus] = useState(false);
    const [causeArray, setcauseArray] = useState([])
    const refCauses = db.collection("cause_types");
    const [checked, setChecked] = React.useState({});
      

    function getCauses() {
        setLoading(true);
        refCauses.onSnapshot((querySnapshot)=> {
            const items = [];
            let dict = new Map()
            querySnapshot.forEach((doc)=>{
              const projectData = doc.data()
                    projectData["cause_id"] = doc.id
                items.push(projectData);
                const _vr = doc.id
                if(newArray.includes(_vr)){
                  // dict.set(_vr, true)
                  dict[_vr] = true
                }else{
                  // dict.set(_vr, false)
                  dict[_vr] = false
                }
            });
            setChecked(dict)
            setCauses(items);
            setLoading(false);
        })
    }

const handleChange = (event) => {
  let targetValue = event.target.name.toString();
    setChecked({ ...checked ,[event.target.name]: event.target.checked });
        if(newArray.includes(targetValue)){
            let index = newArray.indexOf(targetValue);
            newArray.splice(index, 1);
        }else{
            newArray.push(targetValue)
        }
    setcauseArray(newArray);
    SetButtonStatus(!newArray.length > 0)
};

    useEffect(() => {
      newArray = props.location.state?.choice
        getCauses();
        SetButtonStatus(!newArray.length > 0)
    }, []);

    function updatePreferences(){
      var userUID = auth().currentUser.uid
      db.collection("users").doc(userUID).update({
        causes: newArray
      })
    }

    if(loading){
        return <CircularProgress style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }} />
    }
            console.log("****************** chedcked ",checked)
    return (
        <div className={classes.root}>
          <GridList cellHeight={200} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: '100' }}>
              <h2 style={{color: '#0133C0', fontSize: '20px'}}>Causes</h2>
            </GridListTile>
            {causes.map((tile, key) => (
              <GridListTile key={tile.cause_id}>
                <img src={tile.icon} alt={tile.cause_display_name} />
                <GridListTileBar
                  title={tile.cause_display_name}
                  actionIcon={
                    <Checkbox 
                    style={{color: '#FFF'}} 
                    checked={checked[tile.cause_id]} 
                    onChange={handleChange} 
                    name={tile.cause_id} 
                    color="primary"/>
                  }
                />
              </GridListTile>
              
            ))}
          </GridList>
          <div>
            <Button disabled = {buttonStatus} variant="contained" onClick={updatePreferences} className={classes.button} component={Link} to={{ pathname: "/my-causes", choice: newArray}} >
              Save
            </Button>
          </div>
        </div>
      );
}

export default CausesGrid;