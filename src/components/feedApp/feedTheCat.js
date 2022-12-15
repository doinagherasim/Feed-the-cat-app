import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AlertModal from "../alertModal/alertModal";
import classes from "./feedTheCat.module.css";
import cat from "../../assets/cat.png";
import milk from "../../assets/milk.png";
import meat from "../../assets/meat.png";
import food1 from "../../assets/food1.png";
import bground from "../../assets/bground.png";
import bag from "../../assets/bag.png";
import cat_bag from "../../assets/cat_bag.png";
import shelf2 from "../../assets/shelf2.png";
import cat_above from "../../assets/cat_above.png";
import extra_cats from "../../assets/extra_cats.png";
import done from "../../assets/done.png";
import extra from "../../assets/extra.png";


function FeedTheCat() {
    // Tiberiu or Doina?
    let params = useParams();
    // navigation link to Home
    let navigateHome = useNavigate();
    const home = () => {
        navigateHome("/");
    };

    // food track
    // food default
    const foodDefault = [
        { id: 1, theCatAte: false }, { id: 2, theCatAte: false }, { id: 3, theCatAte: false}, 
        { id: 4, theCatAte: false }, { id: 5, theCatAte: false}, { id: 6, theCatAte: false }, 
        { id: 7, theCatAte: false }, { id: 8, theCatAte: false }, { id: 9, theCatAte: false}, 
        { id: 10, theCatAte: false}
    ];
    
    const [foods, setFoods] = useState(foodDefault);
    // food counter
    const totalFoodCount = foods.reduce(function (sum, food) {
        if (food.theCatAte === true) {
            return sum + 1;
        }
        else {
            return sum;
        };
    }, 0);

    // Alert 
    const [alertFood, setAlertFood]=useState(false);
    // count for first 8 services
    const totalFoodCountWithoutAlerts = foods.reduce(function (sum, food, index) {
        if (food.theCatAte === true && (index < 8)) {
            return sum + 1;
        }
        else {
            return sum;
        };
    }, 0);

    const onClickFood  = function (index) {
        // alert if first 8 are not checked
        if (index > 7 && totalFoodCountWithoutAlerts < 8) {
            return alert("Please check 1-8 servings first.");
        }
        // check food (done + goes in the bag)
        const newFood = [...foods];
        if (foods[index].theCatAte === true ){
            newFood[index].theCatAte = false;
        } else if (foods[index].theCatAte === false) {
            newFood[index].theCatAte = true;
            setAlertFood(false);
        }
        // alerta OMG for extra food serving 9 and 10
        if (totalFoodCountWithoutAlerts >= 8 && foods[index].theCatAte === true) {
            setAlertFood(true);
        } 
        else if (totalFoodCountWithoutAlerts >= 8 && foods[index].theCatAte === false ){
            setAlertFood(false);
        }

        setFoods(newFood);
    };

    const closeAlert = () => {
        setAlertFood(false);
    };

    const resetHandler = function () {
            setFoods(foodDefault);
        };

    // images array
    const imageGallery = [{id:1, foodInTheBag: classes.food1_inTheBag, src: milk, foodPosition: classes.food1_position, foodNr: classes.foodNr1},{id:2, foodInTheBag: classes.food2_inTheBag, src: meat, foodPosition: classes.food2_position, foodNr: classes.foodNr2}, 
    {id:3, foodInTheBag: classes.food3_inTheBag, src: food1, foodPosition: classes.food3_position,foodNr: classes.foodNr3}, {id:4, foodInTheBag: classes.food4_inTheBag, src: food1, foodPosition: classes.food4_position,foodNr: classes.foodNr4},
    {id:5, foodInTheBag: classes.food5_inTheBag, src: food1, foodPosition: classes.food5_position, foodNr: classes.foodNr5}, {id:6, foodInTheBag: classes.food6_inTheBag, src: food1, foodPosition: classes.food6_position,foodNr: classes.foodNr6},
    {id:7, foodInTheBag: classes.food7_inTheBag, src: food1, foodPosition: classes.food7_position, foodNr: classes.foodNr7}, {id:8, foodInTheBag: classes.food8_inTheBag, src: food1, foodPosition: classes.food8_position,foodNr: classes.foodNr8},
    {id:9, foodInTheBag: classes.food9_inTheBag, src: food1, foodPosition: classes.food9_position,  foodNr: classes.foodNr9}, {id:10, foodInTheBag: classes.food10_inTheBag, src: food1, foodPosition: classes.food10_position,foodNr: classes.foodNr10}];

    return <div>
        <div>
        {alertFood && <AlertModal closeAlert={closeAlert} />}
        </div>  
    <div className={classes.container}>
    <div className={classes.header}>
                <h1 className={classes.hello}>Hello {params.name}</h1>
                <p className={classes.text}>Would you feed the cat?</p>
                <p className={classes.text}>Here's how much I ate today: <span>{totalFoodCount} / 8</span></p>
    </div>
    <div className={classes.wrap}>
        <div className={classes.bag_cat_responsive}>
        <div className={classes.section_cat}>
                <img className={classes.cat} src={cat} width="150" height="113" alt="cat"></img>
        </div>
            <div className={classes.bag_container}>
                    <img className={classes.bag} src={bag} width="150" height="113" alt="bag"></img>
                    <img className={classes.cat_bag} src={cat_bag} width="150" height="113" alt="cat_bag"></img>
                {
                    imageGallery.map((element, index)=><img className={`${classes.inTheBag} ${element.foodInTheBag} ${foods[index].theCatAte ? "" : classes.hidden}`} 
                    src={element.src} alt="image"></img>)
                    }
            </div>
        </div>
            <div className={classes.shelf_container}>
                    <img className={classes.cat_above} src={cat_above} alt="cat_above"></img>
                    <img className={classes.shelf} src={shelf2} alt="shelf"></img>
                    {
                        imageGallery.map((element, index)=> 
                           <button className={classes.btn} onClick={() => onClickFood(index)}>
                           <img className={`${classes.box} ${element.foodPosition}`} src={element.src} alt="image"></img>
                           <img className={`${classes.done} ${element.foodPosition} ${foods[index].theCatAte ? "" : classes.hidden} `} src={done} width="55" height="55" alt="done"></img>
                           </button>
                    )}
                    {
                        imageGallery.map((element)=>
                           <p className={`${classes.foodNumber} ${element.foodNr}`}>{element.id}</p>
                    )}
                    <p className= {classes.extra_text}>Extra food!</p>
                    <img className={classes.extra} src={extra} alt="extra"></img>
                    <img className={classes.extra_cats} width="100" height="100" src={extra_cats} alt="extra_cats"></img>
            </div>
        </div> 
        <div className={classes.btn_bottom}>
                <button className={`${classes.btn_header} ${classes.btn_left}`} onClick={home}>Home</button>
                <button className={`${classes.btn_header} ${classes.btn_right}`} onClick={resetHandler}>Reset</button>
        </div>
    </div>
</div>;
};
export default FeedTheCat;