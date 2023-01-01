const exerciseUserModel = require('../Models/exerciseUser')
const letterModel = require('../Models/letters')
const userModel = require('../Models/userModel')
const { getLetter } = require('./letterController')
const letterControler = require('./letterController')



const addGame = async (req, res) => {
    console.log("addGam");
    let exerciseUser = req.body.exerciseUser
    let nextl = ''
    try {
        let newExerciseUser = new exerciseUserModel({
            user: exerciseUser.user,
            label: exerciseUser.label,
            gameExercise: exerciseUser.gameExercise,
            mark: exerciseUser.mark
        })
        console.log("nextl " + nextl);
        await newExerciseUser.save()
        console.log("newExerciseUser  -----  "+newExerciseUser.gameExercise);
        let ex = await exerciseUserModel.find({ user: newExerciseUser.user, label: newExerciseUser.label })
        console.log("ex.length    " + ex.length);
        if (ex.length == 4) {
            nextl = await letterControler.getNextLetter(newExerciseUser.label)
            await console.log(nextl);
        }
        console.log("good");
        res.json({ "GOOD": nextl })
    }
    catch (err) {
        console.log("err   "+err);
        res.send("error+" + err)
    }
}







const updateMark = async (req, res) => {//עוד לא בדקתי את הפונקציה
    console.log("updateMark");
    let exerciseUser = req.body.exerciseUser

    exerciseUserModel.findOneAndUpdate({ user: exerciseUser.user, label: exerciseUser.label, gameExercise: exerciseUser.gameExercise, }, { mark: exerciseUser.mark }).then(() => {
        res.status(200).send(`your mark us: ${exerciseUser.mark} `)
        //לא עובד
    }).catch((err) => {
        res.status(400).send(err)
    })
}


const getStat = async (pass) => {//עוד לא בדקתי את הפונקציה    
    //לעדכן גם אם יש לו שלב חדש
    //להחליף לFINDBYID לUSER
    // const arrletter=await letterModel.getAllLetter()
    console.log("pass:  " + pass);
    const arrletter = await letterControler.getAllLetter()
    console.log("arrletter :  " + arrletter);
    try {
        let neww = ''
        let oob = {}
        arrletter.forEach(async letter => {
            let exerciseg = await exerciseUserModel.find({ user: pass, label: letter })
            console.log("letter   " + letter);
            console.log("exerciseg  " + exerciseg);//ריק??????????
            if (exerciseg) {
                let ob = {}
                exerciseg.forEach(element => {
                    ob[element.gameExercise] = element.mark
                });
                oob[letter] = ob

            }
        })
        console.log("oobexerciseg------------" + oob);
        let arr = Object.keys(oob)
        if (arr.length === 0) {
            //אם אין אותיות בכלל - שלב ראשון
            neww = arrletter[0]
        }
        // מכיל אות - מפתח,  וערך- אוביקט של מספר משחק וציון כמספר המשחקים ששיחק באותו שלב OOB
        else if (Object.keys(oob[arr[arr.length - 1]]) == 4) {//OOB חיפוש כמה משחקים יש באות האחרונה באוביקט 
            neww = arrletter[arr.length]
        }
        console.log(neww);
        // const y= Object.keys(oob)        
        // else
        //     if(y[y.length-1])                                 //לסיים שאם יש 4 משחקים לצרף עוד אות 

        return { a: oob, b: neww }
    }
    catch (err) {
        console.log(err);
        return err
    }
}
//learningStatus  PracticesGames
const getState = async (pass) => {       
    const arrletter = await letterControler.getAllLetter()   
    try {
        let newlevel = ""
        let fourLetter=[]
        let learningStatus = {}
        for (let index = 0; index < arrletter.length; index++) {
            let PracticesGames = await exerciseUserModel.find({ user: pass, label: arrletter[index] })
            let ob = {}
            if (PracticesGames != '') {
                PracticesGames.forEach(element => {
                    ob[element.gameExercise] = element.mark
                });
                learningStatus[arrletter[index]] = ob
            }
            else
                break;
        }
        console.log("learningStatus   "+learningStatus);
        let arr = Object.keys(learningStatus)
        console.log("arr   "+arr);
        if (arr.length === 0) {
            newlevel = arrletter[0]
        }
        else if (Object.keys(learningStatus[arr[arr.length - 1]]).length == 4) { //
            newlevel = arrletter[arr.length]            
        }   
        if(arr.length <4){
            fourLetter.push( arrletter[0],arrletter[1],arrletter[2],arrletter[3])
            
        }
        return { a: learningStatus, b: newlevel ,fourLetter:fourLetter}
    }
    catch (err) {
        console.log(err);
        return err
    }
}
const Mark = async (req, res)=>{
    try{
        let a =await getMark(req.params.label, req.params.user)
        console.log("a "+a);
        res.send(a)/////////////////////////////
    }catch(err){
        res.send(err)
    }
}

