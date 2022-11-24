import classes from './login.module.css'
import catImg1 from '../../assets/catImg1.png'
import { useNavigate } from 'react-router-dom'


function Login() {
    let navigate = useNavigate();

    const foodAppTiberiu = () => {
        navigate("/feedthecat/Tiberiu");
    }
    const foodAppDoina = () => {
        navigate("/feedthecat/Doina");
    }

    return <div>
        <div className={classes.div_wrapper}>
            <h1 className={classes.yam}> Yammy!</h1>
            <img className={classes.img1} src={catImg1} width="150" height="113" alt="cat1"></img>
            <p className={classes.p}>... who is feeding me now?</p>
            <button className={classes.btn_left} onClick={foodAppTiberiu}>Tiberiu</button>
            <button className={classes.btn_right} onClick={foodAppDoina}>Doina</button>
        </div>
    </div >
};

export default Login;