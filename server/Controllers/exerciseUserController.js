const exerciseUserModel = require('../Models/exerciseUser')
const letterModel = require('../Models/letters')
const userModel = require('../Models/userModel')
const { getLetter } = require('./letterController')
const letterControler = require('./letterController')

const addGam = (req, res) => {
    console.log("addGame");
    let exerciseUser = req.body.exerciseUser
    let newExerciseUser = new exerciseUserModel({
        user: exerciseUser.user,
        label: exerciseUser.label,
        gameExercise: exerciseUser.gameExercise,
        mark: exerciseUser.mark
    })
    newExerciseUser.save().then(() => {
        exerciseUserModel.find({ user: newExerciseUser.user, label: newExerciseUser.label })
    }).then((resp) => {
        console.log("resp      " + resp);
    }).then(() => {
        res.json({ "m": "r" })
    }).catch((err) => {
        res.send("error+" + err)
    })
}


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
        let ex = await exerciseUserModel.find({ user: newExerciseUser.user, label: newExerciseUser.label })
        console.log("ex.length    " + ex.length);
        if (ex.length == 4) {
            nextl = await letterControler.getNextLetter(newExerciseUser.label)
            await console.log(nextl);
        }
        res.status(300).json({ "GOOD": nextl })
    }
    catch (err) {
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

const getState = async (pass) => {//עוד לא בדקתי את הפונקציה    
    //לעדכן גם אם יש לו שלב חדש
    //להחליף לFINDBYID לUSER
    // const arrletter=await letterModel.getAllLetter()
    console.log("pass:  " + pass);
    const arrletter = await letterControler.getAllLetter()
    console.log("arrletter :  " + arrletter);
    try {
        let neww = ''
        let oob = {}
        for (let index = 0; index < arrletter.length; index++) {
            let exerciseg = await exerciseUserModel.find({ user: pass, label: arrletter[index] })
            console.log("letter   " + arrletter[index]);
            console.log("exerciseg  " + exerciseg);//ריק??????????
            let ob = {}
            if (exerciseg != '') {
                exerciseg.forEach(element => {
                    ob[element.gameExercise] = element.mark
                });
                oob[arrletter[index]] = ob
                console.log("oobexerciseg------------" + oob);
            }
            else
                break;

        }
        let arr = Object.keys(oob)
        console.log("arr   " + arr);
        console.log("Object.length    " + Object.keys(oob[arr[arr.length - 1]]).length);
        if (arr.length === 0) {
            //אם אין אותיות בכלל - שלב ראשון
            neww = arrletter[0]
        }
        // מכיל אות - מפתח,  וערך- אוביקט של מספר משחק וציון כמספר המשחקים ששיחק באותו שלב OOB
        else if (Object.keys(oob[arr[arr.length - 1]]).length == 4) {//OOB חיפוש כמה משחקים יש באות האחרונה באוביקט 

            neww = arrletter[arr.length]
            console.log("neww   " + neww);
        }

        return { a: oob, b: neww }
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

const getMark = async (label, user) => {
    console.log("getMark");
    try {

        let sum = 0
        exercise = await exerciseUserModel.find({ user: user, label: label }, { mark: 1, _id: 0 })
        console.log("exercise   " + exercise);
        console.log("exercise.length    " + exercise.length);
        exercise.forEach(element => {
            sum += element.mark
        });
        console.log("sum  "+sum);
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
    console.log("getAvgMark   ");
    let birthDate = req.params.birthDate
    console.log("birthDate   " + birthDate);
    console.log("type   " + typeof (birthDate));

    let b = new Date(birthDate);

    console.log({ $gt: (b.getFullYear() - 1) });
    try {
        //  exerciseUserModel.find({ label: req.params.label }).populate('User', null, { userBirthDate: userBirthDate.getFullYear() == birthDate.getFullYear() })
        
        
        time1 = new Date(birthDate)
        time2 = new Date(birthDate)        
        
        let users = await userModel.find({
            userBirthDate: {                
                $gte: time1.setFullYear(b.getFullYear() - 1),               
                $lte: time2.setFullYear(b.getFullYear() + 1),
            } })
            let Labels=req.params.labels
            let ob = {}
            for (let index = 0; index < Labels.length; index++) {

                let c=0
                let s=0

                for (let ind = 0; ind < users.length; ind++) {

                    let exerciseg = await exerciseUserModel.find({ user: users[ind], label: Labels[index] })
                    let count = exerciseg.length
                    
                    let sum=0
                    if(count==4){
                        exerciseg.forEach(element => {
                                     sum+=element.mark
                                 });
                        c+=1
                        s+=sum
                    }
                    console.log("exerciseg "+exerciseg+"user.   "+users[ind].userFirstName+"  Labels[index] "+Labels[index]+"   sum   "+sum)

                }
                if(c!=0){

                    let avg= s/c
                    console.log("-----------------sumOfKids   "+c+"   avgmark   "+avg);
                    console.log(Labels[index]);
                    ob[Labels[index]] = avg
                }
                
                
            }
            console.log("ob   "+ob);

            let hism = {}
            for (let index = 0; index < Labels.length; index++) {
                let hismark =0
                let hisexercize = await exerciseUserModel.find({user:req.params.user, label: Labels[index]})
                if(hisexercize.length==4){
                    hisexercize.forEach(element=>hismark+=element.mark)
                }
            hism[Labels[index]] = hismark
            }
    res.json({ob:ob, hism:hism})

         }
    catch (err) {
            console.log("err  " + err);
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

    module.exports = { addGame, updateMark, getState, getMark, getAvgMark, Mark }