const getMark = async ( user, label) => {
    console.log("getMark");
    try {

        let sum = 0
        exercise = await exerciseUserModel.find({ user: user, label: label }, { mark: 1, _id: 0 })
        // console.log("exercise   " + exercise);
        // console.log("exercise.length    " + exercise.length);
        if(exercise.length>=4){

            exercise.forEach(element => {
                sum += element.mark
            });
        }
        // console.log("sum  "+sum+"  label "+label);
        // res.send(sum)
        return sum
    }
    catch (err) {
        // res.send(err)
        return err
    }
}
const getMar = async () => {
    console.log("getM");
    try {

        let sum = 0
        exercise = await exerciseUserModel.find({ user: req.params.user, label: req.params.label }, { mark: 1, _id: 0 })
        console.log("exercise   " + exercise);
        console.log("exercise.length    " + exercise.length);
        exercise.forEach(element => {
            sum += element.mark
        });
        console.log("sum  "+sum);
        return sum
    }
    catch (err) {
       return err
    }
}


const getAvgMark = async (req, res) => {   
    let birthDate = req.params.birthDate
    let b = new Date(birthDate); 
    try {
        time1 = new Date(birthDate)
        time2 = new Date(birthDate)        
        let users = await userModel.find({
            userBirthDate: {                
                $gte: time1.setFullYear(b.getFullYear() - 1),               
                $lte: time2.setFullYear(b.getFullYear() + 1),
            } })
            let L=req.params.labels
            let Labels = L.replace(/,/g, '');           
            let usersAvgMark =[]
            for (let index = 0; index < Labels.length; index++) {
                let numOfUsers=0
                let totalMarks=0
                for (let ind = 0; ind < users.length; ind++) {
                    let PracticesGames = await exerciseUserModel.find({ user: users[ind], label: Labels[index] })
                    let count = PracticesGames.length               
                    let sum=0
                    if(count >= 4){
                        PracticesGames.forEach(element => {
                            sum+=element.mark
                        });                                
                    numOfUsers+=1
                    totalMarks+=sum
                    }
                }
                if(numOfUsers!=0){
                    let avg= totalMarks/numOfUsers
                    usersAvgMark.push(avg)
                }
                else{
                    usersAvgMark.push(totalMarks)   
                }               
            }        
            let hismMarks = []
            for (let index = 0; index < Labels.length; index++) {
                let hismark =await getMark( req.params.user, Labels[index])
                hismMarks.push(hismark)                
            }         
        res.json({avg:usersAvgMark, hism:hismMarks})
         }
    catch (err) {
            res.send(err)

        }
    }












//לולאה בתוך לולאה- לולאה חיצונית עוברת על השלבים ולולאה פנימית עוברת על כל משחק בשלב
//כשחוזר לא מצאתי תסיים את הלולאה ותחזיר תשובה
//status={ }
//כל לולאה חיצונית מגדירה אוביקט ש המפתח הוא השלב (a:{ })
//ובכל לולאה פנימית מכניסים עוד אוביקט s.a.1=m   s.a.2=m/s.a[index]=m

//label={ }
//[a][index]=m   a[index]=m?


{
        user: {
            deatails: "",
            {
                stat:
                {
                    a: { 1: "", 2: "", 3: "", 4: "" },
                    b: { 1: "", 2: "", 3: "", 4: "" },
                    c: { 1: "" }
                }
            }
        }
    }

    module.exports = { addGame, updateMark, getState, getAvgMark, Mark }

    // , getMark