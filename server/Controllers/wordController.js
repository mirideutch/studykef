const wordModel= require('../Models/wordOfLetter')
const letterModel= require('../Models/letters')

const getWord = async (req,res)=>{
    try{
        let word=await wordModel.findOne({id:req.params.wordId})
        
        console.log(word);
        res.send(word.wordImage)
    }
    catch(ERR){
        
        res.send(ERR)
    }
}


const createWord=async(req,res)=>{
        let word =req.body.word
        console.log(word);
        try{
        let newWord =await new wordModel(word)
            newWord.save()
                res.send("ok")
        }        
       catch(err) {
                console.log(err);
                res.send("error+" + err)
            }
    }

    const createWordToLetter = async (req, res) => {
        try {
            // שליפת יוזר לפי הקוד של מונגוס
            let letter = await letterModel.findOne({letter:req.params.letter})
            // יצירת מאמר חדש לפי מה שהתקבלן מה body 
            let newWord = await new wordModel(req.body.word)                           
            // שמירת המאמר בעצמו בקולקשן של המאמרים
            await newWord.save()
            // שמירת המאמר במערך ששיך ליוזר שכתב.
            //await letter.wordsLetter.push(newWord)
            await letter.wordsLetter.push(newWord._id)
            // שמירת השינויים במסד
            await letter.save()
            res.status(200).json({"my word":newWord,"my letter":letter})
        } catch (error) {
            console.log('error:', error);
            res.send(error)
        }
    }

module.exports={getWord,createWord,createWordToLetter}