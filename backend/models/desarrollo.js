import mongoose from "mongoose";

const httpDesarrollo= new mongoose.Schema({
codigo: { type : String , require :true },
matrizcorrelacion : {type: String , require :true},
proyectoFormativo :{type :String ,require :true},
planeacionPedagogica : {type :String ,require :true},
// idGuias (relacion)
createdAt: { type: Date, default: Date.now },


})
export default mongoose.model("Desarrollo", httpDesarrollo)
