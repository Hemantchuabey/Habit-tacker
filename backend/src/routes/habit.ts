import express from "express";
import Habit from "../models/Habit";
import { protect } from "./auth";


const router  = express.Router()
/**
 * @route   POST /api/habits
 * @desc    Create a new habit
 * @access  Private
 */


router.post("/",protect,async(req,res)=>{
    try{
        const {title} = req.body
        if(!title){
            return res.status(400).json({message:"Habit title is not required."})
        }
        
        const habit =  await Habit.create({
            title,
            userId: (req as any).user.userId
        })

        return res.status(201).json(habit)

    }catch(err){
        console.log(err)
        res.status(500).json({message :"Server Error"})
    }
})


/**
 * @route   GET /api/habits
 * @desc    Get all habits of logged-in user
 * @access  Private
 */

router.get('/',protect,async(req,res)=> {
    try{
        const habits = await Habit.find({
            userId: (req as any).user.userId
        }).sort({createdAt: -1})
        res.status(200).json(habits)
    }catch(err){
        console.log("Habit Error : ", err)
        res.status(500).json({message:"Server Error."})
    }
})

export default router