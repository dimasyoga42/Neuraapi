import express from "express";
import { Home } from "../controller/home.js";
import { xtal } from "../controller/xtal.js";
import { Banner } from "../controller/banner.js";
import { Monster } from "../controller/monster.js";
import { Regist } from "../controller/regist.js";
import {
  getAllBos,
  getBosById,
  createBos,
  updateBos,
  deleteBos
} from '../controller/bos.js';


import {
  getAllAbility,
  getAbilityById,
  createAbility,
  updateAbility,
  deleteAbility
} from '../controller/ability.js';
import { verifyToken } from "../middleware/auth.js";

const Main = express.Router()


Main.get("/home", verifyToken, Home)
//path xtall
Main.get("/search/xtal/:name", xtal)
Main.get("/xtal/all", xtal)
//path monster 
Main.get("/search/monster/:name", Monster)
//path regist 
Main.get("/search/regist/:name", Regist)
//path ability 
Main.get('/ability', getAllAbility);
Main.get('/ability/:id', getAbilityById);
Main.post('/ability', createAbility);
Main.put('/ability/:id', updateAbility);
Main.delete('/ability/:id', deleteAbility);
//path Banner
Main.get("/banner", Banner);
Main.get("/filstat/arm", Home)
Main.get("/filstat/weap", Home)




//path bos 
Main.get('/bos', getAllBos);
Main.get('/bos/:id', getBosById);
Main.post('/bos', createBos);
Main.put('/bos/:id', updateBos);
Main.delete('/bos/:id', deleteBos);
Main.get("/bos/boost", Home)

Main.get("/appview/all", Home)
Main.get("/appview/filter/:filter", Home)
Main.get("/appview/search/:name", Home)





export default Main 
