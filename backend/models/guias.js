import mongoose from "mongoose";

const httpGuias= new mongoose.Schema({
    codigo : {type : String , require :true},
    nombre : {type :String , require :true},
    fase   : {type :String ,require :true},
    documento : {type :String ,require :true},
    createdAt: { type: Date, default: Date.now },


})

export default mongoose.model("Guia", httpGuias)

// idInstrumentosEvaluacion 
// IDmaterialAPoyo