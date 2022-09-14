const letterModel = require('../Models/letters')
const wordModel = require('../Models/wordOfLetter')
const getLetter = async (req, res) => {
    try {
        let letter = await letterModel.findOne({ letter: req.params.letter }).populate("wordsLetter")
        console.log(letter);
        res.send(letter)
    }
    catch (err) {
        res.send(err)
    }
    
}

const getAllLetter = async () => {
    console.log("getAllLetter :)");
    try{
        
        let allLetters=await letterModel.find({},{letter:1, _id:0})
        
        finalArray = allLetters.map(function (obj) {
            return obj.letter;
          });
          console.log(finalArray);
        return finalArray
    }
    catch(err){
        return err
    }
}
const getFourLetter = async(req, res)=>{ //////////////////////////////////////////////////////////////////////////
    
    try{
        let fourLetters=await letterModel.find({},{letter:1, _id:0}).limit(4)      
            // finalArray = fourLetters.map(function (obj) {
                
            //     return obj.letter;
            //   });.limit(4) 
         let   finalArray =await fourLetters.map(l=> l.letter);                                                                  
            res.send( finalArray)
            }
            catch(err){
                    res.send( err)
                } 
}               
const getFirstLetter = async()=>{
    try{
    let a= await letterModel.findOne({},{_id:0,letter:1})
    return a.letter
    }
    catch(err){
        return err
    }
}




const getNextLetter = async(label)=>{
    console.log("getNextLetter");
    console.log(label);
    try{
        let arraLetters=await getAllLetter()
        
        let index =await arraLetters.indexOf(label);
        
        newL =await arraLetters[index+1]
        console.log("newL  "+newL);
        return newL
    }
    catch(err){
        return err
    }
}


const createLetter = async (req, res) => {
    let letter = req.body.letter
    console.log(letter);
    try {
        let newLetter = await new letterModel(letter)
        newLetter.save()
        res.send("ok")
    }
    catch (err) {
        console.log(err);
        res.send("error+" + err)
    }
}
const getSoundLetters = async (req, res) => {
    const arrletter =req.params.labelLetters
    console.log(req.params.labelLetters)
    try {
        let oob = {}
        for (let lett in arrletter) {
            let sound = await letterModel.findOne({ letter: arrletter[lett] }, { _id: 0, soundLetter: 1 })
            console.log("sound----"+sound);
            oob[arrletter[lett]] = sound
        }
        console.log("soundoob    "+oob);
        res.send(oob)
    } catch (err) {
        console.log("--");
        res.send(err)
    }

}
const getSoundwordWithImageword = async (req, res) => {
    const arrletter = req.params.arrletter
    try {
        let oob = {}
        for (let lett in arrletter) {
            let words = await letterModel.findOne({ letter: arrletter[lett] }, { _id: 0, wordsLetter: 1 }).populate("wordsLetter", { wordImage: 1, wordSound: 1, _id: 0 })
            oob[arrletter[lett]] = words
        }
        console.log("____________" + oob);
        res.send(oob)
    }
    catch (err) {
        console.log("--");
        res.send(err)
    }

}

module.exports = { getLetter, createLetter, getSoundLetters, getSoundwordWithImageword, getAllLetter,getFirstLetter ,getFourLetter, getNextLetter}
